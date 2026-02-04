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