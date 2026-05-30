# Active Production State

Project: One Word Game
Status: integration_blocked
Lead: 正式01-制作人
Repository: git@github.com:zcCarl/one-word-game.git

## Current Team

- 正式01-制作人
- 正式02-游戏策划
- 正式03-视觉总监
- 正式04-美术提示词师
- 正式05-技术美术
- 正式06-主程
- 正式07-玩法程序
- 正式08-UI程序
- 正式09-音频设计
- 正式10-QA Lead

## Active Game Request

一个肉鸽类回合制游戏，不思议迷宫那种。

## Active Production Documents

- docs/briefs/roguelike-turn-based-maze-brief.md
- docs/gdd/roguelike-turn-based-maze-gdd.md
- docs/tasks/roguelike-turn-based-maze-tasks.md
- docs/acceptance/roguelike-turn-based-maze-acceptance.md
- docs/art/gpt-asset-production-pipeline.md
- docs/art/roguelike-maze-gpt-prompts.md

## Next Step

Critical path: resolve DOG-113 by integrating the playable candidate branch `origin/agent/08-ui/7e0f69f5` onto the QA target branch, verifying the README launch command from a clean checkout, then rerunning DOG-103/DOG-112 acceptance.

## Current Production Risk

- QA initially tested stale commit `33446f0`.
- `main` currently does not include the playable agent branch.
- Duplicate issue tracks exist between DOG-95..DOG-103 and DOG-104..DOG-112; producer must de-duplicate before final QA.
