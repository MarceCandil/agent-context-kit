---
name: deploy
description: Build → Deploy → Observe → Rollback readiness
---

# Deploy Workflow

## Step 1 — Preconditions
- Confirm env vars, secrets handling, and build pipeline.

## Step 2 — Build & checks
- Run build/typecheck/tests.

## Step 3 — Deploy
- Follow standard deploy steps for this repo.

## Step 4 — Observe
- Verify health checks, logs, and key metrics.

## Step 5 — Rollback plan
- Define revert steps and verification.