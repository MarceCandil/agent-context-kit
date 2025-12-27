---
name: bug-fix
description: Reproduce → Fix → Prevent regression
---

# Bug Fix Workflow

## Step 1 — Reproduce
- Exact steps + expected vs actual.
- Identify logs/errors and relevant code paths.

## Step 2 — Root cause
- Explain the cause in 2–5 lines.

## Step 3 — Fix
- Minimal fix. Avoid unrelated refactors.

## Step 4 — Regression prevention
- Add/update tests if feasible.
- Add manual verification steps if not.

## Step 5 — Verify
- Re-run the repro steps.
- Run lint/typecheck/tests as applicable.