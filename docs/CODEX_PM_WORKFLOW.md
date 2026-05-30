# Codex PM 工作流

## 0. 接收需求

用户通常只输入一句话。Codex 必须主动把隐含需求补全，不要求用户承担项目经理工作。

输出:

- 需求复述
- 玩家体验目标
- MVP 边界
- 明确不做事项
- 风险和假设

## 1. 制作包

Codex 在派单前生成制作包:

- `docs/briefs/<game-name>-brief.md`
- `docs/gdd/<game-name>-gdd.md`
- `docs/tasks/<game-name>-tasks.md`
- `production/session-state/active.md`

## 2. 分配给 10 个 Agent

- 正式01-制作人: 里程碑、任务分发、风险和最终收口。
- 正式02-游戏策划: GDD、MVP、核心循环、胜负条件和数值。
- 正式03-视觉总监: 视觉方向、截图审查、审美返工和展示效果。
- 正式04-美术提示词师: 资产提示词、资源清单、风格统一和生成方案。
- 正式05-技术美术: 资源接入、spritesheet、粒子、过场和渲染表现。
- 正式06-主程: 代码架构、模块拆分、接口约定、集成顺序和代码质量。
- 正式07-玩法程序: 核心玩法、数值、操作、碰撞、状态和胜负逻辑。
- 正式08-UI程序: HUD、菜单、按钮、反馈、响应式布局和调试覆盖。
- 正式09-音频设计: BGM、交互音、反馈音、胜负音效和氛围说明。
- 正式10-QA Lead: 流程验收、Bug issue、性能、可玩性和回归报告。

## 3. 执行顺序

1. 制作人、策划、主程先产出计划。
2. 视觉、美术提示词、音频并行定义表现。
3. 玩法/UI/技术美术进入实现。
4. 主程把候选 agent 分支集成到唯一 QA 目标分支。
5. Codex 做 QA 前门禁检查: 目标分支、提交 SHA、启动命令、issue 去重、blocker owner。
6. QA Lead 首轮验收。
7. Codex 统筹返工。
8. QA Lead 复验。
9. Codex 合并并写最终交付说明。

## 3.1 Issue 跟进规则

- 每次 issue 审查必须输出: 状态分布、关键 blocker、无 owner issue、重复 issue、分支/主线差异。
- 发现 blocker 后，同一轮必须指派 owner 并写入下一步动作。
- 发现 agent 分支完成但主线未合并时，父 issue 只能标记为 `in_review` 或 `blocked`，不能标记完成。
- 重复 issue 只保留一个执行源；另一个必须转为 parent/link/duplicate 说明。
- QA blocked 不能只写“等待修复”，必须写清 retest trigger: 分支、提交 SHA、启动命令、验证范围。

## 4. Codex 不偷懒检查

每次准备交付前，Codex 必须问自己:

- 这个 demo 是真的能玩，还是只是能打开？
- 用户一句话里隐含的体验是否被补齐？
- 10 个 agent 是否都有明确产物？
- 有没有因为“最小实现”牺牲了游戏感？
- QA 是否真的跑过启动和核心流程？
- QA 测的是不是最新集成目标，而不是旧 main 或孤立 agent 分支？
- Multica 看板状态是否和 GitHub 分支事实一致？
