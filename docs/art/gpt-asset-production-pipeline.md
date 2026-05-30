# GPT Asset Production Pipeline

## Goal

Codex controls GPT image generation as a centralized production step. Agents define requirements, but they do not independently generate random assets. This keeps the game's visual direction consistent and prevents asset chaos.

## Ownership

- Codex: generation operator, prompt consolidation, file naming, repo commit.
- 正式03-视觉总监: style approval and screenshot quality bar.
- 正式04-美术提示词师: prompt packet and negative constraints.
- 正式05-技术美术: asset dimensions, transparency, slicing, import specs.
- 正式08-UI程序: confirms UI readability after assets are integrated.
- 正式10-QA Lead: verifies assets are visible, readable, and not blocking gameplay.

## Production Flow

1. Prompt packet
   - 美术提示词师 writes prompts in `docs/art/roguelike-maze-gpt-prompts.md`.
   - Prompts must describe subject, camera, shape language, palette, style, output format, and negative constraints.

2. Style pass
   - Codex generates one contact sheet for art direction.
   - 视觉总监 chooses the final style or requests revisions.

3. MVP asset pass
   - Codex generates production assets from approved prompts.
   - Required MVP assets are icons/tiles first, not full animation.

4. Technical pass
   - 技术美术 normalizes dimensions and transparency.
   - Recommended target:
     - Tiles/icons: 256x256 PNG.
     - UI panels: 1024x512 PNG or CSS-native when possible.
     - Background: 1920x1080 JPG/PNG.

5. Integration pass
   - Codex or UI/Gameplay agents integrate assets into the app.
   - Every asset gets a readable fallback label or color state.

6. QA pass
   - QA checks visibility, overlap, contrast, load errors, and gameplay clarity.

## Folder Structure

```text
assets/
  images/
    characters/
    monsters/
    tiles/
    items/
    ui/
    backgrounds/
  audio/
    sfx/
    bgm/
docs/
  art/
```

## Rules

- Do not copy the visual identity of 不思议迷宫. Reference only the gameplay pattern: tile reveal, dungeon exploration, compact roguelike decisions.
- Prefer original dark fantasy dungeon style with clear readable icons.
- MVP assets must be clear at small size.
- All interactable states need distinct visual treatment.
- Do not block implementation while waiting for perfect art.
- If a generated asset is not ready, use a styled placeholder and record replacement work.

## MVP Asset Priority

1. Tile states: hidden, available, revealed, current, enemy, treasure, event, shop, trap, boss.
2. Character icons: adventurer, slime, skeleton, mimic, dungeon boss.
3. Item icons: potion, iron blade, old shield, gold, energy crystal.
4. UI: action button texture, panel frame, log panel treatment.
5. Background: compact dungeon board backdrop.

## Audio Policy

MVP audio starts with WebAudio synthesized SFX so development is not blocked by external files. Generated or sourced audio can replace these later.

Required SFX:

- reveal
- player_hit
- enemy_hit
- pickup
- buy
- level_up
- victory
- defeat

