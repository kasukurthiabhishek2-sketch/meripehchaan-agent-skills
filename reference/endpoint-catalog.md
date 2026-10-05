# Endpoint Catalog - v2.4

Production host shown by the specification: `https://digilocker.meripehchaan.gov.in`.

> The v2.4 document supplied for this pack lists production endpoints. It does **not** define a sandbox/test base URL. Never manufacture one.

## Authorization / session

| Purpose | Method | Path |
|---|---:|---|
| Authorization page | GET | `/public/oauth2/1/authorize` |
| OIDC access token | POST | `/public/oauth2/2/token` |
| Access token | POST | `/public/oauth2/1/token` |
| Refresh access token | POST | `/public/oauth2/1/token` |
| Revoke token | POST | `/public/oauth2/1/revoke` |
| Revoke browser session | GET | `/signin/logout/Y` |

## Account

| Purpose | Method | Path |
|---|---:|---|
| Get User Details | GET | `/public/oauth2/1/user` |
| Get APAAR Details | GET | `/public/oauth2/1/apaar` |

## File / document APIs

| Purpose | Method | Path as printed in v2.4 |
|---|---:|---|
| List self-uploaded docs/folders | GET | `/public/oauth2/1/files/{id}` (omit id for root per prose) |
| List issued docs | GET | `/public/oauth2/2/files/issued` |
| Download file by URI | GET | `/public/oauth2/1/file/uri` |
| Issued certificate XML by URI | GET | `/public/oauth2/1/xml/uri` |
| e-Aadhaar XML | GET | `/public/oauth2/3/xml/eaadhaar` |
| Upload file | POST | `/public/oauth2/1/file/upload` |
| Pull document | POST | `/public/oauth2/1/pull/pulldocument` |

## Meta / issuer-facing

| Purpose | Method | Path |
|---|---:|---|
| List issuers | POST | `/public/oauth2/1/pull/issuers` |
| List document types for issuer | POST | `/public/oauth2/1/pull/doctype` |
| Get search parameters | POST | `/public/oauth2/1/pull/parameters` |
| Push URI to account | POST | `/public/account/1/pushuri` |
| Statistics | POST | `/public/statistics/1/counts` |
