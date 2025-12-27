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