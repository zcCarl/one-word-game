# owg-roguelike-design

## Use When

The agent designs mechanics for a compact turn-based roguelike maze demo.

## Required Inputs

- `docs/gdd/roguelike-turn-based-maze-gdd.md`
- `docs/acceptance/roguelike-turn-based-maze-acceptance.md`

## Workflow

1. Define the player goal, loss condition, and one-run loop.
2. Produce content tables for monsters, events, rewards, shop items, and Boss stats.
3. Make every mechanic testable with exact numbers.
4. Define tuning knobs separately from fixed rules.
5. Flag anything that is not MVP.

## Output Standard

- Content tables
- Formula notes
- Edge cases
- Balance risks
- QA scenarios

## Hard Rules

- No vague mechanics like “interesting event” without choices and outcomes.
- No untestable rules.
- Every random element must still preserve a reachable win path.

