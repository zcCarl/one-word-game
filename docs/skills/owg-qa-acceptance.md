# owg-qa-acceptance

## Use When

The agent validates a playable game build.

## Required Inputs

- `docs/acceptance/roguelike-turn-based-maze-acceptance.md`
- Local launch command
- Current build or dev server
- QA target branch and commit SHA

## Workflow

1. Confirm the branch and commit SHA match the QA target.
2. Run the app from the documented launch command.
3. Test win route, loss route, and shop/skill route.
4. Check console errors and layout issues.
5. Verify generated assets render and fallbacks work.
6. File blocking issues with exact reproduction steps.

## Output Standard

- Environment
- Branch, commit SHA, and launch command
- Steps run
- Pass/fail checklist
- Bugs with severity
- Final acceptance decision

## Hard Rules

- Do not approve by reading code only.
- Do not ignore UI overlap or broken assets.
- QA Lead can block release.
- Do not test an unspecified or stale branch.
- If blocked, state the exact retest trigger required before another QA run.
