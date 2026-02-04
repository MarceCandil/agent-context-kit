---
title: Use Explicit Conditional Rendering
impact: MEDIUM
impactDescription: Prevents rendering bugs with falsy values
tags: rendering, conditional, jsx, bugs
---

## Use Explicit Conditional Rendering

Use ternary operators instead of `&&` to prevent rendering falsy values like `0` or empty strings.

**Incorrect (renders "0" when count is 0):**

```tsx
{count && <span className="badge">{count}</span>}
```

When `count` is `0`, this renders the string "0" instead of nothing.

**Correct (renders nothing when count is 0):**

```tsx
{count > 0 ? <span className="badge">{count}</span> : null}
```

**Alternative patterns:**

```tsx
// Boolean coercion
{!!count && <span className="badge">{count}</span>}

// Nullish coalescing for optional values
{user?.name ?? <Placeholder />}
```

This is especially important for:
- Numeric values (counts, lengths, indices)
- String values that could be empty
- Optional chaining results
