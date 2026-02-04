---
title: Strategic Suspense Boundaries
impact: CRITICAL
impactDescription: Enables streaming and parallel loading
tags: suspense, streaming, react, ssr
---

## Strategic Suspense Boundaries

Use Suspense boundaries to stream content and prevent slow components from blocking the entire page.

**Incorrect (entire page waits for slow data):**

```tsx
async function Page() {
  const data = await slowFetch() // Blocks everything
  return (
    <div>
      <Sidebar />
      <DataDisplay data={data} />
      <Footer />
    </div>
  )
}
```

**Correct (streams content progressively):**

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

async function DataDisplay() {
  const data = await slowFetch()
  return <div>{data}</div>
}
```

Place Suspense boundaries around components that fetch data to enable:
- Progressive page loading
- Better perceived performance
- Parallel data fetching
