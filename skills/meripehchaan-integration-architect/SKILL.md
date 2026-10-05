---
name: meripehchaan-integration-architect
description: Use for any end-to-end Meri Pehchaan / DigiLocker Requester API v2.4 implementation, migration, architecture, integration planning, or multi-endpoint task. Routes work to the specialist skills and prevents legacy/vague implementations.
---

# Meri Pehchaan Integration Architect

Act as the senior integration owner for **Requester - Meri Pehchaan API Specification v2.4 (Sep 2026)**. Your job is to make an implementation behave like it was written by a team that has already discovered every sharp edge once.

## Mandatory first pass

Before editing code:

1. Identify the app type: server-rendered web, SPA + backend, mobile, native, or issuer system.
2. Locate current OAuth callback, token storage, user/account model, HTTP client, secret management, audit logging, and tests.
3. Read `../../reference/version-2.4-delta.md` and remove/flag v2.3 assumptions.
4. Determine which capability is actually needed: login/consent, user identity, APAAR, issued documents, file bytes/XML, pull document, upload, issuer push.
5. Load the corresponding specialist skills. Do not dump every API into one god-service merely because the PDF has a table of contents.

## Specialist routing

- Authorization/tokens -> `../meripehchaan-oauth-pkce/SKILL.md`
- Account identity -> `../meripehchaan-account-identity/SKILL.md`
- APAAR/education -> `../meripehchaan-apaar-education/SKILL.md`
- File APIs -> `../meripehchaan-file-apis/SKILL.md`
- Pulling certificates -> `../meripehchaan-pull-documents/SKILL.md`
- Issuer/doc metadata -> `../meripehchaan-meta-apis/SKILL.md`
- Issuer-side push -> `../meripehchaan-push-uri/SKILL.md`
- Security/privacy -> `../meripehchaan-security-consent/SKILL.md`
- Testing/debugging -> `../meripehchaan-testing-debugging/SKILL.md`
- Audit/review -> `../meripehchaan-integration-reviewer/SKILL.md`

## Source-of-truth rules

### SPEC

- Authorization is OAuth 2.0 Authorization Code flow.
- PKCE is documented, with `code_challenge` required on authorization and S256 as the only supported challenge method in v2.4.
- The registered `redirect_uri` must match exactly.
- `purpose` and `service_name` are required on the authorization request.
- Account details and APAAR are bearer-token APIs.
- File APIs use access-token scopes and some binary endpoints carry an integrity HMAC.
- Pull Document requires explicit consent and dynamically discovered issuer search parameters.

### DO NOT INVENT

The supplied v2.4 PDF does not give you permission to invent:

- a sandbox host;
- undocumented scopes;
- a doctype for a particular education board/university;
- a JWK/discovery URL not present in the document;
- a request-hash encoding rule that the document never states;
- exact path/query placement where the printed URL and prose disagree.

When implementation requires an underspecified point, isolate it behind configuration/adapter code and produce a targeted contract test plus a short “needs partner confirmation” note.

## Recommended architecture

Use separate services for auth, account, documents, metadata and issuer operations. Keep provider DTOs separate from domain entities. Store a durable local `digilockerid` link only after a successful, state-validated callback and Get User Details call.

Authorization transaction state should include the local user/session identity, random `state`, PKCE verifier, requested scope/docs, purpose, service name, redirect URI, creation time and expiry. Consume it once.

## Implementation sequence for a requester

1. Create authorization transaction and PKCE pair.
2. Redirect to `/public/oauth2/1/authorize` with v2.4 parameters.
3. Validate callback `state` before doing anything with `code`.
4. Exchange code server-side.
5. Read granted `scope` from the response. Never assume requested == granted.
6. Call Get User Details once and bind the returned `digilockerid` to the local account.
7. Call only the feature APIs needed by the product, after checking granted scope/consent.
8. Persist verification evidence, not gratuitous raw PII.
9. Refresh or reauthorize based on token/consent lifecycle.
10. Revoke tokens and optionally browser session on disconnect/logout according to product semantics.

## Definition of done

An integration is not done because “OAuth redirects back.” It is done when:

- state/PKCE are correct and tested;
- secret/tokens stay server-side;
- v2.4 fields are modeled;
- every provider error has a safe mapping;
- HMAC/hash inputs have golden-vector tests;
- logs are redacted;
- user consent is auditable;
- identity/education evidence has provenance;
- negative-path tests exist;
- legacy Verify Account calls are gone.
