# Roguelike Turn-Based Maze GDD

## Overview

`迷宫回合 Rogue Demo` 是一个轻量肉鸽回合制迷宫探索游戏。玩家从入口开始，点击相邻未知格子进行探索。每次探索或战斗都会推进回合，并触发敌人、事件、资源或奖励。目标是在资源耗尽前击败 Boss 或找到通关楼梯。

## Player Fantasy

玩家是一个孤身进入神秘迷宫的冒险者。每一格都可能改变局势：怪物、宝箱、陷阱、祭坛、商人、药水、遗物。玩家需要在“继续深入”和“保命成长”之间做判断。

## Detailed Rules

### Board

- 地图为 7x7 网格。
- 起点固定在底部中央。
- 初始只显示起点和相邻可探索格。
- 点击已解锁的相邻未知格会翻开该格。
- 不能跨格移动。
- 已翻开的普通格可以移动经过。
- Boss 格在地图远端区域生成。

### Turn Flow

1. 玩家选择行动：探索、移动、攻击、技能、购买、事件选择。
2. 系统结算行动。
3. 如果敌人存活，敌人反击。
4. 应用奖励、状态和死亡检查。
5. 更新可探索格、日志和 HUD。

### Encounters

- Monster: 进入战斗。
- Treasure: 获得金币、药水或装备。
- Event: 二选一或三选一事件。
- Shop: 花金币购买治疗、攻击提升或护盾。
- Trap: 失去 HP，但可能得到金币。
- Shrine: 牺牲 HP 换攻击/防御/能量。
- Boss: 击败后胜利。

### Combat

- 玩家与敌人轮流结算。
- 玩家攻击伤害：`max(1, player.attack - enemy.defense)`。
- 敌人反击伤害：`max(1, enemy.attack - player.defense)`。
- 击败敌人获得 XP 和金币。
- XP 达标后升级，获得最大 HP、攻击或防御提升。

### Skills

MVP 只需要 1 个主动技能：

- `Power Strike`: 消耗 2 Energy，对当前敌人造成 `attack * 2` 伤害。
- Energy 通过宝箱、事件或升级恢复。

### Items

- `Potion`: 恢复 12 HP。
- `Iron Blade`: 攻击 +2。
- `Old Shield`: 防御 +1。

### Game States

- Start
- Exploring
- Combat
- EventChoice
- Shop
- Victory
- Defeat

## Formulas

- `playerDamage = max(1, playerAttack - enemyDefense)`
- `enemyDamage = max(1, enemyAttack - playerDefense)`
- `levelUpXp = 6 + currentLevel * 3`
- `rewardGold = encounterTier * 2 + random(0, 3)`
- `score = floorExplored * 10 + kills * 25 + gold * 2 + victoryBonus`

## Edge Cases

- 玩家 HP <= 0 立即失败。
- Boss 被击败立即胜利。
- 地图生成必须保证起点到 Boss 可达。
- 商店金币不足时按钮禁用。
- Energy 不足时技能按钮禁用。
- 没有可探索格时，自动揭示一条通往 Boss 的相邻路径。

## Dependencies

- 需要一个前端可运行项目，建议 Vite + React 或纯 HTML/Canvas。
- 需要 deterministic-ish random seed 支持，便于 QA 复现。
- 需要状态管理清晰，方便玩法/UI/QA 分工。

## Tuning Knobs

- 地图尺寸：6x6 / 7x7。
- 怪物数量比例。
- 宝箱/事件/陷阱/商店比例。
- 初始 HP、Attack、Defense、Energy。
- Boss 属性。
- 升级阈值和奖励。

## Acceptance Criteria

- 可以启动 demo 并直接游玩。
- 每局生成不同地图，但始终可通关。
- 至少 3 种怪物、3 种事件、3 种道具、1 个 Boss。
- UI 显示 HP、Attack、Defense、Gold、Energy、Level、XP、Turn。
- 有行动日志，记录探索、战斗、奖励和事件。
- 有胜利、失败和重开。
- QA 能完成至少 3 次回归测试：胜利路线、失败路线、技能/商店路线。

