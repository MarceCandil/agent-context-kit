# Skill: Testing strategy

## Principles
- If behavior changes, add/adjust tests.
- Test the smallest unit that proves the behavior:
  - Pure functions → unit tests
  - Components/pages → component/integration tests
  - Critical user flows → e2e tests (optional)

## What to cover (default)
- Happy path
- Error states (API failure, validation)
- Empty states
- Permissions/feature flags (if relevant)
- Regression around shared components

## Test ergonomics
- Prefer deterministic tests (avoid timing flakiness).
- Use realistic fixtures.
- Name tests with intent (“should … when …”).

## Verification checklist (manual if needed)
- Steps to reproduce and verify
- Expected results per step