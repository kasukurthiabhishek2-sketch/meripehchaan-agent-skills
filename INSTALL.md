# Install Meri Pehchaan agent skills with npx

These 12 skills live in GitHub under `skills/<name>/SKILL.md`. No `npm publish` is required. The supported command is `npx skills add`, not `npx plugin install`.

Run from the project in which you want your coding agent to use the skills:

```bash
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --list
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --skill meripehchaan-integration-architect --agent antigravity-cli --yes
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --skill meripehchaan-oauth-pkce --agent antigravity-cli --yes
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --skill '*' --agent antigravity-cli --yes
npx skills list
```

Supported agent slugs: `antigravity-cli` (AGY CLI), `antigravity` (Antigravity desktop), `codex`, `cursor`. For a single skill in another agent, change `--agent`. `--global` makes skills available across projects; without it, the shared project-local install path is typically `.agents/skills/`. Current published CLI releases require Node.js 22.20+.

**Avoid an issuer capability in requester apps.** Instead of installing all 12 skills, interactively select relevant skills or pass each `--skill` flag. `meripehchaan-push-uri` requires registered issuer rights, and a requester account is not an issuer.

Installed packages are self-contained. Each local reference needed by a SKILL.md lives inside its own directory, under `references/`. The source repository's top-level `reference/` folder is for maintainers, not a runtime dependency.

After installation: `npx skills list`. To update: `npx skills update -y`. Review locally modified skills before overwriting.

Repository checks:

```bash
node scripts/validate-skills.mjs
node --test scripts/validate-skills.test.mjs
```

GitHub Actions runs these checks, copies each skill independently, and attempts an `npx skills@1.7.4 add` smoke installation with Antigravity CLI, Codex and Cursor. **Successful installation alone does not establish real DigiLocker API access, correct partner entitlements, or verification of the unbundled v2.4 contract.**

Official references: https://agentskills.io/specification and https://github.com/vercel-labs/skills/blob/main/docs/agents.md
