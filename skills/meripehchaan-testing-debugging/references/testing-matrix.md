# Testing Matrix

## Authorization

Test at minimum:

- fresh authorization success;
- callback with wrong `state` -> hard fail before token request;
- missing local transaction -> hard fail;
- reused callback/code -> hard fail or provider error;
- exact redirect URI behavior;
- PKCE challenge correctness (S256, base64url no padding);
- invalid/expired verifier;
- user denial with `error`, `error_description`, returned `state`;
- `prompt=login_mobile` with and without `login_hint`;
- required `purpose` and `service_name` character validation;
- requested `req_doctype` only from client-approved docs.

## Token lifecycle

- authorization-code exchange;
- refresh rotates both access and refresh token when provider returns both;
- revoked/expired token handling;
- revoke access token and refresh token;
- browser session logout redirect handling;
- scope regression: do not assume requested scope == granted scope.

## Account / identity

- Get User Details called with bearer token;
- account snapshot stores correct `digilockerid` binding;
- missing optional-looking PII is handled safely even though v2.4 documents the fields;
- picture decoding does not trust content type blindly;
- `eaadhaar=Y/N` handled as provider indicator, not proof of a product-specific business rule.

## APAAR

- success with nested university/course/subjects;
- `apaar_not_linked` and `apaar_not_available` are distinct UX states;
- malformed/partial academic arrays do not crash verification logic;
- normalization never changes source evidence.

## Files

- listing root and nested folders;
- issued documents with one MIME vs multiple MIME forms;
- binary download streaming;
- response HMAC verification before accepting bytes;
- XML download only when available;
- upload exact byte HMAC, MIME match and 10MB boundary;
- restricted filename characters;
- 530 repository failures are retriable according to product policy, not treated as user validation failures.

## Pull flow

- issuer -> doctype -> parameter schema -> dynamic form -> explicit consent -> pull;
- dropdown `valuelist` and free-text parameter;
- `record_not_found`, `pull_response_pending`, `uri_exists`, `aadhaar_not_linked`.

## Meta hashes

Create deterministic golden-vector tests for each concatenation order. One swapped field should fail the test. Human beings are undefeated at swapping strings at 2 a.m.
