# Version 2.4 Delta Guardrail

When reviewing old code, tutorials, StackOverflow answers, internal snippets, or previous agent work, apply these rules before reusing anything:

- `Verify Account` is **removed in v2.4**. Treat calls to it as legacy code requiring migration.
- Get User Details now includes `mobile`, `picture`, `email` in addition to `digilockerid`, `name`, `dob`, `gender`, `eaadhaar`, `reference_key`.
- Non-OIDC Get Access Token now includes `mobile` and `purpose` in the documented response fields.
- APAAR has a dedicated `GET /public/oauth2/1/apaar` endpoint.
- Authorization now requires `purpose` **and `service_name`** per v2.4.
- `prompt` supports `login` and `login_mobile`; `login_hint` should only be used with `prompt=login_mobile`.
- `amr` supports `apaar`, `apaar_only`, `apaar_others` for sign-in, in addition to other documented methods.

Never “fix” an implementation by copying an older spec until these differences have been reconciled.
