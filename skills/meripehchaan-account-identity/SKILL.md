---
name: meripehchaan-account-identity
description: Use when binding a local user to a DigiLocker/Meri Pehchaan account, calling Get User Details, matching profile identity, using mobile/picture/email fields, or designing evidence for verified-profile workflows.
---

# Account Identity and Profile Binding

## Endpoint

**GET** `https://digilocker.meripehchaan.gov.in/public/oauth2/1/user`

Header: `Authorization: Bearer <access token>`.

No request parameters.

The API returns details for the DigiLocker account **linked to that access token**. This is the central account-binding fact. The spec strongly recommends calling this endpoint only once after acquiring the access token because the details do not change, and storing the values instead of repeatedly calling it.

## v2.4 fields

- `digilockerid`: unique 36-character DigiLocker account id.
- `name`.
- `dob`: `DDMMYYYY`.
- `gender`: `M`, `F`, `T`.
- `eaadhaar`: `Y` or `N` availability indicator.
- `reference_key`: transient tracing reference.
- `mobile`: added/documented in v2.4.
- `picture`: added/documented in v2.4; sample resembles base64-encoded image bytes.
- `email`: added/documented in v2.4.

## Binding rule

Never mark a local profile as “DigiLocker verified” merely because a callback returned a code. Bind only after:

1. callback state is validated;
2. token exchange succeeds;
3. Get User Details succeeds;
4. the local record is linked to the returned `digilockerid`;
5. your product-specific matching policy is satisfied.

Store the `digilockerid` as the stable provider account key. `reference_key` is explicitly transient and should not replace it.

## Identity matching for a marketplace / KYC-like workflow

**SPEC:** the endpoint gives name, DOB, gender, mobile, picture, email and e-Aadhaar availability for the account holder.

**ENGINEERING:** define an explicit product policy rather than a fuzzy “seems similar” check. Example evidence dimensions:

- exact or normalized DOB match;
- normalized name similarity with manual-review threshold;
- verified product mobile vs DigiLocker mobile if your product can legitimately compare them;
- user-present photo vs provider picture only if you have a lawful, consented face-match process and appropriate security/privacy controls;
- document-holder fields compared to account-holder fields when the document format exposes them.

Do not claim that a document belongs to the local user simply because it came from some DigiLocker session. Persist which DigiLocker account supplied it and what field-level checks were actually performed.

## Picture handling

Treat `picture` as untrusted encoded input. Decode with size limits, sniff actual image type, reject malformed data, and avoid logging the base64 string. Do not assume the sample's JPEG-like base64 means JPEG is guaranteed unless the official environment contract confirms it.

## Errors

- `invalid_token` -> 401
- `insufficient_scope` -> 403
- `unexpected_error` -> 530

## Never do this

- never use legacy Verify Account API; v2.4 removed it;
- never expose raw account details to another user just because the account is “verified”;
- never use `reference_key` as a durable identity primary key;
- never log `picture`, mobile/email, tokens or whole provider responses in plaintext production logs.
