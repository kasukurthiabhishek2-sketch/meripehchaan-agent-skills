---
name: meripehchaan-meta-apis
description: Use when calling Meri Pehchaan/DigiLocker requester meta APIs for issuer discovery, document types, search parameter schemas, statistics, or when implementing the spec-defined SHA-256 concatenation authentication value named hmac.
---

# Meta APIs and Spec-Defined Request Hashes

These endpoints are different from bearer-token user APIs. They use `clientid`, a fresh timestamp and a value named `hmac` constructed according to the exact per-endpoint sequence.

## Shared timestamp rule

The spec says `ts` is UNIX/POSIX seconds in IST and must not be older than **30 minutes**. Generate timestamps at request time. Do not cache signed metadata requests for long periods.

## Critical crypto distinction

For these meta endpoints, the spec wording is: provide a **SHA-256 encrypted value** of concatenated fields in a specific sequence. It names the resulting parameter `hmac`, but does not describe the same keyed HMAC(file-bytes, secret) algorithm used by file upload/download.

Implement a separate helper, e.g. `specConcatenationSha256(parts)`, and do not silently substitute HMAC-SHA256 because the parameter happens to be called `hmac`.

**AMBIGUITY:** the v2.4 PDF does not explicitly state string encoding, hex-vs-base64 output, separators, or normalization in this prose. Reproduce a known-good partner example or official guidance and lock it with golden tests. Do not invent an encoding.

## Get List of Issuers

**POST** `/public/oauth2/1/pull/issuers`

Inputs: `clientid`, `ts`, `hmac` over concatenation sequence:

```text
client_secret, clientid, ts
```

Returns `issuers[]`: `orgid`, `issuerid`, `name`, `category`, `description`.

## Get List of Documents Provided by an Issuer

**POST** `/public/oauth2/1/pull/doctype`

Inputs: `clientid`, `orgid`, `ts`, `hmac` sequence:

```text
client_secret, clientid, orgid, ts
```

Returns `documents[]`: `doctype` (5 chars), `description`.

The prose says `orgid` is sent “as part of the url” while the displayed URL has no placeholder. Treat transport placement as a provider-contract detail requiring confirmation, not an excuse to guess.

## Get Search Parameters for a Document

**POST** `/public/oauth2/1/pull/parameters`

Inputs: `clientid`, `orgid`, `doctype`, `ts`, `hmac` sequence:

```text
client_secret, clientid, orgid, doctype, ts
```

Returns dynamic `parameters[]`: `label`, `paramname`, `valuelist`, `example`.

## Get Statistics

**POST** `/public/statistics/1/counts`

Inputs: `clientid`, `ts`, `hmac` sequence:

```text
client_secret, clientid, ts
```

Returns counts plus monthwise registrations and yearwise authentic document counts.

## Error model

Common:

- `invalid_client_id` -> 401
- `invalid_parameter` -> 400 with description telling which timestamp/HMAC/orgid/doctype is missing or invalid
- `unexpected_error` -> 500

## Implementation rule

Create one function per exact signing sequence, or a strongly typed builder. Do not pass arbitrary arrays from call sites. A typed API makes it harder to sign `(clientid, doctype, orgid, ts)` when the provider expects `(clientid, orgid, doctype, ts)`.
