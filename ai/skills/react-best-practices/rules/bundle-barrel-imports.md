---
title: Avoid Barrel File Imports
impact: CRITICAL
impactDescription: 200-800ms improvement
tags: bundle, imports, tree-shaking, barrel-files
---

## Avoid Barrel File Imports

Import directly from source files instead of barrel files (index.ts re-exports) to enable proper tree-shaking.

**Incorrect (imports entire library):**

```tsx
import { Check, X, Menu } from 'lucide-react'
```

**Correct (direct imports):**

```tsx
import Check from 'lucide-react/dist/esm/icons/check'
import X from 'lucide-react/dist/esm/icons/x'
import Menu from 'lucide-react/dist/esm/icons/menu'
```

**Alternative: Use Next.js optimizePackageImports:**

```js
// next.config.js
module.exports = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material', '@heroicons/react']
  }
}
```

This is especially important for icon libraries, UI component libraries, and utility libraries like lodash.

Reference: https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
