<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# Amazon Q Developer Project Rules
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
