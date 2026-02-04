---
title: Use after() for Non-Blocking Operations
impact: HIGH
impactDescription: Reduces response latency
tags: server, after, non-blocking, logging, analytics
---

## Use after() for Non-Blocking Operations

Use `after()` from `next/server` to run code after the response has been sent. Perfect for logging, analytics, and cleanup tasks.

**Incorrect (blocks response):**

```tsx
export async function POST(request: Request) {
  const result = await updateDatabase(request)
  
  // These block the response
  await logUserAction({ userAgent: request.headers.get('user-agent') })
  await sendAnalytics({ action: 'update' })
  
  return Response.json({ status: 'success' })
}
```

**Correct (runs after response):**

```tsx
import { after } from 'next/server'

export async function POST(request: Request) {
  const result = await updateDatabase(request)
  
  // Runs after response is sent
  after(async () => {
    await logUserAction({ userAgent: request.headers.get('user-agent') })
    await sendAnalytics({ action: 'update' })
  })
  
  return Response.json({ status: 'success' })
}
```

Use `after()` for:
- Logging and analytics
- Cache invalidation
- Sending notifications
- Cleanup tasks
