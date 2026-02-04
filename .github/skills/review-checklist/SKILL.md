---
name: review-checklist
description: Code review guidelines. Use when reviewing pull requests or ensuring quality standards.
---

<!-- GENERATED. DO NOT EDIT DIRECTLY. Source: ai/skills/review-checklist.md -->

# Skill: Review checklist

## Correctness
- Meets acceptance criteria
- Handles edge cases (null/empty/error/loading)
- No hidden breaking changes

## Code quality
- Clear naming, minimal complexity
- Follows existing repo patterns
- No unnecessary abstractions

## Quality gates
- Lint/typecheck/tests pass
- New/updated tests for behavior changes
- Clear manual verification steps

## Risk
- Calls out migration/deploy implications (if any)
- Includes rollback notes for non-trivial changes
