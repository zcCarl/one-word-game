# Roguelike Turn-Based Maze Task Plan

## Production Policy

Codex acts as PM and integration reviewer. Agents execute bounded work. No agent should replace this task plan with an unrelated architecture.

## Milestone 1: Design Lock

Owner: 正式01-制作人, 正式02-游戏策划, 正式06-主程

Deliverables:

- Confirm MVP scope.
- Confirm implementation stack.
- Confirm state model and module boundaries.
- Create issue breakdown for implementation.

Exit Criteria:

- GDD has no missing core loop.
- Main programmer has a concrete file/module plan.
- QA has an acceptance checklist.

## Milestone 2: Playable Core

Owner: 正式07-玩法程序, 正式08-UI程序

Deliverables:

- Board generation and reveal logic.
- Player stats, turn counter, combat loop.
- Basic HUD, board, action panel, log, restart.
- Victory/defeat.

Exit Criteria:

- A player can complete one full run without console errors.

## Milestone 3: Game Feel

Owner: 正式03-视觉总监, 正式04-美术提示词师, 正式05-技术美术, 正式09-音频设计

Deliverables:

- Visual direction and color palette.
- GPT image asset list and generation prompts.
- Tile states, enemy/item/event icons or placeholders with style.
- Basic animation/transition feedback.
- Audio feedback plan and simple generated/synthesized sounds if feasible.

Exit Criteria:

- Demo no longer reads as default gray UI.
- Important actions have visual/audio feedback.

## Milestone 4: QA and Polish

Owner: 正式10-QA Lead

Deliverables:

- Smoke test report.
- Bug list.
- Balance notes.
- Final acceptance decision.

Exit Criteria:

- Win route, lose route, and skill/shop route pass.
- Known issues documented.

## Agent Assignments

### 正式01-制作人

Create production schedule, risk list, issue routing, and final delivery checklist.

### 正式02-游戏策划

Refine GDD into exact monster/event/item tables and balance numbers.

### 正式03-视觉总监

Define compact dungeon-roguelike visual direction, UI hierarchy, tile state language, and screenshot acceptance criteria.

### 正式04-美术提示词师

Produce prompts for board tiles, adventurer, monsters, boss, items, event icons, UI frame, and optional background. Use `docs/art/gpt-asset-production-pipeline.md` and `docs/art/roguelike-maze-gpt-prompts.md` as the canonical GPT image workflow.

### 正式05-技术美术

Define asset import specs, icon sizes, animation timings, particle/flash feedback, and performance-safe rendering plan. Normalize generated GPT assets into the `assets/images/` structure.

### 正式06-主程

Choose stack and architecture. Define modules: game state, generator, combat, content tables, UI components, persistence/reset, tests.

### 正式07-玩法程序

Implement board generation, reveal, encounters, combat, rewards, leveling, victory/defeat, and seed support.

### 正式08-UI程序

Implement board UI, HUD, action panel, event/shop modal, combat feedback, log, responsive layout, and restart flow.

### 正式09-音频设计

Define BGM mood and interaction sounds: reveal, hit, enemy hit, item pickup, level up, buy, victory, defeat.

### 正式10-QA Lead

Write and run smoke checklist. Verify no static fake demo, no blocked path, no impossible win, and no UI overlap.
