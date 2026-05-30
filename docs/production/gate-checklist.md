# Production Gate Checklist

This checklist is mandatory before QA dispatch, blocker retest, and final delivery.

## Branch Gate

- [ ] QA target branch is named.
- [ ] QA target commit SHA is named.
- [ ] The branch exists on GitHub or in the shared Multica workspace.
- [ ] The branch includes all agent outputs intended for this QA pass.

Fail action: do not dispatch QA. Assign integration to 正式06-主程.

## Launch Gate

- [ ] README or delivery comment includes the exact launch command.
- [ ] The launch command works from a clean checkout of the QA target branch.
- [ ] The first screen is playable or one click away from playable.
- [ ] Startup does not depend on uncommitted local-only files.

Fail action: file or keep a blocker like `DOG-113`; assign an owner immediately.

## Issue Gate

- [ ] Every blocker has an owner.
- [ ] Parent issues are orchestration only.
- [ ] Child issues contain concrete deliverables and acceptance criteria.
- [ ] Duplicate issues are marked as duplicate, child, or follow-up before QA.
- [ ] Broad old issues and granular new issues do not both claim the same completion.

Fail action: producer resolves the issue map before implementation or QA continues.

## Evidence Gate

- [ ] Each completed implementation issue names branch and commit SHA.
- [ ] Each completed implementation issue includes run/test commands.
- [ ] Visual/UI work includes screenshot or viewport verification.
- [ ] Audio/art work includes generated assets, fallback plan, or integration notes.
- [ ] Any unavailable verification is called out as residual risk.

Fail action: keep the issue in `in_progress` or `in_review`, not accepted.

## Retest Gate

- [ ] The blocker fix comment names branch, commit SHA, and verification command.
- [ ] QA retests the original failure steps.
- [ ] QA report states whether each original blocker is fixed.
- [ ] New defects are filed as separate linked issues.

Fail action: keep the blocker open and do not move the parent issue to accepted.

## Required QA Dispatch Template

```text
QA target branch:
QA target commit:
Launch command:
Verification commands:
Included agent branches/issues:
Known residual risks:
Retest trigger, if any:
```
