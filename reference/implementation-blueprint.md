# Implementation Blueprint

This is the recommended software shape for a server-side requester integration. Items marked **ENGINEERING** go beyond what the API PDF literally prescribes, but are standard defensive architecture.

## Modules

```text
MeriPehchaanModule
├── config
│   ├── clientId
│   ├── clientSecret
│   ├── redirectUri
│   └── baseUrl
├── AuthService
│   ├── createAuthorizationTransaction()
│   ├── buildAuthorizationUrl()
│   ├── handleCallback()
│   ├── exchangeCode()
│   ├── refresh()
│   ├── revokeToken()
│   └── buildLogoutUrl()
├── AccountService
│   ├── getUserDetails()
│   └── getApaarDetails()
├── DocumentService
│   ├── listUploaded()
│   ├── listIssued()
│   ├── downloadByUri()
│   ├── downloadXmlByUri()
│   ├── downloadEAadhaar()
│   ├── upload()
│   └── pullDocument()
├── MetaService
│   ├── listIssuers()
│   ├── listDocumentTypes()
│   ├── getSearchParameters()
│   └── getStatistics()
├── IssuerService
│   └── pushUri()
└── crypto
    ├── generatePkceVerifier()
    ├── derivePkceChallenge()
    ├── fileHmacSha256Base64()
    └── specConcatenationSha256()
```

## Data models worth persisting

**AuthorizationTransaction**: random id, `state`, PKCE verifier, redirect URI, requested scopes/docs, purpose, service name, created/expiry time, local user id, consumed-at.

**DigiLockerConnection**: local user id, `digilockerid`, token metadata, granted scope set, `consent_valid_till`, account snapshot timestamp, and encrypted refresh token if business requirements justify keeping it.

**VerificationEvidence**: local user id, DigiLocker account id, endpoint/document URI used, issuer/doctype, fact established, normalized value or hash, verification timestamp, consent reference, and source response hash where appropriate.

Do not persist more raw PII than the product needs merely because an API returned it.
