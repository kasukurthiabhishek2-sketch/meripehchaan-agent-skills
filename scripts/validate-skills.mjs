#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(fs.readFileSync(path.join(repository, "manifest.json"),"utf8"));
const names = manifest.skills;

export function checkSkill(dir, expectedName) {
  const problems = [];
  const file = path.join(dir,"SKILL.md");
  if (!fs.existsSync(file)) return ["missing SKILL.md"];
  const content = fs.readFileSync(file,"utf8");
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(content);
  if (!fm) return ["missing YAML frontmatter"];
  const name = /^name:\s*(.*?)\s*$/m.exec(fm[1])?.[1]?.replace(/^['"]|['"]$/g,"");
  const description = /^description:\s*(.*?)\s*$/m.exec(fm[1])?.[1]?.replace(/^['"]|['"]$/g,"");
  if (name !== expectedName || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name ?? "") || (name?.length ?? 999) > 64) problems.push("invalid name");
  if (!description || description.length > 1024) problems.push("invalid description");
  const rawDesc = /^description:\s*(.*?)\s*$/m.exec(fm[1])?.[1] ?? "";
  if (/:(?:\s|$)/.test(rawDesc) && !/^[\x22\x27]/.test(rawDesc)) problems.push("unquoted YAML colon in description");
  for (const section of ["## Operational procedure","## Acceptance tests","NEEDS_PARTNER_CONFIRMATION","NOT RUN"]) {
    if (!content.includes(section)) problems.push("missing instruction: "+section);
  }
  if (content.split(/\r?\n/).length > 500) problems.push("SKILL.md over 500 lines");
  if (content.includes("../../reference/") || /\.\.\/meripehchaan-[a-z-]+\/SKILL\.md/.test(content)) problems.push("external reference");
  const refs = new Set(["references/acceptance.md"]);
  const ticks = content.split(String.fromCharCode(96));
  for (let i=1;i<ticks.length;i+=2) {
    if (/^(references|scripts)\/[a-zA-Z0-9./_-]+$/.test(ticks[i])) refs.add(ticks[i]);
  }
  for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
    const target=match[1].split("#")[0];
    if (/^(references|scripts)\//.test(target)) refs.add(target);
    if (/^(\.\.\/|\/)/.test(target)) problems.push("external markdown link "+target);
  }
  for (const ref of refs) {
    const filename=path.resolve(dir,ref);
    const rel=path.relative(dir,filename);
    if (rel === ".." || rel.startsWith("../") || path.isAbsolute(rel)) problems.push("path escape "+ref);
    else if (!fs.existsSync(filename) || !fs.statSync(filename).isFile()) problems.push("missing packaged reference "+ref);
  }
  return problems;
}
export function checkAll(dir, allowOthers=false) {
  const problems=[];
  const actual=fs.readdirSync(dir,{withFileTypes:true})
    .filter(x=>x.isDirectory() && fs.existsSync(path.join(dir,x.name,"SKILL.md")))
    .map(x=>x.name);
  for(const name of names){
    if(!actual.includes(name)) problems.push("missing skill "+name);
    else for(const issue of checkSkill(path.join(dir,name),name)) problems.push(name+": "+issue);
  }
  if(!allowOthers) for(const name of actual) if(!names.includes(name)) problems.push("unlisted "+name);
  if(new Set(names).size!==names.length) problems.push("duplicate names");
  return {expected:names.length,found:actual.length,problems};
}
if (path.resolve(process.argv[1] ?? "")===fileURLToPath(import.meta.url)) {
  const idx=process.argv.indexOf("--installed");
  if(idx!==-1 && !process.argv[idx+1]) { console.error("--installed requires directory"); process.exit(2); }
  const dir=idx===-1?path.join(repository,"skills"):path.resolve(process.argv[idx+1]);
  if(!fs.existsSync(dir)) {console.error("missing dir "+dir);process.exit(1);}
  const report=checkAll(dir,idx!==-1);
  console.log(JSON.stringify({dir,...report},null,2));
  process.exit(report.problems.length?1:0);
}
