# meripehchaan-integration-reviewer: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Deliver an adversarial evidence-backed release review, not a self-awarded score.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. One intentionally replayed OAuth state is rejected in actual test evidence.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Missing HMAC triggers a failing test for evidence use.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. A mocked green test without assertions is flagged.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Pending, not-linked, bad-scope, unexpected 530 and timeout have appropriate observed handling.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. No claim about spec compliance exceeds available source documents.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Any unmitigated critical identity, auth, consent, or credential leak.
- No verification evidence for claims reported as production-ready.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
