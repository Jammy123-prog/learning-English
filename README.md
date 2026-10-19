# EverWord · 每日英语

> 用认知科学把英语长在记忆里 —— SM-2 间隔重复 × 分级沉浸阅读 × 主动回忆测验

![version](https://img.shields.io/badge/version-1.1.0-4F46E5) ![license](https://img.shields.io/badge/license-MIT-22C55E) ![node](https://img.shields.io/badge/node-%E2%89%A522-1DA851) ![deps](https://img.shields.io/badge/deps-zero-FFB01F)

**EverWord** 是一个科学记忆驱动的英语学习平台：每日单词按遗忘曲线自动排程，分级文章支持悬浮取词与全文朗读，每日测验主动提取记忆，四六级 / 专八 / 雅思题库整卷练习。**零第三方依赖**——前端双击即用，后端一个文件，一条命令启动。

---

## ✨ 功能特性

### 每日单词（SM-2 调度）
- **SuperMemo 官方 SM-2 算法**：`EF' = EF + (0.1 − (5−q)×(0.08 + (5−q)×0.02))`，间隔序列 1→6→16→45→131 天，q<3 重置且不改 EF
- **词库级别下拉选择**（v1.1）：全部 / 四级 CET-4 / 六级 CET-6 / **专八 TEM-8** / 雅思 IELTS，统计与队列即时联动
- **每日新词数量可输入**（v1.1）：默认 8，可改为 9、10……50（输入即生效，持久保存）
- **「下一批」推送**（v1.1）：当前队列学完或意犹未尽时，一键追加一批新词；预算按「级别 × 日期」独立计算，切换级别即获全新名额
- 3D 翻转卡片、四档评分带间隔预览、空格 / 1-4 键盘操作、发音跟读、完成报告

### 每日文章（分级沉浸阅读）
- 低 / 中 / 高三档难度 × 2 篇（v1.1），主题：励志成长 / 旅游文化 / 财经商业 / 科技生活 / 健康生活 / 文化阅读
- **悬浮取词**：词典命中词显示虚线下划线，悬停即出释义卡（含发音 + 一键入生词本），内置轻量词形还原（subsidies→subsidy、fluctuating→fluctuate 等）
- 全文 TTS 朗读（0.8× / 1× / 1.2× 语速）、篇目选择器（v1.1）、已读打卡

### 每日测验（主动回忆）
- 当日种子自动出题 12 题：当日词汇 + 语境填空 + 语法 + 阅读理解，天天不同、刷新不变
- **出题词池跟随单词页所选级别**（v1.1），学什么练什么
- 错题一键重练；错题中的目标词自动回流生词本，次日复习

### 题库（四大考试）
- CET-4 / CET-6 / **TEM-8**（v1.1）/ IELTS 各 15 题原创模拟题，含词汇、语境填空、语法、阅读理解、同义替换、判断题、人文知识等题型
- 逐题自测（显示答案与解析）或整卷练习（进入测验引擎）

### 云同步（v1.1 · 可选）
- `node server/server.js` 启动后自动探测：**账号注册 / 登录**（scrypt 口令散列 + HMAC-SHA256 令牌）
- 学习状态（复习卡片 / 统计 / 每日进度 / 设置）多端同步：启动拉取 + 变更防抖推送（最后写入胜出）
- 不启动服务器？一切照旧——**纯本地模式（localStorage）功能完全一致**

---

## 🚀 快速开始

### 方式一：纯前端（零安装）
双击打开 `index.html` 即可。数据保存在浏览器 localStorage，换浏览器 / 清缓存会丢失。

### 方式二：本地服务器（云同步 + 账号）
```bash
# 要求 Node.js ≥ 22（使用内置 node:sqlite，无需 npm install）
node server/server.js
# 打开 http://localhost:8787，点导航栏「云同步」注册账号
```

自定义端口：
```bash
PORT=9000 node server/server.js        # macOS / Linux
set PORT=9000 && node server/server.js # Windows CMD
```

---

## 📊 内容规模（v1.1）

| 模块 | v1.0 | v1.1 | 说明 |
|------|------|------|------|
| 词库 | 36 词 | **160 词** | CET-4 / CET-6 / TEM-8 / IELTS 各 40，含音标、释义、例句 + 译文 |
| 文章 | 3 篇 | **6 篇** | 低 / 中 / 高各 2 篇，6 大主题，每篇附悬浮释义词表 |
| 题库 | 18 题 | **60 题** | 四大考试各 15 题，7 种题型 |
| 每日固定题 | 6 道 | **8 道** | + 生成题按日种子产出 |
| 词典 | 92 条 | **259 条** | 词库 + 文章术语汇总，供悬浮取词 |

## 🗂 目录结构

```
learning-English/
├── index.html            # 首页（Claymorphism 着陆页：课程目录 / 进度演示 / 记忆科学 / 学员评价 / CTA）
├── words.html            # 每日单词（级别下拉 / 词量输入 / 下一批 / 3D 翻卡 / 四档评分）
├── reading.html          # 每日文章（三档 × 2 篇 / 悬浮取词 / TTS / 篇目选择器）
├── quiz.html             # 每日测验（种子出题 / 错题重练 / 整卷练习入口）
├── bank.html             # 题库（四级 / 六级 / 专八 / 雅思 × 15 题）
├── css/
│   ├── landing.css       # 首页 Claymorphism 设计系统
│   └── styles.css        # 应用页 Claymorphism 设计系统
├── js/
│   ├── data.js           # 内容数据层（160 词 / 6 文 / 68 题 / 词典）
│   ├── settings.js       # 学习设置（级别 / 每日新词数量，ev_settings）
│   ├── srs.js            # SM-2 引擎 + 统计 + 每日进度（ev_srs / ev_stats / ev_prog）
│   ├── api.js            # 云同步客户端（探测 / 账号 UI / 拉取推送）
│   ├── quiz.js           # 测验引擎（Quiz 类）
│   ├── tts.js            # Web Speech 语音封装
│   ├── icons.js          # SVG 图标库
│   └── app.js            # 共享层（导航 / Toast / 悬浮取词 / 入场动画）
├── server/
│   ├── server.js         # 零依赖 API + 静态服务器（node:http + node:sqlite）
│   └── mysql-schema.sql  # MySQL 8 建表脚本（按需采用）
├── tools/
│   ├── validate.js       # 数据完整性校验
│   ├── smoke.js          # SM-2 / 设置 / 加批 冒烟测试
│   └── api-smoke.js      # API 冒烟测试（需先启动 server）
└── docs/
    └── 英语学习平台设计方案.md  # 完整设计方案（产品 / 算法 / 架构 / 迭代规划）
```

## 🔬 数据与算法

- **SM-2 调度**：卡片状态 `{ef, reps, ivl, lapses, due, intro, introLv}`；`I(1)=1`，`I(2)=6`，`I(n)=⌈I(n−1)×EF⌉`
- **每日预算**：`cap = newPerDay + bonus[日期@级别] − introduced[日期×级别]`，刷新不补量；「下一批」即增大 `bonus`
- **本地存储键**：`ev_srs`（卡片）/ `ev_stats`（streak 与正确率）/ `ev_prog`（今日任务）/ `ev_settings`（级别与词量）
- **服务器存储**：SQLite（`data/everword.db`，WAL）；`user / user_state / word / sync_log` 四表，词库种子 160 词

## 🔌 API 一览

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| GET | `/api/health` | – | 健康检查（版本 / 词库数 / 用户数） |
| POST | `/api/register` | – | 注册 `{name, password}` → `{token}` |
| POST | `/api/login` | – | 登录 → `{token}`（30 天有效） |
| GET | `/api/state` | Bearer | 拉取云同步状态 |
| PUT | `/api/state` | Bearer | 保存云同步状态（≤512KB，最后写入胜出） |
| GET | `/api/words?level=` | – | 词库目录（level 可选 CET-4/CET-6/TEM-8/IELTS） |

## 🗄 数据库：SQLite 默认，MySQL 按需采用

默认后端使用 Node 内置 SQLite——**零配置、单文件、随仓库运行**。当需要多实例部署或独立数据库服务器时，切换到 MySQL 8：

```bash
mysql -u root -p < server/mysql-schema.sql
```

`mysql-schema.sql` 已备好 `user / user_state / word / review_card / quiz_log` 五表（utf8mb4，含 `idx_user_due` 等索引），并在文件头注明迁移三步（`npm i mysql2` → 替换数据访问层 → 导入词库种子）。

## ✅ 测试

```bash
node tools/validate.js     # 数据完整性：字段 / 级别 / 术语覆盖 / 题目答案 / 分类齐备
node tools/smoke.js        # SM-2 数学 / 预算与加批 / 级别过滤 / 生词本流转（19 项）
node server/server.js &    # 先启动服务器，然后：
node tools/api-smoke.js    # API 冒烟：注册 / 登录 / 同步 / 词库 / 鉴权（15 项）
```

改动 `js/data.js` 后必须跑 `validate.js`；改动 `js/srs.js` 后必须跑 `smoke.js`。

## 🧭 路线图

| 版本 | 内容 |
|------|------|
| v1.1 ✅ | 云同步 + 账号、四大级别词库、可配置词量与加批、专八题库、内容扩容 4× |
| v1.2 | 服务端 SM-2 调度（启用 `review_card` 表与 `idx_user_due` 下推查询）、内容管理后台、多端冲突合并策略 |
| v1.3 | 真题接入（需出版方授权或公有领域语料）、生词本导出 Anki、PWA 离线缓存 |

## 📄 版权说明

全部内容（词库释义、文章、题目）均为**原创示例**，可自由使用与修改。四六级 / 专八 / 雅思真题原文受版权保护，正式接入需出版方授权或改用公有领域语料（详见 `docs/英语学习平台设计方案.md` 2.4 节）。

## License

[MIT](LICENSE)
