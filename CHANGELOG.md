# 更新日志 Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/cn/1.1.0/) 格式。

## [1.1.0] - 2026-10-19

V1.1 生产版：云同步后端 + 账号体系 + 四大级别词库 + 可配置每日词量与「下一批」推送 + 内容扩容 4 倍。

### Added 新增
- **后端服务（零依赖）**：`server/server.js` —— node:http + node:sqlite 单文件实现，静态托管 + REST API；scrypt 口令散列 + HMAC-SHA256 令牌（30 天）；词库种子自动灌入 SQLite（WAL）
- **MySQL 8 按需方案**：`server/mysql-schema.sql`（user / user_state / word / review_card / quiz_log 五表，utf8mb4 + 索引就绪，文件头附迁移三步指引）
- **云同步客户端**：`js/api.js` —— 服务器自动探测（file:// 静默降级纯本地）、导航栏「云同步」入口与登录 / 注册弹窗（自含样式）、启动拉取（有差异刷新一次）、变更防抖 1.1s 推送（最后写入胜出）、首次登录自动上传本地数据
- **词库级别下拉选择**：单词页控制行（全部 / CET-4 / CET-6 / TEM-8 / IELTS），队列与统计即时联动；每日测验出题词池跟随所选级别
- **每日新词数量可输入**：默认 8，范围 1-50，输入即生效并持久化（`ev_settings`）
- **「下一批」推送**：单词页控制行按钮 + 完成面板「再来一批」+ 空队列页「下一批」，一键追加新词预算；预算按「级别 × 日期」独立计算（切换级别即获全新名额），兼容 v1.0 旧数据
- **专八 TEM-8**：新增 40 词专八词库（alacrity / serendipity / vicissitude…）、15 道专八模拟题（词汇 / 同义替换 / 语法 / 阅读 / 人文知识），题库与测验页新增专八入口
- **阅读篇目选择器**：每个难度档 2 篇文章，难度页签下可切换篇目
- **API 冒烟测试**：`tools/api-smoke.js`（health / 注册 / 登录 / 状态同步 / 词库 / 鉴权 15 项）
- 文档：README（双模式运行 / API 一览 / 数据库切换 / 路线图）、CHANGELOG、MIT LICENSE

### Changed 变更
- **内容扩容**：词库 36 → **160**（四级/六级/专八/雅思各 40，全部含音标、词性、释义、例句 + 例句译文）；文章 3 → **6**（新增科技生活 / 健康生活 / 文化阅读主题）；题库 18 → **60**（四大考试各 15）；每日固定题 6 → **8**；词典 92 → **259** 条
- **每日预算语义升级**：由「当日全局限额」改为「级别 × 日期」独立额度——在 A 级别学满后切到 B 级别仍能按量学新词
- 校验器 `validate.js`：级别枚举纳入 TEM-8、每级词数 ≥30、每类考试 ≥10 题、每难度 ≥2 篇文章
- 首页课程卡文案与标签同步（词量自定 · 可加批 / 四大考试标签）

### Verified 验证
- `node tools/validate.js`：160 词 / 6 文 / 68 题 / 259 词条 通过
- `node tools/smoke.js`：19/19 通过（SM-2 序列、预算可变、级别过滤、加批、生词本流转、设置边界）
- `node tools/api-smoke.js`：15/15 通过（注册 / 登录 / 云同步读写 / 词库 / 鉴权失败路径）
- 前端五页内联脚本语法编译 + 脚本加载顺序（api → srs → settings）+ 关键控件钩子检查通过

### Notes 说明
- 前端内容包（data.js）继续作为离线缓存；服务器 SQLite 词库目录经 `/api/words` 暴露（V1.2 用于内容管理后台）
- 多端同步采用「最后写入胜出」，按设备粒度的冲突合并列入 V1.2

## [1.0.0] - 2026-10-19

MVP 首版：纯前端零依赖（原生 HTML/CSS/JS + localStorage + Web Speech API），双击 `index.html` 运行。

### Added
- SM-2 间隔重复调度（SuperMemo 官方公式，localStorage 持久化），3D 翻转卡、四档评分、空格/1-4 键盘、完成报告
- 每日文章：低/中/高三档、悬浮取词（含词形还原）、TTS 全文朗读与语速、一键生词本
- 每日测验：当日种子出题、错题重练、错题词自动回流生词本
- 题库：四级/六级/雅思各 6 题原创模拟题
- 首页仪表盘：任务三卡、streak、记忆曲线示意图、每日轮换推荐
- Claymorphism 视觉体系（ui-ux-pro-max 设计系统：靛蓝 #4F46E5 + 黏土粉彩 + Fredoka/Nunito）
- 工具链：`tools/validate.js` 数据校验、`tools/smoke.js` 引擎冒烟

[1.1.0]: https://github.com/Jammy123-prog/learning-English/releases/tag/v1.1.0
[1.0.0]: https://github.com/Jammy123-prog/learning-English/releases/tag/v1.0.0
