# meripehchaan-pull-documents: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Perform issuer-led document retrieval with dynamic parameters, explicit contextual consent and traceable evidence.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. An issuer-specific required param blocks request when missing.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Consent absent or declined causes zero pull calls.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. pull_response_pending never becomes a verified badge.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. uri_exists triggers reconciliation, not duplicate assumptions.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Self-uploaded document cannot substitute issued evidence.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Consent copy not approved for the specific issuer/doctype.
- Dynamic search params or partner-specific transport unknown.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
