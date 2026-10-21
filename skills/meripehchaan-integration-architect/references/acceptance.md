# meripehchaan-integration-architect: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Plan and implement only needed API capabilities, with source-based decisions and auditable evidence.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. OAuth callback replay and state swap fail closed.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Token scope narrowing is observed, not ignored.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. No issuer Push URI operation is reachable from requester-only roles.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Critical blockers remain named and unresolved, never relabeled as done.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Every implemented requirement has linked code, test and evidence.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Original v2.4 PDF or partner environment unavailable for disputed contractual behavior.
- Unknown provider cryptographic encoding required for a production request.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
