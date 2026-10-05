# Error Handling Catalog

Do not write one universal `if status >= 400 => "DigiLocker failed"` branch. The API uses meaningful error codes and sometimes status 530.

## Common OAuth/account errors

- `invalid_token` -> 401
- `insufficient_scope` -> 403
- `unexpected_error` -> commonly 500 or 530 depending on endpoint
- token endpoint may return 400 Bad Request / 401 revoked-or-expired behavior in the documented table
- refresh errors: `invalid_client`, `invalid_grant`, `invalid_grant_type`, `unexpected_error`

## APAAR

- `apaar_not_linked` -> 404
- `apaar_not_available` -> 404
- `invalid_token` -> 401
- `insufficient_scope` -> 403
- `unexpected_error` -> 530

## Documents

- uploaded list: `invalid_id` -> 404
- issued list: `partner_service_unresponsive` -> 530
- get file/XML: `uri_missing` -> 400, `invalid_uri` -> 404, repository errors -> 530
- e-Aadhaar: `aadhaar_not_linked` / `aadhaar_not_available` -> 404, repository/internal errors -> 530
- upload: `path_missing`, `contenttype_missing`, `hmac_missing`, `filename_missing`, `hmac_mismatch`, `invalid_filename`, `invalid_filesize`, `invalid_filetype`, `invalid_path`, `file_data_missing`, `mimetype_mismatch` -> documented as 400; `invalid_token` 401; `insufficient_scope` 403; `unexpected_error` 530
- pull: `invalid_orgid`, `invalid_doctype`, `pull_response_pending`, `uri_exists`, `aadhaar_not_linked`, `record_not_found`, `repository_service_configerror`, `unexpected_error`

## UX mapping rule

Map provider errors into three layers:

1. **machine code** retained internally (`apaar_not_linked`);
2. **safe user action** (“Link APAAR in DigiLocker, then try again”);
3. **diagnostic context** with request correlation id, endpoint, status, provider error, never access token or raw PII.
