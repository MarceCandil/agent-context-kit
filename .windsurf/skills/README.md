# Windsurf Skills

This folder contains **native Windsurf skills** using the official SKILL.md format.

## What are Skills?

Skills help Cascade handle complex, multi-step tasks. They bundle instructions, templates, checklists, and supporting files that Cascade can invoke when relevant.

## Structure

Each skill is a folder with:
- `SKILL.md` - Main file with YAML frontmatter (`name`, `description`) + markdown content
- Optional supporting files (templates, checklists, examples)

```
.windsurf/skills/
├── db/
│   └── SKILL.md
├── git/
│   └── SKILL.md
├── test/
│   └── SKILL.md
├── review-checklist/
│   └── SKILL.md
└── react-best-practices/    # Example skill (customizable)
    ├── SKILL.md
    └── AGENTS.md
```

## How Skills are Invoked

1. **Automatic** - Cascade uses "progressive disclosure" to invoke skills when your request matches the skill's `description`
2. **Manual** - Type `@skill-name` in Cascade input (e.g., `@db`, `@git`)

## Customization

> **This repository supports multiple languages and frameworks.**

The included skills are **templates** you can modify:

- **react-best-practices** - An example from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills). Adapt it for Vue, Angular, Svelte, or your specific stack.
- **db, git, test, review-checklist** - Generic skills. Customize with your project's conventions.

### Creating Your Own Skills

1. Create folder: `.windsurf/skills/<skill-name>/`
2. Add `SKILL.md` with frontmatter:
   ```markdown
   ---
   name: my-skill
   description: When to use this skill
   ---

   # My Skill

   Instructions here...
   ```
3. Add supporting files as needed

## Skills vs Rules

| Feature | Skills | Rules |
|---------|--------|-------|
| Purpose | Complex tasks with resources | Behavioral guidelines |
| Structure | Folder with SKILL.md + files | Single .md file |
| Invocation | Automatic or @-mention | Trigger-based |
| Best for | Multi-step workflows | Coding style preferences |

## More Information

- [Windsurf Skills Documentation](https://docs.windsurf.com/windsurf/cascade/skills)
- [Agent Skills Specification](https://agentskills.io)
