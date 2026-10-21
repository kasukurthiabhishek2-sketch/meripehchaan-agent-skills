# meripehchaan-push-uri: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Protect privileged issuer writes and maintain document lifecycle integrity.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. Requester-only session cannot invoke Push URI.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Missing optional digest fields are not guessed in production mode.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Repeated A/U/D operations follow document lifecycle policy.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Stale timestamp and tampered request signature are rejected.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Audit entry never includes raw target PII or PDF/XML.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Issuer access or digest optional handling unconfirmed.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
