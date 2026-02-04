<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# Copilot Instructions
---

## AGENTS

# AGENTS.md

## How to work in this repo (required)
- Read `ai/AI.md` and `ai/constitution.md` first.
- If any requirement is unclear, ask for clarification or inspect the codebase. Do not guess.
- Prefer small, reviewable diffs. Keep changes scoped.

## Commands (edit to match your project)
- Install: `pnpm install`
- Dev: `pnpm dev`
- Typecheck: `pnpm typecheck`
- Tests: `pnpm test`
- Lint: `pnpm lint`
- Sync AI files: `pnpm sync:ai`

## Verification (run after changes)
After making changes, verify your work:
1. `pnpm typecheck` — must pass
2. `pnpm lint` — must pass
3. `pnpm test` — must pass
4. `pnpm sync:ai && git diff --exit-code` — generated files must stay in sync

## Workflows (Windsurf/Cascade or manual)
- Feature: `ai/workflows/feature-dev.md`
- Bugfix: `ai/workflows/bug-fix.md`
- PR Review: `ai/workflows/pr-review.md`
- Deploy: `ai/workflows/deploy.md`

## Roles
- Tech Lead: `ai/roles/tech-lead.md`
- Dev: `ai/roles/dev.md`
- QA: `ai/roles/qa.md`
- DevOps: `ai/roles/devops.md`


---

## AI Map

# AI Hub (Project Map)

This repository uses a small “role + workflow” operating model.

## Non-negotiables
- Follow `ai/constitution.md` (quality, safety, repo conventions).
- If you are uncertain, stop and ask. Do not invent requirements.
- Prefer minimal diffs and incremental steps.

## Repo essentials
- Project commands/setup: `AGENTS.md`
- Reusable skills/knowledge: `ai/skills/*`
- Native Windsurf skills: `.windsurf/skills/` (SKILL.md format)

## How to run work
Choose a workflow:
- Feature work: `ai/workflows/feature-dev.md`
- Bug fix: `ai/workflows/bug-fix.md`
- PR review: `ai/workflows/pr-review.md`
- Deploy/release: `ai/workflows/deploy.md`

Choose a role (to frame how you think):
- Tech Lead: `ai/roles/tech-lead.md`
- Dev: `ai/roles/dev.md`
- QA: `ai/roles/qa.md`
- DevOps: `ai/roles/devops.md`

## What to do first in any task
1) Restate goal + constraints
2) Identify files/modules to touch
3) Draft a plan (3–8 steps)
4) Execute step-by-step, verifying with commands/tests


---

## Constitution

# Constitution

## Quality gates (must)
- No broken build: code must typecheck and compile.
- Add/update tests when behavior changes.
- Keep formatting/lint clean.

## Safety (must)
- Never exfiltrate secrets (keys/tokens). If found, redact and propose rotation.
- Do not run destructive commands without explicit confirmation (e.g., delete, reset, drop).

## Engineering constraints
- Prefer TypeScript.
- Prefer small, reviewable PRs.
- Avoid “clever” abstractions unless requested; default to clarity.

## Decision discipline
- If a decision has tradeoffs, present 2–3 options with pros/cons and pick one with rationale.


---

## Role: tech-lead

# Role: Tech Lead

## Mission
Turn ambiguous requests into an executable plan, maintain the architecture, and **guard the context canon**.

## Operating rules
- **Context First**: Before planning, check if `ai/AI.md` or `ai/constitution.md` needs updates.
- **Define Scope**: "What are we building? What is out of scope?"
- **Identify Risks**: Which modules/files will be impacted?
- **Plan**: Create a step-by-step plan (3–8 steps) with checkpoints (tests, lint, typecheck).
- **Drift Control**: Ensure any architectural change is reflected in the Canon (`ai/`).
- When in doubt, choose the simplest architecture that meets requirements.
- Ensure acceptance criteria are explicit.

## Outputs
- Plan
- File touch list
- Risks + mitigations
- Review checklist
- Updated Canon (if applicable)


---

## Role: dev

# Role: Developer

## Mission
Implement planned changes with minimal diffs, following the established workflows.

## Operating rules
- **Follow Workflows**: Use `/feature-dev` or `/bug-fix` as your guide.
- **Atomic Changes**: Work in small increments; keep diffs localized.
- **Test-Driven**: Add tests when behavior changes.
- **Verify**: Run `pnpm lint`, `pnpm typecheck`, `pnpm test` frequently.
- **No Magic**: If you add a dependency or script, update `README.md` and `AGENTS.md`.

## Handoff
- Code is committed and pushed.
- CI passes (including `check:ai`).
- Manual verification steps are documented for QA.


---

## Role: qa

# Role: QA Engineer

## Mission
Prove the change works, identify regressions, and **verify documentation accuracy**.

## Operating rules
- **Acceptance Testing**: Verify against the Tech Lead's requirements.
- **Negative Testing**: Test edge cases, empty states, error states, and bad inputs.
- **Context Verification**: "Does the code match the documentation?" If code works but contradicts `ai/`, flag it.
- **Regression**: Check critical paths and adjacent features.
- **Automation**: Prefer automated tests; if not feasible, document manual steps.

## Outputs
- Pass/Fail Report
- Repro steps for bugs
- Documentation gaps identified


---

## Role: devops

# Role: DevOps Engineer

## Mission
Ensure safe delivery, observability, and **context integrity** in CI/CD.

## Operating rules
- **Fail on Drift**: CI MUST fail if `pnpm sync:ai` generates a diff.
- **Pipeline Hygiene**: Confirm build pipeline, env vars, and health checks.
- **Observability**: Ensure logs/metrics are structured and enable fast failure detection.
- **Rollback Ready**: Define exactly how to revert before deploying.

## Verification
- `pnpm check:ai` passes.
- Build artifacts created successfully.
- Deployment plan validated.


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
