---
name: db
description: Database schema changes and migration workflows. Use when creating, modifying, or rolling back migrations.
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/skills/db.md -->

# Skill: Database & migrations

## Rules
- Never edit migration history retroactively once merged.
- Prefer additive changes (new migrations) over rewriting.

## Workflow
1) Describe the schema change in plain language.
2) Generate a migration using the repo’s standard command.
3) Apply migration locally.
4) Update seeds/fixtures (if required).
5) Add minimal tests (or verification steps) to prove data integrity.

## Safety
- Avoid destructive operations without explicit confirmation.
- For risky changes, propose a rollback plan.
