/* EverWord 数据层 v1.1 —— 词库 / 文章 / 题库 / 词典
   全部内容为原创示例（版权合规）。
   v1.1 规模：词库 160 词（CET-4 / CET-6 / TEM-8 / IELTS 各 40）、
   文章 6 篇（低/中/高各 2，主题：励志·旅游·财经·科技·健康·文化）、
   题库 60 题（四类考试各 15）+ 每日固定题 8 道。 */

const LEVELS = ["CET-4", "CET-6", "TEM-8", "IELTS"];

/* ---------------- 词库（160 词，四大级别各 40） ---------------- */
const WORDS = [
  /* ----- CET-4（40） ----- */
  { w: "absorb",      ipa: "/əbˈzɔːb/",         pos: "v.",    def: "吸收；理解", ex: "Plants absorb nutrients from the soil.", exZh: "植物从土壤中吸收养分。", lv: "CET-4" },
  { w: "accurate",    ipa: "/ˈækjərət/",        pos: "adj.",  def: "准确的；精确的", ex: "Her translation is accurate and natural.", exZh: "她的翻译准确而自然。", lv: "CET-4" },
  { w: "acquire",     ipa: "/əˈkwaɪə(r)/",      pos: "v.",    def: "获得；习得", ex: "Children acquire languages much faster than adults.", exZh: "儿童习得语言比成人快得多。", lv: "CET-4" },
  { w: "adapt",       ipa: "/əˈdæpt/",          pos: "v.",    def: "适应；改编", ex: "It took him a month to adapt to the new schedule.", exZh: "他花了一个月才适应新的作息。", lv: "CET-4" },
  { w: "adequate",    ipa: "/ˈædɪkwət/",        pos: "adj.",  def: "足够的；适当的", ex: "Make sure you get adequate sleep before the exam.", exZh: "考前一定要保证充足的睡眠。", lv: "CET-4" },
  { w: "ambitious",   ipa: "/æmˈbɪʃəs/",        pos: "adj.",  def: "有雄心的；有抱负的", ex: "She is ambitious and hopes to run her own company one day.", exZh: "她雄心勃勃，希望有一天能经营自己的公司。", lv: "CET-4" },
  { w: "analyze",     ipa: "/ˈænəlaɪz/",        pos: "v.",    def: "分析", ex: "The app analyzes your mistakes and plans reviews.", exZh: "这款应用分析你的错误并安排复习。", lv: "CET-4" },
  { w: "anticipate",  ipa: "/ænˈtɪsɪpeɪt/",     pos: "v.",    def: "预期；预料", ex: "We anticipate that demand will keep growing.", exZh: "我们预计需求会持续增长。", lv: "CET-4" },
  { w: "appropriate", ipa: "/əˈprəʊpriət/",     pos: "adj.",  def: "恰当的；合适的", ex: "Wear clothes appropriate for the weather.", exZh: "穿适合天气的衣服。", lv: "CET-4" },
  { w: "approve",     ipa: "/əˈpruːv/",         pos: "v.",    def: "批准；赞成", ex: "The committee approved the new teaching plan.", exZh: "委员会批准了新的教学计划。", lv: "CET-4" },
  { w: "assess",      ipa: "/əˈses/",           pos: "v.",    def: "评估；评定", ex: "Teachers assess progress through short quizzes.", exZh: "教师通过小测验评估学习进度。", lv: "CET-4" },
  { w: "assume",      ipa: "/əˈsjuːm/",         pos: "v.",    def: "假定；承担", ex: "Do not assume that harder words always matter more.", exZh: "不要假定更难的词总是更重要。", lv: "CET-4" },
  { w: "attach",      ipa: "/əˈtætʃ/",          pos: "v.",    def: "附上；使依附", ex: "Please attach your latest report to the email.", exZh: "请把你的最新报告附在邮件里。", lv: "CET-4" },
  { w: "available",   ipa: "/əˈveɪləbl/",       pos: "adj.",  def: "可获得的；有空的", ex: "The library is available to all students.", exZh: "图书馆对所有学生开放。", lv: "CET-4" },
  { w: "barrier",     ipa: "/ˈbæriə(r)/",       pos: "n.",    def: "障碍；屏障", ex: "Fear of mistakes is the biggest barrier to speaking.", exZh: "怕出错是开口说英语的最大障碍。", lv: "CET-4" },
  { w: "benefit",     ipa: "/ˈbenɪfɪt/",        pos: "n./v.", def: "益处；受益", ex: "Daily review benefits both memory and confidence.", exZh: "每日复习对记忆和信心都有好处。", lv: "CET-4" },
  { w: "capacity",    ipa: "/kəˈpæsəti/",       pos: "n.",    def: "容量；能力", ex: "The hall has a seating capacity of five hundred.", exZh: "大厅可容纳五百人就座。", lv: "CET-4" },
  { w: "challenge",   ipa: "/ˈtʃælɪndʒ/",       pos: "n./v.", def: "挑战；向……挑战", ex: "Speaking with strangers was a real challenge at first.", exZh: "一开始与陌生人交谈真是个挑战。", lv: "CET-4" },
  { w: "circumstance", ipa: "/ˈsɜːkəmstəns/",   pos: "n.",    def: "环境；情况", ex: "We cannot control every circumstance, but we can control effort.", exZh: "我们无法控制所有情况，但能控制努力。", lv: "CET-4" },
  { w: "commit",      ipa: "/kəˈmɪt/",          pos: "v.",    def: "承诺；犯（错）", ex: "Commit to ten minutes a day, not two hours once a week.", exZh: "承诺每天十分钟，而不是一周一次两小时。", lv: "CET-4" },
  { w: "compare",     ipa: "/kəmˈpeə(r)/",      pos: "v.",    def: "比较；比喻", ex: "Compare your today's self with yesterday's, not with others.", exZh: "把今天的自己和昨天比，而不是和别人比。", lv: "CET-4" },
  { w: "compete",     ipa: "/kəmˈpiːt/",        pos: "v.",    def: "竞争；比赛", ex: "Dozens of teams compete for the annual prize.", exZh: "数十支队伍争夺年度大奖。", lv: "CET-4" },
  { w: "concentrate", ipa: "/ˈkɒnsəntreɪt/",    pos: "v.",    def: "专心；集中", ex: "Turn off notifications to concentrate better.", exZh: "关掉通知能让你更专心。", lv: "CET-4" },
  { w: "confident",   ipa: "/ˈkɒnfɪdənt/",      pos: "adj.",  def: "自信的；确信的", ex: "The more you practice, the more confident you become.", exZh: "练习越多，你就越自信。", lv: "CET-4" },
  { w: "consist",     ipa: "/kənˈsɪst/",        pos: "v.",    def: "由……组成；在于", ex: "A good routine consists of small repeated actions.", exZh: "好的习惯由反复的小动作组成。", lv: "CET-4" },
  { w: "consume",     ipa: "/kənˈsjuːm/",       pos: "v.",    def: "消耗；消费", ex: "The new engine consumes less fuel.", exZh: "新发动机油耗更低。", lv: "CET-4" },
  { w: "contain",     ipa: "/kənˈteɪn/",        pos: "v.",    def: "包含；容纳", ex: "Each lesson contains ten new words and one story.", exZh: "每课包含十个新词和一篇小故事。", lv: "CET-4" },
  { w: "contribute",  ipa: "/kənˈtrɪbjuːt/",    pos: "v.",    def: "贡献；捐助；促成", ex: "Even small daily reviews contribute to long-term memory.", exZh: "即使是每天的少量复习也有助于长期记忆。", lv: "CET-4" },
  { w: "convenient",  ipa: "/kənˈviːniənt/",    pos: "adj.",  def: "方便的；便利的", ex: "Short lessons are convenient for busy people.", exZh: "短课程对忙碌的人很方便。", lv: "CET-4" },
  { w: "convince",    ipa: "/kənˈvɪns/",        pos: "v.",    def: "使确信；说服", ex: "Her results convinced me to start daily reviews.", exZh: "她的成绩使我相信要开始每日复习。", lv: "CET-4" },
  { w: "cooperate",   ipa: "/kəʊˈɒpəreɪt/",     pos: "v.",    def: "合作；配合", ex: "The two labs cooperate on climate research.", exZh: "两个实验室在气候研究上合作。", lv: "CET-4" },
  { w: "criticize",   ipa: "/ˈkrɪtɪsaɪz/",      pos: "v.",    def: "批评；评论", ex: "A good teacher criticizes the work, never the student.", exZh: "好老师批评作品，而从不否定学生。", lv: "CET-4" },
  { w: "curious",     ipa: "/ˈkjʊəriəs/",       pos: "adj.",  def: "好奇的；奇怪的", ex: "Curious learners ask better questions.", exZh: "好奇的学习者会提出更好的问题。", lv: "CET-4" },
  { w: "deceive",     ipa: "/dɪˈsiːv/",         pos: "v.",    def: "欺骗；蒙蔽", ex: "Cramming may deceive you into feeling prepared.", exZh: "突击背诵可能让你误以为已做好准备。", lv: "CET-4" },
  { w: "decline",     ipa: "/dɪˈklaɪn/",        pos: "v./n.", def: "下降；衰退；婉拒", ex: "Sales began to decline after cheaper products entered the market.", exZh: "更便宜的产品入市后，销量开始下滑。", lv: "CET-4" },
  { w: "essential",   ipa: "/ɪˈsenʃl/",         pos: "adj.",  def: "必不可少的；本质的", ex: "Regular sleep is essential for learning new skills.", exZh: "规律的睡眠对学习新技能必不可少。", lv: "CET-4" },
  { w: "establish",   ipa: "/ɪˈstæblɪʃ/",       pos: "v.",    def: "建立；确立；创办", ex: "The university established a new research center in 2020.", exZh: "这所大学于 2020 年成立了新的研究中心。", lv: "CET-4" },
  { w: "influence",   ipa: "/ˈɪnfluəns/",       pos: "n./v.", def: "影响；影响力", ex: "Teachers can influence a student's whole life.", exZh: "老师能影响学生的一生。", lv: "CET-4" },
  { w: "opportunity", ipa: "/ˌɒpəˈtjuːnəti/",   pos: "n.",    def: "机会；良机", ex: "Studying abroad is a valuable opportunity to broaden your mind.", exZh: "出国留学是开阔视野的宝贵机会。", lv: "CET-4" },
  { w: "participate", ipa: "/pɑːˈtɪsɪpeɪt/",    pos: "v.",    def: "参与；参加", ex: "All students are encouraged to participate in class discussions.", exZh: "鼓励所有学生参与课堂讨论。", lv: "CET-4" },

  /* ----- CET-6（40） ----- */
  { w: "accumulate",  ipa: "/əˈkjuːmjəleɪt/",   pos: "v.",    def: "积累；积聚", ex: "Small savings accumulate into a large amount over time.", exZh: "小额储蓄随时间积累成一大笔钱。", lv: "CET-6" },
  { w: "advocate",    ipa: "/ˈædvəkeɪt/",       pos: "v./n.", def: "提倡，主张；拥护者", ex: "Many doctors advocate a balanced diet instead of quick fixes.", exZh: "许多医生提倡均衡饮食而非速效方法。", lv: "CET-6" },
  { w: "aggravate",   ipa: "/ˈæɡrəveɪt/",       pos: "v.",    def: "加剧；使恶化", ex: "Skipping sleep aggravates stress.", exZh: "睡眠不足会加剧压力。", lv: "CET-6" },
  { w: "allocate",    ipa: "/ˈæləkeɪt/",        pos: "v.",    def: "分配；拨给", ex: "Allocate your energy to the tasks that matter.", exZh: "把精力分配给重要的任务。", lv: "CET-6" },
  { w: "amplify",     ipa: "/ˈæmplɪfaɪ/",       pos: "v.",    def: "放大；增强", ex: "Social media can amplify small controversies.", exZh: "社交媒体会放大小的争议。", lv: "CET-6" },
  { w: "appraise",    ipa: "/əˈpreɪz/",         pos: "v.",    def: "评估；估价", ex: "Experts appraised the manuscript at a high value.", exZh: "专家对这份手稿给出了高估价。", lv: "CET-6" },
  { w: "articulate",  ipa: "/ɑːˈtɪkjuleɪt/",    pos: "v./adj.", def: "清楚表达；发音清晰的", ex: "She articulated her argument in three clear steps.", exZh: "她分三个清晰的步骤阐述了自己的论点。", lv: "CET-6" },
  { w: "augment",     ipa: "/ɔːɡˈment/",        pos: "v.",    def: "增加；增强", ex: "She augments her income with freelance translation.", exZh: "她靠自由翻译增加收入。", lv: "CET-6" },
  { w: "boost",       ipa: "/buːst/",           pos: "v./n.", def: "推动；增强", ex: "A short walk can boost your concentration.", exZh: "短暂散步能提升专注力。", lv: "CET-6" },
  { w: "circulate",   ipa: "/ˈsɜːkjuleɪt/",     pos: "v.",    def: "循环；流传", ex: "Rumors circulate faster than corrections.", exZh: "谣言比辟谣传播得更快。", lv: "CET-6" },
  { w: "collide",     ipa: "/kəˈlaɪd/",         pos: "v.",    def: "碰撞；冲突", ex: "The two schedules collide every semester.", exZh: "这两份日程每学期都冲突。", lv: "CET-6" },
  { w: "commence",    ipa: "/kəˈmens/",         pos: "v.",    def: "开始", ex: "The ceremony will commence at nine sharp.", exZh: "仪式九点整开始。", lv: "CET-6" },
  { w: "compatible",  ipa: "/kəmˈpætəbl/",      pos: "adj.",  def: "兼容的；合得来的", ex: "The app is compatible with most browsers.", exZh: "该应用与大多数浏览器兼容。", lv: "CET-6" },
  { w: "compensate",  ipa: "/ˈkɒmpenseɪt/",     pos: "v.",    def: "补偿；弥补", ex: "Nothing can compensate for the loss of time.", exZh: "什么都无法弥补时间的流逝。", lv: "CET-6" },
  { w: "compress",    ipa: "/kəmˈpres/",        pos: "v.",    def: "压缩；精简", ex: "The course compresses three books into twenty lessons.", exZh: "这门课把三本书压缩成二十讲。", lv: "CET-6" },
  { w: "conceal",     ipa: "/kənˈsiːl/",        pos: "v.",    def: "隐藏；隐瞒", ex: "He could hardly conceal his excitement.", exZh: "他几乎藏不住自己的兴奋。", lv: "CET-6" },
  { w: "condemn",     ipa: "/kənˈdem/",         pos: "v.",    def: "谴责；判刑", ex: "The report condemned the use of misleading ads.", exZh: "报告谴责了误导性广告的使用。", lv: "CET-6" },
  { w: "condense",    ipa: "/kənˈdens/",        pos: "v.",    def: "凝结；精简", ex: "Condense your notes into one page before the exam.", exZh: "考前把笔记精简成一页。", lv: "CET-6" },
  { w: "confront",    ipa: "/kənˈfrʌnt/",       pos: "v.",    def: "面对；对抗", ex: "Confront the difficult words early instead of avoiding them.", exZh: "尽早直面难词，而不是回避。", lv: "CET-6" },
  { w: "consolidate", ipa: "/kənˈsɒlɪdeɪt/",    pos: "v.",    def: "巩固；合并", ex: "Sleep helps consolidate what you learned in the day.", exZh: "睡眠有助于巩固白天所学。", lv: "CET-6" },
  { w: "contaminate", ipa: "/kənˈtæmɪneɪt/",    pos: "v.",    def: "污染；弄脏", ex: "Chemical waste contaminated the river.", exZh: "化学废料污染了河流。", lv: "CET-6" },
  { w: "contemplate", ipa: "/ˈkɒntəmpleɪt/",    pos: "v.",    def: "沉思；考虑", ex: "She contemplated changing her major.", exZh: "她考虑过换专业。", lv: "CET-6" },
  { w: "contradict",  ipa: "/ˌkɒntrəˈdɪkt/",    pos: "v.",    def: "反驳；与……矛盾", ex: "The two witnesses contradict each other.", exZh: "两名证人的说法相互矛盾。", lv: "CET-6" },
  { w: "converge",    ipa: "/kənˈvɜːdʒ/",       pos: "v.",    def: "汇聚；趋同", ex: "Experts converge on one conclusion: practice beats talent.", exZh: "专家们得出一致结论：练习胜过天赋。", lv: "CET-6" },
  { w: "curb",        ipa: "/kɜːb/",            pos: "v./n.", def: "抑制；约束", ex: "New rules aim to curb food waste.", exZh: "新规旨在抑制食物浪费。", lv: "CET-6" },
  { w: "deduce",      ipa: "/dɪˈdjuːs/",        pos: "v.",    def: "推断；演绎", ex: "From the evidence, we deduce that the fire started upstairs.", exZh: "根据证据推断，火是从楼上烧起来的。", lv: "CET-6" },
  { w: "deficit",     ipa: "/ˈdefəsɪt/",        pos: "n.",    def: "赤字；不足", ex: "Sleep deficit quietly damages memory.", exZh: "睡眠不足在悄悄损害记忆。", lv: "CET-6" },
  { w: "degrade",     ipa: "/dɪˈɡreɪd/",        pos: "v.",    def: "降低；使退化", ex: "Plastic bags degrade very slowly.", exZh: "塑料袋降解非常缓慢。", lv: "CET-6" },
  { w: "dilemma",     ipa: "/dɪˈlemə/",         pos: "n.",    def: "困境；进退两难", ex: "She faced a dilemma: accept the low-paid job or stay unemployed.", exZh: "她陷入两难：接受低薪工作还是继续失业。", lv: "CET-6" },
  { w: "diminish",    ipa: "/dɪˈmɪnɪʃ/",        pos: "v.",    def: "减少；贬低", ex: "Time will not diminish the value of that discovery.", exZh: "时间不会削减那项发现的价值。", lv: "CET-6" },
  { w: "discard",     ipa: "/dɪsˈkɑːd/",        pos: "v.",    def: "丢弃；抛弃", ex: "Discard outdated methods and keep what works.", exZh: "丢弃过时方法，保留有效的。", lv: "CET-6" },
  { w: "dispatch",    ipa: "/dɪˈspætʃ/",        pos: "v./n.", def: "派遣；发送", ex: "Rescue teams were dispatched within hours.", exZh: "救援队在数小时内被派出。", lv: "CET-6" },
  { w: "distribute",  ipa: "/dɪˈstrɪbjuːt/",    pos: "v.",    def: "分发；分布", ex: "Volunteers distributed textbooks to the village school.", exZh: "志愿者把课本分发到乡村学校。", lv: "CET-6" },
  { w: "denounce",    ipa: "/dɪˈnaʊns/",        pos: "v.",    def: "谴责；告发", ex: "The minister denounced the fake statistics.", exZh: "部长谴责了虚假统计数据。", lv: "CET-6" },
  { w: "deprive",     ipa: "/dɪˈpraɪv/",        pos: "v.",    def: "剥夺；使丧失", ex: "No child should be deprived of education.", exZh: "不应有任何孩子被剥夺受教育的权利。", lv: "CET-6" },
  { w: "devastate",   ipa: "/ˈdevəsteɪt/",      pos: "v.",    def: "毁坏；摧毁", ex: "The flood devastated the small town.", exZh: "洪水摧毁了这座小镇。", lv: "CET-6" },
  { w: "elaborate",   ipa: "/ɪˈlæbərət/",       pos: "adj./v.", def: "精心制作的；详细阐述", ex: "Could you elaborate on your proposal a little more?", exZh: "你能再详细阐述一下你的提案吗？", lv: "CET-6" },
  { w: "inevitable",  ipa: "/ɪnˈevɪtəbl/",      pos: "adj.",  def: "不可避免的", ex: "Some mistakes are an inevitable part of learning.", exZh: "有些错误是学习中不可避免的一部分。", lv: "CET-6" },
  { w: "manipulate",  ipa: "/məˈnɪpjuleɪt/",    pos: "v.",    def: "操纵；巧妙控制", ex: "The ads try to manipulate our emotions.", exZh: "这些广告试图操纵我们的情绪。", lv: "CET-6" },
  { w: "perception",  ipa: "/pəˈsepʃn/",        pos: "n.",    def: "感知；看法；洞察力", ex: "Color can change our perception of taste.", exZh: "颜色能改变我们对味道的感知。", lv: "CET-6" },

  /* ----- TEM-8（40） ----- */
  { w: "alacrity",    ipa: "/əˈlækrəti/",       pos: "n.",    def: "敏捷；欣然", ex: "She accepted the challenge with alacrity.", exZh: "她欣然接受了挑战。", lv: "TEM-8" },
  { w: "anachronism", ipa: "/əˈnækrənɪzəm/",    pos: "n.",    def: "时代错误；不合时宜的事物", ex: "A quill pen in a modern office is an anachronism.", exZh: "现代办公室里的羽毛笔是件不合时宜的东西。", lv: "TEM-8" },
  { w: "belligerent", ipa: "/bəˈlɪdʒərənt/",    pos: "adj.",  def: "好斗的；交战的", ex: "Avoid belligerent debates online; they change no minds.", exZh: "避免网上好斗的争论，那改变不了任何人的想法。", lv: "TEM-8" },
  { w: "cacophony",   ipa: "/kæˈkɒfəni/",       pos: "n.",    def: "刺耳的嘈杂声", ex: "The market exploded into a cacophony of shouts.", exZh: "市场骤然充满嘈杂的叫喊声。", lv: "TEM-8" },
  { w: "capricious",  ipa: "/kəˈprɪʃəs/",       pos: "adj.",  def: "反复无常的；任性的", ex: "The exam board's capricious rules frustrated teachers.", exZh: "考试委员会反复无常的规则让教师沮丧。", lv: "TEM-8" },
  { w: "dearth",      ipa: "/dɜːθ/",            pos: "n.",    def: "缺乏；短缺", ex: "A dearth of listening practice explains many silent learners.", exZh: "缺乏听力练习解释了许多「哑巴学习者」的现象。", lv: "TEM-8" },
  { w: "ebullient",   ipa: "/ɪˈbʌliənt/",       pos: "adj.",  def: "热情洋溢的；沸腾的", ex: "Her ebullient mood infected the whole team.", exZh: "她高涨的情绪感染了整个团队。", lv: "TEM-8" },
  { w: "efficacy",    ipa: "/ˈefɪkəsi/",        pos: "n.",    def: "功效；效力", ex: "Trials confirmed the efficacy of the new method.", exZh: "试验证实了新方法的功效。", lv: "TEM-8" },
  { w: "ephemeral",   ipa: "/ɪˈfemərəl/",       pos: "adj.",  def: "转瞬即逝的；短命的", ex: "Fame on short videos is ephemeral; skills are not.", exZh: "短视频上的名气转瞬即逝，技能却不会。", lv: "TEM-8" },
  { w: "equanimity",  ipa: "/ˌekwəˈnɪməti/",    pos: "n.",    def: "平静；镇定", ex: "She faced the results with equanimity.", exZh: "她平静地面对结果。", lv: "TEM-8" },
  { w: "fastidious",  ipa: "/fæˈstɪdiəs/",      pos: "adj.",  def: "一丝不苟的；挑剔的", ex: "He keeps fastidious records of every new word.", exZh: "他对每个新词都做一丝不苟的记录。", lv: "TEM-8" },
  { w: "gregarious",  ipa: "/ɡrɪˈgeəriəs/",     pos: "adj.",  def: "爱交际的；群居的", ex: "He is gregarious in class but quiet at home.", exZh: "他在班里爱交际，在家却很安静。", lv: "TEM-8" },
  { w: "hubris",      ipa: "/ˈhjuːbrɪs/",       pos: "n.",    def: "傲慢；狂妄", ex: "The company's hubris blinded it to smaller rivals.", exZh: "公司的傲慢让它对小型对手视而不见。", lv: "TEM-8" },
  { w: "iconoclast",  ipa: "/aɪˈkɒnəklæst/",    pos: "n.",    def: "打破旧观念的人", ex: "Every science has its iconoclasts who question the textbooks.", exZh: "每门科学都有质疑教科书的人。", lv: "TEM-8" },
  { w: "ineffable",   ipa: "/ɪnˈefəbl/",        pos: "adj.",  def: "难以言表的", ex: "The relief after the exam was ineffable.", exZh: "考完后的如释重负难以言表。", lv: "TEM-8" },
  { w: "juxtapose",   ipa: "/ˈdʒʌkstəpəʊz/",    pos: "v.",    def: "并列；并置比较", ex: "The essay juxtaposes city life with village routines.", exZh: "文章将城市生活与乡村日常并列比较。", lv: "TEM-8" },
  { w: "laconic",     ipa: "/ləˈkɒnɪk/",        pos: "adj.",  def: "言简意赅的；简短的", ex: "The professor gave a laconic reply: read more.", exZh: "教授给了个言简意赅的回答：多读。", lv: "TEM-8" },
  { w: "luminary",    ipa: "/ˈluːmɪnəri/",      pos: "n.",    def: "杰出人物；发光体", ex: "The conference gathered luminaries from many fields.", exZh: "会议汇聚了各领域的杰出人物。", lv: "TEM-8" },
  { w: "magnanimous", ipa: "/mæɡˈnænɪməs/",     pos: "adj.",  def: "宽宏大量的", ex: "Be magnanimous in victory and graceful in defeat.", exZh: "胜时宽宏，败时优雅。", lv: "TEM-8" },
  { w: "mellifluous", ipa: "/məˈlɪfluəs/",      pos: "adj.",  def: "甜美流畅的；悦耳的", ex: "She read the poem in a mellifluous voice.", exZh: "她用甜美流畅的声音朗诵了这首诗。", lv: "TEM-8" },
  { w: "nemesis",     ipa: "/ˈneməsɪs/",        pos: "n.",    def: "克星；报应", ex: "Procrastination is every student's nemesis.", exZh: "拖延是每个学生的克星。", lv: "TEM-8" },
  { w: "obfuscate",   ipa: "/ˈɒbfʌskeɪt/",      pos: "v.",    def: "混淆；使模糊", ex: "Jargon should clarify, not obfuscate.", exZh: "行话应该澄清而非混淆。", lv: "TEM-8" },
  { w: "obstinate",   ipa: "/ˈɒbstɪnət/",       pos: "adj.",  def: "固执的；顽固的", ex: "He was obstinate about practicing every single day.", exZh: "他固执地坚持每天练习。", lv: "TEM-8" },
  { w: "ostracize",   ipa: "/ˈɒstrəsaɪz/",      pos: "v.",    def: "排斥；放逐", ex: "He was ostracized for pointing out the error.", exZh: "他因指出错误而受到排挤。", lv: "TEM-8" },
  { w: "panacea",     ipa: "/ˌpænəˈsiːə/",      pos: "n.",    def: "万灵药", ex: "No single app is a panacea for language learning.", exZh: "没有一款应用是语言学习的万灵药。", lv: "TEM-8" },
  { w: "perfidious",  ipa: "/pəˈfɪdiəs/",       pos: "adj.",  def: "背信弃义的", ex: "He proved a perfidious friend who shared her secrets.", exZh: "他是个背信弃义的朋友，泄露了她的秘密。", lv: "TEM-8" },
  { w: "pervade",     ipa: "/pəˈveɪd/",         pos: "v.",    def: "弥漫；遍及", ex: "A spirit of curiosity pervades the whole school.", exZh: "好奇的精神弥漫着整个校园。", lv: "TEM-8" },
  { w: "quintessential", ipa: "/ˌkwɪntɪˈsenʃl/", pos: "adj.", def: "典型的；精髓的", ex: "The cafe is quintessential Paris: small, slow, and warm.", exZh: "这家咖啡馆是典型的巴黎风格：小而慢，又温暖。", lv: "TEM-8" },
  { w: "quixotic",    ipa: "/kwɪkˈsɒtɪk/",      pos: "adj.",  def: "不切实际的；堂吉诃德式的", ex: "Fighting every typo on the internet is a quixotic quest.", exZh: "在网络上纠正每一个错字是一场不切现实的苦战。", lv: "TEM-8" },
  { w: "recalcitrant", ipa: "/rɪˈkælsɪtrənt/",  pos: "adj.",  def: "顽固抗拒的", ex: "Even recalcitrant learners soften when progress shows.", exZh: "即使顽固的学习者在进步显现时也会软化。", lv: "TEM-8" },
  { w: "serendipity", ipa: "/ˌserənˈdɪpəti/",   pos: "n.",    def: "机缘巧合；意外之喜", ex: "Meeting her co-author was pure serendipity.", exZh: "与合著者的相遇纯属机缘巧合。", lv: "TEM-8" },
  { w: "soliloquy",   ipa: "/səˈlɪləkwɪ/",      pos: "n.",    def: "独白", ex: "Hamlet's soliloquy is famous for a reason.", exZh: "《哈姆雷特》的独白闻名遐迩，自有其理。", lv: "TEM-8" },
  { w: "succinct",    ipa: "/səkˈsɪŋkt/",       pos: "adj.",  def: "简明扼要的", ex: "Keep your answers succinct and structured.", exZh: "回答要简明且有结构。", lv: "TEM-8" },
  { w: "sycophant",   ipa: "/ˈsɪkəfænt/",       pos: "n.",    def: "阿谀奉承者", ex: "A wise leader listens to critics, not sycophants.", exZh: "明智的领导听取批评者的意见，而非阿谀奉承者。", lv: "TEM-8" },
  { w: "taciturn",    ipa: "/ˈtæsɪtɜːn/",       pos: "adj.",  def: "沉默寡言的", ex: "The taciturn coach spoke only at halftime.", exZh: "沉默寡言的教练只在中场休息时开口。", lv: "TEM-8" },
  { w: "ubiquitous",  ipa: "/juːˈbɪkwɪtəs/",    pos: "adj.",  def: "无处不在的", ex: "Earphones are ubiquitous on campus.", exZh: "耳机在校园里无处不在。", lv: "TEM-8" },
  { w: "vernacular",  ipa: "/vəˈnækjələ(r)/",   pos: "n./adj.", def: "方言；白话的", ex: "Chaucer wrote in the English vernacular of his time.", exZh: "乔叟用他那个时代的英语白话写作。", lv: "TEM-8" },
  { w: "vicissitude", ipa: "/vɪˈsɪsɪtjuːd/",    pos: "n.",    def: "变迁；兴衰", ex: "The novel traces the vicissitudes of a family across a century.", exZh: "这部小说追溯了一个家族一个世纪的兴衰。", lv: "TEM-8" },
  { w: "wistful",     ipa: "/ˈwɪstfl/",         pos: "adj.",  def: "惆怅的；留恋的", ex: "She threw a wistful glance at her old school.", exZh: "她惆怅地望了一眼母校。", lv: "TEM-8" },
  { w: "zealot",      ipa: "/ˈzelət/",          pos: "n.",    def: "狂热者", ex: "A method zealot defends one approach and ignores the rest.", exZh: "方法狂热者捍卫一种方法而无视其他。", lv: "TEM-8" },

  /* ----- IELTS（40） ----- */
  { w: "abundant",    ipa: "/əˈbʌndənt/",       pos: "adj.",  def: "丰富的；充裕的", ex: "The region is abundant in natural resources.", exZh: "该地区自然资源丰富。", lv: "IELTS" },
  { w: "alleviate",   ipa: "/əˈliːvieɪt/",      pos: "v.",    def: "减轻；缓和", ex: "Planting trees helps alleviate urban heat.", exZh: "植树有助于缓解城市高温。", lv: "IELTS" },
  { w: "ambiguous",   ipa: "/æmˈbɪɡjuəs/",      pos: "adj.",  def: "模棱两可的；含糊不清的", ex: "His ambiguous reply left us more confused than before.", exZh: "他模棱两可的回答让我们比以前更困惑了。", lv: "IELTS" },
  { w: "bolster",     ipa: "/ˈbəʊlstə(r)/",     pos: "v.",    def: "加强；支撑", ex: "New data bolster the case for remote work.", exZh: "新数据加强了远程办公的主张。", lv: "IELTS" },
  { w: "burgeon",     ipa: "/ˈbɜːdʒən/",        pos: "v.",    def: "迅速发展；萌芽", ex: "The burgeoning delivery industry hires thousands.", exZh: "快速发展的快递行业雇用了数千人。", lv: "IELTS" },
  { w: "coherent",    ipa: "/kəʊˈhɪərənt/",     pos: "adj.",  def: "连贯的；条理清楚的", ex: "A good essay presents a coherent argument from start to finish.", exZh: "好的文章从头到尾呈现连贯的论证。", lv: "IELTS" },
  { w: "compelling",  ipa: "/kəmˈpelɪŋ/",       pos: "adj.",  def: "有说服力的；引人入胜的", ex: "The documentary makes a compelling argument for sleep.", exZh: "这部纪录片为睡眠的重要性提供了有说服力的论证。", lv: "IELTS" },
  { w: "compel",      ipa: "/kəmˈpel/",         pos: "v.",    def: "强迫；驱使", ex: "Rising rents compel young workers to move out.", exZh: "不断上涨的租金迫使年轻工人搬离。", lv: "IELTS" },
  { w: "conducive",   ipa: "/kənˈdjuːsɪv/",     pos: "adj.",  def: "有助于的；有益的", ex: "Quiet libraries are conducive to deep reading.", exZh: "安静的图书馆有助于深度阅读。", lv: "IELTS" },
  { w: "contentious", ipa: "/kənˈtenʃəs/",      pos: "adj.",  def: "有争议的；爱争论的", ex: "Screen time limits remain a contentious topic among parents.", exZh: "屏幕时间限制仍是家长间有争议的话题。", lv: "IELTS" },
  { w: "credible",    ipa: "/ˈkredəbl/",        pos: "adj.",  def: "可信的；可靠的", ex: "The report is credible because it cites official data.", exZh: "这份报告引用了官方数据，因而可信。", lv: "IELTS" },
  { w: "deterioration", ipa: "/dɪˌtɪəriəˈreɪʃn/", pos: "n.",  def: "恶化；退化", ex: "Years of neglect led to the deterioration of the old bridge.", exZh: "多年疏于维护导致老桥状况恶化。", lv: "IELTS" },
  { w: "detrimental", ipa: "/ˌdetrɪˈmentl/",    pos: "adj.",  def: "有害的；不利的", ex: "Skipping breakfast is detrimental to concentration.", exZh: "不吃早餐有害于注意力。", lv: "IELTS" },
  { w: "discrepancy", ipa: "/dɪsˈkrepənsi/",    pos: "n.",    def: "差异；不符", ex: "There is a discrepancy between the two reports.", exZh: "两份报告之间存在差异。", lv: "IELTS" },
  { w: "disparity",   ipa: "/dɪˈspærəti/",      pos: "n.",    def: "差异；悬殊", ex: "A wide disparity exists in broadband access.", exZh: "宽带接入存在巨大差异。", lv: "IELTS" },
  { w: "emulate",     ipa: "/ˈemjuleɪt/",       pos: "v.",    def: "效仿；努力赶上", ex: "Young players emulate their idols' training habits.", exZh: "年轻球员效仿偶像的训练习惯。", lv: "IELTS" },
  { w: "exacerbate",  ipa: "/ɪɡˈzæsəbeɪt/",     pos: "v.",    def: "加剧；恶化", ex: "Traffic noise exacerbates stress in dense districts.", exZh: "交通噪音加剧了密集城区的压力。", lv: "IELTS" },
  { w: "feasible",    ipa: "/ˈfiːzəbl/",        pos: "adj.",  def: "可行的", ex: "The plan is technically feasible but financially risky.", exZh: "该计划技术上可行，但财务上有风险。", lv: "IELTS" },
  { w: "holistic",    ipa: "/həʊˈlɪstɪk/",      pos: "adj.",  def: "整体的；全面的", ex: "The school takes a holistic view of assessment.", exZh: "学校对评估持整体观。", lv: "IELTS" },
  { w: "imperative",  ipa: "/ɪmˈperətɪv/",      pos: "adj./n.", def: "必要的；紧急的", ex: "Regular backup is imperative for researchers.", exZh: "定期备份对研究人员必不可少。", lv: "IELTS" },
  { w: "intricate",   ipa: "/ˈɪntrɪkət/",       pos: "adj.",  def: "错综复杂的", ex: "The clock's intricate design took years to master.", exZh: "钟表复杂的设计需要数年才能掌握。", lv: "IELTS" },
  { w: "lucrative",   ipa: "/ˈluːkrətɪv/",      pos: "adj.",  def: "有利可图的", ex: "Translation proved more lucrative than she expected.", exZh: "翻译比她预期的更有利可图。", lv: "IELTS" },
  { w: "mandatory",   ipa: "/ˈmændətəri/",      pos: "adj.",  def: "强制的；法定的", ex: "Helmets are mandatory on this cycling route.", exZh: "这条骑行路线必须佩戴头盔。", lv: "IELTS" },
  { w: "meticulous",  ipa: "/məˈtɪkjələs/",     pos: "adj.",  def: "一丝不苟的；严谨的", ex: "He keeps meticulous notes of every experiment.", exZh: "他对每次实验都做一丝不苟的记录。", lv: "IELTS" },
  { w: "mitigate",    ipa: "/ˈmɪtɪɡeɪt/",       pos: "v.",    def: "减轻；缓和", ex: "Planting trees can mitigate the effects of climate change.", exZh: "植树可以减轻气候变化的影响。", lv: "IELTS" },
  { w: "notion",      ipa: "/ˈnəʊʃn/",          pos: "n.",    def: "观念；概念", ex: "The notion that money brings happiness is widely questioned.", exZh: "金钱带来幸福的观念广受质疑。", lv: "IELTS" },
  { w: "obsolete",    ipa: "/ˈɒbsəliːt/",       pos: "adj.",  def: "过时的；被淘汰的", ex: "Fax machines have become almost obsolete in modern offices.", exZh: "传真机在现代办公室几乎已被淘汰。", lv: "IELTS" },
  { w: "paramount",   ipa: "/ˈpærəmaʊnt/",      pos: "adj.",  def: "至上的；首要的", ex: "Safety is paramount in every lab.", exZh: "安全在所有实验室都是首要的。", lv: "IELTS" },
  { w: "plummet",     ipa: "/ˈplʌmɪt/",         pos: "v.",    def: "暴跌；骤降", ex: "Solar prices plummeted over the decade.", exZh: "十年间太阳能价格暴跌。", lv: "IELTS" },
  { w: "pragmatic",   ipa: "/præɡˈmætɪk/",      pos: "adj.",  def: "务实的；实用的", ex: "We need a pragmatic approach to solving the problem.", exZh: "我们需要一种务实的方法来解决这个问题。", lv: "IELTS" },
  { w: "profound",    ipa: "/prəˈfaʊnd/",       pos: "adj.",  def: "深刻的；深远的", ex: "The internet has had a profound effect on education.", exZh: "互联网对教育产生了深远的影响。", lv: "IELTS" },
  { w: "resilience",  ipa: "/rɪˈzɪliəns/",      pos: "n.",    def: "韧性；恢复力", ex: "Daily practice builds resilience in both body and mind.", exZh: "每日练习能增强身心的韧性。", lv: "IELTS" },
  { w: "scrutinize",  ipa: "/ˈskruːtənaɪz/",    pos: "v.",    def: "仔细审查；细看", ex: "Auditors scrutinized every expense claim.", exZh: "审计人员仔细审查了每一笔报销。", lv: "IELTS" },
  { w: "substantial", ipa: "/səbˈstænʃl/",      pos: "adj.",  def: "大量的；相当大的", ex: "The project requires substantial investment in its first year.", exZh: "该项目第一年需要大量投资。", lv: "IELTS" },
  { w: "surge",       ipa: "/sɜːdʒ/",           pos: "n./v.", def: "激增；汹涌", ex: "A surge in applications followed the policy change.", exZh: "政策调整后申请数量激增。", lv: "IELTS" },
  { w: "sustainable", ipa: "/səˈsteɪnəbl/",     pos: "adj.",  def: "可持续的", ex: "The city is developing a sustainable public transport system.", exZh: "这座城市正在发展可持续的公共交通系统。", lv: "IELTS" },
  { w: "threshold",   ipa: "/ˈθreʃhəʊld/",      pos: "n.",    def: "门槛；阈值；起点", ex: "Many learners never cross the threshold of speaking practice.", exZh: "许多学习者从未跨过开口练习这道门槛。", lv: "IELTS" },
  { w: "undermine",   ipa: "/ˌʌndəˈmaɪn/",      pos: "v.",    def: "削弱；暗中破坏", ex: "Constant interruptions undermine deep work.", exZh: "频繁打扰削弱深度工作。", lv: "IELTS" },
  { w: "unprecedented", ipa: "/ʌnˈpresɪdentɪd/", pos: "adj.", def: "前所未有的", ex: "Renewable energy is growing at an unprecedented speed.", exZh: "可再生能源正以前所未有的速度增长。", lv: "IELTS" },
  { w: "versatile",   ipa: "/ˈvɜːsətaɪl/",      pos: "adj.",  def: "多才多艺的；用途广泛的", ex: "Bamboo is a remarkably versatile material.", exZh: "竹子是一种用途极其广泛的材料。", lv: "IELTS" }
];

