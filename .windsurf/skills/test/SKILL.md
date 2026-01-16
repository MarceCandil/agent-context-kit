---
name: test
description: Testing strategy and best practices. Use this skill when writing tests, deciding what to test, setting up test coverage, or debugging flaky tests.
---

# Skill: Testing Strategy

## Principles
- If behavior changes, add/adjust tests.
- Test the smallest unit that proves the behavior:
  - Pure functions → unit tests
  - Components/pages → component/integration tests
  - Critical user flows → e2e tests (optional)

## What to Cover (default)
- Happy path
- Error states (API failure, validation)
- Empty states
- Permissions/feature flags (if relevant)
- Regression around shared components

## Test Ergonomics
- Prefer deterministic tests (avoid timing flakiness).
- Use realistic fixtures.
- Name tests with intent ("should … when …").

## Verification Checklist (manual if needed)
- Steps to reproduce and verify
- Expected results per step
