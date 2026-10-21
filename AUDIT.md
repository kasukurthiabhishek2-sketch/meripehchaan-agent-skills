# Meri Pehchaan agent skills: evidence-based audit

Date: 22 October 2026. Baseline main commit: `d45d255e23e3b0c77ea0702f5ee953478c4cee33`.

## Standards and research

- Agent Skills specification: https://agentskills.io/specification
- Installer source and options: https://github.com/vercel-labs/skills/blob/main/docs/commands.md
- Supported agents (includes Antigravity CLI): https://github.com/vercel-labs/skills/blob/main/docs/agents.md
- Official API Setu DigiLocker collection: https://directory.apisetu.gov.in/api-collection/digilocker
- Government DigiLocker architecture: https://www.digilocker.gov.in/web/architecture

**Evidence limitation:** the original `Requester - Meri Pehchaan API Specification v2.4 (Sep 2026)` is not bundled here and was not independently available for direct comparison. The provider-specific behavior in existing skills comes from repository transcriptions. Older public documentation is not proof that v2.4 claims are current or correct. The repository cannot honestly be rated 10/10 production-ready without original contracts and live partner tests.

## Baseline findings

1. Twelve named SKILL.md files with plausible required YAML metadata.
2. Four skills had root-level or sibling dependencies incompatible with independent installation.
3. Existing GitHub Actions only echoed placeholder text: zero functional validation.
4. Manual-copy install instructions instead of the documented npx skills CLI.
5. Inconsistent skill-by-skill acceptance criteria and results reporting.

## Corrections and per-skill review

| Skill | Verified gap or risk | Implemented remediation |
| --- | --- | --- |
| `meripehchaan-account-identity` | No explicit mismatch/replay acceptance tests | Atomic binding and documented match/reconnect policy |
| `meripehchaan-apaar-education` | APAAR field availability could be mistaken for full qualification verification | Account matching, provenance and missing-roll-number policy gate |
| `meripehchaan-file-apis` | URI placement and raw file-integrity assumptions | Bounded raw-byte HMAC, MIME/XML and 530 negative checks |
| `meripehchaan-integration-architect` | Broken root and ten sibling skill paths after separate installation | Bundled v2.4 delta, optional companion skill names and traceability |
| `meripehchaan-integration-reviewer` | Broken root endpoint catalog dependency | Bundled catalog, release blockers, evidence-backed findings |
| `meripehchaan-meta-apis` | Digest encoding not supplied by repository source | Typed signing sequence and partner-confirmed vector gate |
| `meripehchaan-oauth-pkce` | No comprehensive execution acceptance contract | Session-state replay, OIDC signature and rotation tests |
| `meripehchaan-pull-documents` | Dynamic form, explicit consent and pending states need asserted behavior | Verified dynamic params, consent stop and pending/existing semantics |
| `meripehchaan-push-uri` | Issuer-only authorization and digest optional-value risk | Role gate, write lifecycle and unresolved digest stop |
| `meripehchaan-security-consent` | Privacy guardrails lacked concrete acceptance criteria | Retention, cross-tenant and secret exposure tests |
| `meripehchaan-testing-debugging` | Root testing matrix and error catalog references missing after install | Bundled source files, no fake-green provider tests |
| `meripehchaan-typescript-nestjs` | Root TypeScript recipes and sibling architect dependency | Bundled recipes and atomic callback/serialization tests |

All 12 now retain original descriptions, add operational procedures and negative-path acceptance checks, bundle a `references/acceptance.md`, and distinguish implemented, tested, and unverified behavior.

## What validation can and cannot prove

- **Static (local):** metadata, matching folder names, missing references, standalone structure, manifest consistency.
- **Isolation (local):** copy each skill directory alone and verify the packaged supporting files exist; inject deliberately broken metadata/links to confirm the validator fails closed.
- **Installer (CI):** attempt published CLI installation for `antigravity-cli`, `codex` and `cursor`; only claim pass once workflow results are seen.
- **Provider contract (NOT RUN):** validate against a genuine v2.4 PDF and approved environment, with permitted scopes and documented test identities.
- **Production verification (NOT RUN):** actual OAuth, issuer document API, APAAR, consent, idempotency, database and privacy tests in the consuming application.

Outstanding provider blockers: ambiguous URI path/query placement, SHA output encoding and Push URI optional digest fields, version-specific scoped entitlements, and verified OIDC issuer/JWKS metadata. Keep such details as `NEEDS_PARTNER_CONFIRMATION`, not hard-coded guesses.
