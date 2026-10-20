# EverWord · 每日英语

> 用认知科学把英语长在记忆里 —— SM-2 间隔重复 × 分级沉浸阅读 × 主动回忆测验

![version](https://img.shields.io/badge/version-1.6.1-4F46E5) ![license](https://img.shields.io/badge/license-MIT-22C55E) ![node](https://img.shields.io/badge/node-%E2%89%A522-1DA851) ![deps](https://img.shields.io/badge/deps-zero-FFB01F)

**EverWord** 是一个科学记忆驱动的英语学习平台：每日单词按遗忘曲线自动排程，分级文章支持悬浮取词与全文朗读，每日测验主动提取记忆，四六级 / 专八 / 雅思题库整卷练习。**零第三方依赖**——前端双击即用，后端一个文件，一条命令启动。

---

## ✨ 功能特性

### 每日单词（SM-2 调度）
- **SuperMemo 官方 SM-2 算法**：`EF' = EF + (0.1 − (5−q)×(0.08 + (5−q)×0.02))`，间隔序列 1→6→16→45→131 天，q<3 重置且不改 EF
- **词库搜索（v1.2）**：搜索框覆盖 **6,700+ 词目**（精选 160 详解 + CET-4/CET-6/IELTS 全量目录），支持**模糊匹配**——拼写容错（persistense→persist）、前缀（resil→resilience）、中文释义检索；目录词详情按需联网查询 dictionaryapi.dev 并本地缓存
- **词库级别下拉选择**（v1.1）：全部 / 四级 CET-4 / 六级 CET-6 / **专八 TEM-8** / 雅思 IELTS，统计与队列即时联动
- **每日新词数量可输入**（v1.1）：默认 8，可改为 9、10……50（输入即生效，持久保存）
- **「下一批」推送**（v1.1）：当前队列学完或意犹未尽时，一键追加一批新词；预算按「级别 × 日期」独立计算，切换级别即获全新名额
- 3D 翻转卡片、四档评分带间隔预览、空格 / 1-4 键盘操作、发音跟读、完成报告

### 每日文章（分级沉浸阅读）
- 低 / 中 / 高三档难度 × 多篇（**原创 100 篇**：港航领域 20 / 港机设备 15 / 物流贸易 10 / 综合主题 25 + v1.3 前 30 篇，v1.4 大幅扩容）
- **全库检索（v1.4）**：搜索框一键检索整个文库与词库——文章按标题（五级模糊匹配）/ 中文题名 / 主题 / **正文全文**匹配并高亮命中片段；词库 1,408 词条按词形模糊 + 中文释义匹配；点击文章结果直达该篇，点击词条展开详情（发音 / 例句 / 生词本）
- **TED 式右侧词汇栏（v1.2）**：右侧 sticky 面板列出本文**重要词汇**（词性 + 释义 + 发音 + 入生词本）；点击词条**定位到正文出现处**并高亮，悬停正文单词**反向高亮**词栏词条
- **悬浮取词**：词典命中词显示虚线下划线，悬停即出释义卡（含发音 + 一键入生词本），内置轻量词形还原（subsidies→subsidy、fluctuating→fluctuate 等）
- **新闻速览 + 精读（v1.3/v1.4）**：CGTN 八版块 RSS + **China Daily 七频道** + **国际港航物流媒体 ×5**（gCaptain 海事业 / Splash247 海运 / Hellenic 航运日报 / The Loadstar 物流供应链 / Container News 集装箱业）运行时抓取，持续累积数百条；带「精读」标记的条目可**站内全文阅读**——悬浮取词、新闻热词栏、TTS 朗读一应俱全；无全文条目点击标题跳原文出处
- 全文 TTS 朗读（0.8× / 1× / 1.2× 语速）、篇目选择器、已读打卡

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

## 📊 内容规模（v1.4）

| 模块 | v1.0 | v1.1 | v1.2 | v1.3 | v1.4 | 说明 |
|------|------|------|------|------|------|------|
| 精选词库 | 36 词 | 160 词 | 160 词 | 160 词 | 160 词 | CET-4 / CET-6 / TEM-8 / IELTS 各 40，含音标、释义、例句 + 译文 |
| 词库目录 | — | — | **6,630 词目** | 6,630 词目 | 6,630 词目 | CET-4（4,530）/ CET-6（2,219）/ IELTS（3,427）去重，可搜索 |
| 原创文章 | 3 篇 | 6 篇 | 14 篇 | 30 篇 | **100 篇** | 低 30 / 中 35 / 高 35；**港航 20 + 港机 15 + 物流贸易 10 + 综合 25**，每篇附悬浮释义词表 |
| 阅读检索 | — | — | — | — | **全库检索** | 文章（标题 / 主题 / 正文，五级模糊）+ 词库（1,408 词条）一键同搜 |
| 新闻速览 | — | — | 350+ 条 | 448+ 条 | **580+ 条** | CGTN 八版块 + China Daily 七频道 + **国际港航媒体 ×5**（gCaptain / Splash247 / Hellenic / Loadstar / Container News） |
| 可精读新闻 | — | — | — | **360+ 条** | **480+ 条** | 站内全文阅读（悬浮取词 / 热词栏 / TTS），持续累积 |
| 题库 | 18 题 | 60 题 | 60 题 | 60 题 | 60 题 | 四大考试各 15 题，7 种题型 |
| 每日固定题 | 6 道 | 8 道 | 8 道 | 8 道 | 8 道 | + 生成题按日种子产出 |
| 词典 | 92 条 | 259 条 | 346 条 | 504 条 | **1,408 条** | 词库 + 100 篇文章术语汇总（含港航港机专业词汇），供悬浮取词与新闻热词抽取 |

## 🗂 目录结构

```
learning-English/
├── index.html            # 首页（Claymorphism 着陆页：课程目录 / 进度演示 / 记忆科学 / 学员评价 / CTA）
├── words.html            # 每日单词（词库模糊搜索 / 级别下拉 / 词量输入 / 下一批 / 3D 翻卡）
├── reading.html          # 每日文章（全库检索 / TED 式词汇栏 / 悬浮取词 / TTS / 新闻速览与精读）
├── quiz.html             # 每日测验（种子出题 / 错题重练 / 整卷练习入口）
├── bank.html             # 题库（四级 / 六级 / 专八 / 雅思 × 15 题）
├── css/
│   ├── landing.css       # 首页 Claymorphism 设计系统
│   └── styles.css        # 应用页 Claymorphism 设计系统
├── js/
│   ├── data.js           # 内容数据层（160 词 / 30 文 / 68 题 / 词典）
│   ├── articles-ext.js   # 文章扩充层（+70 篇 → 100 篇：港航 / 港机 / 物流贸易 / 综合）
│   ├── vocab-catalog.js  # 全量词目目录（6,630 词目，fetch-vocab.js 自动生成）
│   ├── news-data.js      # 新闻快照（fetch-news.js 自动生成，本地模式数据源）
│   ├── settings.js       # 学习设置（级别 / 每日新词数量，ev_settings）
│   ├── srs.js            # SM-2 引擎 + 统计 + 每日进度（ev_srs / ev_stats / ev_prog）
│   ├── api.js            # 云同步客户端（探测 / 账号 UI / 拉取推送）
│   ├── quiz.js           # 测验引擎（Quiz 类）
│   ├── tts.js            # Web Speech 语音封装
│   ├── icons.js          # SVG 图标库
│   └── app.js            # 共享层（导航 / Toast / 悬浮取词 / escHtml / 入场动画）
├── server/
│   ├── server.js         # 零依赖 API + 静态服务器（node:http + node:sqlite）
│   └── mysql-schema.sql  # MySQL 8 建表脚本（按需采用）
├── tools/
│   ├── fetch-vocab.js    # 词库目录抓取器（CET-4/CET-6/IELTS 全量词目 → vocab-catalog.js）
│   ├── fetch-news.js     # 新闻快照抓取器（CGTN 等主流媒体 RSS → news-data.js）
│   ├── validate.js       # 数据完整性校验
│   ├── smoke.js          # SM-2 / 设置 / 加批 冒烟测试
│   └── api-smoke.js      # API 冒烟测试（需先启动 server）
└── docs/
    └── 英语学习平台设计方案.md  # 完整设计方案（产品 / 算法 / 架构 / 迭代规划）
```

## 🔬 数据与算法

- **SM-2 调度**：卡片状态 `{ef, reps, ivl, lapses, due, intro, introLv}`；`I(1)=1`，`I(2)=6`，`I(n)=⌈I(n−1)×EF⌉`
- **每日预算**：`cap = newPerDay + bonus[日期@级别] − introduced[日期×级别]`，刷新不补量；「下一批」即增大 `bonus`
- **模糊检索**（v1.2，前后端同构）：精确 100 > 前缀 90−长度 > 包含 70−长度 > 子序列 50−长度 > 有界编辑距离（cap=2）46−8d > 释义包含 30；前端另支持中文释义检索
- **本地存储键**：`ev_srs`（卡片）/ `ev_stats`（streak 与正确率）/ `ev_prog`（今日任务）/ `ev_settings`（级别与词量）/ `ev_dict`（联网查词缓存）/ `ev_token`（云同步令牌）
- **服务器存储**：SQLite（`data/everword.db`，WAL）；`user / user_state / word / news_item / sync_log` 五表，词库种子 = 精选 160 + 全量目录 6,630 词目；新闻 = CGTN RSS 全文 + China Daily 页面提取（仅本机缓存）

## 🔌 API 一览

| 方法 | 路径 | 鉴权 | 说明 |
|------|------|------|------|
| GET | `/api/health` | – | 健康检查（版本 / 词库数 / 用户数 / 新闻数） |
| POST | `/api/register` | – | 注册 `{name, password}` → `{token}` |
| POST | `/api/login` | – | 登录 → `{token}`（30 天有效） |
| GET | `/api/state` | Bearer | 拉取云同步状态 |
| PUT | `/api/state` | Bearer | 保存云同步状态（≤512KB，最后写入胜出） |
| GET | `/api/words?level=&limit=` | – | 词库目录（level=CET-4/CET-6/TEM-8/IELTS，含目录多级别词） |
| GET | `/api/words?q=&limit=` | – | 全库模糊检索（精确/前缀/包含/子序列/编辑距离打分排序） |
| GET | `/api/news?topic=&limit=&refresh=1` | – | 新闻速览（c=1 可精读，30 分钟懒刷新，refresh=1 强制） |
| GET | `/api/news?q=&date=&days=` | – | 新闻检索：标题/摘要多词模糊（AND 语义，标题命中优先）+ 发布日期过滤（date=YYYY-MM-DD 或 days=N），返回 matched 命中数 |
| GET | `/api/news/stats` | – | 新闻表盘：今日/近 7 天每日新增、按来源与主题分布、各来源精读占比（阅读页可视化数据源） |
| GET | `/api/news/item?id=` | – | 新闻精读：返回单条正文段落数组（供站内阅读） |
| GET | `/api/admin/overview` | Admin | 账号总览：总数 / 管理员数 / 今日活跃 / 今日同步 / 新闻新增 |
| GET | `/api/admin/users` | Admin | 账号清单 + 学习情况（卡片/连续/正确率/今日活动/设置/云存档体积） |

> **管理后台**：浏览器访问 `/admin.html`（如 `http://localhost:8787/admin.html`）。首个注册账号自动成为管理员；已有部署可用环境变量 `EV_ADMIN=用户名` 启动一次完成提升，或直接更新 SQLite `user.role`。

## 🗄 数据库：SQLite 默认，MySQL 按需采用

默认后端使用 Node 内置 SQLite——**零配置、单文件、随仓库运行**。当需要多实例部署或独立数据库服务器时，切换到 MySQL 8：

```bash
mysql -u root -p < server/mysql-schema.sql
```

`mysql-schema.sql` 已备好 `user / user_state / word / review_card / quiz_log` 五表（utf8mb4，含 `idx_user_due` 等索引），并在文件头注明迁移三步（`npm i mysql2` → 替换数据访问层 → 导入词库种子）。

### 备份与并发写保护

```bash
node tools/backup-db.js                 # VACUUM INTO 快照（运行中可安全执行），滚动保留最近 7 份
node tools/backup-db.js --keep=30 --check   # 自定义保留份数 + 写入前 quick_check
```

- 服务器已开启 `PRAGMA busy_timeout=5000`（`SQLITE_BUSY_TIMEOUT` 可覆盖）：多连接并发写不再直接抛 `SQLITE_BUSY`。
- 每日自动备份可加系统计划任务：`schtasks /Create /SC DAILY /ST 03:30 /TN EverWordBackup /TR "node F:\Trace-code\learning English\tools\backup-db.js"`。

## ⚙️ 新闻抓取配额（环境变量，重启生效）

| 变量 | 默认 | 说明 |
|------|------|------|
| `CD_PER_SECTION` | 24 | China Daily 每频道每轮最多入库新文章（原 8） |
| `CD_SCAN_LINKS` | 60 | 频道页候选链接数（需 ≥ 上者） |
| `CD_MAX_PER_DAY` | 200 | China Daily 每日新增上限（0 = 不限） |
| `NEWS_MAX_PER_DAY` | 0 | 全来源每日新增上限（0 = 不限；按 `fetched_at` 当日统计，跨重启有效） |
| `WP_FETCH_MAX` | 20 | 港航媒体每轮抓正文篇数（原 6） |
| `NEWS_TTL_MIN` | 30 | `/api/news` 懒刷新间隔（分钟）：越小每日轮次越多 |

刷新日志已区分口径：`处理 N 条 / 真实新增 X 条 / 更新已有 Y 条 / 今日累计 Z 条`——「真实新增」按入库新行计算，不再把 `ON CONFLICT DO UPDATE` 命中的旧条目误计入。

## ✅ 测试

```bash
node tools/validate.js     # 数据完整性：字段 / 级别 / 术语覆盖 / 题目答案 / 分类齐备
node tools/smoke.js        # SM-2 数学 / 预算与加批 / 级别过滤 / 生词本流转（19 项）
node server/server.js &    # 先启动服务器，然后：
node tools/api-smoke.js    # API 冒烟：注册 / 登录 / 同步 / 模糊检索 / 新闻与精读 / 鉴权（29 项）
```

改动 `js/data.js` 后必须跑 `validate.js`；改动 `js/srs.js` 后必须跑 `smoke.js`。
重建词库目录 / 新闻快照：`node tools/fetch-vocab.js`、`node tools/fetch-news.js`（需联网，前者还需系统安装 Python 3）。

## 🧭 路线图

| 版本 | 内容 |
|------|------|
| v1.1 ✅ | 云同步 + 账号、四大级别词库、可配置词量与加批、专八题库、内容扩容 4× |
| v1.2 ✅ | 全量词库目录（6,630 词目）+ 模糊搜索、TED 式词汇栏、新闻速览（RSS 元数据）、原创文章 14 篇 |
| v1.3 ✅ | 原创文章 30 篇、新闻源扩充（CGTN 八版块 + China Daily 七频道）、**新闻精读模式**（站内全文 + 热词栏 + TTS） |
| v1.4 ✅ | **阅读全库检索**（文章 + 词库一键同搜）、原创文章 **100 篇**（港航 20 / 港机 15 / 物流贸易 10 / 综合 25）、**国际港航媒体 ×5**（gCaptain / Splash247 / Hellenic / Loadstar / Container News）、词典 1,408 条 |
| v1.5 | 服务端 SM-2 调度（启用 `review_card` 表与 `idx_user_due` 下推查询）、内容管理后台、多端冲突合并策略 |
| v1.6 | 真题接入（需出版方授权或公有领域语料）、生词本导出 Anki、PWA 离线缓存 |

## 📄 版权说明

- 精选词库释义、原创文章、题目均为**原创内容**，可自由使用与修改。
- **词库目录**（`js/vocab-catalog.js`）只收录词目与级别归属这类事实性数据，不搬运第三方词书的释义 / 例句；目录词释义由免费词典 API（dictionaryapi.dev）按需查询并本地缓存。
- **新闻**：仓库只携带抓取工具与元数据快照（标题 / 链接 / 来源 / 日期 / 短摘要）。正文来源有三：① CGTN 与 Container News 公开 RSS 自带的 `content:encoded` 全文；② China Daily 文章页运行时提取；③ gCaptain / Splash247 / Hellenic / The Loadstar 文章页运行时提取（read-it-later 式个人缓存）。三者均仅存于本机 `data/`（已 gitignore，不随仓库分发），前端始终展示来源署名并提供「阅读原文」链接；经济学人 / 路透社等付费全文不做复制。可在 `tools/fetch-news.js` 与 `server/server.js` 的 `NEWS_FEEDS` 中增删任意媒体源。
- 四六级 / 专八 / 雅思真题原文受版权保护，正式接入需出版方授权或改用公有领域语料（详见 `docs/英语学习平台设计方案.md` 2.4 节）。

## License

[MIT](LICENSE)
