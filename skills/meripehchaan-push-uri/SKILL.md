---
name: meripehchaan-push-uri
description: Use for DigiLocker issuer-side Push URI to Account integration, including A/U/D actions, certificate metadata, optional PDF/XML content, DigiLocker account targeting, timestamping, request hash input ordering, and issuer prerequisites.
---

# Push URI to Account

This is an **issuer-side** capability. Do not use it as a requester shortcut to stuff arbitrary “verified” records into a user's DigiLocker.

## Prerequisite

The specification says issuing departments must be registered as DigiLocker Issuers and implement the required Issuer APIs before pushing certificates.

## Endpoint

**POST** `https://digilocker.meripehchaan.gov.in/public/account/1/pushuri`

## Parameters

- `clientid`
- `digilockerid` obtained via Get User Details
- `uri`
- `doctype` (5 characters)
- `description`
- `docid` unique within the document type issued by the issuer
- `issuedate` in `DDMMYYYY`
- optional `validfrom` in `DDMMYYYY`
- optional `validto` in `DDMMYYYY`
- `action`: `A` add, `U` update, `D` delete
- `ts`: UNIX/POSIX seconds, described using IST, not older than 30 minutes
- optional `doccontent`: base64 PDF certificate
- optional `datacontent`: base64 XML metadata certificate
- `hmac`: spec-defined SHA-256 value over the documented concatenation

Documented concatenation order:

```text
client_secret,
clientid,
digilockerid,
uri,
doctype,
description,
docid,
issuedate,
validfrom,
validto,
action,
ts,
doccontent,
datacontent
```

The wording lists the optional content fields in the sequence even when they may be absent. **AMBIGUITY:** how absent optional values participate in the raw concatenation is not fully specified in v2.4. Do not improvise. Confirm with a known-good request and freeze the rule in tests.

## Success

HTTP 200, no specific response value documented.

## Errors

- `invalid_client_id` 401
- `insufficient_scope` 403
- `invalid_digilocker_id` 404
- `invalid_parameter` 400, covering URI/doctype/description/docid/issuedate/timestamp/HMAC and URI-already-exists conditions
- `unexpected_error` 500

## Safety

Never let arbitrary end-user input choose `action`, `doctype`, or destination account directly without authorization/business-rule checks. Issuer push is a privileged write operation and should have audit logs with document id, target DigiLocker id (prefer redacted in general logs), action, actor/service and response status.
