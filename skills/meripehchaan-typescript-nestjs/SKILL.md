---
name: meripehchaan-typescript-nestjs
description: Use when implementing Meri Pehchaan / DigiLocker Requester API v2.4 in TypeScript, Node.js, NestJS, or a Next.js-plus-backend architecture. Provides module boundaries, DTO patterns, callback/controller rules, crypto helpers, persistence and test strategy.
---

# TypeScript / NestJS Implementation Specialist

This is an **engineering implementation skill** layered on top of the v2.4 source-grounded skills.

Read `../meripehchaan-integration-architect/SKILL.md`, the specialist skill for the API area, and `../../reference/typescript-recipes.md`.

## NestJS module shape

```text
MeriPehchaanModule
  MeriPehchaanController
    GET  /connect/start
    GET  /connect/callback
    POST /connect/disconnect
  MeriPehchaanAuthService
  MeriPehchaanAccountService
  MeriPehchaanDocumentsService
  MeriPehchaanMetaService
  MeriPehchaanHttpClient
  MeriPehchaanCryptoService
  MeriPehchaanEvidenceService
```

Keep the OAuth callback controller thin. It should parse provider query data, hand it to a transactional auth service, and redirect to an application result page. It should not write 150 lines of token/account/document logic in the controller, as is traditional when humans decide future maintenance is somebody else's hobby.

## Browser / Next.js boundary

The browser may initiate connection and receive a product-safe status. The browser must not receive:

- client secret;
- refresh token;
- PKCE verifier;
- raw e-Aadhaar XML;
- complete provider callback URL with code after processing;
- provider account payload unless the product explicitly needs to display a safe subset.

## Config

Validate at startup:

```text
MERIPEHCHAAN_CLIENT_ID
MERIPEHCHAAN_CLIENT_SECRET
MERIPEHCHAAN_REDIRECT_URI
MERIPEHCHAAN_BASE_URL=https://digilocker.meripehchaan.gov.in
```

Do not prefix the secret with `NEXT_PUBLIC_` or equivalent.

## Persistence

Use a database-backed auth transaction if the app has multiple instances. In-memory `state -> verifier` maps break as soon as a load balancer sends the callback to another process.

Atomically consume state. A transaction can update `consumed_at` only when it is null and unexpired.

## HTTP client

Have two response paths:

- JSON form/API path;
- raw `Buffer` path for files/XML with access to response headers before parsing.

Disable accidental body string conversion for HMAC-protected bytes.

## Validation

Use tolerant provider DTOs at the edge, then validate/normalize. Do not trust sample JSON punctuation from the PDF. Preserve the raw provider code/status in typed errors.

## Tests

- unit tests for PKCE and both crypto families;
- controller callback state mismatch test;
- service token refresh rotation test;
- raw-buffer HMAC test;
- integration test ensuring no secret fields are serialized by controllers;
- 530 mapping test;
- database concurrency test for one-time state consumption.
