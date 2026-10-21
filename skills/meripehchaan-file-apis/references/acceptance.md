# meripehchaan-file-apis: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Safely retrieve, validate and store listed document metadata or integrity-protected raw bytes.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. Changed file bytes or HMAC reject document evidence.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Missing HMAC on endpoint requiring integrity fails closed.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Uploaded files never produce issuer-verified status.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. File at 10 MB allowed and greater than 10 MB refused for upload.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. 530 is handled separately from an invalid user URI.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
6. URI parameters are encoded safely and never interpreted as arbitrary outbound URLs.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Unresolved URI path-vs-query behavior with no partner-confirmed example.
- HMAC or byte integrity cannot be checked for a required evidence operation.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
