# TypeScript / Node.js Recipes

These snippets are **engineering examples**, not text copied from the v2.4 PDF. Keep provider-specific transport details behind a client class so ambiguities can be fixed without rewriting business logic.

## PKCE

```ts
import { createHash, randomBytes } from "node:crypto";

export function base64UrlNoPadding(input: Buffer): string {
  return input
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function createPkce(): { verifier: string; challenge: string } {
  // 64 random bytes -> high entropy. base64url stays inside the allowed alphabet.
  const verifier = base64UrlNoPadding(randomBytes(64)).slice(0, 128);
  const challenge = base64UrlNoPadding(
    createHash("sha256").update(verifier, "ascii").digest(),
  );
  return { verifier, challenge };
}
```

Test that verifier length is 43-128 and challenge has no `=` padding.

## File HMAC

```ts
import { createHmac, timingSafeEqual } from "node:crypto";

export function fileHmacBase64(bytes: Buffer, clientSecret: string): string {
  return createHmac("sha256", clientSecret).update(bytes).digest("base64");
}

export function verifyProviderFileHmac(
  bytes: Buffer,
  clientSecret: string,
  providerHmacBase64: string,
): boolean {
  const expected = Buffer.from(fileHmacBase64(bytes, clientSecret), "base64");
  const actual = Buffer.from(providerHmacBase64, "base64");
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}
```

Do the verification over the exact bytes received/sent.

## Spec-concatenation SHA-256 helper

The meta/Push URI family is described differently from file HMAC. Keep a separate helper. **Do not choose the digest output encoding until it is confirmed by your Partner Portal/known-good request.**

```ts
import { createHash } from "node:crypto";

export function sha256RawConcatenation(parts: readonly string[]): Buffer {
  return createHash("sha256").update(parts.join(""), "utf8").digest();
}
```

Then provide a configurable encoder (`hex`, `base64`, or whatever the official environment proves). Do not hide that choice inside business logic.

## Authorization transaction model

```ts
export interface MeriPehchaanAuthTransaction {
  id: string;
  localUserId: string;
  stateHash: string;
  pkceVerifierCiphertext: string;
  redirectUri: string;
  purpose: string;
  serviceName: string;
  requestedScope?: string;
  requestedDocTypes?: string[];
  createdAt: Date;
  expiresAt: Date;
  consumedAt?: Date;
}
```

Store `state` hashed when practical; store verifier encrypted because you need the original at token exchange.

## Provider DTOs

```ts
export interface DigiLockerUserDetails {
  digilockerid: string;
  name: string;
  dob: string; // DDMMYYYY from provider
  gender: "M" | "F" | "T" | string;
  eaadhaar: "Y" | "N" | string;
  reference_key: string;
  mobile?: string;
  picture?: string;
  email?: string;
}

export interface ApaarSubject {
  name: string;
  credit_points: number | string;
  credit: number | string;
  grade_points: number | string;
  grade: string;
  stream: string;
  session: string;
  year: string;
  month: string;
  sem: string;
}
```

Be tolerant at the provider boundary, then normalize into stricter domain types after validation. Samples in the PDF are illustrative and occasionally malformed.

## Fetch wrapper rules

A production HTTP wrapper should:

- set an explicit timeout;
- return raw bytes for file/XML endpoints until HMAC verification completes;
- cap response size;
- redact authorization/client secret fields from errors;
- preserve provider `status`, `error`, `error_description`;
- treat 530 as a real provider status;
- attach an internal correlation id;
- never automatically retry token exchange, uploads, pull operations, or Push URI writes without idempotency reasoning.
