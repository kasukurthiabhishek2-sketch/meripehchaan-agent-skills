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

## Install / use

These are portable `SKILL.md` folders. Copy one or more directories from `skills/` into the skills directory used by your agent or IDE. If your agent supports project-local skills, keeping the whole `skills/` directory in the project is usually the least dramatic option.

The **master skill** is `skills/meripehchaan-integration-architect/SKILL.md`. It tells the agent when to pull in the narrower skills.

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
