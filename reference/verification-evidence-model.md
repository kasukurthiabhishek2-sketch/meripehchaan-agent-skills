# Verification Evidence Model

For identity, education, tutor, employment, licensing or similar marketplaces, do not store one vague `verified=true` bit and then lose the chain of evidence.

A useful model:

```text
VerificationEvidence
- id
- local_subject_id
- provider = MERI_PEHCHAAN_DIGILOCKER
- digilocker_id
- evidence_type
  - ACCOUNT_DETAILS
  - APAAR_ACADEMIC_RECORD
  - ISSUED_DOCUMENT
  - PULLED_DOCUMENT
  - EAADHAAR
- issuer_id (when applicable)
- issuer_name
- doctype
- document_uri
- source_fields_used[]
- source_content_hash (when a file was fetched)
- outcome
  - MATCHED
  - MISMATCHED
  - MANUAL_REVIEW
  - NOT_AVAILABLE
- normalized_claims
- verified_at
- consent_receipt_id
- source_spec_version = 2.4
```

## Why this matters

“Verified” may mean very different things:

- the local account was connected to a particular DigiLocker account;
- the person's account details matched a product profile;
- APAAR contains a particular university/course record;
- an issued certificate exists from a named issuer;
- a file was fetched and its provider HMAC verified;
- a human reviewer inspected a mismatch.

Expose a badge/copy that matches the evidence you actually possess.

## Re-verification

Define product policy for evidence freshness. The v2.4 Get User Details section says details do not change and suggests storing them; that does not automatically mean every business verification should remain valid forever. If a qualification/license can be revoked or corrected, your product may need a refresh policy independent of OAuth token life.
