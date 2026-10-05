---
name: meripehchaan-apaar-education
description: Use for APAAR integration and education/academic verification with Meri Pehchaan v2.4, including student identity, universities, courses, subjects, credits, grades, and handling APAAR-not-linked or unavailable states.
---

# APAAR and Education Verification

## Endpoint

**GET** `https://digilocker.meripehchaan.gov.in/public/oauth2/1/apaar`

Header: `Authorization: Bearer <access token>`. No request parameters.

The spec recommends calling it once after acquiring the token.

## Response model

Top-level:

- `apaar_id`: 12-digit APAAR account identifier.
- `student_details`.
- `academic_details[]`.

`student_details` fields:

- `name`
- `dob` in `DD/MM/YYYY`
- `gender` (`Male`, `Female`, `Transgender`)
- `created_on`
- `cumulative_credit_points`
- `cumulative_credit`
- `cumulative_grade_points`

Each `academic_details[]` item contains:

- `university_name`
- `org_id`
- `courses[]`

Each course contains `name` and `subjects[]`. Subject fields are `name`, `credit_points`, `credit`, `grade_points`, `grade`, `stream`, `session`, `year`, `month`, `sem`.

## Education-verification design

Use APAAR as structured evidence, not as a boolean magic wand.

Persist a normalized verification record such as:

```text
provider = "apaar_via_meripehchaan"
apaar_id_hash = ...
account_digilockerid = ...
institution_name = source academic_details[].university_name
institution_org_id = source org_id
course_name = source course.name
session/year = source fields
verified_at = current time
raw_source_version = "Meri Pehchaan Requester v2.4"
```

Keep the original source payload or a cryptographic hash only according to your privacy/retention requirements. A product badge should identify what was verified: e.g. “Education record verified via APAAR”, not imply background checks the API never performed.

## Account-to-APAAR consistency

**ENGINEERING:** after Get User Details and APAAR, compare obvious account-holder fields such as name/DOB under a documented normalization policy. Do not silently merge records with conflicting DOB/name. Route mismatches to manual review or fail closed depending on your risk model.

## Errors with distinct UX

- `apaar_not_linked` -> 404: account has no linked APAAR.
- `apaar_not_available` -> 404: APAAR data unavailable for this user.
- `invalid_token` -> 401.
- `insufficient_scope` -> 403.
- `unexpected_error` -> 530.

Do not collapse the two 404s into “student not found”; they imply different remediation.

## Combining APAAR with issued documents

APAAR is structured academic data. Issued documents are a separate capability. If the product needs a marksheet/certificate artifact as evidence, use the issued-document or pull-document flow rather than assuming APAAR contains a PDF. Discover issuer/document types dynamically; do not hard-code a doctype from a blog post.
