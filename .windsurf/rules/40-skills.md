---
description: "Reusable knowledge: database, git, testing, review checklist"
alwaysApply: true
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# Skills (Windsurf)
---

## Skill: db

# Skill: Database & migrations

## Rules
- Never edit migration history retroactively once merged.
- Prefer additive changes (new migrations) over rewriting.

## Workflow
1) Describe the schema change in plain language.
2) Generate a migration using the repo’s standard command.
3) Apply migration locally.
4) Update seeds/fixtures (if required).
5) Add minimal tests (or verification steps) to prove data integrity.

## Safety
- Avoid destructive operations without explicit confirmation.
- For risky changes, propose a rollback plan.


---

## Skill: git

# Skill: Git & PR hygiene

## Branching
- Use short, descriptive branches: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`.

## Commits
- Prefer small commits that compile.
- Suggested style: `type(scope): message`
  - `feat(auth): add password reset flow`
  - `fix(api): handle 429 retry-after`
  - `chore(ci): fail on generated drift`

## PR discipline
- Keep PRs scoped; avoid drive-by refactors.
- PR description must include:
  - What changed + why
  - How to verify (commands + manual steps)
  - Risk/impact notes

## Before opening PR
- Run quality gates (lint/typecheck/tests).
- Ensure generated artifacts are up to date if applicable (e.g., `pnpm sync:ai`).


---

## Skill: review-checklist

# Skill: Review checklist

## Correctness
- Meets acceptance criteria
- Handles edge cases (null/empty/error/loading)
- No hidden breaking changes

## Code quality
- Clear naming, minimal complexity
- Follows existing repo patterns
- No unnecessary abstractions

## Quality gates
- Lint/typecheck/tests pass
- New/updated tests for behavior changes
- Clear manual verification steps

## Risk
- Calls out migration/deploy implications (if any)
- Includes rollback notes for non-trivial changes


---

## Skill: test

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
