---
title: Dynamic Imports for Heavy Components
impact: CRITICAL
impactDescription: Reduces initial bundle size significantly
tags: bundle, dynamic-import, code-splitting, lazy-loading
---

## Dynamic Imports for Heavy Components

Use `next/dynamic` or `React.lazy` to code-split heavy components that aren't needed on initial load.

**Incorrect (bundled in main chunk):**

```tsx
import { MonacoEditor } from './monaco-editor'
import { Chart } from './chart'

function Dashboard() {
  return (
    <div>
      <MonacoEditor />
      <Chart />
    </div>
  )
}
```

**Correct (lazy-loaded when needed):**

```tsx
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(
  () => import('./monaco-editor').then(m => m.MonacoEditor),
  { ssr: false, loading: () => <EditorSkeleton /> }
)

const Chart = dynamic(
  () => import('./chart').then(m => m.Chart),
  { loading: () => <ChartSkeleton /> }
)

function Dashboard() {
  return (
    <div>
      <MonacoEditor />
      <Chart />
    </div>
  )
}
```

Use `ssr: false` for components that require browser APIs (canvas, WebGL, etc.).
