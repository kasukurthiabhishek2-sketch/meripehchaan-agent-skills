---
name: meripehchaan-testing-debugging
description: Use when testing, debugging, mocking, contract-testing, or production-hardening a Meri Pehchaan/DigiLocker Requester v2.4 integration. Covers positive and negative flows, cryptographic golden vectors, documented errors, status 530, and doc ambiguities.
---

# Testing and Debugging Expert

Read `../../reference/testing-matrix.md` and `../../reference/error-catalog.md` before declaring the integration healthy.

## Test layers

### Unit

- PKCE verifier/challenge generation.
- authorization URL exact parameter encoding.
- callback state validation.
- scope parsing.
- DOB/date normalization without losing original.
- file HMAC-SHA256 Base64 using exact bytes.
- every meta/push concatenation sequence with golden vectors.
- provider error -> domain error mapping.

### Contract / mock server

Create fixtures from the field lists, not the malformed punctuation of PDF samples. Include:

- successful token responses;
- 400/401/403/404/500/**530**;
- `apaar_not_linked` vs `apaar_not_available`;
- issued doc `mime` in single and multi-format shapes;
- binary body + integrity header;
- pull pending/existing/not-found.

### End-to-end against approved environment

Do not invent a test host. Use the environment provided through Partner Portal/onboarding. Exercise actual redirect/callback behavior with test identities supplied/allowed by the program.

## Debug checklist by symptom

### Authorization page rejects request

Check exact redirect URI, client id, required `purpose`, `service_name`, PKCE challenge/method, parameter character restrictions, client-approved `req_doctype`.

### Callback works but token exchange fails

Check original redirect URI equality, one-time code reuse, PKCE verifier from the same transaction, client auth method, form encoding.

### 403 on downstream API

Inspect **granted** token `scope`; do not merely inspect what the app requested.

### File HMAC mismatch

Compare HMAC over raw bytes before decoding/transformation; confirm secret and Base64 encoding; make sure proxies are not decompressing/transcoding body before verification.

### Meta API `invalid_parameter`

Check timestamp freshness, exact field order, raw values and the partner-confirmed digest encoding. Do not swap in file-HMAC logic.

### 530

Treat as provider/repository/internal service condition unless the endpoint documents otherwise. Capture correlation data, apply bounded retry only when operation semantics are safe, and surface a temporary-service UX rather than telling the user their data is invalid.

## Ambiguity protocol

When the PDF is underspecified:

1. do not guess;
2. isolate the behavior behind one adapter/config option;
3. write a test that expresses each plausible interpretation;
4. verify with official Partner Portal guidance or a known successful request;
5. document the proven behavior in a local ADR with date/spec version.

This is how you prevent the next agent from “simplifying” the integration back into a bug.
