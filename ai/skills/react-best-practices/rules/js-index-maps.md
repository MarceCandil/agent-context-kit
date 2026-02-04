---
title: Build Index Maps for Repeated Lookups
impact: LOW-MEDIUM
impactDescription: O(n) vs O(n²) complexity
tags: javascript, performance, map, lookup
---

## Build Index Maps for Repeated Lookups

When joining data from multiple arrays, build a Map first for O(1) lookups instead of using `find()` repeatedly.

**Incorrect (O(n²) - find() for each order):**

```typescript
return orders.map(order => ({
  ...order,
  user: users.find(u => u.id === order.userId)
}))
```

**Correct (O(n) - Map lookup):**

```typescript
const userById = new Map(users.map(u => [u.id, u]))

return orders.map(order => ({
  ...order,
  user: userById.get(order.userId)
}))
```

**When to use:**
- Joining data from different arrays
- Looking up items by ID in loops
- Any repeated lookups in the same dataset

**Also applies to Set for membership checks:**

```typescript
// O(n) per check
const isAdmin = (id: string) => adminIds.includes(id)

// O(1) per check
const adminIdSet = new Set(adminIds)
const isAdmin = (id: string) => adminIdSet.has(id)
```
