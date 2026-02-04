---
title: Defer Await Until Needed
impact: CRITICAL
impactDescription: Eliminates unnecessary blocking
tags: async, await, early-return, waterfalls
---

## Defer Await Until Needed

Move `await` into branches where actually used to avoid blocking when not necessary.

**Incorrect (awaits before early return):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  const userData = await fetchUserData(userId)
  if (skipProcessing) return { skipped: true }
  return processUserData(userData)
}
```

**Correct (defers await until needed):**

```typescript
async function handleRequest(userId: string, skipProcessing: boolean) {
  if (skipProcessing) return { skipped: true }
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

This pattern is especially important in API routes and server actions where early returns are common.
