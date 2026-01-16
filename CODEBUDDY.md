<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/* and AGENTS.md -->

# CodeBuddy Instructions
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

## Skill: react-best-practices

# Skill: React Best Practices

> **Note:** This skill is an **example template** from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills).
> This repository supports multiple languages and frameworks. Feel free to modify or replace this with skills for your stack.

Comprehensive performance optimization guide for React and Next.js applications. Contains 45 rules across 8 categories, prioritized by impact from CRITICAL to LOW.

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

---

## 1. Eliminating Waterfalls (CRITICAL)

Waterfalls are the #1 performance killer. Each sequential await adds full network latency.

### Defer Await Until Needed

Move `await` into branches where actually used:

```typescript
// ❌ Incorrect
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)
  if (skipProcessing) return { skipped: true }
  return processUserData(userData)
}

// ✅ Correct
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) return { skipped: true }
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

### Promise.all() for Independent Operations

```typescript
// ❌ Sequential (slow)
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()

// ✅ Parallel (fast)
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

### Strategic Suspense Boundaries

```tsx
function Page() {
  return (
    <div>
      <Sidebar />
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
      <Footer />
    </div>
  )
}
```

---

## 2. Bundle Size Optimization (CRITICAL)

### Avoid Barrel File Imports

```tsx
// ❌ Imports entire library (200-800ms cost)
import { Check, X, Menu } from 'lucide-react'

// ✅ Direct imports
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
```

Or use Next.js `optimizePackageImports`:
```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}
```

### Dynamic Imports for Heavy Components

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)
```

---

## 3. Server-Side Performance (HIGH)

### Per-Request Deduplication with React.cache()

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({ where: { id: session.user.id } })
})
```

### Minimize Serialization

```tsx
// ❌ Passes 50 fields to client
async function Page() {
  const user = await fetchUser()
  return <Profile user={user} />
}

// ✅ Passes only needed data
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} avatar={user.avatar} />
}
```

### Use after() for Non-Blocking Operations

```tsx
import { after } from 'next/server'

export async function POST(request: Request) {
  await updateDatabase(request)

  after(async () => {
    logUserAction({ userAgent: request.headers.get('user-agent') })
  })

  return Response.json({ status: 'success' })
}
```

---

## 4. Client-Side Data Fetching (MEDIUM-HIGH)

### Use SWR for Automatic Deduplication

```tsx
import useSWR from 'swr'

function UserList() {
  const { data: users } = useSWR('/api/users', fetcher)
  // Multiple components calling this share the same request
}
```

---

## 5. Re-render Optimization (MEDIUM)

### Functional setState Updates

```tsx
// ❌ Recreates callback on every render
const addItems = useCallback((newItems: Item[]) => {
  setItems([...items, ...newItems])
}, [items])

// ✅ Stable callback reference
const addItems = useCallback((newItems: Item[]) => {
  setItems(curr => [...curr, ...newItems])
}, [])
```

### Lazy State Initialization

```tsx
// ❌ Runs expensive function on every render
const [searchIndex] = useState(buildSearchIndex(items))

// ✅ Runs only once
const [searchIndex] = useState(() => buildSearchIndex(items))
```

### Transitions for Non-Urgent Updates

```tsx
import { startTransition } from 'react'

const handler = () => {
  startTransition(() => setScrollY(window.scrollY))
}
```

---

## 6. Rendering Performance (MEDIUM)

### CSS content-visibility for Long Lists

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

### Explicit Conditional Rendering

```tsx
// ❌ Renders "0" when count is 0
{count && <span className="badge">{count}</span>}

// ✅ Renders nothing when count is 0
{count > 0 ? <span className="badge">{count}</span> : null}
```

---

## 7. JavaScript Performance (LOW-MEDIUM)

### Build Index Maps for Lookups

```typescript
// ❌ O(n²) - find() for each order
return orders.map(order => ({
  ...order,
  user: users.find(u => u.id === order.userId)
}))

// ✅ O(n) - Map lookup
const userById = new Map(users.map(u => [u.id, u]))
return orders.map(order => ({
  ...order,
  user: userById.get(order.userId)
}))
```

### Use toSorted() for Immutability

```typescript
// ❌ Mutates original array
const sorted = users.sort((a, b) => a.name.localeCompare(b.name))

// ✅ Returns new sorted array
const sorted = users.toSorted((a, b) => a.name.localeCompare(b.name))
```

---

## References

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
- [SWR](https://swr.vercel.app)
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
