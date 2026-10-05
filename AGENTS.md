# Agent Instructions for This Skill Pack

1. Treat `Requester - Meri Pehchaan API Specification v2.4 (Sep 2026)` as the source of truth for Meri Pehchaan/DigiLocker requester-specific fields and endpoints.
2. Before changing an integration, read `skills/meripehchaan-integration-architect/SKILL.md`, then load only the specialist skills relevant to the task.
3. Never resurrect the removed Verify Account API.
4. Never invent a sandbox URL, undocumented scope, issuer doctype, AMR value, request hash encoding, or callback behavior.
5. Where the v2.4 document is ambiguous, preserve the ambiguity explicitly, write a contract test, and require confirmation from the Partner Portal / official support / a known-working integration before hard-coding behavior.
6. Keep OAuth secrets and user documents server-side. Never expose `client_secret` or refresh tokens to browser JavaScript.
7. Reject callback `state` mismatches and do not exchange a code if state/transaction data is missing or expired.
8. Use exact registered redirect URIs. Do not normalize or silently modify them.
9. Use the exact HMAC/hash input order specified for each endpoint. Different endpoint families use different integrity mechanisms.
10. Build failure handling for documented non-standard statuses such as HTTP 530.
11. Samples in the PDF occasionally contain malformed JSON punctuation. Derive schemas from the prose field definitions, not by blindly pasting sample JSON.
12. If implementing identity or education verification, persist provenance: which endpoint/document established which fact, at what time, under what consent, and for which DigiLocker account.
