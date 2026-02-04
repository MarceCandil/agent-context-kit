---
name: pr-review
description: Review changes using a consistent checklist
---

# PR Review Workflow

> **Checklist:** Use `ai/skills/review-checklist.md` for detailed criteria.

## Step 1 — Understand intent
- What is the goal? Are acceptance criteria met?

## Step 2 — Apply review checklist
- Run through `@review-checklist` skill for correctness, code quality, and quality gates.

## Step 3 — Verify tests
- Are tests sufficient for the behavior change?
- Are manual verification steps documented?

## Step 4 — Assess risk
- Identify migration/deploy implications.
- Confirm rollback notes for non-trivial changes.