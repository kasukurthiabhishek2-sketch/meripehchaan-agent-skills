# meripehchaan-security-consent: acceptance and failure-injection guide

This file travels **inside this skill** when installed with `npx skills add`. It is not a live provider contract and does not contain credentials.

## Goal

Threat-model and enforce data lifecycle for government identity and academic evidence.

## Required evidence from the coding agent

- Starting implementation inventory (existing endpoints, auth boundaries, storage, tests).
- Exact spec/partner source for contractual claims, or explicit NEEDS_PARTNER_CONFIRMATION.
- Minimal code diff with rollback details.
- Test execution output, including failure injection, not only prose.
- Redacted logs only; no Aadhaar, bearer token, refresh token, raw person details, or real document content.

## Negative-case scenarios

1. Secret values never appear in frontend bundles, redirects or observability payloads.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
2. Cross-tenant document URI request is denied.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
3. Consent revoked/expired prevents unauthorized further fetches.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
4. Deletion or retention lifecycle removes raw sensitive content as designed.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.
5. Compromised state/PKCE or forged document bytes fail.
   Expected: explicit assertion on side effects, records, and user-safe outcome; capture the evidence in a named test.

## Release policy

If either condition below is observed, stop and report BLOCKED:
- No justified retention policy for full Aadhaar or academic records.
- Cross-user leaks, credential exposure or missing evidence integrity.

Mock tests verify **your application logic**, not availability, approved client scopes, provider cryptographic encoding, or the correctness of an unbundled PDF. Never fabricate production-readiness evidence.
