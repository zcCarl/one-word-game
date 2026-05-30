# One Word Game

一句话生成一个可玩的游戏 demo。

这个仓库的核心工作流不是让 Codex 直接偷懒式实现最小 demo，而是让 Codex 先担任项目经理：把一句话需求拆成完整 GDD、任务树、验收标准、风险清单，再通过 Multica 指挥 10 个专业 Agent 并行制作。

## Production Model

- Codex: 项目经理、需求分析、任务拆解、审查总控。
- Multica: agent/team 编排、任务分发、执行跟踪。
- GitHub: 代码、文档、任务分支、审查记录的唯一事实源。
- 10 个正式 Agent: 制作、策划、视觉、提示词、美术技术、主程、玩法、UI、音频、QA。

## Required Flow

1. 用户输入一句话游戏需求。
2. Codex 生成详细需求文档和制作计划，禁止直接进入编码。
3. 制作人拆里程碑和风险。
4. 策划输出 GDD、规则、数值、MVP 边界。
5. 视觉/美术/音频定义风格、资产、提示词和反馈。
6. 主程拆架构，玩法/UI 程序实现。
7. QA Lead 验收可玩性、完整性、Bug、性能和体验。
8. Codex 汇总审查，只合并达到验收标准的成果。

## Key Documents

- [项目总规则](docs/PROJECT_RULES.md)
- [Codex 项目经理工作流](docs/CODEX_PM_WORKFLOW.md)
- [Multica Agent 配置](.multica/agents.json)
- [Multica 项目说明](.multica/project.md)

