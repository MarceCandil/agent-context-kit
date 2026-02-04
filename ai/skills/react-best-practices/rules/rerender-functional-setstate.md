---
title: Use Functional setState Updates
impact: MEDIUM
impactDescription: Creates stable callback references
tags: rerender, useState, callback, memoization
---

## Use Functional setState Updates

Use functional updates with `setState` to create stable callback references that don't need the current state in their dependency array.

**Incorrect (recreates callback on every render):**

```tsx
const [items, setItems] = useState<Item[]>([])

const addItems = useCallback((newItems: Item[]) => {
  setItems([...items, ...newItems])
}, [items]) // Dependency on items causes recreation
```

**Correct (stable callback reference):**

```tsx
const [items, setItems] = useState<Item[]>([])

const addItems = useCallback((newItems: Item[]) => {
  setItems(curr => [...curr, ...newItems])
}, []) // No dependencies, stable reference
```

This pattern:
- Prevents unnecessary re-renders in child components
- Works well with `React.memo`
- Avoids stale closure issues
