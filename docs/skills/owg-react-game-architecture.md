# owg-react-game-architecture

## Use When

The agent designs or reviews the React/Vite architecture for the demo.

## Required Inputs

- `src/game/types.ts`
- `src/game/logic.ts`
- `docs/gdd/roguelike-turn-based-maze-gdd.md`

## Workflow

1. Keep game rules in pure TypeScript modules.
2. Keep React components focused on rendering and input.
3. Keep content tables separate from state mutation.
4. Preserve deterministic seed support for QA.
5. Ensure build, dev server, and asset imports work.

## Output Standard

- File/module map
- State transition notes
- Integration order
- Risks and test points

## Hard Rules

- Do not hide gameplay rules inside UI event handlers.
- Do not introduce large frameworks for a small MVP.
- Do not break local launch.

