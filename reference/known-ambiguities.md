# Known v2.4 Ambiguities / Footguns

This file exists so future agents do not “helpfully” erase uncertainty and manufacture a contract.

## 1. URL placement for `uri` and some `orgid` text

The Get File and Get Certificate XML sections print paths ending in literal `/uri`, then say the `uri` parameter is “sent as a part of the url.” The document does not clearly show whether the real call uses a path segment, query parameter, or another encoding convention.

Likewise, Get List of Documents says `orgid` is sent as part of the URL while the displayed path has no placeholder.

**Rule:** make placement configurable/isolated and verify against an official working example.

## 2. Meta API field called `hmac`

The meta endpoints say to provide a SHA-256 value of exact concatenated values, while file APIs explicitly describe keyed HMAC-SHA256 over file bytes with client secret as key + Base64. These should not share one crypto helper.

The meta sections do not explicitly state digest output encoding in the supplied text.

## 3. Optional Push URI fields in digest sequence

`validfrom`, `validto`, `doccontent`, `datacontent` are optional but are named in the documented concatenation sequence. The document does not clearly state whether missing values are represented by empty strings or omitted from the concatenation.

## 4. `consent_valid_till` timezone wording

It is called a UNIX/POSIX timestamp “using IST time zone.” Unix time itself is timezone-independent. Avoid accidental double offsets. Confirm accepted semantics with the official environment.

## 5. Sample JSON punctuation

Several samples are missing commas or have odd shapes. Build DTOs from the explicit field descriptions and actual provider responses, not a blind JSON parser run over PDF examples.

## 6. Issued document `mime`

The prose calls it a list of MIME types, while one example shows a string and another shows a collection-like form. Model the boundary defensively and normalize.

## 7. Revoke Token return prose

The Revoke Token “RETURNS” prose appears copied from authorization flow language. Treat the operation semantics (token invalidation endpoint) as primary and verify concrete response behavior in the environment.

## How to resolve an ambiguity

1. Check Partner Portal / official onboarding material for the same client version.
2. Compare a known successful request captured with secrets/PII redacted.
3. Ask official integration support if still unresolved.
4. Add a golden contract test and an ADR documenting the confirmed behavior, date and version.
