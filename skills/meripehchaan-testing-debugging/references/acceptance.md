# meripehchaan-testing-debugging: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Prove provider integration behavior with failure injection and real assertions.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. A mock asserting only HTTP 200 without a meaningful response assertion is not accepted.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Network-disabled test reports NOT RUN for live provider calls.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Unknown digest encoding is a blocker not a fabricated vector.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. One-time state cannot pass twice under parallel callback requests.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Missing entitlement/issuer PDF paths exercise UX and safe state changes.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Tests pass only with fake defaults.
- A required live provider flow has not been exercised but is claimed verified.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
