# owg-technical-art-pipeline

## Use When

The agent prepares generated art for game integration.

## Required Inputs

- Generated source images
- `assets/images/` structure
- UI and gameplay implementation plan

## Workflow

1. Normalize dimensions and naming.
2. Crop or slice contact sheets into production icons.
3. Preserve source contact sheets under `assets/images/style/`.
4. Put final assets into typed folders: tiles, characters, monsters, items, ui, backgrounds.
5. Define animation and feedback timing.

## Output Standard

- Asset manifest
- File path list
- Size/format notes
- Integration risks
- Replacement backlog

## Hard Rules

- Do not delete source generated images unless explicitly asked.
- Do not block playable implementation waiting for perfect art.
- Keep fallback states for every interactable tile.

