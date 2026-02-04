---
name: security
description: Security best practices. Use when handling auth, secrets, input validation, or API security.
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/skills/security.md -->

# Skill: Security

## Secrets & credentials
- Never commit secrets (API keys, tokens, passwords) to the repo.
- Use environment variables; document required vars in `AGENTS.md` or `.env.example`.
- If a secret is accidentally committed, rotate it immediately and scrub from history.

## Input validation
- Validate and sanitize all user input on the server side.
- Use allowlists over denylists where possible.
- Escape output to prevent XSS (HTML, URL, SQL contexts).

## Authentication & authorization
- Verify auth on every protected endpoint; don't rely on client-side checks alone.
- Use established libraries (e.g., bcrypt for hashing, JWT with short expiry).
- Implement proper session management (secure cookies, CSRF protection).

## API security
- Use HTTPS for all external calls.
- Validate Content-Type and reject unexpected payloads.
- Rate-limit sensitive endpoints (login, password reset).

## Logging & observability
- Never log sensitive data (passwords, tokens, PII).
- Configure redaction for common sensitive fields.
- Log auth failures and suspicious activity for audit.

