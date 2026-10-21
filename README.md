# Meri Pehchaan / DigiLocker Requester API v2.4 - Agent Skills

A source-grounded skill pack for AI coding agents implementing the **Requester - Meri Pehchaan API Specification, Version 2.4 (Sep 2026)**.

The goal is not merely to make an agent remember endpoint URLs. The skills teach the integration model, OAuth/PKCE flow, scope and consent semantics, account binding, APAAR retrieval, DigiLocker file APIs, pull-document discovery, integrity verification, meta APIs, error handling, revocation, testing, and the awkward little documentation edge cases that tend to consume an afternoon because software apparently enjoys rituals.

## What is included

| Skill | Use it for |
|---|---|
| `meripehchaan-integration-architect` | End-to-end architecture, task routing, implementation planning and review |
| `meripehchaan-oauth-pkce` | Authorization Code flow, PKCE, token exchange, OIDC, refresh, logout and revocation |
| `meripehchaan-account-identity` | Get User Details, stable account binding, profile matching, picture/mobile/email handling |
| `meripehchaan-apaar-education` | APAAR account and academic record retrieval, education verification workflows |
| `meripehchaan-file-apis` | Uploaded/issued document listing, download, XML, e-Aadhaar, upload and file integrity |
| `meripehchaan-pull-documents` | Issuer discovery -> doctype discovery -> search parameters -> consent -> pull document |
| `meripehchaan-meta-apis` | Issuers, document types, search parameter metadata, statistics and spec-defined request hashes |
| `meripehchaan-push-uri` | Issuer-side Push URI integration and request signing sequence |
| `meripehchaan-security-consent` | Secrets, state/PKCE, token lifecycle, consent, data minimization, logging and storage boundaries |
| `meripehchaan-testing-debugging` | Contract tests, negative tests, error mapping, mock strategy and production-readiness checks |
| `meripehchaan-integration-reviewer` | Independent audit/review of an existing implementation against v2.4 |
| `meripehchaan-typescript-nestjs` | Production TypeScript/NestJS/Next.js implementation patterns |

## Install with npx

These are 12 independent [Agent Skills](https://agentskills.io/specification), each with a `SKILL.md` and a bundled `references/acceptance.md`. Use the maintained [skills CLI](https://github.com/vercel-labs/skills/blob/main/docs/commands.md), not an npm package named "plugin".

```bash
# Inspect what is available
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --list

# Install the integration architect for AGY CLI
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --skill meripehchaan-integration-architect --agent antigravity-cli --yes

# Install the full pack into your current project
npx skills add kasukurthiabhishek2-sketch/meripehchaan-agent-skills --skill '*' --agent antigravity-cli --yes
```

Use `--agent antigravity` for Antigravity desktop, `--agent codex` for Codex, or `--agent cursor` for Cursor. The published CLI's latest documented runtime requires Node.js 22.20+. **Requester-only applications should exclude `meripehchaan-push-uri`**, which requires a registered issuer. See [INSTALL.md](INSTALL.md).

## Source policy

This pack was derived from the supplied **Requester - Meri Pehchaan API Specification v2.4**. The original PDF is intentionally **not redistributed** in this repository. See `reference/source-map.md` for section/page mapping.

The skills distinguish three kinds of guidance:

- **SPEC**: directly supported by v2.4.
- **ENGINEERING**: security/reliability guidance based on standard OAuth/OIDC/backend practice.
- **AMBIGUITY**: places where v2.4 is inconsistent, underspecified, or its sample payload is malformed. Agents are instructed not to invent behavior in those cases.

## Critical v2.4 changes

Do not let an agent accidentally implement a 2023-era integration from an old blog post. Version 2.4 adds `mobile`, `picture`, and `email` to Get User Details; adds `mobile` and `purpose` to the non-OIDC access token response; adds APAAR; adds `service_name`, `prompt`, `login_hint`, and APAAR AMR values to authorization; and **removes Verify Account API**.

## Public-repo hygiene

Never commit `client_secret`, access tokens, refresh tokens, real DigiLocker user payloads, e-Aadhaar XML, certificate files, or real production callback query strings. Examples in this pack use placeholders.

## Quality checks and evidence limits

```bash
node scripts/validate-skills.mjs
node --test scripts/validate-skills.test.mjs
```

GitHub Actions additionally tests installation of the copied skills with `npx skills` into Antigravity CLI, Codex, and Cursor. These tests validate packaging and references, **not** the live government endpoints.

**Source provenance:** the September 2026 v2.4 PDF is not in this public repository and was not independently authenticated in this audit. Treat its endpoint and field statements as repository transcriptions until the original partner document and environment are confirmed. See [AUDIT.md](AUDIT.md) for every skill's remediation, limitations, and remaining provider-contract blockers.