/* ---------------- 文章（6 篇，低/中/高各 2，主题各异，原创） ---------------- */
const ARTICLES = [
  {
    id: "a1", lv: 1, lvName: "低", topic: "励志成长",
    title: "Start Small, Dream Big",
    titleZh: "从小事开始，做大大的梦",
    paras: [
      "Every morning, Anna writes down three small tasks for the day. They are never big things. \"Read ten pages of a book.\" \"Walk for twenty minutes.\" \"Learn five new English words.\" Small tasks are easy to finish, and finishing them feels good.",
      "Many people fail because their goals are too big. They want to run ten kilometers on the first day. They want to speak English like a native speaker in one month. When results come slowly, they feel sad and give up.",
      "Anna is different. She believes that small steps, taken every day, lead to big changes. If you learn five words a day, you will know more than 1,800 words in a year. If you walk twenty minutes a day, your body will thank you in ways you cannot see now.",
      "Science supports this idea. Our brain learns better when we study a little every day, not a lot once a week. Each small review makes memory stronger. Each small practice makes skill deeper.",
      "So do not wait for the \"perfect\" day to start. That day will never come. Start today, and start small. Finish one small task, and enjoy that little win. Then finish another.",
      "Big dreams are not built in one night. They are built morning by morning, task by task, word by word. Your future self is watching you. Make her proud."
    ],
    gloss: {
      "task":     { pos: "n.",    def: "任务；工作" },
      "goal":     { pos: "n.",    def: "目标" },
      "fail":     { pos: "v.",    def: "失败；未能做到" },
      "native":   { pos: "adj.",  def: "本族的；母语的" },
      "result":   { pos: "n.",    def: "结果" },
      "believe":  { pos: "v.",    def: "相信" },
      "support":  { pos: "v.",    def: "支持；证实" },
      "brain":    { pos: "n.",    def: "大脑" },
      "memory":   { pos: "n.",    def: "记忆" },
      "skill":    { pos: "n.",    def: "技能" },
      "review":   { pos: "n./v.", def: "复习" },
      "perfect":  { pos: "adj.",  def: "完美的" },
      "win":      { pos: "n.",    def: "胜利；赢" },
      "proud":    { pos: "adj.",  def: "自豪的" },
      "dream":    { pos: "n.",    def: "梦想" },
      "step":     { pos: "n.",    def: "步骤；一步" }
    }
  },
  {
    id: "a2", lv: 2, lvName: "中", topic: "旅游文化",
    title: "A Morning in Kyoto",
    titleZh: "京都的清晨",
    paras: [
      "The train arrives at Kyoto Station just after six in the morning. The city is still quiet, and the air is cool and clean. Outside, the sky changes from gray to a soft pink, and the mountains around the city appear gradually, like a picture being painted one color at a time.",
      "I walk north from the station, through narrow streets that most tourists never find. The old wooden houses here have stood for a hundred years. Their owners are just beginning to open the shops, sliding the panels aside with a slow, practiced motion. An old man sweeps the water of the night's rain off the street in front of his small bakery, and the smell of fresh bread follows me for half a street.",
      "Kyoto was the capital of Japan for more than a thousand years, and despite its famous temples and crowds, it keeps a quieter heart than Tokyo. You do not have to look for famous places here. Beauty hides in ordinary things: a wet stone path, a row of bicycles, a cat sleeping under the wooden gate of a house.",
      "By seven, I reach a small temple in the northern district. A garden opens quietly in front of the main hall: white sand, dark green pines, one stone bridge. Nobody else is there. I sit on the edge of the wooden floor and listen. Water drops from the roof after the rain, and each drop makes the morning feel even quieter. In moments like this, it is easy to understand why monks have come to this city for centuries to practice stillness.",
      "Later, I stop at a tiny tea house near the market. The owner, a woman in her seventies, brings me a cup of green tea and one small sweet. She does not hurry me. In fact, she seems to encourage me to stay. The tea is warm, bitter at first and then soft, and the room smells like old wood. On the wall hangs a seasonal flower — one branch only, chosen with care, as if the whole season had been cut down to a single line of poetry.",
      "Traveling alone, we sometimes hesitate to enter small, unknown places. We feel safer in famous ones. But it is often the modest places that leave the deepest impression. That morning in Kyoto gave me nothing I could photograph well, and everything I could remember.",
      "Cities are like people: the famous ones shine, but the quiet ones stay. I finished my tea, thanked the owner, and walked back into the street. The sun had fully risen now, and the day had begun. I did not feel that I had \"seen\" Kyoto. I felt that, for one morning, I had participated in it — and that is a rarer thing."
    ],
    gloss: {
      "gradually":   { pos: "adv.",  def: "逐渐地" },
      "narrow":      { pos: "adj.",  def: "狭窄的" },
      "wooden":      { pos: "adj.",  def: "木制的" },
      "despite":     { pos: "prep.", def: "尽管" },
      "temple":      { pos: "n.",    def: "寺庙" },
      "ordinary":    { pos: "adj.",  def: "平凡的；普通的" },
      "capital":     { pos: "n.",    def: "首都" },
      "district":    { pos: "n.",    def: "区域；街区" },
      "hall":        { pos: "n.",    def: "大厅；殿堂" },
      "practice":    { pos: "v.",    def: "修行；练习" },
      "stillness":   { pos: "n.",    def: "静止；宁静" },
      "tiny":        { pos: "adj.",  def: "极小的" },
      "encourage":   { pos: "v.",    def: "鼓励" },
      "bitter":      { pos: "adj.",  def: "苦的" },
      "seasonal":    { pos: "adj.",  def: "季节性的" },
      "hesitate":    { pos: "v.",    def: "犹豫" },
      "modest":      { pos: "adj.",  def: "朴素的；不起眼的" },
      "impression":  { pos: "n.",    def: "印象" },
      "rare":        { pos: "adj.",  def: "稀少的；罕见的" },
      "bakery":      { pos: "n.",    def: "面包店" }
    }
  },
  {
    id: "a3", lv: 3, lvName: "高", topic: "财经商业",
    title: "The Quiet Revolution of Renewable Energy",
    titleZh: "可再生能源的静默革命",
    paras: [
      "For most of the twentieth century, the global energy system ran on coal and oil, and the economics of that system seemed fixed. Today, that assumption looks increasingly obsolete. Solar panels and wind turbines are no longer niche technologies propped up by subsidies; in many markets they are now the cheapest way to generate electricity ever recorded. What began as an environmental argument has quietly become an economic one — and the speed of the change is unprecedented.",
      "Consider the numbers. Over the past decade, the cost of utility-scale solar power has fallen by roughly ninety percent, while battery prices have collapsed at a similar rate. These are not ordinary improvements. In most industries, costs decline gradually; in renewables, they have fallen so fast that official forecasts, renewed every year, have been out of date within months. Investment has followed the arithmetic. Global capital deployed into clean energy now exceeds investment in fossil fuels, and the gap widens each year. Institutional investors, once skeptical, now treat the energy transition as a structural trend rather than a moral preference.",
      "Yet the revolution remains incomplete, and honest analysis must acknowledge the obstacles. The first is intermittency: the sun does not always shine, and the wind does not always blow. Grids built for steady, predictable generation must be rebuilt around fluctuating supply, which requires substantial investment in storage, transmission, and flexible demand. The second is mineral supply. Batteries and turbines depend on lithium, cobalt, copper, and rare-earth elements, whose supply chains are geographically concentrated. A discrepancy between projected demand and actual mining capacity could slow the transition and reprice entire industries. The third obstacle is political. Subsidies and incentives can accelerate adoption, but they can also be withdrawn; investors who watched policy reversals in several large economies have learned that regulatory risk is now as material as price risk.",
      "Nowhere is the dilemma sharper than in the developing world. More than seven hundred million people still lack reliable electricity. It would be both unfair and impractical to deny them the cheapest energy available, and in many cases that energy is no longer coal. Leapfrogging — building clean infrastructure from the start, as some African nations did with mobile phones — is technically feasible and increasingly economical. But it requires capital at a scale that private markets alone will not provide. How international finance is organized in this decade will therefore have a profound effect on both global emissions and global equality.",
      "The conventional objection, that renewables cannot power an industrial economy, is steadily losing credibility. Several major economies have already run on high shares of wind and solar for days at a time without blackouts. Meanwhile, the technologies that compensate for intermittency — grid-scale batteries, long-distance transmission, demand management, and eventually green hydrogen — are moving down their own cost curves. The notion that the transition must wait for a single breakthrough has been replaced by a more pragmatic picture: dozens of incremental technologies, each becoming slightly cheaper and slightly better, compounding year after year.",
      "There is also a subtler shift worth naming. For a century, energy meant extraction: dig, pump, burn. Renewable energy replaces extraction with manufacturing — build, install, maintain. Manufacturing scales differently. It rewards learning curves, standardization, and volume; it improves through repetition in the way that any factory does. This is why cost declines in renewables have been so persistent and so hard to stop. Once an industry learns to build something cheaper, the knowledge does not disappear. It accumulates.",
      "None of this implies a smooth road. Volatile prices, trade disputes, and the inevitable political fights over who pays for the transition will continue to generate headlines. Crossing the threshold from \"cheap niche\" to \"dominant default\" is, historically, the moment when incumbents push back hardest. But the underlying direction is now clear enough that even the most cautious institutions plan around it. The International Energy Agency, long criticized for underestimating renewables, now projects that fossil demand will peak before the end of this decade.",
      "The revolution in energy will not be televised as a single dramatic event. It is happening the way real change usually happens: quietly, cumulatively, invoice by invoice, in decisions made by engineers, accountants, and ordinary consumers. Its outcome is not yet fully determined — human choices still matter — but its momentum is real, and it is worth understanding, because it will shape the economy, the climate, and the politics of the century ahead."
    ],
    gloss: {
      "obsolete":      { pos: "adj.",  def: "过时的；被淘汰的" },
      "unprecedented": { pos: "adj.",  def: "前所未有的" },
      "subsidy":       { pos: "n.",    def: "补贴" },
      "deploy":        { pos: "v.",    def: "部署；投入（资金/设备）" },
      "arithmetic":    { pos: "n.",    def: "算术；计算" },
      "structural":    { pos: "adj.",  def: "结构性的" },
      "skeptical":     { pos: "adj.",  def: "持怀疑态度的" },
      "intermittency": { pos: "n.",    def: "间歇性（供电不稳定）" },
      "fluctuate":     { pos: "v.",    def: "波动；起伏" },
      "substantial":   { pos: "adj.",  def: "大量的；相当大的" },
      "transmission":  { pos: "n.",    def: "输电；传输" },
      "mineral":       { pos: "n.",    def: "矿物" },
      "discrepancy":   { pos: "n.",    def: "差异；不符" },
      "accelerate":    { pos: "v.",    def: "加速" },
      "regulatory":    { pos: "adj.",  def: "监管的" },
      "leapfrog":      { pos: "v.",    def: "跨越式发展" },
      "infrastructure":{ pos: "n.",    def: "基础设施" },
      "feasible":      { pos: "adj.",  def: "可行的" },
      "profound":      { pos: "adj.",  def: "深刻的；深远的" },
      "emission":      { pos: "n.",    def: "排放物" },
      "credibility":   { pos: "n.",    def: "可信度" },
      "compensate":    { pos: "v.",    def: "补偿；弥补" },
      "notion":        { pos: "n.",    def: "观念；概念" },
      "pragmatic":     { pos: "adj.",  def: "务实的" },
      "extraction":    { pos: "n.",    def: "开采；提取" },
      "cumulative":    { pos: "adj.",  def: "累积的" },
      "volatile":      { pos: "adj.",  def: "剧烈波动的" },
      "inevitable":    { pos: "adj.",  def: "不可避免的" },
      "threshold":     { pos: "n.",    def: "门槛；阈值" },
      "incumbent":     { pos: "n.",    def: "在位者；现有厂商" },
      "momentum":      { pos: "n.",    def: "势头；动量" }
    }
  },
  {
    id: "a4", lv: 1, lvName: "低", topic: "科技生活",
    title: "A Tiny Computer on My Wrist",
    titleZh: "我手腕上的小电脑",
    paras: [
      "Last month my uncle gave me a smart watch as a birthday gift. At first, I thought it was just a toy. Now I wear it every day, and it has quietly changed some of my habits.",
      "The watch counts my steps. A small ring on the screen closes when I reach eight thousand steps. I used to take the lift to the third floor. Now I take the stairs, because I want to see that ring close before dinner.",
      "It also reminds me to stand up. Every fifty minutes, it taps my wrist gently. When I am reading or drawing, I often forget the time, so this little tap is more useful than it sounds.",
      "My favorite part is the sleep report. The watch records when I fall asleep and when I wake up. On days when I sleep before eleven, my deep sleep is longer, and my body feels lighter in the morning. The data taught me something no book had taught me before.",
      "Some people say smart watches make people anxious about numbers. I understand that worry. So I made a rule for myself: I look at the reports, I learn from them, and then I put the phone away. The watch is a helper, not a boss.",
      "Technology is like food. A little of it nourishes you; too much of it harms you. A tiny computer on my wrist reminds me to move, to rest, and to sleep on time. For now, that is exactly the right size."
    ],
    gloss: {
      "gift":       { pos: "n.",    def: "礼物" },
      "toy":        { pos: "n.",    def: "玩具" },
      "habit":      { pos: "n.",    def: "习惯" },
      "screen":     { pos: "n.",    def: "屏幕" },
      "lift":       { pos: "n.",    def: "电梯（英式）" },
      "ring":       { pos: "n.",    def: "环；圆圈" },
      "remind":     { pos: "v.",    def: "提醒" },
      "tap":        { pos: "v./n.", def: "轻敲；轻拍" },
      "wrist":      { pos: "n.",    def: "手腕" },
      "record":     { pos: "v.",    def: "记录" },
      "data":       { pos: "n.",    def: "数据" },
      "anxious":    { pos: "adj.",  def: "焦虑的；担忧的" },
      "technology": { pos: "n.",    def: "技术；科技" },
      "nourish":    { pos: "v.",    def: "滋养；养育" },
      "harm":       { pos: "v.",    def: "伤害；损害" }
    }
  },
  {
    id: "a5", lv: 2, lvName: "中", topic: "健康生活",
    title: "The Case for Walking",
    titleZh: "走路的理由",
    paras: [
      "Of all the forms of exercise, walking is the most underrated. It requires no equipment, no membership, and no special clothing. Yet study after study links a regular walking habit to a longer life, a steadier mood, and a sharper mind.",
      "Part of walking's power comes from its gentleness. Because it is low-impact, almost anyone can do it daily without injury. Runners must plan recovery days; walkers rarely do. This consistency matters more than intensity: thirty minutes every day beats a two-hour workout once a month.",
      "Walking also changes how we think. Stanford researchers found that creative output rose by roughly sixty percent when people walked instead of sitting. Writers from Dickens to Darwin built their days around long walks, convinced that the rhythm of the feet fed the rhythm of ideas.",
      "There is a social dimension as well. Walking side by side, conversation flows more easily than across a table. Many families repair their relationships not in intense discussions, but on slow evening walks around the neighborhood.",
      "The best part is that walking scales to any life. You can take the stairs, get off the bus one stop early, or pace while you memorize vocabulary. Exercise does not have to be a project. Sometimes it can simply be the way you move through your day."
    ],
    gloss: {
      "underrated":   { pos: "adj.",  def: "被低估的" },
      "equipment":    { pos: "n.",    def: "设备；器材" },
      "membership":   { pos: "n.",    def: "会员资格" },
      "regular":      { pos: "adj.",  def: "规律的；定期的" },
      "mood":         { pos: "n.",    def: "情绪；心境" },
      "consistency":  { pos: "n.",    def: "坚持；一致性" },
      "intensity":    { pos: "n.",    def: "强度" },
      "injury":       { pos: "n.",    def: "受伤" },
      "recovery":     { pos: "n.",    def: "恢复" },
      "creative":     { pos: "adj.",  def: "有创造力的" },
      "rhythm":       { pos: "n.",    def: "节奏" },
      "conversation": { pos: "n.",    def: "对话；交谈" },
      "neighborhood": { pos: "n.",    def: "街区；邻里" },
      "vocabulary":   { pos: "n.",    def: "词汇量" }
    }
  },
  {
    id: "a6", lv: 3, lvName: "高", topic: "文化阅读",
    title: "Why We Still Read Old Books",
    titleZh: "我们为何仍读旧书",
    paras: [
      "Every generation rediscovers the same anxiety: that its attention span is collapsing, that screens have hollowed out patience, and that the long book — like the long conversation — is quietly dying. The fear is ancient, which is precisely why it deserves scrutiny.",
      "Consider what old books actually ask of us. They demand context: a reader of Jane Austen must navigate an economy of manners where a single word carries a wallet's worth of social information. They reward annotation, rereading, and a tolerance for sentences that unfold like corridors in an unfamiliar palace.",
      "Defenders of the canon sometimes oversell it as a moral pantry, stocked with ready-made virtue. The truth is more interesting. Old books endure not because they are correct — many are ignorant by modern lights — but because they dramatize arguments that every generation must rehearse: ambition against loyalty, freedom against obligation, the individual against the crowd.",
      "Reading them is therefore less like visiting a museum than like attending a rehearsal. The stage is dusty and the costumes are strange, yet the quarrels on stage are unmistakably ours. When Elizabeth Bennet refuses a convenient marriage, she argues every reader's future argument against convenience itself.",
      "None of this requires nostalgia. Screens are not the enemy; skimming is. A generation raised on feeds can still acquire the stamina for sustained attention, the way city dwellers acquire lungs that forgive the air. The method is unglamorous: fifteen pages a night, a pencil, and the humility to be confused in public — in the margins, at least.",
      "In the end, old books persist for the same reason old roads do: they lead somewhere people still want to go. The destination is not the past. It is a longer present tense — a self that can sit still long enough to hear how its own arguments sound."
    ],
    gloss: {
      "anxiety":    { pos: "n.",    def: "焦虑；担忧" },
      "collapse":   { pos: "v.",    def: "崩溃；坍塌" },
      "scrutiny":   { pos: "n.",    def: "仔细审视" },
      "context":    { pos: "n.",    def: "语境；背景" },
      "navigate":   { pos: "v.",    def: "驾驭；穿行" },
      "annotation": { pos: "n.",    def: "注释；批注" },
      "tolerance":  { pos: "n.",    def: "容忍；宽容" },
      "endure":     { pos: "v.",    def: "持久；忍受" },
      "dramatize":  { pos: "v.",    def: "戏剧化地呈现" },
      "rehearse":   { pos: "v.",    def: "排练；预演" },
      "ambition":   { pos: "n.",    def: "雄心；抱负" },
      "obligation": { pos: "n.",    def: "义务；责任" },
      "nostalgia":  { pos: "n.",    def: "怀旧；乡愁" },
      "stamina":    { pos: "n.",    def: "耐力；精力" }
    }
  },
  {
    id: "a7", lv: 1, lvName: "低", topic: "经济商业",
    title: "The Price of a Loaf",
    titleZh: "一条面包的价格",
    paras: [
      "Maria owns a small bakery on Green Street. Every morning at five she turns on the ovens and bakes bread for the neighborhood. But this year, a bag of flour costs almost twice as much as last year, and her rent has gone up too.",
      "Maria faces a hard choice. If she keeps her prices the same, she may lose money on every loaf. If she raises them, some customers might walk to the supermarket and buy cheaper bread. Every small business owner thinks about this balance every day.",
      "In the end she decides on a small increase, and she puts a friendly note beside the bread. The note explains why prices changed. Most customers smile and keep coming back, because the bread is fresh and the quality never drops.",
      "A price, Maria learns, is more than a number. It is a message between a shop and its people. When the message is honest, loyalty grows — even when prices climb."
    ],
    gloss: {
      "bakery":   { pos: "n.",  def: "面包店" },
      "oven":     { pos: "n.",  def: "烤箱" },
      "flour":    { pos: "n.",  def: "面粉" },
      "rent":     { pos: "n.",  def: "租金" },
      "choice":   { pos: "n.",  def: "选择" },
      "loaf":     { pos: "n.",  def: "一条（面包）" },
      "customer": { pos: "n.",  def: "顾客" },
      "increase": { pos: "n.",  def: "增加；上涨" },
      "quality":  { pos: "n.",  def: "质量" },
      "loyalty":  { pos: "n.",  def: "忠诚；忠实" },
      "honest":   { pos: "adj.", def: "诚实的" }
    }
  },
  {
    id: "a8", lv: 1, lvName: "低", topic: "政治社会",
    title: "A Town Decides Together",
    titleZh: "小镇的集体决定",
    paras: [
      "Every spring, the small town of Riverbend holds a town meeting in the school hall. Citizens sit on folding chairs, drink coffee, and decide together how to spend public money. It is democracy at its most basic level.",
      "This year, the big question is the library. The old building is small, dark, and often crowded. Supporters of a new one say children need quiet space to read and study. Others argue that broken roads and old water pipes should come first, because a town cannot run without them.",
      "For two hours, neighbors stand and speak, one at a time. The mayor writes each idea on a large whiteboard. Nobody shouts, and nobody leaves early. In the end, they hold a vote by paper ballot, and every opinion counts the same.",
      "The result is close: sixty-one percent say yes to the library, with a small tax added next year to pay for it. People shake hands even when they lose the vote. Respect, the mayor says, is the habit that keeps a town together."
    ],
    gloss: {
      "citizen":  { pos: "n.",   def: "公民；市民" },
      "public":   { pos: "adj.", def: "公共的" },
      "library":  { pos: "n.",   def: "图书馆" },
      "crowded":  { pos: "adj.", def: "拥挤的" },
      "mayor":    { pos: "n.",   def: "镇长；市长" },
      "shout":    { pos: "v.",   def: "喊叫；大声嚷" },
      "ballot":   { pos: "n.",   def: "选票；投票" },
      "opinion":  { pos: "n.",   def: "意见；看法" },
      "tax":      { pos: "n.",   def: "税" },
      "respect":  { pos: "n.",   def: "尊重" }
    }
  },
  {
    id: "a9", lv: 2, lvName: "中", topic: "财经商业",
    title: "When Prices Learn to Climb",
    titleZh: "当物价开始爬升",
    paras: [
      "For three decades, inflation was the ghost that economists mentioned only at parties. Then, in the years after the pandemic, the ghost moved into every shopping basket. Groceries, rent, fuel, second-hand cars: almost everything climbed at once, and a word from the 1970s returned to the front pages.",
      "Inflation is quietly democratic. At the bakery it means flour; for a student it means rent; for a retiree it means the interest on savings no longer covers a cup of coffee. Yet the mechanism is stubbornly impersonal: too much money chasing too few goods, multiplied by supply shocks that no single country controls.",
      "Central banks answered in the only language they speak fluently: interest rates. Higher rates make borrowing expensive, cool demand, and slowly pull prices back toward their target. The medicine works, but the pain is uneven — construction projects freeze first, while homeowners with cheap long-term loans barely notice.",
      "The most dangerous version of the disease is a wage-price spiral. Workers, watching their budget shrink, ask for a higher wage; companies pass the cost into prices; prices then justify the next round of asks. Expectations, once unanchored, become self-fulfilling arithmetic — which is why central bankers talk so much about psychology and so little about bread.",
      "By the middle of the decade, most economies had settled into an uneasy truce. The stimulus of the recovery years faded, supply chains healed, and recession was avoided more narrowly than anyone admits in public. The lasting lesson is humbler than the textbooks suggest: prices are information, and inflation is what happens when that information turns into noise."
    ],
    gloss: {
      "inflation":    { pos: "n.",   def: "通货膨胀" },
      "groceries":    { pos: "n.",   def: "食品杂货" },
      "fuel":         { pos: "n.",   def: "燃料" },
      "retiree":      { pos: "n.",   def: "退休者" },
      "interest":     { pos: "n.",   def: "利息" },
      "savings":      { pos: "n.",   def: "储蓄" },
      "wage":         { pos: "n.",   def: "工资" },
      "spiral":       { pos: "n.",   def: "螺旋式上升" },
      "budget":       { pos: "n.",   def: "预算" },
      "expectation":  { pos: "n.",   def: "预期" },
      "stimulus":     { pos: "n.",   def: "经济刺激（政策）" },
      "recession":    { pos: "n.",   def: "经济衰退" }
    }
  },
  {
    id: "a10", lv: 2, lvName: "中", topic: "科技健康",
    title: "The Doctor's New Assistant",
    titleZh: "医生的新助手",
    paras: [
      "The patient arrives with a cough that has lasted three weeks. Nothing in the basic examination explains it. Forty years ago, the diagnosis would rest on a physician's memory and a lucky guess. Today, a chest scan is read twice — once by a radiologist, and once by an algorithm trained on millions of similar images.",
      "Medical AI is not a robot with a white coat. It is pattern-recognition software that learns from enormous datasets of scans, test results, and recorded outcomes. Its gift is consistency: it does not get tired at hour eleven of a shift, and its memory never quietly deletes a rare symptom it saw once in training.",
      "The results, in narrow tasks, are impressive. Some systems now detect early lung tumors, diabetic eye disease, and hidden fractures better than tired humans do. In screening programs, this matters enormously, because the patients who benefit most are exactly the ones no specialist has time to study carefully.",
      "Yet the limits are as real as the promise. An algorithm trained in one hospital can misread patients from another, because machines inherit the bias of their data. Privacy remains unresolved: a dataset of symptoms is also a database of people. And a confident prediction is not a conversation — a doctor must still sit with the patient and explain what the machine cannot.",
      "The likeliest future is therefore a partnership rather than a takeover. The machine flags the shadow that the eye might miss; the physician weighs it against a life, a history, and a family waiting outside. Medicine, after all, is not only knowing what the pattern is. It is knowing what it means for this person, on this day, in this room."
    ],
    gloss: {
      "diagnosis":    { pos: "n.",   def: "诊断" },
      "physician":    { pos: "n.",   def: "内科医生" },
      "scan":         { pos: "n./v.", def: "扫描；扫描检查" },
      "radiologist":  { pos: "n.",   def: "放射科医生" },
      "algorithm":    { pos: "n.",   def: "算法" },
      "dataset":      { pos: "n.",   def: "数据集" },
      "symptom":      { pos: "n.",   def: "症状" },
      "detect":       { pos: "v.",   def: "检测；发现" },
      "tumor":        { pos: "n.",   def: "肿瘤" },
      "screening":    { pos: "n.",   def: "筛查" },
      "bias":         { pos: "n.",   def: "偏差；偏见" },
      "privacy":      { pos: "n.",   def: "隐私" }
    }
  },
  {
    id: "a11", lv: 2, lvName: "中", topic: "政治社会",
    title: "Cities at the Water's Edge",
    titleZh: "临水的城市",
    paras: [
      "Every serious plan to fight climate change is written in two halves: the half that tries to stop it, and the half that learns to live with it. The first half belongs to treaties and carbon targets. The second half belongs to cities — especially the coastal ones, where the water is already voting with its feet.",
      "Jakarta is sinking into the Java Sea; Venice is learning to close its gates against the tide. In richer cities, the answer has been engineering: seawalls, higher pumps, smarter drainage that sends storm water back where it came from. In poorer ones, the answer has too often been moving — quietly, one flooded street at a time.",
      "Adaptation has a budget problem. A seawall is concrete, visible, and politically easy to celebrate at a ribbon-cutting. Quietly restoring wetlands, or helping a low-lying neighborhood relocate before the disaster instead of after it, wins no ceremonies and few votes. Mayors who plan for a flood that has not yet arrived are often punished at the ballot box by residents who prefer promises they can spend now.",
      "Insurance is becoming the quiet referee of the century. When private insurers pull back from a coastline, they send a price signal that no summit statement can match. Mortgages get shorter, building stops, and the market begins what politics could not decide: a slow, negotiated retreat from the riskiest ground.",
      "None of this is surrender, engineers insist. It is the difference between defending every inch and choosing which inches to defend. The cities that thrive will be the ones that treat water as a citizen with rights — consulted in every plan, given lanes to move through, and never entirely walled out."
    ],
    gloss: {
      "coastal":     { pos: "adj.", def: "沿海的" },
      "flood":       { pos: "n./v.", def: "洪水；淹没" },
      "seawall":     { pos: "n.",   def: "海堤" },
      "drainage":    { pos: "n.",   def: "排水系统" },
      "carbon":      { pos: "n.",   def: "碳" },
      "summit":      { pos: "n.",   def: "峰会" },
      "resident":    { pos: "n.",   def: "居民" },
      "ballot":      { pos: "n.",   def: "投票" },
      "insurance":   { pos: "n.",   def: "保险" },
      "mortgage":    { pos: "n.",   def: "按揭贷款" },
      "retreat":     { pos: "n./v.", def: "撤退；后撤" },
      "negotiated":  { pos: "adj.", def: "协商达成的" }
    }
  },
  {
    id: "a12", lv: 3, lvName: "高", topic: "财经商业",
    title: "The Quiet Power of Central Banks",
    titleZh: "中央银行的静默权力",
    paras: [
      "Of the institutions that govern modern life, few are less democratic and more tolerated than the central bank. Its decisions are made by unelected committees, argued in a jargon of yields and transmission channels, and yet every mortgage, every pay cheque, and every government budget ultimately bends around them. The paradox deserves a closer look, because it was a deliberate design, not an accident of history.",
      "The logic is credibility. A politician who controls the printing press faces a permanent temptation: cheap money before an election, inflated debts away afterward. Granting the press to an independent body with a narrow mandate — keep prices stable, and nothing else — is society's way of tying its own hands to the mast. The anchor only holds, however, as long as markets believe the knot is real.",
      "Consider what a rate decision actually transmits. The bank lifts its policy rate by a quarter point; within minutes, government yields reprice, within days, mortgages and corporate loans follow, within months, hiring slows and consumers rediscover the virtues of saving. The chain has weak links — savings glut, cheap foreign funding, lenders with short memories — but it is the only chain the modern economy has.",
      "The years after the pandemic stress-tested the design as never before. Inflation, long assumed extinct, returned with violence; the banks responded with the fastest tightening in four decades, then held the line through a bond-market volatility scare and a banking tremor or two. Disinflation followed, slower than hoped, faster than feared — and the recession that every forecaster promised politely declined to appear.",
      "Critics on both flanks see arrogance: on one side, unelected economists imposing unemployment on the poor; on the other, cautious clerks who moved too late and left liquidity sloshing for years. Both critiques contain truth. The defense is quieter: over the long run, the countries that kept their monetary institutions independent have, on the whole, suffered less. The price of the quiet power is that it must forever re-earn the silence it works in."
    ],
    gloss: {
      "institution":   { pos: "n.",   def: "机构；制度" },
      "credibility":   { pos: "n.",   def: "公信力；可信度" },
      "mandate":       { pos: "n.",   def: "授权；职责范围" },
      "yield":         { pos: "n.",   def: "收益率" },
      "transmission":  { pos: "n.",   def: "传导（机制）" },
      "volatility":    { pos: "n.",   def: "剧烈波动" },
      "disinflation":  { pos: "n.",   def: "通胀回落" },
      "liquidity":     { pos: "n.",   def: "流动性" },
      "forecaster":    { pos: "n.",   def: "预测者" },
      "arrogance":     { pos: "n.",   def: "傲慢" },
      "monetary":      { pos: "adj.", def: "货币的" },
      "independent":   { pos: "adj.", def: "独立的" }
    }
  },
  {
    id: "a13", lv: 3, lvName: "高", topic: "政治社会",
    title: "The Geography of Everything",
    titleZh: "万物的地理学",
    paras: [
      "The pandemic taught the world an uncomfortable geography lesson: the map of manufacturing and the map of politics are the same map. When a single chokepoint — a canal, a port, a Taiwanese fabrication plant — stumbles, the backlog travels at the speed of container freight, which is to say, slowly and then all at once.",
      "The decade that followed turned that lesson into doctrine. Washington rediscovered industrial policy; Brussels wrote carbon tariffs; Beijing doubled down on self-reliance in chips and grain. Every capital now repeats the same word, resilience, and every boardroom translates it the same way: diversify before you are diversified by force.",
      "The instrument of choice is the subsidy. Chip factories are rising in Arizona and Dresden; battery plants multiply across Ontario and Guangdong like mushrooms after rain. The sums are enormous, and the economics are questionable — no subsidy yet has repealed the law of comparative advantage. What the money really buys is not efficiency but optionality: the ability to keep factories running if a strait closes or a sanction lands.",
      "Weapons and supply chains are now dialects of the same language. An embargo on advanced machinery, a blacklist at a customs desk, an export control written in Washington and enforced in Tokyo: these move more goods than most tariffs ever did. The tit-for-tat is quiet, procedural, and utterly ruthless; rare earths, gallium, lithography — each restriction answers another, and each answer redrew somebody's investment plan.",
      "The consumer pays for the doctrine at the till. Duplicated supply chains are insurance premiums made physical: slightly dearer phones, slightly slower ships, slightly shorter product cycles. Perhaps that is the honest price of a decade in which geopolitics returned from the seminar room to the shipping lane. The 1990s dream of a single flat world is over; what replaces it is a patchwork — resilient, regional, and permanently prepared for weather it hopes never arrives."
    ],
    gloss: {
      "chokepoint":    { pos: "n.",   def: "咽喉要道；瓶颈节点" },
      "backlog":       { pos: "n.",   def: "积压；待办积压" },
      "freight":       { pos: "n.",   def: "货运；运费" },
      "doctrine":      { pos: "n.",   def: "信条；政策准则" },
      "resilience":    { pos: "n.",   def: "韧性；抗冲击能力" },
      "subsidy":       { pos: "n.",   def: "补贴" },
      "strait":        { pos: "n.",   def: "海峡" },
      "sanction":      { pos: "n.",   def: "制裁" },
      "embargo":       { pos: "n.",   def: "禁运" },
      "ruthless":      { pos: "adj.", def: "无情的" },
      "till":          { pos: "n.",   def: "收银台" },
      "patchwork":     { pos: "n.",   def: "拼凑之物；拼图格局" }
    }
  },
  {
    id: "a14", lv: 3, lvName: "高", topic: "科技健康",
    title: "Building a Longer Healthspan",
    titleZh: "造一个更长的健康寿命",
    paras: [
      "For most of history, the ambition of medicine was simple: do not die. Then the twentieth century succeeded so thoroughly that the ambition had to be rewritten. Today the frontier is not lifespan but healthspan — the number of years a body spends upright, independent, and useful to its owner, rather than merely existing.",
      "The arithmetic of aging has a brutal shape. Chronic disease now consumes the majority of health spending in every rich country, and its bill grows on a demographic schedule that no parliament can amend. Dementia alone threatens to become the defining expense of the century, which is why prevention — unglamorous, cheap, and chronically underfunded — has quietly become the most valuable word in public health.",
      "The evidence, as far as it goes, is almost embarrassingly consistent. Blood pressure controlled in middle age; muscle kept through resistance training; glucose managed before it becomes a diagnosis; a sleep schedule treated as seriously as a pension. None of it is patentable, and precisely therefore almost none of it is pushed. The pharmaceutical industry, quite rationally, pursues the compressible end of the curve: drugs that delay the frailty of the final years, trials measured in biomarkers rather than birthdays.",
      "Biology, meanwhile, keeps offering hints of deeper levers. Cellular reprogramming has made old mice look, briefly, young; senolytic drugs clear the cells that refuse to die properly; caloric restriction remains the most reliable way to extend life in everything from worms to monkeys. Translation to humans is slow, expensive, and littered with failures — but for the first time, aging itself is being studied as a mechanism with parts, rather than as fate.",
      "The wise position is neither enthusiasm nor dismissal. Whatever the laboratories deliver, the boring interventions will still carry most of the weight: a population that walks, sleeps, and keeps its blood pressure polite will out-live any pill that negligence can squander. Longevity science may yet bend the curve. Until it does, the curve is bent one ordinary Tuesday at a time."
    ],
    gloss: {
      "healthspan":   { pos: "n.",   def: "健康寿命（无重大疾病年限）" },
      "chronic":      { pos: "adj.", def: "慢性的；长期的" },
      "dementia":     { pos: "n.",   def: "痴呆" },
      "prevention":   { pos: "n.",   def: "预防" },
      "underfunded":  { pos: "adj.", def: "资金不足的" },
      "glucose":      { pos: "n.",   def: "葡萄糖" },
      "pharmaceutical": { pos: "adj./n.", def: "制药的；药品" },
      "biomarker":    { pos: "n.",   def: "生物标志物" },
      "frailty":      { pos: "n.",   def: "衰弱；脆弱" },
      "intervention": { pos: "n.",   def: "干预措施" },
      "squander":     { pos: "v.",   def: "浪费；挥霍" },
      "longevity":    { pos: "n.",   def: "长寿；寿命" }
    }
  },
  {
    id: "a15", lv: 1, lvName: "低", topic: "科技·社会",
    title: "The Age of Short Videos",
    titleZh: "短视频时代",
    paras: [
      "Ten years ago, most people watched films that lasted two hours. Today, hundreds of millions of people watch videos that last only fifteen seconds. Short videos have quietly changed the way we spend our free time, and young people feel the change most.",
      "Why are these videos so popular? The answer is simple: they ask for almost nothing. You need no time, no preparation and very little attention. One video ends, and the next one starts immediately. The application studies what you watch and then decides what to show you next, so every screen feels personal.",
      "This comfort has a cost. Many users plan to watch for 'just five minutes' and then discover that two hours have passed. Teachers say students find long articles harder to finish than before. Doctors give the problem a serious name: the weakening of attention. Like a muscle that is never trained for effort, the mind slowly loses its power to focus.",
      "Yet short videos are not the enemy. A sixty-second clip can teach you how to fix a bicycle, how to cook noodles, or how a law is made. Small shops use them to show products to millions of customers at almost no cost. For people with busy lives, short does not always mean shallow.",
      "The wise answer is balance. Decide in advance how long you will watch, and let a timer make the decision for you. Enjoy the fun, but protect the deeper pleasures: long films, real conversations, thick books. Attention is the raw material of every human skill — spend it like money, not like sand."
    ],
    gloss: {
      "popular":        { pos: "adj.", def: "受欢迎的；流行的" },
      "preparation":    { pos: "n.",   def: "准备；预备" },
      "attention":      { pos: "n.",   def: "注意力；关注" },
      "immediately":    { pos: "adv.", def: "立刻；马上" },
      "application":    { pos: "n.",   def: "应用程序；应用" },
      "discover":       { pos: "v.",   def: "发现；察觉" },
      "muscle":         { pos: "n.",   def: "肌肉" },
      "product":        { pos: "n.",   def: "产品；制品" },
      "customer":       { pos: "n.",   def: "顾客；客户" },
      "balance":        { pos: "n.",   def: "平衡；均衡" },
      "timer":          { pos: "n.",   def: "计时器；定时器" },
      "raw":            { pos: "adj.", def: "原始的；未加工的" }
    }
  },
  {
    id: "a16", lv: 1, lvName: "低", topic: "生活·环境",
    title: "Bikes Are Coming Back",
    titleZh: "自行车回来了",
    paras: [
      "For much of the twentieth century, the bicycle lost ground in big cities. Roads grew wide for cars, riders disappeared, and cycling became something children did in the park. Now, in city after city, the bicycle is coming back — and it is bringing quieter streets with it.",
      "The change begins with paint. City governments turn traffic lanes into protected bike lanes, so that ordinary people feel safe riding to work. In many places you can rent a bicycle with an app, ride it across town, and leave it near your office. The price is often lower than a bus ticket.",
      "Riding is also gentle exercise built into daily life. It costs nothing after the first payment, makes the heart stronger, and helps people sleep better at night. Unlike a gym, a bicycle takes you somewhere useful while it trains you.",
      "Cities have their own reasons to celebrate. A road can move far more bicycles than cars in an hour. Every rider means less noise, less traffic and cleaner air, which is why doctors and mayors sometimes make the same argument.",
      "Of course, rain, cold and steep hills are real, and not every city is flat and friendly. But attitudes are changing. The bicycle is no longer a toy of the past; it is a serious tool for the future of city life."
    ],
    gloss: {
      "bicycle":     { pos: "n.",   def: "自行车" },
      "rider":       { pos: "n.",   def: "骑车的人" },
      "disappear":   { pos: "v.",   def: "消失；不见" },
      "government":  { pos: "n.",   def: "政府" },
      "lane":        { pos: "n.",   def: "车道；小路" },
      "rent":        { pos: "v.",   def: "租用；出租" },
      "payment":     { pos: "n.",   def: "支付；付款" },
      "heart":       { pos: "n.",   def: "心脏" },
      "traffic":     { pos: "n.",   def: "交通；车流" },
      "noise":       { pos: "n.",   def: "噪声；喧闹声" },
      "steep":       { pos: "adj.", def: "陡的；险峻的" },
      "tool":        { pos: "n.",   def: "工具" }
    }
  },
  {
    id: "a17", lv: 1, lvName: "低", topic: "经济·生活",
    title: "The Economics of Bubble Tea",
    titleZh: "一杯奶茶的经济学",
    paras: [
      "A cup of bubble tea costs around fifteen yuan in China. It seems like a small thing, but every cup carries a hidden story of rent, labor and competition. A simple drink can teach big lessons about business.",
      "The largest cost is usually the shop itself. Rent on a busy shopping street can take a third of everything the shop earns. The second largest cost is labor: the young people who prepare your drink, keep the shop clean and smile through the evening rush.",
      "The drink itself is surprisingly cheap. Tea, milk, sugar and the little pearls together may cost two or three yuan. This is why shops always want you to add cake or fries to your order — the food carries a much higher profit than the tea.",
      "Price is also a signal. When a new shop opens next to an old one, both sides often cut prices for a while. Each accepts a smaller profit to win customers and keep them. A few months later, one shop may close, and the survivor slowly raises prices again.",
      "So the next time you hold a warm cup, think about what stands behind it: a landlord, a team of workers, and a quiet battle for the same street corner. Economics is not only about banks and nations; it lives inside every small choice we make."
    ],
    gloss: {
      "rent":         { pos: "n./v.", def: "租金；租用" },
      "labor":        { pos: "n.",    def: "劳动力；人工" },
      "competition":  { pos: "n.",    def: "竞争" },
      "prepare":      { pos: "v.",    def: "准备；调制" },
      "sugar":        { pos: "n.",    def: "糖" },
      "pearl":        { pos: "n.",    def: "珍珠" },
      "profit":       { pos: "n.",    def: "利润；收益" },
      "signal":       { pos: "n.",    def: "信号；标志" },
      "customer":     { pos: "n.",    def: "顾客" },
      "survivor":     { pos: "n.",    def: "幸存者；存活下来的" },
      "landlord":     { pos: "n.",    def: "房东；地主" },
      "battle":       { pos: "n.",    def: "战斗；较量" }
    }
  },
  {
    id: "a18", lv: 1, lvName: "低", topic: "教育·成长",
    title: "My First Internship",
    titleZh: "我的第一次实习",
    paras: [
      "On my first morning as an intern, I arrived thirty minutes early, sat down in the empty office and waited for someone to notice me. Nobody did. I held my cup of coffee until it went cold, more nervous than any exam had ever made me.",
      "School had taught me to answer questions; work asked me to find them. In the first week I kept asking my manager, 'What should I do next?' She finally smiled and said, 'Look around, find a problem, and fix it.' That single sentence changed my whole internship.",
      "I started with small things: reorganizing old files, checking numbers in reports, writing short summaries. Slowly, people began to trust me with bigger tasks. Trust, I discovered, is not given at the door; it is built task by task.",
      "I also made mistakes. Once I sent an email to the wrong client and felt the floor disappear under my feet. My manager did not shout. She helped me write a clear apology, and the client replied with unexpected kindness. Mistakes are lessons, not endings.",
      "Three months later I left with two things: a recommendation letter and a quieter kind of confidence. An internship does not really teach you a job. It teaches you the shape of adult life — and that is the one lesson no classroom can sell."
    ],
    gloss: {
      "intern":            { pos: "n.",   def: "实习生" },
      "nervous":           { pos: "adj.", def: "紧张的；不安的" },
      "manager":           { pos: "n.",   def: "经理；管理者" },
      "internship":        { pos: "n.",   def: "实习期；实习" },
      "reorganize":        { pos: "v.",   def: "重新整理；改组" },
      "trust":             { pos: "n./v.", def: "信任" },
      "client":            { pos: "n.",   def: "客户；委托人" },
      "apology":           { pos: "n.",   def: "道歉" },
      "kindness":          { pos: "n.",   def: "善意；亲切" },
      "recommendation":    { pos: "n.",   def: "推荐；推荐信" },
      "confidence":        { pos: "n.",   def: "信心；自信" },
      "classroom":         { pos: "n.",   def: "教室；课堂" }
    }
  },
  {
    id: "a19", lv: 2, lvName: "中", topic: "科技·经济",
    title: "AI and the Job Market",
    titleZh: "人工智能与就业市场",
    paras: [
      "Every industrial revolution has destroyed some jobs and created others, and each time society has survived the storm. The question raised by artificial intelligence is not whether work will change — it will — but how fast the change arrives, and who is asked to pay for it.",
      "The tasks most at risk share one quality: they can be written down as a repeatable process. Data entry, basic translation, first drafts of routine documents, simple customer questions — these are patterns a machine can learn. What technology replaces is not the job title but the pattern inside it.",
      "On the other side of the ledger, three kinds of work are growing. First, judgment: managing people, negotiating contracts, deciding what is worth doing at all. Second, care: nurses, teachers, therapists — work whose value lies in human presence. Third, hands: electricians, plumbers and cooks, whose fingers must meet the physical world.",
      "Education is being pulled into the argument. Universities add courses on using intelligent tools, but the deeper skill is older than any software: the ability to ask a good question. Machines answer; humans must decide what matters. A graduate who can frame a problem clearly will always have work directing machines that cannot.",
      "The honest economists admit that transitions are personal, not statistical. Average growth hides the fifty-year-old warehouse clerk retraining at night. The smooth line on the chart is drawn across real, individual losses. Societies that manage the transition well — with retraining, insurance and respect — will keep both their prosperity and their peace."
    ],
    gloss: {
      "industrial":    { pos: "adj.",  def: "工业的；产业的" },
      "artificial":    { pos: "adj.",  def: "人工的；人造的" },
      "repeatable":    { pos: "adj.",  def: "可重复的" },
      "translation":   { pos: "n.",    def: "翻译" },
      "ledger":        { pos: "n.",    def: "账簿；（收支）记录" },
      "judgment":      { pos: "n.",    def: "判断；判断力" },
      "presence":      { pos: "n.",    def: "在场；存在感" },
      "negotiate":     { pos: "v.",    def: "谈判；协商" },
      "frame":         { pos: "v.",    def: "构想；表述（问题）" },
      "statistical":   { pos: "adj.",  def: "统计的" },
      "retrain":       { pos: "v.",    def: "再培训；重新学习技能" },
      "prosperity":    { pos: "n.",    def: "繁荣；昌盛" }
    }
  },
  {
    id: "a20", lv: 2, lvName: "中", topic: "财经·科技",
    title: "The Electric Car Story",
    titleZh: "电动车的故事",
    paras: [
      "Twenty years ago, an electric car was a golf cart with ambition: slow, heavy and unable to travel far. Today electric vehicles are the fastest-growing part of the global car market, and China stands at the center of the story — building them, buying them, and driving their price down.",
      "The revolution rests on a quiet industrial miracle: the battery. Since 2010 the cost of a lithium battery pack has fallen by roughly ninety percent, while its energy density has steadily risen. The moment the total cost of ownership dropped below that of a petrol car, the market stopped needing speeches and started needing charging stations.",
      "China's advantage was never a single invention but a chain of them. From lithium refining to motor winding, the supply chain grew complete and fast. Fierce domestic competition — dozens of brands fighting for the same buyer — drove prices lower than anywhere else. The fight has been brutal for the weaker carmakers and wonderful for the customers.",
      "Serious problems remain. Old apartment blocks were never designed for chargers. Electricity grids feel the strain when a million cars plug in during a hot evening peak. Winter still shortens the range, and used batteries must find a clean grave. None of these walls is high enough to stop the trend, but each will take years of patient engineering.",
      "The story is now larger than private cars. Electric buses already glide through hundreds of cities, delivery trucks are switching, and even ships are experimenting with battery power. Transport — a fifth of the world's oil demand — is being rewired piece by piece, and the curves that oilmen trusted for decades are quietly bending."
    ],
    gloss: {
      "vehicle":       { pos: "n.",    def: "车辆；交通工具" },
      "battery":       { pos: "n.",    def: "电池" },
      "lithium":       { pos: "n.",    def: "锂" },
      "density":       { pos: "n.",    def: "密度" },
      "ownership":     { pos: "n.",    def: "所有权；拥有" },
      "petrol":        { pos: "n.",    def: "汽油" },
      "supply":        { pos: "n./v.", def: "供应；供给" },
      "competition":   { pos: "n.",    def: "竞争" },
      "charger":       { pos: "n.",    def: "充电器" },
      "grid":          { pos: "n.",    def: "电网；格子" },
      "strain":        { pos: "n.",    def: "压力；负荷" },
      "transport":     { pos: "n.",    def: "交通运输" }
    }
  },
  {
    id: "a21", lv: 2, lvName: "中", topic: "旅游·经济",
    title: "Why Small Cities Are Booming",
    titleZh: "小城旅游为何爆火",
    paras: [
      "This summer, the crowds did not head for the famous capitals. They went to Zibo for its barbecue, to Tianshui for its spicy soup, to quiet mountain towns nobody's guidebook mentioned. Small cities across China became suddenly, explosively famous — one viral video at a time.",
      "The pattern is easy to describe and hard to copy. A single moment — a street snack, a kind hotel owner, a beautiful view — spreads across social media. Then the local government has about two weeks to turn fame into a welcome: organizing bus routes, opening parking lots, controlling prices. Cities that move fast are rewarded with a season of crowds; cities that hesitate watch the wave pass them by.",
      "Why do travelers choose these places? The honest answer is value. A young graduate with a modest budget finds that a high-speed train delivers adventure for the price of a movie ticket, that a clean hotel room costs a third of its Shanghai equivalent, and that reputation in a small city is still built on honest prices rather than famous scenery.",
      "The economics reach further than hotels. Tourism income spreads through a small city the way rain spreads through dry soil: family restaurants, taxi drivers, fruit stalls, grandmothers renting spare rooms. One good season can change the arithmetic of a town's entire year, and local officials have noticed.",
      "A gentle warning follows the applause. Fame is loud but short, and a city that builds only for the trend will inherit empty streets. The places that keep visitors invest quietly in museums, walking paths, clean toilets and patient kindness — because in the end, kindness itself is infrastructure."
    ],
    gloss: {
      "barbecue":       { pos: "n.",    def: "烧烤；烤肉" },
      "viral":          { pos: "adj.",  def: "病毒式传播的；爆红的" },
      "spread":         { pos: "v.",    def: "传播；蔓延" },
      "reputation":     { pos: "n.",    def: "名声；声誉" },
      "budget":         { pos: "n.",    def: "预算" },
      "equivalent":     { pos: "n./adj.", def: "等价物；相当的" },
      "scenery":        { pos: "n.",    def: "风景；景色" },
      "income":         { pos: "n.",    def: "收入；收益" },
      "invest":         { pos: "v.",    def: "投资" },
      "kindness":       { pos: "n.",    def: "善意；亲切" },
      "infrastructure": { pos: "n.",    def: "基础设施" },
      "graduate":       { pos: "n./v.", def: "毕业生；毕业" }
    }
  },
  {
    id: "a22", lv: 2, lvName: "中", topic: "社会·经济",
    title: "The Silver Economy",
    titleZh: "银发经济",
    paras: [
      "China is growing old at a speed no large nation has ever experienced. Within a generation, one in three citizens will be over sixty. Newspapers describe this as a burden — pension bills, shrinking workforces — but inside the same numbers hides a quieter story: the rise of the silver economy.",
      "Older adults hold much of the nation's household savings, and they spend it differently. Their money flows toward health, toward travel in comfortable tour groups, toward education for their grandchildren, and toward small comforts that make daily life easier. They are careful with money, but they are not without it.",
      "Products are learning to adapt. Phones with larger text and clearer speakers, chairs that help their owners stand up, tour schedules with slower rhythms and longer rests — design that respects dignity sells better than design that shouts about age. The best companies discovered that nobody, at any age, wants to feel old.",
      "The deepest gap is in services. The country needs millions of caregivers, nurses trained in geriatrics, and workers who can manage the careful renovation of an aging apartment. These are jobs that can be neither exported to another country nor handed to a machine, which makes them rare anchors of stable employment.",
      "Finally, old age is not one market but several. The fit sixty-five-year-old planning a hiking holiday and the frail eighty-five-year-old needing help at breakfast want entirely different products. Companies that treat seniors as one grey block will fail; those that meet them as individuals — patients, travelers, students, grandparents — will find the largest new market of the century."
    ],
    gloss: {
      "silver":       { pos: "n./adj.", def: "银色（的）；银发（的）" },
      "household":    { pos: "n.",    def: "家庭；住户" },
      "savings":      { pos: "n.",    def: "储蓄；存款" },
      "dignity":      { pos: "n.",    def: "尊严" },
      "adapt":        { pos: "v.",    def: "适应；调整" },
      "caregiver":    { pos: "n.",    def: "照护者；护理人员" },
      "geriatrics":   { pos: "n.",    def: "老年医学" },
      "renovation":   { pos: "n.",    def: "翻新；改造" },
      "frail":        { pos: "adj.",  def: "虚弱的；脆弱的" },
      "senior":       { pos: "n.",    def: "老年人；年长者" }
    }
  },
  {
    id: "a23", lv: 2, lvName: "中", topic: "健康·生活",
    title: "The Science of Sleep",
    titleZh: "睡眠的科学",
    paras: [
      "We spend a third of our lives unconscious, and for most of modern history we treated those hours as lost time — a gap between one working day and the next. Science has spent the last thirty years apologizing for that arrogance. Sleep, it turns out, is not the pause between the show; it is part of the show.",
      "At night the brain runs its maintenance crew. It replays the events of the day, deciding which memories to keep and where to store them — a process researchers call consolidation. Meanwhile the body releases growth hormone, and a drainage system flushes waste products out of the brain's tissues. None of this happens while you scroll your phone in bed at two in the morning.",
      "The modern world attacks sleep from three directions. Blue light from screens delays melatonin, the hormone that announces darkness. Caffeine, with a half-life of five or six hours, quietly patrols the bloodstream long after the last coffee. And alcohol, the most famous false friend, sedates the mind but destroys the deep stages of sleep that repair it.",
      "How much is enough? For most adults the honest range is seven to nine hours. People who claim to thrive on five are usually people who have forgotten what sharp feels like. Chronic sleep debt is now linked to weight gain, weakened immunity, low mood and poor memory — an expensive loan taken against the body.",
      "The remedy is as boring as it is reliable: rise at the same time every day, keep the bedroom dark and cool, walk into morning light, and finish the coffee before noon. Sleep is not the price you pay for success. It is the currency you pay with."
    ],
    gloss: {
      "consolidation": { pos: "n.",   def: "巩固；（记忆）固化" },
      "hormone":       { pos: "n.",   def: "激素；荷尔蒙" },
      "melatonin":     { pos: "n.",   def: "褪黑素" },
      "caffeine":      { pos: "n.",   def: "咖啡因" },
      "alcohol":       { pos: "n.",   def: "酒精" },
      "sedate":        { pos: "v.",   def: "使镇静；催眠" },
      "immunity":      { pos: "n.",   def: "免疫力" },
      "debt":          { pos: "n.",   def: "债务；欠账" },
      "remedy":        { pos: "n.",   def: "疗法；解决办法" },
      "currency":      { pos: "n.",   def: "货币；通货" }
    }
  },
  {
    id: "a24", lv: 2, lvName: "中", topic: "环境·经济",
    title: "Sorting Trash, Saving Cities",
    titleZh: "垃圾分类与循环经济",
    paras: [
      "A city of ten million people wakes up every morning and produces a small mountain of waste — thousands of trucks carrying yesterday's leftovers, packaging and broken things. Where that mountain goes next is a decision as political as any budget, and far more permanent.",
      "The traditional answer was the landfill: bury it and forget it. But buried organic matter rots slowly and releases methane, a greenhouse gas far more powerful than carbon dioxide over the coming decades. Landfills also consume land, poison groundwater and smell across entire districts. The cheap answer turns out to be expensive.",
      "Incineration plants burn waste and return some energy, but they demand fuel that burns well. Kitchen waste, heavy with water, lowers the calorific value of the mixture, which is why sorting at the source matters so much. A city that separates wet waste from dry waste is a city whose power plant runs efficiently.",
      "The economics of recycling are unforgiving. A used bottle is only worth something if it is clean and separated; a load of contaminated recyclables ends up in the landfill anyway, having paid for a hopeful truck ride. The dream of the circular economy — where the waste of one factory becomes the raw material of another — begins at the kitchen sink.",
      "And there lies the weakest and most important link: human habit. Sorting rubbish at home takes thirty seconds of attention, yet it decides the fate of everything downstream. Behavior, it turns out, is infrastructure — and unlike concrete, it must be rebuilt by every generation."
    ],
    gloss: {
      "waste":         { pos: "n.",   def: "废物；垃圾" },
      "landfill":      { pos: "n.",   def: "垃圾填埋场" },
      "methane":       { pos: "n.",   def: "甲烷；沼气" },
      "incineration":  { pos: "n.",   def: "焚烧" },
      "calorific":     { pos: "adj.", def: "热量的；发热的" },
      "recyclable":    { pos: "n./adj.", def: "可回收物；可回收的" },
      "contaminate":   { pos: "v.",   def: "污染；弄脏" },
      "circular":      { pos: "adj.", def: "循环的；圆形的" },
      "behavior":      { pos: "n.",   def: "行为" },
      "infrastructure":{ pos: "n.",   def: "基础设施" }
    }
  },
  {
    id: "a25", lv: 3, lvName: "高", topic: "财经·政治",
    title: "Rewiring Global Supply Chains",
    titleZh: "全球供应链的重构",
    paras: [
      "For thirty years, global manufacturing worshipped a single god: efficiency. Every factory, warehouse and shipping lane was optimized to squeeze out slack. Then came the pandemic, the chip shortage and the age of sanctions, and boardrooms around the world learned a new vocabulary — resilience, redundancy, de-risking.",
      "What followed is often mislabeled decoupling, but the more accurate word is duplication. Companies did not leave China; they built a second source beside it. Vietnam, Mexico, India and Malaysia filled with 'China plus one' factories. Inventories that had been trimmed to just-in-time discipline were quietly fattened into just-in-case cushions. The same goods now travel two roads instead of one.",
      "This insurance is not free. Redundant capacity means duplicated machines, underused plants and higher prices, and the bill drifts quietly into the shopping basket. Studies suggest the reorganization will cost the global economy real percentage points of output over the decade — a peace-time tax paid in advance for a conflict nobody wants.",
      "Here lies the paradox that politicians prefer not to explain: the countries 'replacing' Chinese factories often import Chinese machinery, Chinese components and Chinese engineers to build them. Chinese firms themselves own a growing share of the new plants in Southeast Asia. Supply chains are not leaving China; they are layering themselves around it, like the rings of a tree.",
      "The probable endgame is a world of three great regional blocks — North America, Europe and Asia — each trading intensely inside itself and cautiously across borders. Efficiency was always a dividend of peace. As the dividend is re-priced, the era of hyper-cheap everything is being renegotiated, one supplier at a time."
    ],
    gloss: {
      "resilience":   { pos: "n.",   def: "韧性；抗冲击能力" },
      "redundancy":   { pos: "n.",   def: "冗余；备份" },
      "decoupling":   { pos: "n.",   def: "脱钩" },
      "duplication":  { pos: "n.",   def: "复制；重复建设" },
      "inventory":    { pos: "n.",   def: "库存；存货" },
      "paradox":      { pos: "n.",   def: "悖论；矛盾" },
      "component":    { pos: "n.",   def: "零部件；组成部分" },
      "layer":        { pos: "v.",   def: "分层叠加" },
      "regional":     { pos: "adj.", def: "地区的；区域的" },
      "dividend":     { pos: "n.",   def: "红利；股息" }
    }
  },
  {
    id: "a26", lv: 3, lvName: "高", topic: "政治·环境",
    title: "Climate Finance and the Divide",
    titleZh: "气候融资的南北之争",
    paras: [
      "The arithmetic of climate change is brutal in both directions. Developing nations need trillions of dollars each year to build clean energy systems and adapt to storms that are already arriving. What was promised in aid and climate finance amounts to hundreds of billions, and what was actually delivered is less again. Between the promise and the payment stretches a valley of distrust.",
      "History stands in the middle of that valley. Most of the carbon already warming the atmosphere was placed there by today's rich countries during their industrial rise. The phrase 'common but differentiated responsibilities' encodes this argument, and every climate conference re-fights it: all nations are responsible, but not equally, and not in the same decades.",
      "The mechanisms under negotiation multiply: a loss-and-damage fund for countries struck by disasters; carbon border taxes that charge imports for the pollution they carry, which developing exporters denounce as green protectionism; reform of the development banks so that a loan to a solar farm does not bankrupt a treasury. Each mechanism is a battlefield disguised as paperwork.",
      "Public money alone cannot fill the gap, so the argument has moved to private capital. Investors like solar farms; they dislike currency risk, where a local crisis can erase a decade of returns. Guarantees that absorb that risk are cheap for governments to offer and slow for bureaucracies to approve. Every year of delay is measured in unbuilt megawatts.",
      "And yet the deepest change came not from diplomacy but from engineers. Solar power and battery storage are now the cheapest new electricity in most of the world, whatever a conference decides. The fight is shifting from whether the transition happens to who will own the industries that carry it — a question of power, in both senses of the word."
    ],
    gloss: {
      "adapt":           { pos: "v.",   def: "适应；改编" },
      "differentiate":   { pos: "v.",   def: "区分；区别对待" },
      "negotiation":     { pos: "n.",   def: "谈判；协商" },
      "fund":            { pos: "n.",   def: "基金；资金" },
      "protectionism":   { pos: "n.",   def: "保护主义" },
      "bureaucracy":     { pos: "n.",   def: "官僚机构；官僚作风" },
      "guarantee":       { pos: "n./v.", def: "担保；保证" },
      "capital":         { pos: "n.",   def: "资本；资金" },
      "diplomacy":       { pos: "n.",   def: "外交" },
      "transition":      { pos: "n.",   def: "转型；过渡" }
    }
  },
  {
    id: "a27", lv: 3, lvName: "高", topic: "财经·科技",
    title: "When Money Turns Digital",
    titleZh: "当货币走向数字",
    paras: [
      "Cash is becoming a minority habit. In China's cities, a grandmother selling vegetables accepts payment with a QR code; in Sweden, churches take digital donations. Two distinct futures are being built on this foundation: private digital money, run by companies, and public digital money, issued by central banks. Each carries a different theory of trust.",
      "The private revolution already happened in China a decade ago. Mobile wallets leapfrogged the credit card entirely: a farmer who never owned plastic now scans and pays in a second. The lesson travels poorly, though, because interoperability — wallets, banks and merchants speaking one language — required a level of coordination few countries could reproduce.",
      "The newest private challenger is the stablecoin, a digital token that keeps a fixed peg to a national currency and is backed by reserves. It has found quiet work in cross-border settlement, where it moves money across time zones in minutes instead of days. Regulators, however, keep asking the impolite question: who audits the reserves, and what happens on the day everyone wants their dollars at once?",
      "The public answer is the CBDC — central bank digital currency. Its enthusiasts promise programmable money: relief payments that cannot be spent on anything but food, subsidies that expire if unused. Its critics hear the same sentence and warn about surveillance, and about interest rates applied directly, silently, to every wallet. Most designs now pass through banks in two tiers and try to work offline, precisely to soften those fears.",
      "However the argument ends, the principle underneath is old. Money is a technology of trust, and every era re-mints that trust in its own medium: shells, silver, paper, plastic cards, and now entries in a ledger that no single company owns. The metal disappears; the faith must not."
    ],
    gloss: {
      "digital":            { pos: "adj.", def: "数字的" },
      "wallet":             { pos: "n.",   def: "钱包" },
      "interoperability":   { pos: "n.",   def: "互操作性；互通性" },
      "stablecoin":         { pos: "n.",   def: "稳定币" },
      "peg":                { pos: "v./n.", def: "锚定；固定汇率" },
      "settlement":         { pos: "n.",   def: "结算；清算" },
      "regulator":          { pos: "n.",   def: "监管机构" },
      "audit":              { pos: "v./n.", def: "审计" },
      "programmable":       { pos: "adj.", def: "可编程的" },
      "surveillance":       { pos: "n.",   def: "监控；监视" },
      "ledger":             { pos: "n.",   def: "账本；分类账" }
    }
  },
  {
    id: "a28", lv: 3, lvName: "高", topic: "科技·学术",
    title: "The Replication Crisis",
    titleZh: "科学界的可重复性危机",
    paras: [
      "Around 2011, psychology began interrogating its own successes. Famous findings — ego depletion, power poses, the facial feedback of a pen held in the teeth — were tested again by careful strangers, and many quietly collapsed. The episode earned a name that has haunted science ever since: the replication crisis.",
      "The causes, once measured, were uncomfortably ordinary. Studies ran on tiny samples of twenty college students. Analysts enjoyed too much freedom, trying one specification after another until significance appeared — a practice researchers call p-hacking. Journals preferred positive results, so failures vanished into file drawers. Together these habits manufactured a literature that looked far more certain than it was.",
      "The medicine has been structural. Preregistration forces scientists to declare their method before seeing the data. Huge collaborations repeat an experiment across dozens of laboratories instead of one. Registered reports go further: the journal accepts a paper based on its question and design, before the results exist — removing the incentive to decorate them.",
      "The infection spread well beyond psychology. In medicine, large benchmark trials have cut the effect of celebrated treatments by half. In economics, major results shrink when tested with stricter data. Even machine learning has learned the disease: benchmarks saturate, models memorize, and a leaderboard that once predicted progress now measures cleverness at guessing the test.",
      "What survives the crisis is, ironically, a better advertisement for science than any single discovery. Science was never a museum of fixed facts; it is an argument that corrects itself in public, slowly and with embarrassment. The crisis is uncomfortable evidence that the correction still works — and a reminder to hold every beautiful finding with an open hand."
    ],
    gloss: {
      "replication":       { pos: "n.",   def: "重复；复现" },
      "depletion":         { pos: "n.",   def: "耗竭；损耗" },
      "collapse":          { pos: "v./n.", def: "崩溃；坍塌" },
      "sample":            { pos: "n.",   def: "样本" },
      "significance":      { pos: "n.",   def: "显著性；意义" },
      "specification":     { pos: "n.",   def: "规格；分析设定" },
      "preregistration":   { pos: "n.",   def: "预注册" },
      "collaboration":     { pos: "n.",   def: "合作；协作" },
      "benchmark":         { pos: "n.",   def: "基准；标杆" },
      "saturate":          { pos: "v.",   def: "使饱和" },
      "correction":        { pos: "n.",   def: "修正；纠正" }
    }
  },
  {
    id: "a29", lv: 3, lvName: "高", topic: "社会·政治",
    title: "Cities in a Competition for People",
    titleZh: "城市的人口争夺战",
    paras: [
      "For most of history, cities grew because the jobs were there, and people followed the jobs. Somewhere in the last decade the causality quietly reversed: jobs now follow people, and talented graduates have become the resource every city imports tariff-free. The competition for them has become explicit, expensive and occasionally absurd.",
      "First came the amenities arms race — coffee culture, cycling lanes, late trains, safety, kindergartens, opera houses — because the mobile young vote with their feet. Then came cash: second-tier Chinese cities offer fresh graduates housing deposits and hukou registration; Japanese towns pay families actual money to leave Tokyo; European capitals duel over tech workers with tax breaks and visa fast lanes.",
      "The subsidies buy arrivals but rarely buy staying. What retains people is depth: a cluster of industries that gives both halves of a couple a career, and housing that a young salary can actually touch. A city with one dominant employer offers a job; a city with twelve offers a life. The difference shows up five years later, in the census.",
      "Between the winners, a quieter geography is forming. Superstar cities ration air through rent; shrinking towns in Italy and Japan sell houses for a euro and still struggle to find takers. In the vast middle tier, mayors have discovered that their last competitive weapon is quality of life: shorter commutes, greener streets, schools where teachers stay.",
      "The coming decade will make the sorting harsher. Remote work loosens the grip of any single city, but it also lets talent concentrate where living is sweetest. Cities used to compete for ports, factories and headquarters. Now they compete for mornings worth waking up in — and that is a competition no subsidy can win alone."
    ],
    gloss: {
      "causality":   { pos: "n.",   def: "因果关系" },
      "graduate":    { pos: "n./v.", def: "毕业生；毕业" },
      "amenity":     { pos: "n.",   def: "便利设施；舒适环境" },
      "subsidy":     { pos: "n.",   def: "补贴；津贴" },
      "hukou":       { pos: "n.",   def: "户口" },
      "cluster":     { pos: "n./v.", def: "集群；聚集" },
      "salary":      { pos: "n.",   def: "薪水" },
      "census":      { pos: "n.",   def: "人口普查" },
      "ration":      { pos: "v.",   def: "定量供应；配给" },
      "commute":     { pos: "n./v.", def: "通勤" }
    }
  },
  {
    id: "a30", lv: 3, lvName: "高", topic: "经济·科技",
    title: "Feeding Ten Billion",
    titleZh: "养活一百亿人",
    paras: [
      "Sometime near the middle of this century, the human population will peak at around ten billion, and every one of them will expect dinner. The arithmetic that follows is uncomfortable: more mouths, richer diets that demand meat, and an agriculture that already occupies half of Earth's habitable land. The green revolution's easy gains have mostly been spent.",
      "The productivity frontier now runs on information. Precision agriculture reads fields satellite by satellite and meter by meter, telling a tractor to fertilize here and skip there. Drones scout for disease before a farmer could see it. Gene editing promises drought-tolerant wheat and salt-tolerant rice, while researchers chase the ancient dream of coaxing cereals to fix their own nitrogen, as beans do.",
      "The cheapest field ever discovered, however, is waste. Roughly a third of all food is never eaten — rotting in trucks, markets, refrigerators and weddings. Cold chains, better packaging and honest markets for ugly vegetables recover calories no laboratory could invent. Cutting waste in half would feed a small continent without clearing a single forest.",
      "The protein question resists optimism. Alternative meats grow slowly in Western supermarkets, insect protein quietly feeds aquaculture and poultry, and cultured meat remains stuck above price parity with the animal it imitates. Biology, it turns out, does not scale as gracefully as software; a cow is still the cheapest cow ever built.",
      "Above everything sits the wild card of climate — heat that shrinks harvests, water that arrives all at once or not at all. That is why food security has returned to the vocabulary of statecraft: nations rebuild grain reserves, watch export bans nervously, and treat a full warehouse as a strategic weapon. Farming is becoming an information industry whose printer is the weather — and the weather is being renegotiated."
    ],
    gloss: {
      "agriculture":  { pos: "n.",   def: "农业" },
      "habitable":    { pos: "adj.", def: "宜居的；可居住的" },
      "precision":    { pos: "n.",   def: "精准；精确" },
      "fertilize":    { pos: "v.",   def: "施肥" },
      "drone":        { pos: "n.",   def: "无人机" },
      "nitrogen":     { pos: "n.",   def: "氮" },
      "packaging":    { pos: "n.",   def: "包装" },
      "aquaculture":  { pos: "n.",   def: "水产养殖" },
      "parity":       { pos: "n.",   def: "平价；等同" },
      "statecraft":   { pos: "n.",   def: "治国之道" },
      "reserve":      { pos: "n.",   def: "储备；储备量" }
    }
  }
];

