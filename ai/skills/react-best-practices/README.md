# React Best Practices Skill

A modular skill for React and Next.js performance optimization, adapted from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices).

## Structure

```
react-best-practices/
├── SKILL.md           # Quick reference with all 57 rules listed
├── README.md          # This file
└── rules/             # Individual rule files
    ├── _template.md   # Template for creating new rules
    ├── async-*.md     # Eliminating Waterfalls (Section 1)
    ├── bundle-*.md    # Bundle Size Optimization (Section 2)
    ├── server-*.md    # Server-Side Performance (Section 3)
    ├── client-*.md    # Client-Side Data Fetching (Section 4)
    ├── rerender-*.md  # Re-render Optimization (Section 5)
    ├── rendering-*.md # Rendering Performance (Section 6)
    ├── js-*.md        # JavaScript Performance (Section 7)
    └── advanced-*.md  # Advanced Patterns (Section 8)
```

## Usage

The `SKILL.md` file provides a quick reference with all rules listed by category. For detailed explanations and code examples, reference the individual files in `rules/`.

### For Agents

Agents should:
1. Read `SKILL.md` first to understand the rule categories and priorities
2. Reference specific rule files when implementing or reviewing code
3. Apply CRITICAL and HIGH priority rules first

### For Humans

1. Browse `SKILL.md` for an overview
2. Read individual rule files for detailed patterns
3. Use `_template.md` to add new rules

## Adding New Rules

1. Copy `rules/_template.md` to `rules/<prefix>-<description>.md`
2. Choose the appropriate prefix:
   - `async-` for Eliminating Waterfalls (Section 1)
   - `bundle-` for Bundle Size Optimization (Section 2)
   - `server-` for Server-Side Performance (Section 3)
   - `client-` for Client-Side Data Fetching (Section 4)
   - `rerender-` for Re-render Optimization (Section 5)
   - `rendering-` for Rendering Performance (Section 6)
   - `js-` for JavaScript Performance (Section 7)
   - `advanced-` for Advanced Patterns (Section 8)
3. Fill in the frontmatter and content
4. Update `SKILL.md` quick reference if needed
5. Run `pnpm sync:ai` to regenerate vendor files

## Impact Levels

| Level | Description |
|-------|-------------|
| CRITICAL | Highest priority, major performance gains (2-10× improvement) |
| HIGH | Significant performance improvements |
| MEDIUM-HIGH | Moderate-high gains |
| MEDIUM | Moderate performance improvements |
| LOW-MEDIUM | Low-medium gains |
| LOW | Incremental improvements |

## Syncing with Upstream

To get the latest rules from Vercel:

1. Visit [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices/rules)
2. Compare with local rules
3. Add or update rules as needed

## References

- [Vercel agent-skills](https://github.com/vercel-labs/agent-skills)
- [Vercel Blog: React Best Practices](https://vercel.com/blog/introducing-react-best-practices)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
