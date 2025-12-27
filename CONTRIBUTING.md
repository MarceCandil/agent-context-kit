# Contributing

Thanks for your interest in **Agent Context Kit**.

## What to Contribute

- **New vendor adapters** — support for additional AI tools
- **Workflow improvements** — better default playbooks
- **Role card refinements** — clearer, more actionable guidance
- **CI/tooling** — drift detection, linting, automation
- **Documentation** — examples, screenshots, tutorials

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm

### Install & Verify

```bash
pnpm install
pnpm sync:ai
git diff --exit-code  # Should show no changes if outputs are in sync
```

## Contribution Workflow

### 1. Open an issue first (recommended)

Describe the problem and proposed approach. For new vendor adapters, include:
- Entrypoint file path(s)
- Size/format constraints
- Minimal example

### 2. Create a branch

```bash
git checkout -b vendor/new-tool
git checkout -b docs/readme-update
git checkout -b workflow/feature-dev-v2
```

### 3. Make changes

| Type | Location | Notes |
|------|----------|-------|
| Canon (source of truth) | `AGENTS.md`, `ai/*` | Edit these |
| Generated outputs | `CLAUDE.md`, `GEMINI.md`, `.clinerules`, `.cursor/*`, `.windsurf/*`, `.github/*` | Don't edit manually |
| Generated vendor rules | `.amazonq/rules/*`, `.augment/rules/*`, `.kilocode/rules/*`, `.qoder/rules/*` | Don't edit manually |

### 4. Regenerate & commit

```bash
pnpm sync:ai
git add -A
git commit -m "feat(vendor): add support for XYZ"
```

### 5. Open a PR

Include:
- What changed and why
- How to verify
- Compatibility notes (if any)

## PR Checklist

- [ ] Canon changes are minimal and modular
- [ ] `pnpm sync:ai` was run
- [ ] Generated outputs are committed
- [ ] Documentation updated if paths/behavior changed

## Adding a New Vendor

1. Edit `scripts/sync-ai-entrypoints.ts` — add a new emitter function
2. Follow existing patterns (see Claude/Cursor/Windsurf emitters)
3. Respect vendor constraints (file size limits, format requirements)
4. Update `README.md` to list the new vendor
5. Test with the actual tool if possible

## Security

If you find a security issue (prompt injection risk, secret leakage guidance), open an issue with minimal detail. Do not include exploit specifics publicly.

## License

By contributing, you agree to license your work under MIT.