/* ---------------- 每日测验固定题（8 道，生成题另由引擎按日期种子产生） ---------------- */
const DAILY_FIXED = [
  {
    id: "d1", type: "语境词汇",
    stem: "Although the essay is long, every paragraph supports the main idea, so it is remarkably ______.",
    options: ["coherent", "ambiguous", "obsolete", "versatile"],
    answer: 0,
    explain: "coherent 意为「连贯的」，与「每段都支撑主旨」呼应；ambiguous（模棱两可）、obsolete（过时的）、versatile（用途广泛的）均与语境不符。"
  },
  {
    id: "d2", type: "语境词汇",
    stem: "The government introduced new rules to ______ the environmental damage caused by heavy industry.",
    options: ["mitigate", "manipulate", "advocate", "accumulate"],
    answer: 0,
    explain: "mitigate the damage 减轻损害；manipulate（操纵）语义不通；advocate（提倡）后面一般直接接宾语且语义不符；accumulate（积累）不与 damage 搭配。"
  },
  {
    id: "d3", type: "语法",
    stem: "By the time we arrived at the theater, the play ______.",
    options: ["had already started", "has already started", "already started", "was already starting"],
    answer: 0,
    explain: "「by the time + 一般过去时」主句用过去完成时，表示「过去的过去」：到达之前剧本已开演。"
  },
  {
    id: "d4", type: "语法",
    stem: "Hardly ______ the office when the fire alarm went off.",
    options: ["had he entered", "he had entered", "did he enter", "he entered"],
    answer: 0,
    explain: "hardly...when 结构中，hardly 位于句首时须部分倒装，且 hardly 分句用过去完成时：Hardly had he entered... when...。"
  },
  {
    id: "d5", type: "阅读理解",
    stem: "According to the article \"Start Small, Dream Big\", why do many people give up on their goals?",
    options: [
      "Because their goals are too small to matter",
      "Because results come slowly when goals are too big",
      "Because they do not write tasks in the morning",
      "Because science does not support daily study"
    ],
    answer: 1,
    explain: "文章第二段指出：目标太大、结果来得慢，人们就会难过并放弃（When results come slowly, they feel sad and give up）。"
  },
  {
    id: "d6", type: "阅读理解",
    stem: "In \"A Morning in Kyoto\", what does the writer compare the appearing mountains to?",
    options: [
      "A picture being painted one color at a time",
      "A quiet heart beating slowly",
      "A branch of seasonal flower",
      "An old wooden house"
    ],
    answer: 0,
    explain: "原文将群山渐现比作「一次添一笔色的画」：like a picture being painted one color at a time。"
  },
  {
    id: "d7", type: "语境词汇",
    stem: "Fame on short videos is ______, but the habit of daily practice stays with you for life.",
    options: ["ephemeral", "laconic", "gregarious", "obstinate"],
    answer: 0,
    explain: "ephemeral 转瞬即逝的，与「习惯相伴一生」形成对照；laconic（言简意赅的）、gregarious（爱交际的）、obstinate（固执的）均不能形容名气的短暂。"
  },
  {
    id: "d8", type: "阅读理解",
    stem: "According to \"The Case for Walking\", why does consistency matter more than intensity?",
    options: [
      "Because walking costs almost nothing",
      "Because a daily moderate habit is safer and easier to keep than rare hard workouts",
      "Because runners never get injured",
      "Because two-hour workouts are harmful"
    ],
    answer: 1,
    explain: "第二段指出走路低冲击、几乎不会受伤，因此「每天 30 分钟胜过每月一次 2 小时」——坚持比强度更重要。"
  }
];

