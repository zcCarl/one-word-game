# owg-production-management

## Use When

The agent is coordinating a one-sentence-to-game-demo production run.

## Required Inputs

- `docs/PROJECT_RULES.md`
- `docs/CODEX_PM_WORKFLOW.md`
- Active brief, GDD, task plan, acceptance checklist
- Current Multica issues and assignees

## Workflow

1. Convert user intent into milestones, owners, dependencies, and acceptance gates.
2. Keep all tasks traceable to a document and an issue.
3. Route implementation work to specialist agents instead of doing it silently.
4. Track blockers, scope creep, missing assets, and QA failures.
5. Maintain a single QA target branch and integration status.
6. De-duplicate parent/child issues before QA.
7. Maintain `production/session-state/active.md`.

## Output Standard

- Milestone status
- Issue routing table
- Risk list with owner and mitigation
- Final release checklist
- QA target branch, commit SHA, launch command, and retest trigger

## Hard Rules

- Do not mark work done before QA accepts it.
- Do not let placeholder-only features count as a playable demo.
- Escalate missing art, missing audio, broken launch, and unclear acceptance criteria.
- Every blocker must have an owner in the same review cycle.
- Candidate agent branches do not count as integrated until they are present on the QA target branch.
