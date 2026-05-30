# owg-gameplay-systems

## Use When

The agent implements gameplay logic for the turn-based maze.

## Required Inputs

- `src/game/content.ts`
- `src/game/logic.ts`
- GDD and acceptance checklist

## Workflow

1. Implement board generation, reveal, movement, and encounters.
2. Implement combat with exact formulas.
3. Implement rewards, XP, leveling, shop, events, Boss, victory, defeat.
4. Keep all changes deterministic where possible.
5. Log meaningful player-facing outcomes.

## Output Standard

- Code changes
- Gameplay scenario notes
- Known balance risks
- Verification steps

## Hard Rules

- No static fake board.
- No unreachable Boss.
- No impossible win path from normal play.

