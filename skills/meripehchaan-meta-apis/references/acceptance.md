# meripehchaan-meta-apis: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Discover issuer and document metadata without guessing ambiguous request-signature encoding.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. Swapping orgid and doctype in signing input fails golden vector.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Fresh timestamp and stale 30-minute-plus timestamp are handled.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Missing confirmation of hash encoding causes fail closed, not guessed SHA representation.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Unknown issuer/doctypes do not cause hard-coded fallbacks.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Invalid responses preserve safe diagnostics without secret material.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- Provider hash encoding and transport unconfirmed for a live integration.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
