---
name: git
description: Git workflows and PR hygiene. Use this skill when creating branches, writing commit messages, preparing pull requests, or reviewing git-related best practices.
---

# Skill: Git & PR Hygiene

## Branching
- Use short, descriptive branches: `feat/<scope>`, `fix/<scope>`, `chore/<scope>`.

## Commits
- Prefer small commits that compile.
- Suggested style: `type(scope): message`
  - `feat(auth): add password reset flow`
  - `fix(api): handle 429 retry-after`
  - `chore(ci): fail on generated drift`

## PR Discipline
- Keep PRs scoped; avoid drive-by refactors.
- PR description must include:
  - What changed + why
  - How to verify (commands + manual steps)
  - Risk/impact notes

## Before Opening PR
- Run quality gates (lint/typecheck/tests).
- Ensure generated artifacts are up to date if applicable (e.g., `pnpm sync:ai`).
