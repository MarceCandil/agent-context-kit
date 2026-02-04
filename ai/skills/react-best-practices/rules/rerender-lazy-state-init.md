---
title: Use Lazy State Initialization
impact: MEDIUM
impactDescription: Avoids expensive computation on every render
tags: rerender, useState, lazy-init, performance
---

## Use Lazy State Initialization

Pass a function to `useState` for expensive initial values to ensure the computation only runs once.

**Incorrect (runs expensive function on every render):**

```tsx
const [searchIndex] = useState(buildSearchIndex(items))
```

Even though `searchIndex` only uses the initial value, `buildSearchIndex(items)` is called on every render.

**Correct (runs only once):**

```tsx
const [searchIndex] = useState(() => buildSearchIndex(items))
```

The function is only called on the first render.

**Common use cases:**
- Building search indexes
- Parsing large data structures
- Reading from localStorage
- Complex object initialization

```tsx
// Also applies to useRef for non-reactive values
const workerRef = useRef<Worker>()
if (!workerRef.current) {
  workerRef.current = new Worker('/worker.js')
}
```
