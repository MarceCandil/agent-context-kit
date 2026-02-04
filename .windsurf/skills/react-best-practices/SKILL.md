---
name: react-best-practices
description: React and Next.js performance optimization. Use when writing or reviewing React/Next.js code.
license: MIT
compatibility: Next.js 13+ with App Router
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/skills/react-best-practices.md -->

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

