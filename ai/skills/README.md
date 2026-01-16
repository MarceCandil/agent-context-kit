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
| `react-best-practices.md` | React/Next.js optimization (example) |

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

The `react-best-practices.md` skill is an **example template** from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills). You can:

- **Modify it** for your specific React/Next.js conventions
- **Replace it** with skills for Vue, Angular, Svelte, Go, Python, etc.
- **Delete it** if not relevant to your stack
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
