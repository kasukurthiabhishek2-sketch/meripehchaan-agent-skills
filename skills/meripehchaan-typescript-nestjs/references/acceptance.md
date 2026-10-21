# meripehchaan-typescript-nestjs: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Implement a clean NestJS/Next.js provider adapter with atomic state and strict secret/PII boundaries.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. Expired or consumed state update affects zero rows and does not call token endpoint.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. No controller serializes access/refresh token, client_secret or PKCE verifier.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Raw bytes produce correct HMAC independent of encoding.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Two concurrent callbacks cannot establish duplicate/conflicting accounts.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Unexpected 530 is typed as a provider service failure and handled safely.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Application currently lacks a transactional store for callback state.
- Transport or signature ambiguities not confirmed with partner.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
