# meripehchaan-oauth-pkce: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Implement a server-bound, replay-resistant OAuth authorization code and optional OIDC lifecycle.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. S256 output matches RFC 7636 reference calculation.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Unregistered redirect URI or missing state never initiates code exchange.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Cross-user callback and replay both fail.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Refresh token rotation is atomic.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. OIDC id_token with invalid signature/audience is rejected.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
6. A denied/expired authorization returns a recoverable UX without leaking code or token.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Provider's OIDC JWKS/issuer/discovery not officially established when id_token must be trusted.
- No transaction storage shared across app instances.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
