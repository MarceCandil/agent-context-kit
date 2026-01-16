---
name: review-checklist
description: Code review guidelines and checklist. Use this skill when reviewing pull requests, providing feedback, or ensuring code quality standards are met.
---

# Skill: Review Checklist

## Correctness
- Meets acceptance criteria
- Handles edge cases (null/empty/error/loading)
- No hidden breaking changes

## Code Quality
- Clear naming, minimal complexity
- Follows existing repo patterns
- No unnecessary abstractions

## Quality Gates
- Lint/typecheck/tests pass
- New/updated tests for behavior changes
- Clear manual verification steps

## Risk
- Calls out migration/deploy implications (if any)
- Includes rollback notes for non-trivial changes
