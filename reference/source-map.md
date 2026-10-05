# Source Map - Requester Meri Pehchaan API Specification v2.4

Source: **Requester - Meri Pehchaan API Specification, Version 2.4, Sep 2026**, National e-Governance Division, Ministry of Electronics and Information Technology.

The original PDF is not included in this repository.

| PDF page | Specification section |
|---:|---|
| 1-3 | Cover, revision history, v2.4 changes |
| 4 | Table of contents |
| 5-8 | Introduction + Get Authorization Code |
| 8-10 | Get Access Token (OpenID Connect) |
| 10-12 | Get Access Token |
| 12-14 | Refresh Access Token |
| 14 | Revoke Token |
| 15 | Revoke Session + Get User Details begins |
| 16-17 | Get User Details + errors |
| 17-20 | Get APAAR Details + errors |
| 20-22 | Self-uploaded document listing |
| 22-24 | Issued document listing |
| 24-26 | Get File from URI |
| 26-27 | Get Certificate XML from URI |
| 27-28 | Get e-Aadhaar XML |
| 28-30 | Upload File |
| 30-32 | Pull Document |
| 32-34 | Get List of Issuers |
| 34-36 | Get List of Documents by Issuer |
| 36-38 | Get Search Parameters |
| 38-40 | Push URI to Account |
| 40-42 | Get Statistics |

## v2.4 revision notes

The v2.4 revision entry states that it:

- adds `mobile`, `picture`, `email` to Get User Detail API response;
- adds `mobile`, `purpose` to Get Access Token response;
- removes Verify Account API;
- adds Get APAAR Details API;
- adds `service_name`, `prompt`, `login_hint` to Get Authorization Code;
- updates accepted values for `purpose`;
- supports `apaar`, `apaar_only`, `apaar_others` in `amr`.

## Documentation quirks agents must remember

1. Some sample JSON is missing commas. Do not model JSON validity from samples alone.
2. Several errors use HTTP **530** for internal/repository failures. Preserve that possibility in clients.
3. Several URL/parameter descriptions say a value is “sent as part of the URL” while the displayed URL does not show a placeholder. Do not guess path-vs-query transport without confirming against the partner environment.
4. The meta APIs name a field `hmac` but describe a SHA-256 value of exact concatenated inputs. This is not the same wording used for file-content HMAC-SHA256. Keep these mechanisms separate.
5. `consent_valid_till` is described as a UNIX/POSIX timestamp using IST. Unix timestamps are absolute instants, so avoid timezone “conversion magic”; generate an instant deliberately and test what the service accepts.
