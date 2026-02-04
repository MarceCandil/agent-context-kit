---
title: Per-Request Deduplication with React.cache()
impact: HIGH
impactDescription: Eliminates duplicate fetches within a request
tags: server, cache, deduplication, rsc
---

## Per-Request Deduplication with React.cache()

Use `React.cache()` to deduplicate expensive operations within a single request. Multiple components can call the same cached function and it will only execute once per request.

**Incorrect (duplicate calls in same request):**

```typescript
// Called from multiple components - runs N times
async function getCurrentUser() {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({ where: { id: session.user.id } })
}
```

**Correct (deduplicated with React.cache):**

```typescript
import { cache } from 'react'

export const getCurrentUser = cache(async () => {
  const session = await auth()
  if (!session?.user?.id) return null
  return await db.user.findUnique({ where: { id: session.user.id } })
})
```

Now multiple components can call `getCurrentUser()` and it only hits the database once per request.

**Note:** `React.cache()` is for per-request deduplication. For cross-request caching, use `unstable_cache` or an LRU cache.
