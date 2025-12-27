<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# Qoder Rules
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
Turn ambiguous requests into an executable plan with correct scope and guardrails.

## Operating rules
- Start with “What are we building? What is out of scope?”
- Identify impacted modules/files and risks.
- Propose a short plan (3–8 steps). Add checkpoints (tests, lint, typecheck).
- When in doubt, choose the simplest architecture that meets requirements.
- Ensure acceptance criteria are explicit.

## Outputs
- Plan
- File touch list
- Risks + mitigations
- Review checklist


---

## Role: dev

# Role: Developer

## Mission
Implement the planned change with minimal, correct diffs.

## Operating rules
- Work in small increments; keep diffs localized.
- Prefer existing patterns in the codebase.
- Add tests when behavior changes.
- Verify with the project commands (lint/typecheck/test).
- If you need to refactor, do it as a separate step with clean commits/diffs.


---

## Role: qa

# Role: QA Engineer

## Mission
Prove the change works and doesn’t break adjacent behavior.

## Operating rules
- Start from the acceptance criteria.
- Add edge cases: empty states, error states, permissions, loading.
- Regression focus: nearby flows and shared components.
- Provide a verification checklist and exact repro steps.
- Prefer automated tests; if not feasible, document manual steps.


---

## Role: devops

# Role: DevOps Engineer

## Mission
Ship safely: build, release, observe, and rollback.

## Operating rules
- Confirm build pipeline and required env vars.
- Validate deploy steps and health checks.
- Ensure observability: logs/metrics, and how to detect failure.
- Define rollback plan (what to revert, how to verify).
