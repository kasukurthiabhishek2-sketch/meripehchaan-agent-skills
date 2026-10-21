# meripehchaan-apaar-education: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Use APAAR as evidence of specific academic records, not universal proof of qualifications.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. apaar_not_linked and apaar_not_available produce distinct, actionable outcomes.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Missing course, institution, and subject fields do not create phantom degrees.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Account name/DOB mismatch results in rejection or manual review.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Roll number mandated by app policy but absent from evidence blocks automatic verification.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. No PDF is fabricated from structured academic data.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Partner-specific permission to query APAAR is not confirmed.
- Evidence lacks a field the product requires to verify a qualification.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
