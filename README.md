# Agent Context Kit

**Stop context drift in multi-vendor AI development.**

One canonical set of rules → auto-generated entrypoints for 17+ AI coding tools.

## The Problem

Each AI coding assistant has its own instruction file (`.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`, etc.). Maintaining them manually leads to divergence and inconsistent behavior across tools.

## The Solution

```
ai/AI.md (Hub)          →  pnpm sync:ai  →  CLAUDE.md
ai/constitution.md                          .cursor/rules/*
ai/roles/*                                  .windsurf/*
ai/workflows/*                              .github/copilot-instructions.md
                                            + 14 more vendor files
```

**Edit once, generate everywhere.**

## Supported Vendors

| Vendor | Entrypoint | Type |
|--------|------------|------|
| Claude Code | `CLAUDE.md` | Generated (imports) |
| Cursor | `.cursor/rules/*.mdc` | Generated |
| Windsurf | `.windsurf/rules/*`, `.windsurf/workflows/*` | Generated |
| GitHub Copilot | `.github/copilot-instructions.md` | Generated |
| Gemini CLI | `GEMINI.md` | Generated (imports) |
| Qwen Code | `QWEN.md` | Generated (imports) |
| Amazon Q Developer | `.amazonq/rules/*.md` | Generated (rules) |
| Codex CLI | `AGENTS.md` | Native |
| Roo Code / Cline | `.clinerules` | Generated |
| Auggie CLI (Augment) | `.augment/rules/*.md` | Generated (rules) |
| CodeBuddy | `CODEBUDDY.md` | Generated |
| Qoder | `.qoder/rules/*` | Generated (rules) |
| OpenCode | `AGENTS.md`, `opencode.json` | Native + Generated config |
| Amp | `AGENTS.md` | Native |
| Kilo Code | `.kilocode/rules/*` | Generated (rules) |
| Jules | `AGENTS.md` | Native |
| SHAI | `SHAI.md` | Generated |

> **Generated** = full context bundled. **Generated (imports)** = uses `@...` to load canon without duplication. **Generated (rules)** = uses vendor rules folders. **Native** = reads `AGENTS.md`.

## Vendor Notes (verified)

- Cursor rules: https://cursor.com/docs/context/rules
- Claude Code memory (`CLAUDE.md`, `@imports`): https://code.claude.com/docs/en/memory
- Gemini CLI context files (`GEMINI.md`, `@imports`): https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/gemini-md.md
- Qwen Code context files (`QWEN.md`, `@imports`): https://qwenlm.github.io/qwen-code-docs/en/users/configuration/settings/#context-files-hierarchical-instructional-context
- Codex CLI memory (`AGENTS.md`): https://github.com/openai/codex/blob/main/docs/getting-started.md#memory-with-agentsmd
- Cline rules (`.clinerules`): https://docs.cline.bot/features/cline-rules
- Windsurf rules/workflows (`.windsurf/*`, 12000 char limit): https://docs.windsurf.com/windsurf/cascade/memories and https://docs.windsurf.com/plugins/cascade/workflows
- GitHub Copilot repo instructions: https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions
- Amazon Q Developer project rules (`.amazonq/rules/*.md`): https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/context-project-rules.html
- Auggie rules loading order (`.augment/rules/*`, `AGENTS.md`, `CLAUDE.md`): https://docs.augmentcode.com/cli/rules
- CodeBuddy context file (`CODEBUDDY.md`): https://copilot.tencent.com/docs/cli/common-workflows
- OpenCode rules (`AGENTS.md`, `opencode.json`): https://opencode.ai/docs/rules/
- Kilo Code custom rules (`.kilocode/rules/*`): https://kilo.ai/docs/advanced-usage/custom-rules
- Qoder rules (`.qoder/rules`): https://docs.qoder.com/user-guide/rules
- Jules repo instructions (`AGENTS.md`): https://jules.google/docs#include-agentsmd-file
- SHAI project context (`SHAI.md`): https://github.com/ovh/shai#project-context-file

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm

### 1. Install

```bash
pnpm install
```

### 2. Customize the canon

Edit these files to match your project:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Commands, setup, project boundaries |
| `ai/constitution.md` | Non-negotiables (quality, safety) |
| `ai/roles/*.md` | Role cards (Tech Lead, Dev, QA, DevOps) |
| `ai/workflows/*.md` | Step-by-step playbooks |
| `ai/skills/*.md` | Reusable knowledge (git, testing, db) |
| `.windsurf/skills/*/SKILL.md` | Native Windsurf skills (see below) |

### 3. Generate entrypoints

```bash
pnpm sync:ai
```

### 4. Commit everything

```bash
git add -A && git commit -m "chore: sync ai entrypoints"
```

## Architecture

```
ai/
  AI.md                 # Hub: entry point for all agents
  constitution.md       # Quality gates, safety rules
  roles/                # How to think (Tech Lead, Dev, QA, DevOps)
  skills/               # Reusable knowledge (git, test, db, review)
  workflows/            # How to execute (feature, bugfix, PR, deploy)

scripts/
  sync-ai-entrypoints.ts   # Generator script
```

## Multi-Role Workflow

This kit enables **role switching** within a single agent session:

1. **Tech Lead** → Clarify scope, define plan (`ai/workflows/feature-dev.md`)
2. **Dev** → Implement incrementally (`ai/roles/dev.md`)
3. **QA** → Verify edge cases (`ai/roles/qa.md`)
4. **Tech Lead** → PR review (`ai/workflows/pr-review.md`)

### Windsurf: invoke workflows directly

```
/feature-dev
/bug-fix
/pr-review
/deploy
```

## Native Windsurf Skills

In addition to bundled rules, this kit includes **native Windsurf skills** in `.windsurf/skills/`:

| Skill | Description |
|-------|-------------|
| `db` | Database schema changes and migrations |
| `git` | Git workflows and PR hygiene |
| `test` | Testing strategy and best practices |
| `review-checklist` | Code review guidelines |
| `react-best-practices` | React/Next.js optimization (example) |

### Customization

> **This repository supports multiple languages and frameworks.**

The `react-best-practices` skill is an **example template** from [Vercel's agent-skills](https://github.com/vercel-labs/agent-skills). You can:

- Modify it for your specific React/Next.js conventions
- Create similar skills for Vue, Angular, Svelte, Go, Python, etc.
- Delete it if not relevant to your stack

See `.windsurf/skills/README.md` for details on creating your own skills.

## CI: Fail on Drift

```bash
pnpm sync:ai && git diff --exit-code
```

Add this to your CI pipeline to ensure generated files stay in sync with the canon.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
