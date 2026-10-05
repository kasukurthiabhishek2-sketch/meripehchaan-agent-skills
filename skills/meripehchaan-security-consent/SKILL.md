---
name: meripehchaan-security-consent
description: Use for security, privacy, consent, token storage, secret handling, state/PKCE validation, sensitive DigiLocker/APAAR/e-Aadhaar data retention, audit trails, and threat modeling around the Meri Pehchaan v2.4 integration.
---

# Security and Consent Guardrails

## Secrets and tokens

- Keep `client_secret` only in backend secret storage.
- Never embed it in Next.js public env vars, SPA bundles, mobile apps, client logs, screenshots or error payloads.
- Encrypt refresh tokens at rest when retained.
- Prefer short-lived access-token use and do not persist access tokens longer than required.
- Redact `Authorization` headers in observability tooling.

## State + PKCE

Treat `state` and PKCE verifier as one-time transaction secrets. Bind them to the local login/user/session, set a short expiry, and consume atomically on callback. A correct provider redirect with an incorrect local `state` is still a failed transaction.

## Redirect URI

The spec requires exact match with Partner Portal registration. Centralize it in config. Do not dynamically construct it from untrusted Host/X-Forwarded-Host headers.

## Consent

Authorization `purpose` and `service_name` are displayed for transparency. Use truthful, specific values. Pull Document separately requires explicit Aadhaar-sharing consent with issuer/certificate context.

Persist a consent receipt:

- local user id;
- DigiLocker account id if available;
- purpose/service name;
- scopes/docs requested and actually granted;
- consent validity timestamp if returned;
- pull-document issuer + certificate + exact consent template version;
- timestamp and product policy version.

## Data minimization

Possible data includes name, DOB, gender, mobile, email, picture, APAAR academic records, Aadhaar-derived XML and certificates. “The API returned it” is not a retention policy.

Store only what the product genuinely needs. For a verified badge, consider storing normalized verified facts + issuer/doctype/URI/content hash + timestamp rather than entire certificates indefinitely.

## Sensitive-output policy

Never place raw user details, e-Aadhaar XML, certificates, access/refresh tokens, client secret, PKCE verifier, or complete callback URLs containing auth codes in logs.

## File integrity

For binary file/XML responses, v2.4 provides an HMAC header calculated from response bytes with SHA-256 and client secret as key, Base64-encoded. Verify before accepting evidence.

For upload, calculate the same HMAC over exact request bytes.

Do not reuse the meta-API signing helper for file HMAC. They are specified differently.

## Threats to test

- login CSRF / state swap;
- stolen callback URL replay;
- PKCE verifier mismatch;
- token leakage through frontend logs;
- scope escalation assumptions;
- account-link swapping between local users;
- forged uploaded file with unverified HMAC;
- document URI substitution;
- stale meta API timestamps;
- wrong concatenation order;
- overbroad data retention;
- exposing another person's verified PII after booking/payment without a separate lawful product policy.
