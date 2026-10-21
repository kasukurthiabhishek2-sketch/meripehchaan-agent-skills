import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { checkAll,checkSkill } from "./validate-skills.mjs";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const names=JSON.parse(fs.readFileSync(path.join(root,"manifest.json"),"utf8")).skills;
test("every skill remains valid after isolated copy",()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"isolated-skills-"));
  try{
    for(const name of names){
      fs.cpSync(path.join(root,"skills",name),path.join(tmp,name),{recursive:true});
      assert.deepEqual(checkSkill(path.join(tmp,name),name),[],name);
    }
    assert.deepEqual(checkAll(tmp).problems,[]);
  }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
test("broken bundled reference is rejected",()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"broken-reference-"));
  try{
    const name=names[0], dir=path.join(tmp,name);
    fs.cpSync(path.join(root,"skills",name),dir,{recursive:true});
    const file=path.join(dir,"SKILL.md");
    fs.appendFileSync(file,"\n[missing](references/does-not-exist.md)\n");
    assert(checkSkill(dir,name).some(x=>x.includes("missing packaged reference")));
  }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});
test("wrong name is rejected",()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"broken-name-"));
  try{
    const name=names[1], dir=path.join(tmp,name);
    fs.cpSync(path.join(root,"skills",name),dir,{recursive:true});
    const file=path.join(dir,"SKILL.md");
    const text=fs.readFileSync(file,"utf8").replace("name: "+name,"name: BROKEN-Name");
    fs.writeFileSync(file,text);
    assert(checkSkill(dir,name).some(x=>x.includes("invalid name")));
  }finally{fs.rmSync(tmp,{recursive:true,force:true});}
});

test("unquoted YAML colon in description is rejected",()=>{
  const tmp=fs.mkdtempSync(path.join(os.tmpdir(),"broken-yaml-"));
  try {
    const name=names[0], dir=path.join(tmp,name);
    fs.cpSync(path.join(root,"skills",name),dir,{recursive:true});
    const file=path.join(dir,"SKILL.md");
    const content=fs.readFileSync(file,"utf8").replace(/^description:.*$/m,"description: Use when: example");
    fs.writeFileSync(file,content);
    assert(checkSkill(dir,name).some(x=>x.includes("unquoted YAML colon")));
  } finally { fs.rmSync(tmp,{recursive:true,force:true}); }
});
