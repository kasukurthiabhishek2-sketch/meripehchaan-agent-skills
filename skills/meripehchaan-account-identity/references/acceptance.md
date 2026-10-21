# meripehchaan-account-identity: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Bind a local user to the correct DigiLocker account, without turning connection into identity proof.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. State from a different local session cannot bind a profile.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Repeated callback is rejected and creates no duplicate identity link.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Mismatched names or DOB never become verified by default.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Missing picture/mobile/email cannot crash the flow or cause assumed identity verification.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Reconnecting a different DigiLocker account requires explicit authorization and audit.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- No trusted link between callback and initiating local session.
- No documented policy governing matching, conflicts, and retention.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
