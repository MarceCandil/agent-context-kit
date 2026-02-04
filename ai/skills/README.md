# Skills (Source of Truth)

This folder contains the **canonical skill definitions** that get distributed to all supported AI coding tools.

## What are Skills?

Skills are reusable knowledge bundles for complex, multi-step tasks. They provide context that helps AI assistants handle specific domains like database migrations, git workflows, testing strategies, etc.

## Available Skills

| Skill | Purpose |
|-------|---------|
| `db.md` | Database schema changes and migrations |
| `git.md` | Git workflows and PR hygiene |
| `test.md` | Testing strategy and best practices |
| `review-checklist.md` | Code review guidelines |

## How Skills are Distributed

When you run `pnpm sync:ai`, skills are transformed for each IDE:

| IDE | Output | Format |
|-----|--------|--------|
| Windsurf | `.windsurf/rules/40-skills.md` | Bundled rules |
| Windsurf | `.windsurf/skills/*/SKILL.md` | Native skills |
| Cursor | `.cursor/rules/40-skills.mdc` | Bundled rules |
| Claude Code | Referenced via `@ai/skills/*` | Imports |
| Others | Bundled in main instruction file | Inline |

## Customization

> **This repository supports multiple languages and frameworks.**

The included skills are **framework-agnostic examples**. You can:

- **Modify them** for your specific project conventions
- **Add framework skills** for React, Vue, Angular, Go, Python, etc.
- **Use community skills** from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills) or [Anthropic's skills](https://github.com/anthropics/skills)
- **Add new skills** by creating `<skill-name>.md` files

## Creating New Skills

1. Create a new file: `ai/skills/<skill-name>.md`
2. Use this structure:
   ```markdown
   # Skill: <Name>

   Brief description of when to use this skill.

   ## Section 1
   - Guidelines...

   ## Section 2
   - More guidelines...
   ```
3. Run `pnpm sync:ai` to distribute to all IDEs

## Windsurf Native Skills

For Windsurf, skills are also generated as native SKILL.md files in `.windsurf/skills/`. This enables:

- **Automatic invocation** via "progressive disclosure"
- **Manual invocation** via `@skill-name` in Cascade
- **Supporting resources** (templates, checklists) in skill folders

## Advanced: Progressive Disclosure with Subdirectories

For complex skills (>10k words), follow the [agentskills.io spec](https://agentskills.io/specification) and use subdirectories:

```
skill-name/
├── SKILL.md           # Required: frontmatter + core instructions
├── scripts/           # Optional: executable code (Python/Bash)
├── references/        # Optional: docs loaded into context as needed
└── assets/            # Optional: templates, icons, fonts for output
```

### When to Use Subdirectories

| Directory | Use When |
|-----------|----------|
| `scripts/` | Same code is rewritten repeatedly or deterministic reliability is needed |
| `references/` | Large documentation that should be loaded on-demand, not always |
| `assets/` | Files used in output (templates, images) that shouldn't be loaded into context |

### Example: Large Skill with References

```
<<<<<<< HEAD
framework-best-practices/
├── SKILL.md                    # Core patterns + when to apply
├── references/
│   ├── patterns.md             # Detailed framework patterns
│   └── performance-metrics.md  # Performance analysis guides
└── assets/
    └── config.json             # Reusable configuration
=======
react-best-practices/
├── SKILL.md                    # Core patterns + when to apply
├── references/
│   ├── next-app-router.md      # Detailed App Router patterns
│   └── performance-metrics.md  # Bundle analysis guides
└── assets/
    └── lighthouse-config.json  # Reusable Lighthouse config
>>>>>>> 32d26a4 (feat(docs): add verification checklist and skill metadata to AI agent rules)
```

**Best practice:** Keep `SKILL.md` lean. Move detailed reference material to `references/` files to avoid hogging the context window.
