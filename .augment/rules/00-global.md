---
type: always_apply
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# Auggie (Augment) Rules

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

## Procedure
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

## Skill: react-best-practices

# React Best Practices

> **Source:** Adapted from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices)

Comprehensive performance optimization guide for React and Next.js applications. Contains 57 rules across 8 categories, prioritized by impact.

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Eliminating Waterfalls | CRITICAL |
| 2 | Bundle Size Optimization | CRITICAL |
| 3 | Server-Side Performance | HIGH |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH |
| 5 | Re-render Optimization | MEDIUM |
| 6 | Rendering Performance | MEDIUM |
| 7 | JavaScript Performance | LOW-MEDIUM |
| 8 | Advanced Patterns | LOW |

## Quick Reference

### 1. Eliminating Waterfalls (CRITICAL)
- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### 2. Bundle Size Optimization (CRITICAL)
- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### 3. Server-Side Performance (HIGH)
- `server-auth-actions` - Authenticate server actions like API routes
- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-dedup-props` - Avoid duplicate serialization in RSC props
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-after-nonblocking` - Use after() for non-blocking operations

### 4. Client-Side Data Fetching (MEDIUM-HIGH)
- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners
- `client-passive-event-listeners` - Use passive listeners for scroll
- `client-localstorage-schema` - Version and minimize localStorage data

### 5. Re-render Optimization (MEDIUM)
- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-memo-with-default-value` - Hoist default non-primitive props
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-derived-state-no-effect` - Derive state during render, not effects
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives
- `rerender-move-effect-to-event` - Put interaction logic in event handlers
- `rerender-transitions` - Use startTransition for non-urgent updates
- `rerender-use-ref-transient-values` - Use refs for transient frequent values

### 6. Rendering Performance (MEDIUM)
- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-hydration-suppress-warning` - Suppress expected mismatches
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals
- `rendering-usetransition-loading` - Prefer useTransition for loading state

### 7. JavaScript Performance (LOW-MEDIUM)
- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

### 8. Advanced Patterns (LOW)
- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-init-once` - Initialize app once per app load
- `advanced-use-latest` - useLatest for stable callback refs

## How to Use

Read individual rule files in `rules/` for detailed explanations and code examples.

Each rule file contains:
- Brief explanation of why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Additional context and references

## References

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
- [Vercel Blog: Package Imports](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
- [Vercel Blog: Dashboard Performance](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)


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

## Skill: security

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
