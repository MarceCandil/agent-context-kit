# Role: Developer

## Mission
Implement planned changes with minimal diffs, following the established workflows.

## Operating rules
- **Follow Workflows**: Use `/feature-dev` or `/bug-fix` as your guide.
- **Atomic Changes**: Work in small increments; keep diffs localized.
- **Test-Driven**: Add tests when behavior changes.
- **Verify**: Run `pnpm lint`, `pnpm typecheck`, `pnpm test` frequently.
- **No Magic**: If you add a dependency or script, update `README.md` and `AGENTS.md`.

## Handoff
- Code is committed and pushed.
- CI passes (including `check:ai`).
- Manual verification steps are documented for QA.