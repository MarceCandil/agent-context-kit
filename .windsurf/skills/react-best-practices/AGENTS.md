# React Best Practices

**Version 1.0.0**
Vercel Engineering
January 2026

> **Note:** This document is an **example template** adapted from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills).
> This repository supports multiple languages and frameworks. Modify and adapt to your needs.

---

## Abstract

Comprehensive performance optimization guide for React and Next.js applications, designed for AI agents and LLMs. Contains 40+ rules across 8 categories, prioritized by impact from critical (eliminating waterfalls, reducing bundle size) to incremental (advanced patterns).

---

## Table of Contents

1. [Eliminating Waterfalls](#1-eliminating-waterfalls) — **CRITICAL**
2. [Bundle Size Optimization](#2-bundle-size-optimization) — **CRITICAL**
3. [Server-Side Performance](#3-server-side-performance) — **HIGH**
4. [Client-Side Data Fetching](#4-client-side-data-fetching) — **MEDIUM-HIGH**
5. [Re-render Optimization](#5-re-render-optimization) — **MEDIUM**
6. [Rendering Performance](#6-rendering-performance) — **MEDIUM**
7. [JavaScript Performance](#7-javascript-performance) — **LOW-MEDIUM**
8. [Advanced Patterns](#8-advanced-patterns) — **LOW**

---

## 1. Eliminating Waterfalls

**Impact: CRITICAL**

Waterfalls are the #1 performance killer. Each sequential await adds full network latency.

### 1.1 Defer Await Until Needed

**Impact: HIGH**

Move `await` operations into the branches where they're actually used.

**Incorrect:**
```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)
  if (skipProcessing) {
    return { skipped: true }
  }
  return processUserData(userData)
}
```

**Correct:**
```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) {
    return { skipped: true }
  }
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

### 1.2 Promise.all() for Independent Operations

**Impact: CRITICAL (2-10× improvement)**

**Incorrect:**
```typescript
const user = await fetchUser()
const posts = await fetchPosts()
const comments = await fetchComments()
```

**Correct:**
```typescript
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
])
```

### 1.3 Strategic Suspense Boundaries

**Impact: HIGH**

Use Suspense boundaries to show wrapper UI faster while data loads.

**Correct:**
```tsx
function Page() {
  return (
    <div>
      <div>Sidebar</div>
      <Suspense fallback={<Skeleton />}>
        <DataDisplay />
      </Suspense>
      <div>Footer</div>
    </div>
  )
}

async function DataDisplay() {
  const data = await fetchData()
  return <div>{data.content}</div>
}
```

---

## 2. Bundle Size Optimization

**Impact: CRITICAL**

### 2.1 Avoid Barrel File Imports

**Impact: CRITICAL (200-800ms import cost)**

**Incorrect:**
```tsx
import { Check, X, Menu } from 'lucide-react'
```

**Correct:**
```tsx
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
```

**Or use Next.js optimizePackageImports:**
```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material']
  }
}
```

### 2.2 Dynamic Imports for Heavy Components

**Impact: CRITICAL**

**Incorrect:**
```tsx
import { MonacoEditor } from './monaco-editor'
```

**Correct:**
```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false }
)
```

### 2.3 Defer Non-Critical Third-Party Libraries

**Impact: MEDIUM**

```tsx
import dynamic from 'next/dynamic'

const Analytics = dynamic(
  () => import('@vercel/analytics/react').then(m => m.Analytics),
  { ssr: false }
)
```

---

## 3. Server-Side Performance

**Impact: HIGH**

### 3.1 Per-Request Deduplication with React.cache()

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({
    where: { id: session.user.id }
  })
})
```

### 3.2 Minimize Serialization at RSC Boundaries

**Incorrect:**
```tsx
async function Page() {
  const user = await fetchUser()  // 50 fields
  return <Profile user={user} />
}
```

**Correct:**
```tsx
async function Page() {
  const user = await fetchUser()
  return <Profile name={user.name} />
}
```

### 3.3 Use after() for Non-Blocking Operations

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

## 4. Client-Side Data Fetching

**Impact: MEDIUM-HIGH**

### 4.1 Use SWR for Automatic Deduplication

```tsx
import useSWR from 'swr'

function UserList() {
  const { data: users } = useSWR('/api/users', fetcher)
}
```

---

## 5. Re-render Optimization

**Impact: MEDIUM**

### 5.1 Use Functional setState Updates

**Incorrect:**
```tsx
const addItems = useCallback((newItems: Item[]) => {
  setItems([...items, ...newItems])
}, [items])
```

**Correct:**
```tsx
const addItems = useCallback((newItems: Item[]) => {
  setItems(curr => [...curr, ...newItems])
}, [])
```

### 5.2 Use Lazy State Initialization

**Incorrect:**
```tsx
const [searchIndex] = useState(buildSearchIndex(items))
```

**Correct:**
```tsx
const [searchIndex] = useState(() => buildSearchIndex(items))
```

### 5.3 Use Transitions for Non-Urgent Updates

```tsx
import { startTransition } from 'react'

const handler = () => {
  startTransition(() => setScrollY(window.scrollY))
}
```

---

## 6. Rendering Performance

**Impact: MEDIUM**

### 6.1 CSS content-visibility for Long Lists

```css
.message-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 80px;
}
```

### 6.2 Use Explicit Conditional Rendering

**Incorrect:**
```tsx
{count && <span className="badge">{count}</span>}
```

**Correct:**
```tsx
{count > 0 ? <span className="badge">{count}</span> : null}
```

---

## 7. JavaScript Performance

**Impact: LOW-MEDIUM**

### 7.1 Build Index Maps for Repeated Lookups

**Incorrect:**
```typescript
return orders.map(order => ({
  ...order,
  user: users.find(u => u.id === order.userId)
}))
```

**Correct:**
```typescript
const userById = new Map(users.map(u => [u.id, u]))
return orders.map(order => ({
  ...order,
  user: userById.get(order.userId)
}))
```

### 7.2 Use toSorted() for Immutability

**Incorrect:**
```typescript
const sorted = users.sort((a, b) => a.name.localeCompare(b.name))
```

**Correct:**
```typescript
const sorted = users.toSorted((a, b) => a.name.localeCompare(b.name))
```

### 7.3 Early Return from Functions

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    if (!user.email) {
      return { valid: false, error: 'Email required' }
    }
  }
  return { valid: true }
}
```

---

## 8. Advanced Patterns

**Impact: LOW**

### 8.1 useLatest for Stable Callback Refs

```typescript
function useLatest<T>(value: T) {
  const ref = useRef(value)
  useEffect(() => {
    ref.current = value
  }, [value])
  return ref
}
```

---

## References

1. [React Documentation](https://react.dev)
2. [Next.js Documentation](https://nextjs.org)
3. [SWR](https://swr.vercel.app)
4. [better-all](https://github.com/shuding/better-all)
5. [Vercel Blog: Package Imports](https://vercel.com/blog/how-we-optimized-package-imports-in-next-js)
6. [Vercel Blog: Dashboard Performance](https://vercel.com/blog/how-we-made-the-vercel-dashboard-twice-as-fast)
