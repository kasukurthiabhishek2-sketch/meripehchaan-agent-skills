---
name: meripehchaan-pull-documents
description: Use when implementing the end-to-end DigiLocker Pull Document flow: discover issuers, discover doctypes, fetch dynamic search parameters, collect required Aadhaar-sharing consent, call Pull Document, and handle pending/not-found/existing-document states.
---

# Pull Document Expert

Pull Document is a pipeline, not a single hard-coded form.

## Correct discovery flow

1. Call **Get List of Issuers**.
2. Let the user/product select the issuer and keep its `orgid`, `issuerid`, name.
3. Call **Get List of Documents Provided by an Issuer** using that `orgid`.
4. Select the 5-character `doctype`.
5. Call **Get Search Parameters for a Document**.
6. Render inputs dynamically from returned `label`, `paramname`, `valuelist`, `example`.
7. Capture explicit consent.
8. Submit **Pull Document** with `orgid`, `doctype`, `consent=Y`, and exactly the dynamic parameters named by `paramname`.
9. On success, persist returned `uri` as the issued-document reference.

## Pull endpoint

**POST** `https://digilocker.meripehchaan.gov.in/public/oauth2/1/pull/pulldocument`

Headers: bearer token + `Content-Type: application/x-www-form-urlencoded`.

Required core parameters:

- `orgid`
- `doctype`
- `consent` (`Y`/`N`; request processed only when `Y`)
- dynamic search parameters from Get Search Parameters.

## Consent

The v2.4 spec requires the partner app to display consent that communicates that Aadhaar Number, Date of Birth and Name from Aadhaar eKYC information will be shared with the selected issuer to fetch the selected certificate into DigiLocker.

Use the actual issuer name returned by Get List of Issuers and certificate description returned by Get List of Documents. Do not replace this with vague “I agree to terms.” Persist consent timestamp, text/version, issuer, certificate type and local user.

## Success

HTTP 200; the matching certificate is saved into Issued Documents and response contains its `uri`.

## Important errors

- `invalid_orgid` 400
- `invalid_doctype` 400
- `repository_service_configerror` 500
- `pull_response_pending` 400: supplied details did not exactly match; request forwarded to issuer for verification; do not show as a generic failure
- `uri_exists` 400: document already in Issued Documents; treat as an idempotent-ish state and consider listing issued docs
- `record_not_found` 404
- `aadhaar_not_linked` 400
- `invalid_token` 401
- `insufficient_scope` 403
- `unexpected_error` 500

## Dynamic form rule

Never build a universal “roll number + year” form. The search parameter endpoint is specifically there because requirements differ by issuer/document.

- `label` -> UI label
- `paramname` -> actual submitted field name
- `valuelist` -> comma-separated selectable values or null
- `example` -> example input

Validate user input without renaming provider parameter names.

## Verification use

A successful pull produces an issued-document URI. For high-confidence verification, fetch/list the issued document and store issuer/doctype/URI provenance. Do not confuse “user typed search parameters” with “issuer document verified.” The returned issued-document artifact is the stronger evidence.
