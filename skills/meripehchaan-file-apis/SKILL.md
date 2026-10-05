---
name: meripehchaan-file-apis
description: Use for DigiLocker self-uploaded and issued-document listing, binary download, XML certificate retrieval, e-Aadhaar XML, upload, file HMAC verification, MIME/size validation, or document storage handling.
---

# DigiLocker File APIs

This skill owns document metadata, bytes, XML and file integrity. Binary bytes are not decorative JSON. Stream them and verify them.

## 1. List self-uploaded documents/folders

**GET** `https://digilocker.meripehchaan.gov.in/public/oauth2/1/files/{id}`

Bearer token. `id` is folder id; the spec says omit it to list root.

Metadata fields: `name`, `type` (`dir`/`file`), folder `id`, `size`, `date`, `parent`, `mime`, `uri`, `description`, `issuer` (blank for uploaded docs/folders).

Errors: `invalid_token` 401, `invalid_id` 404, `insufficient_scope` 403, `unexpected_error` 530.

## 2. List issued documents

**GET** `/public/oauth2/2/files/issued`

Bearer token, no parameters.

Fields: `name`, `type=file`, blank `size`, `date`, blank `parent`, `mime`, `uri`, 5-character `doctype`, `description`, `issuerid`, `issuer`.

`mime` may indicate `application/pdf` or `application/xml` and the sample shows a multi-format document. Model it defensively rather than assuming one fixed scalar shape from the example.

Errors: `invalid_token` 401, `insufficient_scope` 403, `partner_service_unresponsive` 530, `unexpected_error` 530.

## 3. Get file from URI

**GET** path printed as `/public/oauth2/1/file/uri`; prose says `uri` is sent as part of URL.

Response is raw file bytes. Headers include `Content-Type`, `Content-Length`, `hmac`.

The `hmac` is described as HMAC of the exact file content using SHA-256 with `client_secret` as key, then Base64.

**Mandatory engineering behavior:** compute HMAC over the received raw bytes before any transcoding/decompression/transformation and compare safely. Reject mismatches.

Errors: `uri_missing` 400, `invalid_uri` 404, `invalid_token` 401, `insufficient_scope` 403, repository errors 530.

**AMBIGUITY:** v2.4 does not make path-vs-query placement crystal clear because the displayed URL literally ends in `/uri`. Keep URI encoding/placement in one adapter and verify against a known-working provider request.

## 4. Get certificate XML from URI

**GET** path printed as `/public/oauth2/1/xml/uri`.

Issued documents only. XML may not exist for every document; inspect the issued-document MIME information first. Response `Content-Type=application/xml`, `Content-Length`, HMAC computed as above.

## 5. Get e-Aadhaar XML

**GET** `/public/oauth2/3/xml/eaadhaar`.

Bearer token. Response is XML with HMAC header integrity mechanism.

Errors include `aadhaar_not_linked` 404 and `aadhaar_not_available` 404 plus repository/internal 530 variants.

Treat e-Aadhaar data as highly sensitive. Do not log raw XML. Do not store it just because the endpoint exists.

## 6. Upload file

**POST** `/public/oauth2/1/file/upload`

Bearer token. Allowed types documented: JPG/JPEG/PNG/PDF. Max size **10MB**.

Headers/inputs:

- `Content-Type` actual file MIME;
- `path` destination path including filename;
- `hmac`: HMAC-SHA256 of exact file bytes with client secret as key, Base64;
- body: raw file bytes.

Returns `path`, `size`.

Validate before sending: actual size, type sniffing, declared MIME match, filename restrictions, destination path. Documented restricted filename characters include `\ / : * ? < > | ' ^ ~`.

## Cryptographic helper contract

```text
file_hmac = BASE64(HMAC_SHA256(key = client_secret, message = exact_file_bytes))
```

Golden-test this with fixed bytes and a fixed test secret.

## Storage / verification evidence

When using a document to verify a fact, persist its `uri`, `doctype`, issuer id/name, retrieval timestamp, and a content hash. Avoid keeping the full document if a verified derived fact plus provenance is sufficient for your product.