/* ---------------- 题库（四大考试各 15 题，共 60 题，原创模拟题） ---------------- */
const BANK = [
  /* ----- CET-4（15） ----- */
  {
    id: "c41", exam: "CET-4", type: "词汇",
    stem: "The manager asked every staff member to ______ at least one idea at the meeting.",
    options: ["contribute", "conduct", "consist", "conquer"],
    answer: 0,
    explain: "contribute (an) idea 贡献想法；conduct 执行、指挥；consist 须与 of 连用表「由……组成」；conquer 征服。"
  },
  {
    id: "c42", exam: "CET-4", type: "词汇",
    stem: "After the new competitor entered the market, sales began to ______.",
    options: ["decline", "double", "improve", "expand"],
    answer: 0,
    explain: "新竞争者进入市场导致销量「下滑」，decline 表下降；其余选项与语境矛盾。"
  },
  {
    id: "c43", exam: "CET-4", type: "词汇",
    stem: "Regular review is ______ for long-term memory.",
    options: ["essential", "optional", "occasional", "temporary"],
    answer: 0,
    explain: "be essential for/to... 对……必不可少；optional（可选的）、occasional（偶尔的）、temporary（暂时的）均无法表达「必要性」。"
  },
  {
    id: "c44", exam: "CET-4", type: "语法",
    stem: "She has lived in Shanghai ______ 2018.",
    options: ["since", "for", "from", "during"],
    answer: 0,
    explain: "现在完成时 + since + 时间点；for 接时间段（for eight years）。"
  },
  {
    id: "c45", exam: "CET-4", type: "语法",
    stem: "If I ______ more free time, I would learn a second foreign language.",
    options: ["had", "have", "will have", "having"],
    answer: 0,
    explain: "对现在情况的虚拟语气：if 从句用一般过去式（be 动词统一用 were），主句 would + 动词原形。"
  },
  {
    id: "c46", exam: "CET-4", type: "阅读理解",
    passage: "Tom used to drive to work every day. Last month, he started riding a bicycle instead. He says the morning ride wakes him up better than coffee, and he has saved almost two hundred yuan on fuel.",
    stem: "What can we infer about Tom?",
    options: [
      "He now spends less money on fuel than before",
      "He dislikes coffee",
      "He sold his bicycle last month",
      "He lives far from his workplace"
    ],
    answer: 0,
    explain: "由 \"he has saved almost two hundred yuan on fuel\" 可推断油费支出减少；B 无依据，C 与原文相反，D 未提及。"
  },
  {
    id: "c47", exam: "CET-4", type: "词汇",
    stem: "Could you ______ me to call my dentist tonight?",
    options: ["remind", "remember", "remain", "remark"],
    answer: 0,
    explain: "remind sb. to do sth. 提醒某人做某事；remember 记得（主语自己记得）；remain 保持、剩余；remark 评论。"
  },
  {
    id: "c48", exam: "CET-4", type: "词汇",
    stem: "The tea tastes ______ because she forgot to add sugar.",
    options: ["bitter", "better", "batter", "butter"],
    answer: 0,
    explain: "忘加糖 → 茶「苦」bitter；batter 面糊、butter 黄油均为名词，better 语义不通。"
  },
  {
    id: "c49", exam: "CET-4", type: "语法",
    stem: "Neither the students nor the teacher ______ aware of the change.",
    options: ["was", "were", "are", "be"],
    answer: 0,
    explain: "neither...nor 连接主语时动词就近一致：靠近动词的是 the teacher（单数）→ was。"
  },
  {
    id: "c410", exam: "CET-4", type: "语法",
    stem: "This is the museum ______ we visited last spring.",
    options: ["which", "where", "what", "when"],
    answer: 0,
    explain: "visit 是及物动词，关系词作宾语 → which/that；where 需要关系词作状语（如 in the museum）的场景。"
  },
  {
    id: "c411", exam: "CET-4", type: "语境填空",
    stem: "The company will ______ a new policy next month to reduce paper waste.",
    options: ["implement", "compliment", "fragment", "ornament"],
    answer: 0,
    explain: "implement a policy 实施政策；compliment 赞美、fragment 碎片、ornament 装饰，均不与 policy 搭配。"
  },
  {
    id: "c412", exam: "CET-4", type: "语境填空",
    stem: "She kept a ______ of everything she spent during the trip.",
    options: ["record", "recipe", "receipt", "reception"],
    answer: 0,
    explain: "keep a record of 记录……；recipe 食谱、receipt 收据、reception 接待，语义均不符。"
  },
  {
    id: "c413", exam: "CET-4", type: "阅读理解",
    passage: "Lei studies English fifteen minutes every day. Her roommate Ting studies three hours only before exams. On a surprise quiz, Lei finished faster and scored higher.",
    stem: "What does the passage suggest?",
    options: [
      "Spaced daily practice beats last-minute cramming",
      "Ting is more talented than Lei",
      "Long study sessions are useless",
      "Quizzes are unfair to roommates"
    ],
    answer: 0,
    explain: "突击三小时 vs 每天 15 分钟，突击者在突袭测验中更慢更差 → 分布式练习优于临时抱佛脚。"
  },
  {
    id: "c414", exam: "CET-4", type: "语法",
    stem: "Hardly had she sat down ______ the phone rang.",
    options: ["than", "when", "then", "that"],
    answer: 1,
    explain: "hardly...when... 与 no sooner...than... 是固定搭配：Hardly had she sat down when the phone rang."
  },
  {
    id: "c415", exam: "CET-4", type: "词汇",
    stem: "Please ______ the door; the wind is strong.",
    options: ["fasten", "fast", "haste", "hasten"],
    answer: 0,
    explain: "fasten 系紧、固定（fasten the door 关紧门）；fast 快的（形容词）；haste 匆忙（名词）；hasten 催促。"
  },

  /* ----- CET-6（15） ----- */
  {
    id: "c61", exam: "CET-6", type: "词汇",
    stem: "It took the country nearly twenty years to ______ enough capital for the railway project.",
    options: ["accumulate", "distribute", "compensate", "manipulate"],
    answer: 0,
    explain: "accumulate capital 积累资本；distribute 分配、compensate 补偿、manipulate 操纵，均与「积累足够资金」语义不符。"
  },
  {
    id: "c62", exam: "CET-6", type: "词汇",
    stem: "Most nutrition scientists ______ a balanced diet over quick weight-loss pills.",
    options: ["advocate", "abandon", "resist", "suspend"],
    answer: 0,
    explain: "advocate A over B 提倡 A 胜过 B；abandon 放弃、resist 抵制、suspend 暂停，搭配或语义均不当。"
  },
  {
    id: "c63", exam: "CET-6", type: "词汇",
    stem: "She was in a real ______: take the boring but safe job, or follow her dream with no guarantee.",
    options: ["dilemma", "fortune", "reputation", "trigger"],
    answer: 0,
    explain: "冒号后描述「两难选择」，dilemma 困境；fortune 财富、reputation 名声、trigger 诱因。"
  },
  {
    id: "c64", exam: "CET-6", type: "语境填空",
    stem: "With automation spreading through manufacturing, the loss of some traditional jobs is almost ______.",
    options: ["inevitable", "invisible", "unbearable", "unnecessary"],
    answer: 0,
    explain: "语境「自动化普及」→ 传统岗位流失「几乎不可避免」；invisible 看不见的、unbearable 难以忍受的、unnecessary 不必要的。"
  },
  {
    id: "c65", exam: "CET-6", type: "语境填空",
    stem: "The professor asked me to ______ on the second paragraph of my essay.",
    options: ["elaborate", "imitate", "vanish", "withdraw"],
    answer: 0,
    explain: "elaborate on sth. 详细阐述；imitate 模仿、vanish 消失（不及物）、withdraw 撤回，均不与 on 搭配表「阐述」。"
  },
  {
    id: "c66", exam: "CET-6", type: "阅读理解",
    passage: "A team of psychologists found that people judge the same wine as tasting better when it is labeled with a higher price. The effect disappeared among participants who had received basic training in wine tasting.",
    stem: "The study suggests that price labels ______.",
    options: [
      "can change our perception of taste",
      "change the chemical quality of wine",
      "have no effect on trained tasters' purchases",
      "prove that expensive wine is always better"
    ],
    answer: 0,
    explain: "价格标签改变的是「对味道的感知」而非酒的化学品质；受训者身上效应消失 ≠ 购买行为结论；D 更无从谈起。本题同时是 perception（感知）的语境运用。"
  },
  {
    id: "c67", exam: "CET-6", type: "语境填空",
    stem: "The new monitoring system will help ______ traffic jams during rush hours.",
    options: ["curb", "curve", "curl", "cure"],
    answer: 0,
    explain: "curb 抑制、遏制（curb traffic jams 抑制拥堵）；curve 使弯曲、curl 卷曲、cure 治愈。"
  },
  {
    id: "c68", exam: "CET-6", type: "词汇",
    stem: "Scientists ______ that the two species share a common ancestor.",
    options: ["deduce", "reduce", "deduct", "denote"],
    answer: 0,
    explain: "deduce 推断、演绎（由证据推出结论）；reduce 减少、deduct 扣除、denote 表示。"
  },
  {
    id: "c69", exam: "CET-6", type: "语境填空",
    stem: "To write a good summary, first ______ the report into its key points.",
    options: ["condense", "confess", "confine", "confirm"],
    answer: 0,
    explain: "condense 压缩、精简（condense...into...）；confess 坦白、confine 限制、confirm 确认。"
  },
  {
    id: "c610", exam: "CET-6", type: "语境填空",
    stem: "A short nap can ______ the effects of a poor night's sleep.",
    options: ["alleviate", "elevate", "aggravate", "alternate"],
    answer: 0,
    explain: "alleviate 减轻（不良影响）；elevate 升高、aggravate 加剧（反义）、alternate 交替。"
  },
  {
    id: "c611", exam: "CET-6", type: "语法",
    stem: "Not until the results were published ______ the significance of the study.",
    options: ["did the public realize", "the public realized", "realized the public", "does the public realize"],
    answer: 0,
    explain: "not until 置于句首时主句部分倒装，且时态与从句呼应（were → did realize）。"
  },
  {
    id: "c612", exam: "CET-6", type: "语境填空",
    stem: "The two companies signed an agreement to ______ their research efforts.",
    options: ["consolidate", "console", "condole", "collide"],
    answer: 0,
    explain: "consolidate 合并、巩固（研究力量）；console 安慰、condole 吊唁、collide 碰撞。"
  },
  {
    id: "c613", exam: "CET-6", type: "阅读理解",
    passage: "Cities that added protected bike lanes saw retail sales on those streets rise by an average of ten percent within two years, contradicting merchants' fears that removing parking spaces would drive customers away.",
    stem: "What can be inferred from the passage?",
    options: [
      "Shops along the lanes performed better than merchants expected",
      "Parking spaces increase retail sales",
      "Cyclists rarely buy anything",
      "The bike-lane reforms failed"
    ],
    answer: 0,
    explain: "零售额上升 10% 与商户的担忧相反 → 业绩好于预期；B、C、D 均与原文相悖。"
  },
  {
    id: "c614", exam: "CET-6", type: "语境填空",
    stem: "Artificial lights in coastal cities ______ sea turtles that hatch at night.",
    options: ["disorient", "orient", "restore", "restrain"],
    answer: 0,
    explain: "disorient 使迷失方向（海龟幼体靠自然光辨向）；orient 定向、restore 恢复、restrain 克制。"
  },
  {
    id: "c615", exam: "CET-6", type: "词汇",
    stem: "His explanation was so ______ that even beginners understood the theory.",
    options: ["articulate", "ambiguous", "hostile", "obsolete"],
    answer: 0,
    explain: "articulate 清晰表达的，与「初学者也能听懂」呼应；ambiguous 模棱两可、hostile 敌对的、obsolete 过时的。"
  },

  /* ----- TEM-8（15） ----- */
  {
    id: "t1", exam: "TEM-8", type: "同义替换",
    stem: "The word \"ephemeral\" most nearly means:",
    options: ["short-lived", "widespread", "stubborn", "talkative"],
    answer: 0,
    explain: "ephemeral = 转瞬即逝的，同 short-lived / fleeting，是专八文学阅读高频词。"
  },
  {
    id: "t2", exam: "TEM-8", type: "词汇",
    stem: "A ______ reply uses very few words.",
    options: ["laconic", "ebullient", "gregarious", "mellifluous"],
    answer: 0,
    explain: "laconic 言简意赅的；ebullient 热情洋溢、gregarious 爱交际、mellifluous 声音甜美。"
  },
  {
    id: "t3", exam: "TEM-8", type: "词汇",
    stem: "The player's ______ conduct earned him a red card.",
    options: ["belligerent", "magnanimous", "fastidious", "succinct"],
    answer: 0,
    explain: "belligerent 好斗的（吃红牌）；magnanimous 宽宏大量、fastidious 一丝不苟、succinct 简洁，均与红牌语境不符。"
  },
  {
    id: "t4", exam: "TEM-8", type: "词汇",
    stem: "Many believed the new drug was a ______ that would cure all diseases.",
    options: ["panacea", "nemesis", "hubris", "dearth"],
    answer: 0,
    explain: "panacea 万灵药；nemesis 克星、hubris 傲慢、dearth 匮乏，均与「治愈一切」的语义不符。"
  },
  {
    id: "t5", exam: "TEM-8", type: "词汇",
    stem: "The critic was a famous ______ who tore down every tradition in sight.",
    options: ["iconoclast", "sycophant", "zealot", "luminary"],
    answer: 0,
    explain: "iconoclast 打破旧观念的人，与「推翻一切传统」呼应；sycophant 奉承者、zealot 狂热者、luminary 杰出人物（褒义）。"
  },
  {
    id: "t6", exam: "TEM-8", type: "语法",
    stem: "________ the invention of printing, books were copied by hand.",
    options: ["Prior to", "Prior than", "Prior from", "Prior"],
    answer: 0,
    explain: "prior to 为固定搭配，相当于 before；不存在 prior than/from 的用法，prior 单独不可作介词。"
  },
  {
    id: "t7", exam: "TEM-8", type: "语法",
    stem: "So ______ that many readers finish it in one sitting.",
    options: ["compelling is the novel", "compelling the novel is", "the novel is compelling", "is compelling the novel"],
    answer: 0,
    explain: "so + 形容词置于句首引发完全倒装：So compelling is the novel that...（正常语序：The novel is so compelling that...）。"
  },
  {
    id: "t8", exam: "TEM-8", type: "阅读理解",
    passage: "Old books endure not because they are correct — many are ignorant by modern lights — but because they dramatize arguments that every generation must rehearse: ambition against loyalty, freedom against obligation, the individual against the crowd.",
    stem: "According to the passage, old books endure because they ______.",
    options: [
      "are morally correct by modern standards",
      "dramatize arguments each generation must rehearse",
      "are shorter than modern novels",
      "avoid difficult vocabulary"
    ],
    answer: 1,
    explain: "原文明确否定「正确性」一说（many are ignorant by modern lights），真正的答案是「代代必须重演的争论的戏剧化呈现」。"
  },
  {
    id: "t9", exam: "TEM-8", type: "阅读理解",
    passage: "Dr. Paresi kept meticulous notebooks for forty years. When a rival challenged her results, the notebooks settled the dispute within an afternoon — every figure, dated and signed.",
    stem: "The notebooks mattered because they were ______.",
    options: [
      "careful and verifiable",
      "beautifully decorated",
      "written in Latin",
      "published every year"
    ],
    answer: 0,
    explain: "meticulous 一丝不苟 + 每个数字都注明日期与签名 → 「严谨且可核验」，一个下午便平息争议。"
  },
  {
    id: "t10", exam: "TEM-8", type: "人文知识",
    stem: "Hamlet's famous \"To be, or not to be\" speech is an example of a(n) ______.",
    options: ["soliloquy", "epilogue", "aside", "ode"],
    answer: 0,
    explain: "独白（角色独自诉说内心）为 soliloquy；epilogue 尾声、aside 旁白（对观众）、ode 颂诗。"
  },
  {
    id: "t11", exam: "TEM-8", type: "人文知识",
    stem: "Who wrote The Canterbury Tales in Middle English?",
    options: ["Geoffrey Chaucer", "William Langland", "John Milton", "Thomas Malory"],
    answer: 0,
    explain: "《坎特伯雷故事集》的作者是「英国诗歌之父」乔叟（Geoffrey Chaucer），以中古英语白话写成。"
  },
  {
    id: "t12", exam: "TEM-8", type: "人文知识",
    stem: "Pride and Prejudice opens with a line about a man \"in possession of a good fortune\" who must be \"in want of a wife\". Its author is ______.",
    options: ["Jane Austen", "Charlotte Bronte", "George Eliot", "Virginia Woolf"],
    answer: 0,
    explain: "《傲慢与偏见》的作者是简·奥斯汀（Jane Austen），1813 年出版。"
  },
  {
    id: "t13", exam: "TEM-8", type: "语境填空",
    stem: "The guide asked us to ______ the two portraits and note the differences in brushwork.",
    options: ["juxtapose", "ostracize", "obfuscate", "proliferate"],
    answer: 0,
    explain: "juxtapose 并置比较（两幅画并排观察笔触差异）；ostracize 排斥、obfuscate 混淆、proliferate 激增。"
  },
  {
    id: "t14", exam: "TEM-8", type: "词汇",
    stem: "He bore the family's financial troubles with remarkable ______.",
    options: ["equanimity", "cacophony", "vicissitude", "serendipity"],
    answer: 0,
    explain: "equanimity 镇定、平静（面对困境不动摇）；cacophony 嘈杂、vicissitude 变迁、serendipity 机缘巧合。"
  },
  {
    id: "t15", exam: "TEM-8", type: "语境填空",
    stem: "A ______ of rainfall left the reservoir half empty by August.",
    options: ["dearth", "surge", "plethora", "bounty"],
    answer: 0,
    explain: "dearth 匮乏、短缺（a dearth of rainfall 降水稀少）；surge 激增、plethora 过剩、bounty 丰饶，均与「水库半空」矛盾。"
  },

  /* ----- IELTS（15） ----- */
  {
    id: "i1", exam: "IELTS", type: "同义替换",
    stem: "The word \"feasible\" is closest in meaning to:",
    options: ["practical", "doubtful", "expensive", "famous"],
    answer: 0,
    explain: "feasible = 可行的，同义替换 practical / viable，是雅思阅读高频考点词。"
  },
  {
    id: "i2", exam: "IELTS", type: "同义替换",
    stem: "The word \"mitigate\" is closest in meaning to:",
    options: ["reduce", "worsen", "create", "measure"],
    answer: 0,
    explain: "mitigate = 减轻、缓和，同义替换 make less severe / alleviate。"
  },
  {
    id: "i3", exam: "IELTS", type: "同义替换",
    stem: "The word \"obsolete\" most nearly means:",
    options: ["outdated", "advanced", "rare", "fragile"],
    answer: 0,
    explain: "obsolete = 过时的、被淘汰的，同 outdated / no longer in use。"
  },
  {
    id: "i4", exam: "IELTS", type: "阅读理解",
    passage: "Urban green spaces do more than decorate a city. Researchers studying districts in Tokyo found that residents with access to small parks reported lower stress levels, even when the parks were no larger than a tennis court. The effect was strongest among people who visited the spaces daily, suggesting that frequency matters more than size.",
    stem: "According to the passage, what mattered more than the size of a green space?",
    options: [
      "How often residents visited it",
      "How large the nearby tennis courts were",
      "Where the parks were located",
      "How the parks were decorated"
    ],
    answer: 0,
    explain: "末句 \"frequency matters more than size\" 表明「访问频率比面积更重要」。"
  },
  {
    id: "i5", exam: "IELTS", type: "判断题",
    passage: "Green spaces also reduce city temperatures in summer. In one district, sensors recorded an average drop of two degrees near tree-lined streets. No data were collected during winter.",
    stem: "Statement: Green spaces lower city temperatures in winter as well. —",
    options: ["True", "False", "Not Given"],
    answer: 2,
    explain: "原文只报告了夏季数据并明言冬季未采集，该陈述既未证实也未证伪，故选 Not Given（雅思判断题典型陷阱：无中生有 ≠ False）。"
  },
  {
    id: "i6", exam: "IELTS", type: "语法",
    stem: "The findings ______ in the current study suggest that sleep quality influences vocabulary retention.",
    options: ["presented", "presenting", "present", "presents"],
    answer: 0,
    explain: "过去分词短语作后置定语，表被动（被呈现的 findings）；presenting 主动且需独立分句；句中已有谓语 suggest，不能再出现谓语形式。"
  },
  {
    id: "i7", exam: "IELTS", type: "同义替换",
    stem: "The word \"alleviate\" is closest in meaning to:",
    options: ["ease", "deepen", "ignite", "encode"],
    answer: 0,
    explain: "alleviate = 减轻，同 ease / relieve；deepen 加深、ignite 点燃、encode 编码。"
  },
  {
    id: "i8", exam: "IELTS", type: "同义替换",
    stem: "The word \"detrimental\" is closest in meaning to:",
    options: ["harmful", "generous", "gradual", "optional"],
    answer: 0,
    explain: "detrimental = 有害的，同 harmful / damaging，雅思写作高频替换词。"
  },
  {
    id: "i9", exam: "IELTS", type: "同义替换",
    stem: "The word \"scrutinize\" is closest in meaning to:",
    options: ["examine closely", "overlook", "summarize briefly", "approve quickly"],
    answer: 0,
    explain: "scrutinize = 仔细审查，同 examine closely / inspect；overlook 忽视正好相反。"
  },
  {
    id: "i10", exam: "IELTS", type: "判断题",
    passage: "The bridge toll was raised in 2019. Traffic across the bridge fell by eight percent in the following year. City planners had predicted a smaller decline.",
    stem: "Statement: The toll increase reduced traffic across the bridge. —",
    options: ["True", "False", "Not Given"],
    answer: 0,
    explain: "通行费上调（2019）与次年车流下降 8% 在时间上相继且方向一致，题干陈述与原文信息相符 → True。"
  },
  {
    id: "i11", exam: "IELTS", type: "判断题",
    passage: "Coffee consumption rose in the study group. Participants' reported sleep quality fell slightly over the same period. Researchers note that self-reported sleep is often unreliable.",
    stem: "Statement: Coffee certainly caused the decline in sleep quality. —",
    options: ["True", "False", "Not Given"],
    answer: 2,
    explain: "两个趋势同时发生 ≠ 因果关系，且研究者明言自我报告不可靠——既未证实也未证伪 → Not Given。"
  },
  {
    id: "i12", exam: "IELTS", type: "阅读理解",
    passage: "Night-shift nurses who received bright-light therapy during shifts and wore dark glasses on the way home reported fewer errors and faster adjustment to sleep. A control group with standard lighting showed no change.",
    stem: "What does the passage suggest about light management?",
    options: [
      "It may improve night workers' performance",
      "It harms sleep quality",
      "It only helps day workers",
      "Errors were unrelated to lighting"
    ],
    answer: 0,
    explain: "实验组（ Bright-light + 墨镜）差错更少、入睡调整更快，对照组无变化 → 光线管理可能改善夜班表现。"
  },
  {
    id: "i13", exam: "IELTS", type: "语境填空",
    stem: "Rising rents have ______ young workers to move out of the city centre.",
    options: ["compelled", "condensed", "converged", "contended"],
    answer: 0,
    explain: "compel sb. to do 迫使某人做某事；condense 压缩、converge 汇聚、contend 主张/竞争。"
  },
  {
    id: "i14", exam: "IELTS", type: "语境填空",
    stem: "The charity's funding ______ after the television appeal, allowing it to open two new shelters.",
    options: ["surged", "dwindled", "stagnated", "reversed"],
    answer: 0,
    explain: "「能开设两家新收容所」→ 资金激增 surged；dwindled 减少、stagnated 停滞、reversed 逆转，均与结果矛盾。"
  },
  {
    id: "i15", exam: "IELTS", type: "语法",
    stem: "The committee recommended that the report ______ revised before publication.",
    options: ["be", "is", "was", "would be"],
    answer: 0,
    explain: "recommend 等建议类动词后的 that 从句用虚拟语气（should + 动词原形，should 可省略）→ the report be revised。"
  }
];

/* ---------------- 汇总词典（词库 + 各文章术语，供悬浮取词） ---------------- */
const DICT = (() => {
  const d = {};
  WORDS.forEach(x => { d[x.w.toLowerCase()] = { ipa: x.ipa, pos: x.pos, def: x.def, lv: x.lv, src: "word" }; });
  ARTICLES.forEach(a => { Object.keys(a.gloss).forEach(k => { if (!d[k]) d[k] = { pos: a.gloss[k].pos, def: a.gloss[k].def, lv: "阅读", src: "gloss" }; }); });
  return d;
})();

/* 常量（默认每日新词数；运行时可被 Settings 覆盖） */
const NEW_PER_DAY = 8;
