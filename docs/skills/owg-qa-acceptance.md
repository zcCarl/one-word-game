# owg-qa-acceptance

## Use When

The agent validates a playable game build.

## Required Inputs

- `docs/acceptance/roguelike-turn-based-maze-acceptance.md`
- Local launch command
- Current build or dev server

## Workflow

1. Run the app.
2. Test win route, loss route, and shop/skill route.
3. Check console errors and layout issues.
4. Verify generated assets render and fallbacks work.
5. File blocking issues with exact reproduction steps.

## Output Standard

- Environment
- Steps run
- Pass/fail checklist
- Bugs with severity
- Final acceptance decision

## Hard Rules

- Do not approve by reading code only.
- Do not ignore UI overlap or broken assets.
- QA Lead can block release.

