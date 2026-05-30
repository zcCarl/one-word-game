# 2026-05-30 Issue Follow-up Postmortem

## Context

Active request: build a turn-based roguelike maze demo inspired by Gumballs & Dungeons.

The 10-agent team produced planning, design, art, audio, architecture, gameplay, UI, and QA work. During issue review, the board showed a blocked QA result even though a playable UI branch had later been produced.

## What Went Wrong

1. QA tested an outdated target.
   - QA ran against commit `33446f0`, which only contained planning/art pipeline docs.
   - A playable candidate later appeared on `origin/agent/08-ui/7e0f69f5` at commit `3688468`, but this branch was not the QA target.

2. There was no single QA target branch.
   - `origin/main` stayed at `88668c3`.
   - Agent output lived on separate branches, so issue status looked better than the branch QA could actually test.

3. Blocker ownership was missing at first.
   - `DOG-113` correctly identified the missing runnable app, but initially had no assignee.
   - A blocker without an owner cannot drive integration.

4. Issue structure became duplicated.
   - Earlier issues `DOG-95` to `DOG-103` and later issues `DOG-104` to `DOG-112` overlapped.
   - This created two progress tracks: broad execution issues and milestone issues.

5. Local implementation and agent implementation diverged.
   - The local repo contains uncommitted assets/app files.
   - Agent branches also produced runnable app work, creating uncertainty about the canonical implementation path.

## Permanent Fixes

The following rules are now project policy:

1. QA can only start after `Branch Gate`, `Launch Gate`, `Issue Gate`, `Evidence Gate`, and `Retest Gate` pass.
2. Agent branch work is only a candidate until merged into the declared QA target branch.
3. Every blocker must have an owner within the same review cycle.
4. Parent issues are for orchestration only; child issues are for concrete deliverables. Duplicates must be linked or closed before QA.
5. Issue comments for completed work must include branch, commit SHA, run command, verification command, and known risk.

## Current Corrective Actions

- `DOG-113` was assigned to 正式06-主程 and moved to `in_progress`.
- `DOG-103`, `DOG-113`, and `DOG-94` now contain follow-up comments explaining the true state.
- The active critical path is to integrate `origin/agent/08-ui/7e0f69f5` onto the QA target branch, verify launch, then rerun QA.

## Next Run Checklist

Before dispatching QA:

- [ ] Codex names the QA target branch and commit SHA.
- [ ] 主程 confirms the branch includes all intended agent output.
- [ ] README launch command works from a clean checkout.
- [ ] All blockers have assignees.
- [ ] Duplicate issues are marked as parent/child or closed.
- [ ] QA report states exact branch, commit SHA, launch command, and tested routes.
