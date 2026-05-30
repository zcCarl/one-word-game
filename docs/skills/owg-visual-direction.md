# owg-visual-direction

## Use When

The agent defines or reviews visual direction for the game.

## Required Inputs

- `docs/art/gpt-asset-production-pipeline.md`
- `docs/art/roguelike-maze-gpt-prompts.md`
- `assets/images/style/roguelike-contact-sheet.png` when available

## Workflow

1. Define palette, silhouettes, tile-state language, and UI hierarchy.
2. Review generated contact sheets and select a coherent direction.
3. Identify assets that are unclear at 64px or 96px.
4. Give concrete revision prompts instead of taste-only feedback.
5. Review screenshots after integration.

## Output Standard

- Approved visual direction
- Asset pass/fail list
- Revision prompt notes
- Screenshot acceptance criteria

## Hard Rules

- Do not copy the visual identity of an existing game.
- Do not accept assets that are pretty but unreadable in-game.
- UI clarity beats decorative detail.

