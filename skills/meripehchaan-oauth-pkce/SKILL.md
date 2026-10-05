---
name: meripehchaan-oauth-pkce
description: Use when implementing or debugging Meri Pehchaan OAuth 2.0 authorization, PKCE, OpenID Connect token exchange, regular token exchange, refresh, token revocation, session logout, scopes, AMR, prompt, or callback handling.
---

# OAuth, PKCE and Token Lifecycle Expert

## Authorization endpoint

**GET** `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize`

### Required parameters in v2.4

| Parameter | Requirement |
|---|---|
| `response_type` | `code` |
| `client_id` | Partner app/client id |
| `redirect_uri` | Must exactly match the URI registered in Partner Portal |
| `state` | Application-specific state returned on callback |
| `code_challenge` | Base64URL-without-padding SHA-256 of per-request verifier |
| `code_challenge_method` | `S256` only |
| `purpose` | Human-readable; letters, numbers, spaces, underscores |
| `service_name` | Human-readable; letters, numbers, spaces, underscores |

### Optional parameters

- `dl_flow=signup` -> direct signup flow, then authorization.
- `verified_mobile` -> only meaningful with `dl_flow=signup`; provider treats it as a mobile already verified by the trusted client and may skip OTP. This is a high-trust capability. Never pass an unverified product profile number.
- `scope=openid` -> requests `id_token` from OIDC token endpoint.
- `acr` -> one of `pan`, `aadhaar`, `driving_licence`; successful verification can appear in `id_token`.
- `req_doctype` -> comma-separated client-approved document types such as `PANCR,DRVLC`; limits docs shown on consent screen.
- `amr` -> space-separated auth methods. v2.4 documents: signup-only `driving_licence aadhaar pan`; sign-in/sign-up `ndlemail mobile`; sign-in-only `apaar apaar_only apaar_others username`.
- `pla=Y` -> pinless authentication.
- `plsignup=Y` -> pinless signup only.
- `ulsignup=Y` -> username-less signup only.
- `consent_valid_till` -> UNIX/POSIX timestamp as described by the spec using IST.
- `prompt=login|login_mobile`.
- `login_hint` -> mobile number and only use when `prompt=login_mobile`.

## PKCE algorithm

Generate a fresh high-entropy verifier for every authorization transaction. The spec permits unreserved characters and length 43-128.

```text
code_challenge = BASE64URL_NO_PADDING(SHA256(code_verifier))
```

**ENGINEERING:** Store the verifier server-side with the authorization transaction, not in an unsigned browser cookie or URL. Delete/consume it after callback.

## Callback

Success returns query parameters `code` and `state`. Denial/other OAuth failures may return `error`, `error_description`, and `state`.

Before exchanging a code:

1. load the local transaction by protected state/session binding;
2. compare `state` using a constant-time-safe strategy where practical;
3. confirm transaction is unexpired and unconsumed;
4. confirm callback belongs to the same local user/session;
5. mark transaction consumed atomically;
6. then exchange code with original redirect URI and PKCE verifier.

## OIDC access token

**POST** `/public/oauth2/2/token`, `Content-Type: application/x-www-form-urlencoded`.

Parameters: `code`, `grant_type=authorization_code`, client credentials (form or HTTP Basic per spec), `redirect_uri`, and `code_verifier` when challenge was used; verifier is mandatory for mobile clients.

Returns: `access_token`, `expires_in`, `token_type=Bearer`, `scope`, `id_token` (JWT), `consent_valid_till`.

**ENGINEERING:** Verify JWT signature and claims using official OIDC metadata/keys supplied for the integration. The v2.4 PDF supplied here does not specify discovery/JWK URLs, so never invent them.

## Non-OIDC access token

**POST** `/public/oauth2/1/token` with the same authorization-code parameters.

Documented response includes `access_token`, `expires_in`, `token_type`, `scope`, `consent_valid_till`, `refresh_token`, `digilockerid`, `name`, `dob`, `gender`, `eaadhaar`, `new_account`, `reference_key`, and in v2.4 `mobile` + `purpose`.

The sample JSON in the PDF is missing punctuation in places. Model from the field list, not copy/paste validity.

## Refresh

**POST** `/public/oauth2/1/token`

Headers: HTTP Basic client credentials + `application/x-www-form-urlencoded`.

Body: `refresh_token`, `grant_type=refresh_token`.

The spec says successful refresh returns new access **and refresh** tokens. Replace the stored refresh token atomically when a new one is returned. Do not keep using the old value out of convenience.

Refresh error catalog: `invalid_client` 400, `invalid_grant` 400, `invalid_grant_type` 400, `unexpected_error` 500.

## Revoke token

**POST** `/public/oauth2/1/revoke`

Basic client auth; form body `token`, optional `token_type_hint=access_token|refresh_token`.

If hint is omitted, the service searches both token types.

## Revoke browser session

**GET** `https://digilocker.meripehchaan.gov.in/signin/logout/Y`

Required: `client_id`, exact registered `redirect_uri`.

Documented redirect contains `error=user_loggedout&error_description=user`.

## Scope discipline

Treat `scope` returned by token APIs as authoritative. Examples in the spec include `files.issueddocs`, `files.uploadeddocs`, `userdetails`, partner/document-specific scopes, and `openid`. Before calling a downstream API, check the actual granted set and handle `insufficient_scope` without blaming the user for the application requesting the wrong thing.
