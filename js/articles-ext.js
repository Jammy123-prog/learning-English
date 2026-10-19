/* EverWord 文章扩充层 v1.4 —— ARTICLES 30 → 100 篇
   新增 70 篇：港航领域 20 篇（a31-a50）、港机设备 15 篇（a51-a65）、
   物流贸易 10 篇（a66-a75）、综合主题 25 篇（a76-a100）。
   全部内容原创（版权合规）；术语表（gloss）键均在正文中以可词形还原的拼写出现。
   本文件须在 js/data.js 之后加载：data.js 末尾会把 EV_ARTICLES_EXT 合并进 ARTICLES。 */

const EV_ARTICLES_EXT = [

  /* ================ 港航领域（20 篇：a31-a50） ================ */

  { id: "a31", lv: 1, lvName: "低", topic: "港航·码头运营",
    title: "A Day at the Container Terminal",
    titleZh: "集装箱码头的一天",
    paras: [
      "The night shift ends at six in the morning, but the terminal never stops. Containers move all day and all night. A big ship is waiting at the quay, and the cranes are already lifting boxes from its deck. Every box has a number, and every number has a plan.",
      "In the control room, a planner looks at the screen. The computer shows where each container must go. Some boxes will leave by truck, and some will wait for the next ship. The planner talks to the crane drivers by radio. \"Blue box first, then the two red ones.\"",
      "Outside, trucks drive in a long line under the cranes. Each truck carries one container from the ship to the yard. In the yard, smaller cranes lift the boxes into tall stacks. The stacks look like a wall of colored metal. Six containers high, row after row.",
      "At the gate, drivers show their papers. A small office checks every truck in and out. Around noon, the workers take a short rest. They eat together near the water and watch the ships pass. Then the horn sounds, and the work starts again.",
      "By evening, the big ship is empty. The cranes begin to load new containers for its next port. When the sun goes down, bright lights turn the terminal into a white field. The night shift arrives, and the dance of steel and boxes continues."
    ],
    gloss: {
      "terminal":  { pos: "n.",    def: "码头；集装箱码头" },
      "container": { pos: "n.",    def: "集装箱；容器" },
      "quay":      { pos: "n.",    def: "（顺岸）码头岸壁" },
      "crane":     { pos: "n.",    def: "起重机；吊车" },
      "deck":      { pos: "n.",    def: "甲板" },
      "yard":      { pos: "n.",    def: "堆场" },
      "stack":     { pos: "n.",    def: "（集装箱）垛；一叠" },
      "gate":      { pos: "n.",    def: "闸口；大门" },
      "shift":     { pos: "n.",    def: "轮班" },
      "planner":   { pos: "n.",    def: "计划员；策划者" },
      "horn":      { pos: "n.",    def: "号角；汽笛" },
      "screen":    { pos: "n.",    def: "屏幕；屏风" },
      "truck":     { pos: "n.",    def: "卡车" },
      "rest":      { pos: "n.",    def: "休息" }
    }
  },

  { id: "a32", lv: 1, lvName: "低", topic: "港航·引航",
    title: "The Harbor Pilot",
    titleZh: "港口引航员",
    paras: [
      "A big ship crosses the ocean without trouble. But when it comes close to a port, the sea becomes narrow and busy. The captain knows the open water, but not this harbor. So a small boat comes out to meet the ship, and a special person climbs up a rope ladder. This person is the harbor pilot.",
      "The pilot knows every corner of the harbor. He knows where the water is deep and where it is shallow. He knows the currents, the bridges, and the turns. He has guided ships through this channel a thousand times, in sunshine and in fog.",
      "On the bridge, the pilot and the captain talk for a few minutes. The pilot studies the ship's size and how it moves. Then he gives orders: \"Slow down. Turn ten degrees. Keep the red light on the right.\" The captain still commands the ship, but he follows the pilot's local knowledge.",
      "Tug boats help too. They push and pull the great ship to the berth, slow as a walk. When the ship is safe alongside, the pilot says goodbye and climbs down the ladder. A pilot may board ten ships in one day, in any weather.",
      "It is hard work and it can be dangerous. Climbing a ladder between two moving ships needs strong arms and a calm heart. But pilots love their job. Every day, they bring the world's trade safely home."
    ],
    gloss: {
      "pilot":     { pos: "n.",    def: "引航员；领航员" },
      "harbor":    { pos: "n.",    def: "海港；避风港" },
      "captain":   { pos: "n.",    def: "船长；机长" },
      "channel":   { pos: "n.",    def: "航道；海峡" },
      "current":   { pos: "n.",    def: "水流；电流" },
      "bridge":    { pos: "n.",    def: "船桥；桥" },
      "order":     { pos: "n.",    def: "命令；订单" },
      "tug":       { pos: "n.",    def: "拖轮" },
      "berth":     { pos: "n.",    def: "泊位" },
      "ladder":    { pos: "n.",    def: "梯子" },
      "shallow":   { pos: "adj.",  def: "浅的" },
      "degree":    { pos: "n.",    def: "度；程度" },
      "dangerous": { pos: "adj.",  def: "危险的" },
      "trade":     { pos: "n.",    def: "贸易" }
    }
  },

  { id: "a33", lv: 1, lvName: "低", topic: "港航·潮汐",
    title: "Tides and Berthing",
    titleZh: "潮汐与靠泊",
    paras: [
      "The sea rises and falls twice a day. This slow breath of the ocean is called the tide. For a port, the tide is like a clock. Ships and workers must follow it, or wait.",
      "A large ship sits deep in the water. Its lowest point, below the water line, is called its draft. When the tide is low, the water near the quay may be too shallow. The ship's bottom could touch the mud. So the ship waits outside until the water rises.",
      "The harbor office prints tide tables months before. The tables show the exact time and height of every high tide. Planners read them like a menu. \"High water at 4:12 in the morning. The big vessel can enter one hour before that.\"",
      "On berthing night, everything moves with the clock. The tug boats meet the ship, the pilot climbs aboard, and the lines go ashore. If the tide is right, the ship glides to the wall with meters to spare under its keel. If the tide is wrong, even the best pilot must say no.",
      "Tides also change the work inside the port. At low water, some old quays dry out and small boats sit on the mud. At high water, every berth fills and the cranes work above a full harbor. The sea decides the rhythm, and the port listens."
    ],
    gloss: {
      "tide":      { pos: "n.",    def: "潮汐" },
      "rise":      { pos: "v.",    def: "上升" },
      "draft":     { pos: "n.",    def: "吃水（船体浸水深度）" },
      "quay":      { pos: "n.",    def: "码头岸壁" },
      "shallow":   { pos: "adj.",  def: "浅的" },
      "mud":       { pos: "n.",    def: "泥；淤泥" },
      "table":     { pos: "n.",    def: "表格；桌子" },
      "height":    { pos: "n.",    def: "高度" },
      "vessel":    { pos: "n.",    def: "船舶；容器" },
      "aboard":    { pos: "adv.",  def: "在船（车、飞机）上" },
      "ashore":    { pos: "adv.",  def: "向岸上；在岸上" },
      "keel":      { pos: "n.",    def: "龙骨（船底中线构件）" },
      "rhythm":    { pos: "n.",    def: "节奏；韵律" },
      "exact":     { pos: "adj.",  def: "精确的" }
    }
  },

  { id: "a34", lv: 1, lvName: "低", topic: "港航·拖轮作业",
    title: "Small Boats with Big Muscles",
    titleZh: "大力气的小船——拖轮",
    paras: [
      "A container ship is longer than a football field and heavier than a steel city. It cannot stop quickly, and it cannot turn in a small space. Close to the shore, the big engines must stay slow. So how does such a giant reach the wall of a berth? The answer is the tug.",
      "A tug is small but very strong. Its engine has thousands of horsepower, and its propeller can push water in any direction. Some tugs can turn around in their own length. They are like patient horses of the harbor.",
      "The crew throws a heavy rope, called a tow line, from the tug to the ship. The rope goes over the ship's side and the work begins. One tug pulls the nose, another pushes the tail. Slowly, slowly, the huge ship moves sideways toward the quay, as gently as a leaf landing.",
      "Big ships may need two, three, or even six tugs. The pilot on the bridge talks to each tug captain by radio. \"Pull thirty percent. Stop. Now push from the blue side.\" Every order is calm and short. There is no room for guessing.",
      "When the ship is finally alongside, thick fenders between the steel hull and the stone wall take the last squeeze. The tugs let go of the lines and sail away to meet the next arrival. Their day is a long string of giants delivered safely home."
    ],
    gloss: {
      "tug":       { pos: "n.",    def: "拖轮" },
      "engine":    { pos: "n.",    def: "发动机；引擎" },
      "propeller": { pos: "n.",    def: "螺旋桨" },
      "crew":      { pos: "n.",    def: "船员；全体乘务员" },
      "rope":      { pos: "n.",    def: "绳索" },
      "tow":       { pos: "v./n.", def: "拖；牵引" },
      "line":      { pos: "n.",    def: "缆绳；线" },
      "sideways":  { pos: "adv.",  def: "向一侧地" },
      "gently":    { pos: "adv.",  def: "轻轻地；温柔地" },
      "fender":    { pos: "n.",    def: "护舷（碰垫）" },
      "hull":      { pos: "n.",    def: "船体" },
      "squeeze":   { pos: "n.",    def: "挤压" },
      "patient":   { pos: "adj.",  def: "耐心的" },
      "arrival":   { pos: "n.",    def: "到达；到达者" }
    }
  },

  { id: "a35", lv: 1, lvName: "低", topic: "港航·锚地",
    title: "Waiting in the Anchorage",
    titleZh: "锚地等待",
    paras: [
      "Not every ship can enter a port at once. Sometimes the berths are full, or the cranes are busy with another vessel. Then the ship must wait outside, in a place called the anchorage. It is like a parking lot on the sea.",
      "To stop, a ship drops its anchor. The anchor is a heavy steel hook at the end of a long chain. It goes down into the seabed and holds the ship in place. The chain is much longer than the water is deep, and it lies on the bottom like a curved arm.",
      "A waiting ship still works. The engine is off, but the lights are on. A crew member keeps watch on the bridge all night. He checks the ship's position on the screen, counts the other anchored vessels, and reports to the harbor by radio every few hours.",
      "Days can pass like this. The cooks still make three meals a day. Some sailors paint the deck, check the ropes, or study for their exams. From far away, the anchored ships look calm and sleepy, white arrows pointing into the wind.",
      "When the harbor finally calls, the chain comes up link by link, gray with mud. The anchor goes back into its pocket, and the ship wakes up. Black smoke rises from the funnel as the great engine turns. The line of waiting ships moves one step forward, and the sea parking lot shrinks by one."
    ],
    gloss: {
      "anchorage": { pos: "n.",    def: "锚地；停泊处" },
      "anchor":    { pos: "n.",    def: "锚" },
      "chain":     { pos: "n.",    def: "链条" },
      "seabed":    { pos: "n.",    def: "海底" },
      "watch":     { pos: "n.",    def: "值班；守望" },
      "position":  { pos: "n.",    def: "位置" },
      "report":    { pos: "v.",    def: "报告；汇报" },
      "sailor":    { pos: "n.",    def: "水手；海员" },
      "paint":     { pos: "v.",    def: "刷漆；绘画" },
      "calm":      { pos: "adj.",  def: "平静的" },
      "funnel":    { pos: "n.",    def: "（船）烟囱" },
      "link":      { pos: "n.",    def: "链环；链接" },
      "pocket":    { pos: "n.",    def: "（锚链）舱；口袋" },
      "shrink":    { pos: "v.",    def: "缩小；收缩" }
    }
  },

  { id: "a36", lv: 1, lvName: "低", topic: "港航·港口运营",
    title: "The Port That Never Sleeps",
    titleZh: "不眠的港口",
    paras: [
      "Most cities go quiet after midnight. Shops close, streets empty, and lights go off one by one. But down by the water, another world is wide awake. The port works twenty-four hours a day, seven days a week. Trade never takes a holiday.",
      "At two in the morning, the terminal is a field of light. Tall lamps turn the yard as bright as day. The cranes move like slow metal animals, and the trucks run in circles with their headlights on. On the quay, a ship from across the ocean is already half empty.",
      "The workers here live a different life. They start their shift when others end theirs. They eat breakfast at sunset and dinner before dawn. Their families learn to be quiet at noon, when the night worker sleeps. It is not an easy life, but it has its own pride.",
      "Everything follows the clock of the ships. A vessel that arrives at 3 a.m. must be served at 3 a.m. If the crane waits, the ship waits too, and waiting costs money every minute. So the coffee at the gate house is always hot, and the radio is always on.",
      "When the sun rises, the day shift takes over with a short meeting. The night crew goes home to sleep. Behind them, another ship slides quietly toward the open sea, and the next one is already waiting at the breakwater. The port never sleeps, and the world keeps moving because of it."
    ],
    gloss: {
      "port":      { pos: "n.",    def: "港口" },
      "trade":     { pos: "n.",    def: "贸易" },
      "lamp":      { pos: "n.",    def: "灯" },
      "circle":    { pos: "n.",    def: "圆圈；循环" },
      "shift":     { pos: "n.",    def: "轮班" },
      "sunset":    { pos: "n.",    def: "日落" },
      "dawn":      { pos: "n.",    def: "黎明" },
      "pride":     { pos: "n.",    def: "自豪；骄傲" },
      "vessel":    { pos: "n.",    def: "船舶" },
      "meeting":   { pos: "n.",    def: "会议" },
      "breakwater": { pos: "n.",   def: "防波堤" },
      "awake":     { pos: "adj.",  def: "醒着的" },
      "quiet":     { pos: "adj.",  def: "安静的" },
      "minute":    { pos: "n.",    def: "分钟" }
    }
  },

  { id: "a37", lv: 2, lvName: "中", topic: "港航·绿色港口",
    title: "Ports Plug In: The Rise of Shore Power",
    titleZh: "港口插电：岸电的兴起",
    paras: [
      "A ship at berth still burns fuel. Its diesel generators keep the lights on, the cranes of the reefers humming, and the air conditioning running around the clock. Multiply that by dozens of ships, and a busy port becomes a serious source of air pollution — sulfur, nitrogen oxides, and fine dust that drift straight into the city behind it.",
      "The cleaner answer is deceptively simple: turn off the engines and plug the ship into the city grid. This is called shore power, or cold ironing in the older sailor's slang. High-voltage cables run from sockets on the quay to a special connection box on the vessel. Within an hour of berthing, the funnel goes silent and the ship draws electricity like any building ashore.",
      "The idea is old; the economics are new. A shore power system asks the port to install transformers, cable reels and frequency converters, because ships built for 60-hertz American grids must connect to 50-hertz Asian networks. A single berth can cost several million dollars to upgrade. Shipowners, meanwhile, must retrofit connection panels, and not every older vessel justifies the investment.",
      "The rules are now tipping the balance. In Norway, ferries must use shore power or pay higher fees. California requires it for most container and cruise calls. China has wired hundreds of berths along its coast and river ports, pairing them with subsidized electricity prices so that plugging in is cheaper than burning fuel. Ports that once asked \"why\" now ask \"how fast\".",
      "The results are easy to feel. Walk along a quay where shore power works and the difference is physical: no diesel smell, no trembling deck, no black stain on the sky. Crews sleep better, harbor offices open their windows, and the port's noise complaints drop by half.",
      "Shore power is not the whole answer to shipping's emissions — the fuel burned crossing the ocean matters far more — but it is the most visible promise a port can make to its neighbors: when a ship rests here, the air stays clean."
    ],
    gloss: {
      "berth":     { pos: "n.",    def: "泊位" },
      "generator": { pos: "n.",    def: "发电机" },
      "reefer":    { pos: "n.",    def: "冷藏集装箱" },
      "sulfur":    { pos: "n.",    def: "硫" },
      "shore":     { pos: "n.",    def: "岸" },
      "cable":     { pos: "n.",    def: "电缆；缆绳" },
      "socket":    { pos: "n.",    def: "插座；插座式接口" },
      "grid":      { pos: "n.",    def: "电网；格子" },
      "transformer": { pos: "n.",  def: "变压器" },
      "converter": { pos: "n.",    def: "变频器；转换器" },
      "retrofit":  { pos: "v.",    def: "改造；翻新" },
      "subsidize": { pos: "v.",    def: "补贴；资助" },
      "emission":  { pos: "n.",    def: "排放" },
      "visible":   { pos: "adj.",  def: "看得见的" }
    }
  },

  { id: "a38", lv: 2, lvName: "中", topic: "港航·港口拥堵",
    title: "When the Port Chokes",
    titleZh: "当港口拥堵时",
    paras: [
      "A port is a machine with a narrow throat. Ships enter at one end, containers flow through yards, gates and railways, and trucks leave at the other. When every part runs at its designed speed, the machine hums. When one part slows, the whole system backs up like a drain, and the world suddenly remembers how much it depends on a few square kilometers of concrete.",
      "Congestion usually begins far from the berth. A spike in import orders, a typhoon that closes operations for two days, a shortage of truck drivers during a holiday week — any of these can leave cargo arriving faster than it can leave. The yard fills up. Crane operators hunt for boxes buried in tall stacks, and every hunt wastes minutes. Productivity falls, which makes the queue longer, which slows things further.",
      "The visible symptom is the anchorage. Dozens of ships swing on their hooks outside the breakwater, each burning fuel and money while it waits. In the worst weeks of 2021, more than a hundred vessels sat off the American West Coast, and a container that once paid two thousand dollars to cross the Pacific paid twenty thousand.",
      "The costs spread quietly inland. Factories wait for parts; retailers order Christmas goods in July; warehouses refuse bookings because their docks are full. Economists later found that port delays, not factory shutdowns alone, drove much of that era's price increases.",
      "The cure is rarely one big fix. Ports add night gates and weekend shifts so trucks spread across the week. Railways get dedicated container trains. Simple rules — like keeping one empty stack per yard block for reshuffling — can recover surprising amounts of speed. Data sharing between shipping lines, terminals and truckers turns a guessing game into a schedule.",
      "The deeper lesson is humility. A port that feels no strain today is one holiday rush, one storm, or one labor dispute away from a chokepoint. The ports that age well are the ones that treat empty capacity as insurance rather than waste."
    ],
    gloss: {
      "congestion": { pos: "n.",   def: "拥堵；堵塞" },
      "drain":     { pos: "n.",    def: "下水道；排水管" },
      "spike":     { pos: "n.",    def: "激增；尖峰" },
      "typhoon":   { pos: "n.",    def: "台风" },
      "symptom":   { pos: "n.",    def: "症状；征兆" },
      "breakwater": { pos: "n.",   def: "防波堤" },
      "queue":     { pos: "n.",    def: "排队；队列" },
      "inland":    { pos: "adv./adj.", def: "在内陆（的）" },
      "retailer":  { pos: "n.",    def: "零售商" },
      "warehouse": { pos: "n.",    def: "仓库" },
      "productivity": { pos: "n.", def: "生产率；效率" },
      "capacity":  { pos: "n.",    def: "容量；能力" },
      "insurance": { pos: "n.",    def: "保险" },
      "hum":       { pos: "v.",    def: "嗡嗡运转" }
    }
  },

  { id: "a39", lv: 2, lvName: "中", topic: "港航·班轮运输",
    title: "The Timetable of the Ocean",
    titleZh: "海洋上的时刻表——班轮网络",
    paras: [
      "An airline passenger buys a ticket for a flight at a known hour to a known city. A shipping manager does the same thing, only slower: a container booked on a weekly liner service will sail on Thursday, call at Singapore six days later, and reach Rotterdam in thirty-one. This is the quiet miracle of liner shipping — the ocean run on a timetable.",
      "A liner service is a loop. A string of eight to twelve vessels sails the same rotation of ports, week after week, like trains on a circular track. While one vessel is discharging in Shanghai, its sister ships are scattered across the Pacific, the Indian Ocean and the Suez Canal. The schedule is the product: shippers design their factories and warehouses around it.",
      "The hub and spoke geography keeps the system affordable. Giant vessels call only at a few deep-water megaports; smaller feeders then distribute boxes along secondary routes, the way regional aircraft connect to major airports. Singapore, Shanghai and Rotterdam each handle transshipment cargoes that never leave the dock except to change ships.",
      "The enemy of the timetable is friction at sea. A storm in the North Atlantic, a canal blockage in Suez, congestion in Los Angeles — each pushes vessels out of their slots. Lines then \"skip ports\", drop calls, or add ships to a loop to restore reliability. During the pandemic, schedule reliability fell below forty percent; in good years it climbs above eighty.",
      "For ports, the weekly call is a heartbeat. The terminal plans its labor, cranes and yard space around the vessel's arrival window measured in hours. A delay of twelve hours can cancel a train connection and leave a hundred truckers idle. Dependability, more than raw speed, is what a port sells.",
      "The timetable also explains the loyalty in the industry. A shipper who moves cargo every week on the same loop learns its rhythm — which departure catches which connection, when to book, when to roll. The ocean looks wild and boundless from the beach. From the shipping desk, it is a clock."
    ],
    gloss: {
      "liner":     { pos: "n.",    def: "班轮" },
      "rotation":  { pos: "n.",    def: "轮转；循环航线" },
      "loop":      { pos: "n.",    def: "环形航线；循环" },
      "hub":       { pos: "n.",    def: "枢纽" },
      "spoke":     { pos: "n.",    def: "辐条；支线" },
      "feeder":    { pos: "n.",    def: "支线船；驳船" },
      "transshipment": { pos: "n.", def: "中转；转运" },
      "friction":  { pos: "n.",    def: "摩擦；阻碍" },
      "slot":      { pos: "n.",    def: "舱位；时间档" },
      "reliability": { pos: "n.",  def: "可靠性" },
      "dependability": { pos: "n.", def: "可信赖性" },
      "boundless": { pos: "adj.",  def: "无边无际的" },
      "rhythm":    { pos: "n.",    def: "节奏" },
      "idle":      { pos: "adj.",  def: "闲置的；空闲的" }
    }
  },

  { id: "a40", lv: 2, lvName: "中", topic: "港航·水上交通",
    title: "The Air Traffic Control of the Sea",
    titleZh: "海上的空管——船舶交通管理系统",
    paras: [
      "From the bridge of a ship, a busy harbor approach looks like chaos: ferries crossing, fishing boats scattered, tankers creeping up the channel, small craft zigzagging everywhere. From a tower above the water, the same scene resolves into order. This is the domain of the Vessel Traffic Service, the VTS — radar, radio and screens that do for ships what air traffic control does for planes.",
      "A VTS center watches a defined area, from the fairway at sea to the furthest berth upstream. Every ship above a certain size must report in by radio before entering, stating its name, position, cargo and intention. The operator plots each call on the radar overlay, where automatic identification signals paint every vessel with its name, speed and course, like labeled chess pieces on a glowing board.",
      "The service's first duty is information. \"Fishing fleet three miles ahead, drifting nets.\" \"Deep-draft vessel leaving the turning basin; small craft keep clear of the channel.\" A quiet voice at the right moment prevents more accidents than any rulebook.",
      "Its second duty is organization. In fog or heavy traffic, the operator may sequence movements — this vessel enters first, that one waits at the anchor point — or physically escort a hazardous cargo through the most crowded stretch. Legally, a VTS advises but does not command; the captain and the pilot keep their authority. In practice, no sensible master ignores the tower that can see everything.",
      "The technology keeps sharpening. Modern centers fuse radar with satellite positioning, camera systems with object detection, and tide and current sensors into a single picture. Some ports now broadcast the same picture to every bridge, so each captain sees the traffic as the tower sees it — a shared map instead of private guesses.",
      "The measure of success is silence. When a VTS works well, nothing dramatic happens: no collisions in the bend, no tanker aground at low water, no ferry arriving late. The operators drink their tea, watch the labels crawl across the screen, and keep a harbor of ten thousand movements a year moving in an unbroken flow."
    ],
    gloss: {
      "chaos":     { pos: "n.",    def: "混乱" },
      "approach":  { pos: "n.",    def: "进港航道；接近" },
      "fairway":   { pos: "n.",    def: "航道" },
      "radar":     { pos: "n.",    def: "雷达" },
      "identification": { pos: "n.", def: "识别；身份" },
      "master":    { pos: "n.",    def: "（ship's master）船长" },
      "label":     { pos: "n.",    def: "标签" },
      "sequence":  { pos: "v.",    def: "安排顺序；排序" },
      "escort":    { pos: "v.",    def: "护航；护送" },
      "authority": { pos: "n.",    def: "权力；当局" },
      "fuse":      { pos: "v.",    def: "融合" },
      "sensor":    { pos: "n.",    def: "传感器" },
      "collision": { pos: "n.",    def: "碰撞" },
      "aground":   { pos: "adv./adj.", def: "搁浅（的）" }
    }
  },

  { id: "a41", lv: 2, lvName: "中", topic: "港航·清洁能源",
    title: "Filling Ships with Cold Fire",
    titleZh: "给船加\"冷火\"——LNG 加注",
    paras: [
      "Sailors have always feared fire at sea, so it is a strange turn of history that ships now ask for it deliberately — at minus 162 degrees Celsius. Liquefied natural gas, shrunk to one six-hundredth of its gaseous volume, is the shipping industry's first serious step away from oil, and ports are racing to become the places where ships fill up with it.",
      "An LNG-fueled vessel carries its fuel in insulated tanks, like a giant thermos flask. The advantages are chemical rather than dramatic: almost no sulfur oxides, sharply lower nitrogen oxides, and about twenty percent less carbon dioxide than conventional marine fuel. For shipowners facing tighter air-pollution rules in emission control areas, the switch pays for itself in compliance.",
      "Bunkering — the shipping word for refueling — is where the cold makes things interesting. The fuel must stay deeply refrigerated or it boils back into gas. Pipes have to be pre-cooled slowly before any liquid flows; a wrong step cracks seals and vents clouds of white vapor across the quay. Crews train for hours of checklist discipline for a transfer that takes two.",
      "A port that offers LNG needs more than a truck with a hose. It needs a licensed operator, an approved safety zone, simultaneous-operations rules that decide whether cranes may keep working alongside a fuel transfer, and emergency plans agreed with the fire brigade. Singapore, Rotterdam and Zeebrugge built the first full-service LNG bunkering hubs; Chinese ports have followed with barges that shuttle between terminals and ships at anchor.",
      "The economics remain the industry's favorite argument. LNG tanks steal cargo space, dual-fuel engines cost extra, and methane slip — unburned gas escaping from the engine — can erode the climate benefit if not engineered away. Ports therefore hedge their bets: the same quay infrastructure that serves LNG today is being designed to carry methanol, ammonia or biofuels tomorrow.",
      "Watch a bunkering operation from the breakwater and it looks almost gentle: two ships tied side by side, a single insulated arm between them, vapor curling from a vent like a dragon at rest. The energy transition of an entire industry, for the moment, looks exactly like this — quiet, cold, and procedurally obsessive."
    ],
    gloss: {
      "liquefied": { pos: "adj.",  def: "液化的" },
      "sulfur":    { pos: "n.",    def: "硫" },
      "nitrogen":  { pos: "n.",    def: "氮" },
      "oxide":     { pos: "n.",    def: "氧化物" },
      "compliance": { pos: "n.",   def: "合规；遵守" },
      "bunkering": { pos: "n.",    def: "船舶加注（燃料）" },
      "refrigerate": { pos: "v.",  def: "冷藏；冷冻" },
      "boil":      { pos: "v.",    def: "沸腾" },
      "seal":      { pos: "n.",    def: "密封件；封条" },
      "vapor":     { pos: "n.",    def: "蒸气" },
      "quay":      { pos: "n.",    def: "码头岸壁" },
      "brigade":   { pos: "n.",    def: "（消防）队" },
      "methane":   { pos: "n.",    def: "甲烷" },
      "ammonia":   { pos: "n.",    def: "氨" },
      "obsessive": { pos: "adj.",  def: "过分讲究的；着迷的" }
    }
  },

  { id: "a42", lv: 2, lvName: "中", topic: "港航·内河航运",
    title: "The Slow Lane Is Green",
    titleZh: "慢车道最环保——内河航运",
    paras: [
      "On the Rhine, a pusher tug nudges four barges lashed together into a floating train two hundred meters long. On the Yangtze, container ships the length of a frigate slide between river terminals. On the Mississippi, grain barges ride the current down to New Orleans. Inland waterway shipping is the freight world's quiet elder — slow, cheap, and suddenly fashionable again.",
      "The arithmetic explains the fashion. A single European Class Va barge carries around two hundred containers; a river convoy can move as much as several freight trains. Fuel burned per ton-kilometer runs at a fraction of road transport, and one convoy removes hundreds of trucks from highways that were never designed for today's volume. Cities choking on truck exhaust have rediscovered the river as public infrastructure.",
      "Rivers discipline their users. Draft limits rise and fall with rainfall; a dry autumn on the Rhine can cut payloads by a third and send freight back to the roads. Locks schedule everything: a tow waiting at a lock chamber is a stopped vehicle, however graceful it looks. Ice, floods and falling water levels each have their season. River carriers live by water-level forecasts the way farmers live by weather.",
      "The cargo mix is shifting from bulk to boxes. Coal and ore still dominate tonnage, but container shuttles between deep-sea ports and inland terminals are the fastest-growing business. A box unloaded in Shanghai can ride a barge up the Yangtze to Chongqing; a box landed in Rotterdam can reach Duisburg overnight by water, bypassing the highway ring around the delta.",
      "Ports along the rivers are changing shape accordingly. Old city docks too small for ocean ships find new life as trimodal hubs — barge, rail and truck in one fenced yard. Cranes that once grabbed grain now spread containers; warehouses become cross-dock halls; suburban land that highways made worthless becomes riverfront property again.",
      "Inland shipping will never be fast, and it no longer needs to be. Its promise is exactly what modern logistics is learning to want: predictable, low-emission, high-volume movement on infrastructure that nature built and engineers merely deepened."
    ],
    gloss: {
      "barge":     { pos: "n.",    def: "驳船" },
      "convoy":    { pos: "n.",    def: "船队；车队" },
      "freight":   { pos: "n.",    def: "货物；货运" },
      "tonnage":   { pos: "n.",    def: "吨位" },
      "payload":   { pos: "n.",    def: "有效载荷；载货量" },
      "lock":      { pos: "n.",    def: "船闸" },
      "chamber":   { pos: "n.",    def: "（船闸）闸室" },
      "bulk":      { pos: "n.",    def: "散货；大批" },
      "shuttle":   { pos: "n.",    def: "穿梭班轮；班车" },
      "trimodal":  { pos: "adj.",  def: "三种运输方式的" },
      "riverfront": { pos: "n.",   def: "滨河区；河畔" },
      "discipline": { pos: "v.",   def: "约束；训练" },
      "predictable": { pos: "adj.", def: "可预测的" },
      "deepen":    { pos: "v.",    def: "加深" }
    }
  },

  { id: "a43", lv: 2, lvName: "中", topic: "港航·邮轮经济",
    title: "A Floating City Docks at Dawn",
    titleZh: "黎明进港的漂浮之城——邮轮经济",
    paras: [
      "Before sunrise, the cruise ship slips through the channel with its ten thousand passengers asleep. By eight, it is tied up at the pier, umbrellas open on the top deck, and a small city has arrived for the day. It will leave at dusk, taking its lights and wallets with it. The port town has roughly ten hours to make an impression — and a profit.",
      "The economics of a cruise call are peculiar. The ship pays a head tax per passenger; the port charges for the berth, water, waste and power; and then the passengers disembark. Studies of Mediterranean and Caribbean ports put passenger spending in the tens of millions of dollars a year for a single regular berth. Shops, tour operators, museums and taxi fleets all live on this migrating demand.",
      "Not every town welcomes the giant. Venice spent years arguing that a ship the size of a skyscraper lying on its side, towering over medieval rooftops, was both a humiliation and a hazard. Barriers to day-trippers, limits on ship size, and moves of berths away from fragile historic centers have followed across the industry. The cruise economy pays best where residents feel in control of it.",
      "For the ships themselves, turnaround day is the hardest of the week. One set of guests leaves by ten; another boards by two. In between, a small army works the cabins, the galleys, the fuel and water lines, and offloads tons of waste. A port that can process a full ship swap in four hours becomes a home port; one that cannot is only a call.",
      "Asian ports have become the industry's second engine. Shanghai's terminal handles turnaround voyages of four thousand passengers; Japan's regional ports sell culture calls to ships built for exactly that market. The winter fleet repositions to the southern hemisphere; the summer fleet returns to Alaska and the Baltic. It is a migratory species, and ports compete to be its habitat.",
      "Critics call the economics thin — low-spend passengers, crowded streets, jobs concentrated in low-margin services. Defenders point to hotels that fill the shoulder season, second visits by travelers who first arrived by sea, and an industry whose fuel bills now push it toward shore power and liquefied gas. Both are right, which is why the smartest ports treat the cruise ship the way the smartest hosts treat any guest: warmly, on their own terms."
    ],
    gloss: {
      "cruise":    { pos: "n.",    def: "邮轮巡游；航行" },
      "passenger": { pos: "n.",    def: "乘客" },
      "disembark": { pos: "v.",    def: "下船；登陆" },
      "peculiar":  { pos: "adj.",  def: "特有的；奇怪的" },
      "humiliation": { pos: "n.",  def: "羞辱；难堪" },
      "hazard":    { pos: "n.",    def: "危险；隐患" },
      "turnaround": { pos: "n.",   def: "（船舶）周转；掉头" },
      "galley":    { pos: "n.",    def: "（船或飞机的）厨房" },
      "reposition": { pos: "v.",   def: "重新部署；调仓" },
      "migratory": { pos: "adj.",  def: "迁徙的" },
      "habitat":   { pos: "n.",    def: "栖息地" },
      "shoulder":  { pos: "n.",    def: "（季节的）淡旺季之交" },
      "fleet":     { pos: "n.",    def: "船队；舰队" },
      "host":      { pos: "n.",    def: "东道主；主人" }
    }
  },

  { id: "a44", lv: 3, lvName: "高", topic: "港航·航运脱碳",
    title: "The Decarbonization Deadline",
    titleZh: "脱碳大限——航运业的世纪重构",
    paras: [
      "Shipping carries about ninety percent of world trade and emits roughly three percent of global carbon dioxide — a national-scale footprint for an industry with no nation. In 2023 the International Maritime Organization fixed a direction that would have sounded utopian a decade earlier: net-zero emissions, in effect, by around 2050, with binding checkpoints in 2030 and 2040. The dates are close; the physics is hostile.",
      "The hostility comes from energy density. A container ship crossing the Pacific burns through the energy of a small town, and no battery bank yet built can hold that much power in a hull. Wind assistance, hull coatings, speed reduction and operational tweaks can shave perhaps a quarter off emissions — valuable, but nowhere near net zero. The deep cuts must come from the fuel itself.",
      "The candidates are a chemist's shortlist. Methanol is storable at ambient temperature and already powers ordered tonnage; ammonia burns without a carbon atom but is toxic and currently made from fossil inputs; hydrogen is clean at the point of use and almost impossible to carry in volume; biofuels and synthetic e-fuels duck the ship-design problem by attacking the refinery instead. Each pathway drags a supply chain behind it that does not yet exist at scale.",
      "This is where ports stop being bystanders. A green fuel is only useful where a ship can actually fill up, so the bunkering map of the 2030s — which ports offer methanol, which offer ammonia, which can certify a biofuel blend — will redraw trade routes as decisively as coal stations and oil terminals once did. Rotterdam is piloting ammonia bunkering with safety studies Singapore-style; Chinese yards are delivering methanol-ready boxships in series; the first green corridor agreements between specific ports promise guaranteed fuel on specific schedules.",
      "The regulatory machinery is tightening in parallel. Carbon-intensity indexing already ranks every large ship; market-based measures under debate would put a price on every ton of fuel. Shipowners respond the way owners always do — by ordering flexible ships, dual-fuel engines, and designs convertible in mid-life to whatever fuel wins.",
      "The honest reading is neither triumph nor despair. Shipping has decarbonized before — from coal to oil, from sulfur-laden heavy fuel to scrubbed or distilled alternatives — always when economics and regulation pulled the same rope. This time the rope is heavier and the deadline is public. The ports that invest early in fuel flexibility will own the trade lanes of the transition; the ships that bet correctly will burn cheaply through the 2040s while rivals pay per ton."
    ],
    gloss: {
      "decarbonize": { pos: "v.", def: "脱碳" },
      "utopian":   { pos: "adj.",  def: "乌托邦式的；过于理想的" },
      "hostile":   { pos: "adj.",  def: "不利的；敌对的" },
      "density":   { pos: "n.",    def: "密度" },
      "battery":   { pos: "n.",    def: "电池" },
      "shave":     { pos: "v.",    def: "削减；剃" },
      "methanol":  { pos: "n.",    def: "甲醇" },
      "ambient":   { pos: "adj.",  def: "环境的；周围的" },
      "ammonia":   { pos: "n.",    def: "氨" },
      "toxic":     { pos: "adj.",  def: "有毒的" },
      "hydrogen":  { pos: "n.",    def: "氢" },
      "refinery":  { pos: "n.",    def: "炼油厂" },
      "bystander": { pos: "n.",    def: "旁观者" },
      "redraw":    { pos: "v.",    def: "重画；重塑" },
      "corridor":  { pos: "n.",    def: "走廊；通道" },
      "scrubbed":  { pos: "adj.",  def: "经洗涤（脱硫）的" },
      "distill":   { pos: "v.",    def: "蒸馏" }
    }
  },

  { id: "a45", lv: 3, lvName: "高", topic: "港航·运河与贸易",
    title: "The Narrow Neck of World Trade",
    titleZh: "世界贸易的狭窄咽喉——苏伊士运河",
    paras: [
      "Twelve percent of world trade passes through a channel that a strong swimmer could cross in minutes. The Suez Canal — a hundred and ninety-three kilometers of sand-lined water between the Mediterranean and the Red Sea — is the negotiation point between two oceans and four continents, and its power over the world economy is entirely a function of how narrow it is.",
      "The canal's economics rest on a simple subtraction. Sailing from Shanghai to Rotterdam through Suez covers about twenty thousand kilometers; around Africa, closer to twenty-seven. For a container ship steaming at twenty knots, that difference is ten days and millions of dollars of fuel and charter. The canal authority monetizes the shortcut with tolls scaled to ship size and cargo value — the largest boxships pay hundreds of thousands of dollars for a single transit, paid gladly against the alternative.",
      "Blockage is the canal's ancient nightmare. In 2021 the Ever Given — four hundred meters of steel blown sideways by a desert gust — wedged her bow into one bank and her stern into the other, and held six days of world trade hostage. The queue stretched past four hundred ships; factories idled on three continents; insurers recalculated. A single ship, a single sandbank, and the fragility of just-in-time logistics became a household lesson.",
      "Geography has alternatives, and none of them is comfortable. The Northern Sea Route shortens Asia–Europe distances but demands ice-class hulls, Russian permits and a season. The Panama Canal connects different oceans but is drying — its locks drink Gatun Lake water, and drought years cut crossings and auction transit slots to the highest bidder. Rail corridors across Eurasia absorb some boxes but cannot scale to the sea's tonnage. The world's fallback positions, in short, are weather, politics and steel rails.",
      "The canal keeps adapting. Deepening programs have raised the permissible draft; a parallel channel now lets convoys pass in both directions for much of the length; escort tugs and improved anchorage management clear blockages faster. Yet no dredger can widen geopolitics — insurance premiums and reroutings around the Red Sea have shown how quickly a chokepoint's risk premium can overwhelm its toll savings.",
      "Trade's dependence on such necks is not an accident of engineering but a fact of the planet's geometry. The straits of Malacca, Hormuz, Bab el-Mandeb and the two great canals together carry the majority of the world's seaborne energy and manufactured goods. Every one of them is, in effect, a border the global economy must cross daily — and a place where a local event becomes a global price within a week."
    ],
    gloss: {
      "channel":   { pos: "n.",    def: "航道；海峡" },
      "subtraction": { pos: "n.",  def: "减法；扣除" },
      "knot":      { pos: "n.",    def: "节（航速单位）" },
      "charter":   { pos: "n.",    def: "租船；包租" },
      "toll":      { pos: "n.",    def: "通行费" },
      "blockage":  { pos: "n.",    def: "堵塞" },
      "wedge":     { pos: "v.",    def: "楔入；卡住" },
      "bow":       { pos: "n.",    def: "船艏" },
      "stern":     { pos: "n.",    def: "船艉" },
      "hostage":   { pos: "n.",    def: "人质；抵押品" },
      "idled":     { pos: "v./adj.", def: "停工的；闲置的" },
      "insurer":   { pos: "n.",    def: "保险人；保险公司" },
      "drought":   { pos: "n.",    def: "干旱" },
      "auction":   { pos: "n.",    def: "拍卖" },
      "bidder":    { pos: "n.",    def: "出价者" },
      "tonnage":   { pos: "n.",    def: "吨位" },
      "dredger":   { pos: "n.",    def: "挖泥船" },
      "premium":   { pos: "n.",    def: "保险费；溢价" },
      "strait":    { pos: "n.",    def: "海峡" },
      "geometry":  { pos: "n.",    def: "几何；格局" }
    }
  },

  { id: "a46", lv: 3, lvName: "高", topic: "港航·港口国监督",
    title: "The Inspection That Follows the Flag",
    titleZh: "跟随船旗而来的检查——港口国监督",
    paras: [
      "A ship's flag is its law. Register in a state with rigorous surveyors and demanding rules, and the world's ports largely take your paperwork on trust. Register where oversight is thin — and a quarter of the world's fleet is registered where oversight is thin — and a different force stands ready at the berth: the port state, exercising its right to inspect any foreign ship that calls, whatever flag it flies.",
      "Port State Control began as an answer to a scandal of competence. By the late 1970s, ships crewed below safe minimums, held together with welds over cracks, were sinking with depressing regularity, and the worst of them tended to carry flags of convenience whose registries never visited. A handful of European states agreed to inspect each other's visitors; the idea hardened into regional memoranda of understanding covering nearly every coast on Earth.",
      "The mechanics are deliberately unnerving. An inspector arrives without appointment, armed with checklists drawn from decades of casualty analysis. The engine room is examined for oil-soaked lagging; the fire pumps are actually run; the crew must launch a lifeboat, plot a course, and demonstrate that the inert gas system on a tanker works rather than merely exists. Bridges of paperwork are cross-checked against machinery. Inconsistency is the quarry.",
      "Sanctions escalate with a bureaucratic inevitability that masters fear more than drama. A clear deficiency earns a written order with a deadline. A groundable one — faulty fire dampers, a failed steering test, unpaid and exhausted crew — detains the ship until class, flag and repair yards certify the cure. Detention lists are public. Charterers read them. A reputation for detention is a commercial wound that takes years to close.",
      "The regime's genius is arithmetic rather than law. Ships are scored on history, flag performance and age; the worst profiles are inspected obsessively, the best rarely. Owners respond rationally: to be left alone at Rotterdam, a ship must be genuinely fit to survive the Atlantic. The system turns every port into a tribunal and every tribunal verdict into freight-market intelligence.",
      "The frontier has moved from steel to people. Inspectors now check rest-hour records with the same rigor once reserved for hull plating, because fatigue has proven deadlier than rust; they interview crew about unpaid wages as readily as they test alarms. A regime built to catch unseaworthy ships is quietly becoming one that guards the humans who sail them — the industry's most overdue course change."
    ],
    gloss: {
      "flag":      { pos: "n.",    def: "船旗（船舶国籍）" },
      "registry":  { pos: "n.",    def: "船舶登记局；注册处" },
      "oversight": { pos: "n.",    def: "监督；疏忽" },
      "memoranda": { pos: "n.",   def: "备忘录（复数）" },
      "casualty":  { pos: "n.",    def: "（海）事故；伤亡" },
      "unnerving": { pos: "adj.",  def: "令人紧张不安的" },
      "checklist": { pos: "n.",    def: "检查清单" },
      "lagging":   { pos: "n.",    def: "保温层；护板" },
      "inert":     { pos: "adj.",  def: "惰性的" },
      "quarry":    { pos: "n.",    def: "猎物；采石场" },
      "deficiency": { pos: "n.",   def: "缺陷" },
      "damper":    { pos: "n.",    def: "挡火板；风门" },
      "detain":    { pos: "v.",    def: "滞留（船舶）" },
      "detention": { pos: "n.",    def: "滞留" },
      "tribunal":  { pos: "n.",    def: "裁判庭" },
      "unseaworthy": { pos: "adj.", def: "不适航的" },
      "fatigue":   { pos: "n.",    def: "疲劳" },
      "rust":      { pos: "n.",    def: "锈" }
    }
  },

  { id: "a47", lv: 3, lvName: "高", topic: "港航·海员",
    title: "The People the Supply Chain Forgot",
    titleZh: "被供应链遗忘的人——海员危机",
    paras: [
      "Ninety percent of everything travels by sea, and everything that travels by sea travels with roughly one point five million seafarers aboard. They are the workforce at the base of every supply chain — and the layer of it most easily forgotten, because their workplace sails over the horizon within hours of each delivery.",
      "The economics of their trade have tightened for decades. Crew sizes on a deep-sea freighter fell from forty-some souls in the 1970s to twenty or fewer today; automation ate the radio officer and most of the deck crowd, and wage competition among flag registries ate the rest. A Filipino able seaman, an Indian chief engineer and an Eastern European master constitute a normal international patchwork, paid at three different scales for the same voyage.",
      "Then came the lesson of 2020. Border closures designed for tourists trapped a rotating workforce at sea. Crew relief became impossible: contracts of four months stretched to nine, eleven, fourteen. At the crisis's peak, several hundred thousand seafarers were overdue for disembarkation, working beyond every legal limit, while their relief colleagues sat ashore unemployed, visas in hand and flights canceled. Governments took months to classify seafarers as key workers — and the phrase \"crew change crisis\" entered the industry's permanent vocabulary.",
      "The aftershocks are demographic. Surveys report that young officers increasingly decline to return: pay frozen, shore leave denied by quick port turnarounds, criminal liability for pollution incidents they did not cause, internet access that remains a luxury on the open ocean. The officer pipeline in major labor-supply countries is thinning at the exact moment an aging fleet needs more engineers, not fewer, to maintain dual-fuel engines and scrubber systems no one trained for in school.",
      "Ports and shipmanagers experiment with the work-life geometry. Faster turnaround ports build dedicated seafarer centers with wifi, sim cards and a shuttle to town; some terminals guarantee a four-hour shore pass for every call. Better connectivity — now arriving via low-earth-orbit satellites — lets a chief officer read his children bedtime stories from the Indian Ocean, and lets telemedicine reach an appendicitis mid-Pacific. Unions push consent-based, enforceable contracts; the better registries audit hours of rest as seriously as hull thickness.",
      "The market's verdict will be blunt. If the industry cannot make a career at sea tolerable to a generation raised with choices, automation will fill bridges with cameras and remote operators sooner than anyone planned — and the last generation of the world's traditional sailors will have carried ninety percent of everything to the shore of history."
    ],
    gloss: {
      "seafarer":  { pos: "n.",    def: "海员" },
      "workforce": { pos: "n.",    def: "劳动力" },
      "horizon":   { pos: "n.",    def: "地平线" },
      "patchwork": { pos: "n.",    def: "拼凑物；混杂物" },
      "disembarkation": { pos: "n.", def: "下船；登陆" },
      "overdue":   { pos: "adj.",  def: "逾期未换班的" },
      "demographic": { pos: "adj./n.", def: "人口统计（的）" },
      "decline":   { pos: "v.",    def: "拒绝；下降" },
      "liability": { pos: "n.",    def: "法律责任；负债" },
      "pipeline":  { pos: "n.",    def: "人才储备管道；管道" },
      "turnaround": { pos: "n.",   def: "（船舶）在港周转" },
      "shuttle":   { pos: "n.",    def: "接驳车；穿梭" },
      "connectivity": { pos: "n.", def: "连通性；网络连接" },
      "satellite": { pos: "n.",    def: "卫星" },
      "telemedicine": { pos: "n.", def: "远程医疗" },
      "appendicitis": { pos: "n.", def: "阑尾炎" },
      "tolerable": { pos: "adj.",  def: "可忍受的" },
      "verdict":   { pos: "n.",    def: "裁决；结论" }
    }
  },

  { id: "a48", lv: 3, lvName: "高", topic: "港航·船舶大型化",
    title: "Bigger Ships, Bigger Problems",
    titleZh: "船越大，问题越大——船舶大型化的代价",
    paras: [
      "In 1956 the Ideal X carried fifty-eight containers from Newark to Houston and invented an industry. Today's largest container ships carry twenty-four thousand. Each generation of size was justified by the same arithmetic — fuel, crew and port time spread across more boxes — and each generation quietly exported its costs onto everyone else. The economics of scale, it turns out, are the economics of externalized friction.",
      "The friction begins at the berth. A twenty-thousand-TEU vessel delivers or receives twenty thousand boxes in a single call. That is a wall of steel rising and falling over one quay, demanding eight or nine cranes working in unison, thousands of truck visits in the following days, and yard space measured in football fields. Terminals rebuilt themselves around the megaship — deeper channels, longer quays, higher gantries — and ports that could not afford the rebuild became feeder stops in a network they once led.",
      "At sea the giants sail near their design limits. Their stability in following seas, parametric rolling in certain swell conditions, engine reliability with crews of twenty — all have left dockside engineers writing incident reports in the dead of night. One disabled megaship closes a European port's approach for days; one hard aground in a shallow river delta requires the world's largest salvage effort. Frequency is low; consequence is enormous.",
      "The market learned the limit's location the hard way. When demand softened, carriers discovered that filling a twenty-thousand-box ship needs a full week's cargo from multiple trades; the oversupply of mega-capacity gutted freight rates. Alliances — the sharing of vessels among rival lines — became the only way to keep the giants full, which quietly concentrated the industry into three groupings whose capacity now exceeds most nations' merchant fleets.",
      "Ports on the receiving end absorbed the boldest costs. A single call's container volume floods gate systems; peak-day truck traffic overwhelms roads that spread freight evenly in the era of smaller ships. Rail yards, customs staffing, chassis pools — every downstream system inherited a once-a-week tsunami instead of a daily tide. Planners now speak of cargo smoothing as a discipline in itself.",
      "The era of growth-by-width is ending by geometry: beam cannot exceed canal limits by much more, and ports refuse the next dredging bill. The next scaling will be software — schedules, visibility, autonomous handling — and it will be no cheaper. Bigger ships made shipping cheap per box and fragile as a system. The industry's history has a shape, and the shape is now visible: every economy of scale is purchased with a concentration of risk."
    ],
    gloss: {
      "externalize": { pos: "v.",  def: "使外部化；转嫁（成本）" },
      "friction":   { pos: "n.",   def: "摩擦；阻力" },
      "unison":     { pos: "n.",   def: "一致；同时" },
      "gantry":     { pos: "n.",   def: "（门式）起重机跨架" },
      "feeder":     { pos: "n.",   def: "支线港/支线船" },
      "parametric": { pos: "adj.", def: "参数（共振）的" },
      "swell":      { pos: "n.",   def: "涌浪" },
      "salvage":    { pos: "n.",   def: "海难救助；打捞" },
      "oversupply": { pos: "n.",   def: "过剩" },
      "gutted":     { pos: "v.",   def: "摧毁（gut 的过去式）" },
      "alliance":   { pos: "n.",   def: "联盟" },
      "grouping":   { pos: "n.",   def: "集团；分组" },
      "chassis":    { pos: "n.",   def: "（集装箱）底盘车" },
      "tsunami":    { pos: "n.",   def: "海啸" },
      "smoothing":  { pos: "n.",   def: "平滑化；削峰" },
      "dredging":   { pos: "n.",   def: "疏浚；挖泥" },
      "concentration": { pos: "n.", def: "集中；浓度" }
    }
  },

  { id: "a49", lv: 3, lvName: "高", topic: "港航·港口韧性",
    title: "Designing for the Storm",
    titleZh: "为风暴而设计——港口韧性与极端天气",
    paras: [
      "A port is a wager against weather. Its cranes stand a hundred meters tall with the wind exposure of sails; its channels silt with every longshore current; its docks sit exactly where the surge arrives. For a century, engineers priced that wager from historical statistics — the hundred-year storm, the mean spring tide — and the statistics have stopped meaning what they did.",
      "The new era announces itself in operational vocabulary. Ports that once logged \"weather downtime\" as a rounding error now schedule around it: typhoon protocols with staged timelines for securing cranes, heat rules that halt steel work above forty-five degrees, fog rules that close pilotage for days at a stretch on once-clear routes. The Gulf Coast's ports rebuilt after successive hurricanes with electrical rooms raised a story high; Asian terminals certify typhoon-clasped gantries with anchor pins tested to wind speeds that pre-2010 codes considered impossible.",
      "Water is the quiet aggressor. Sea-level rise converts a storm from an event into a flood elevational problem: the same cyclone, atop twenty centimeters of higher base tide, tops quays that survived it a generation earlier. Ports respond with retractable flood gates at gate complexes, pump capacity sized for submerged yards, and drainage designed for rainfall intensities taken from warming-model curves rather than the instrumental record.",
      "The electrical system has emerged as the least resilient layer. One downed transmission tower can idle a terminal's cranes for days and strand refrigerated cargo worth hundreds of millions. Resilience investment now flows into buried feeds, duplicate substations on opposite sides of the harbor, and the first microgrids — solar arrays and batteries that can carry cold-ironing loads through a grid blackout.",
      "The sophisticated ports treat resilience as a schedule asset rather than a cost. Insurance premiums, deductible structures and business-interruption coverage increasingly price a terminal's recovery speed; the ports that reopen first after each storm capture the calls of those that reopen late, and a reputation for rapid recovery compounds like interest. Houston's quick restarts after successive hurricanes are estimated to have saved more cargo value than the hardening that enabled them.",
      "The honest difficulty is triage under uncertainty: no port can harden everything against every scenario, and money spent on impossible floods is money not spent on today's berths. The discipline that has emerged is layered — protect life and vessels absolutely, protect the electrical spine first, protect throughput third — and to rehearse, seriously and often, the day the water comes."
    ],
    gloss: {
      "resilience": { pos: "n.",    def: "韧性；恢复力" },
      "wager":      { pos: "n.",    def: "赌注" },
      "exposure":   { pos: "n.",    def: "暴露；受风面" },
      "silt":       { pos: "v.",    def: "淤积" },
      "longshore":  { pos: "adj.",  def: "沿岸的" },
      "surge":      { pos: "n.",    def: "风暴潮；涌浪" },
      "protocol":   { pos: "n.",    def: "预案；协议" },
      "secure":     { pos: "v.",    def: "锚定；固定" },
      "typhoon":    { pos: "n.",    def: "台风" },
      "cyclone":    { pos: "n.",    def: "气旋；飓风" },
      "elevational": { pos: "adj.", def: "高程的" },
      "retractable": { pos: "adj.", def: "可收回的" },
      "substation": { pos: "n.",   def: "变电站" },
      "microgrid":  { pos: "n.",    def: "微电网" },
      "blackout":   { pos: "n.",   def: "停电" },
      "deductible": { pos: "n.",    def: "免赔额" },
      "rehearse":   { pos: "v.",    def: "排练；演练" }
    }
  },

  { id: "a50", lv: 3, lvName: "高", topic: "港航·智慧港口",
    title: "The Port as a Data Hub",
    titleZh: "数据枢纽——智慧港口的神经系统",
    paras: [
      "A modern terminal generates data the way it generates dust: constantly, everywhere, and mostly wasted. Every crane logs its own moves; every truck announces itself at the gate; every container carries a radio tag; every pilot, tug and berth exchange schedules over radio that a voice-recognition system can now transcribe. The ports winning this decade are the ones that stopped sweeping this data into archives and started treating it as infrastructure.",
      "The foundational layer is the digital twin: a live, physical-and-data replica of the terminal in which every container, vehicle and machine has a mirrored position. Planners test tomorrow's vessel call on the twin tonight — which yard blocks overflow, where reshuffles will be needed, how many drivers to roster at 3 a.m. — and the real terminal executes a plan that has already been debugged.",
      "Above the twin sits prediction. Machine-learning models, fed on years of arrival histories, now forecast berth congestion days out, allowing shipping lines to slow-steam on purpose rather than anchor in line. Gate systems predict truck bunching by hour and warn hauliers before the queue forms. Crane maintenance has become probabilistic: vibration signatures, motor currents and cycle-time drift flag a gearbox weeks before it fails, and the part arrives before the breakdown does.",
      "The institutional innovation matters more than the algorithms. Ports are naturally multi-owner systems — terminal operators, lines, customs, rail companies, trucking firms — and each historically shared as little as legally possible. The breakthrough arrangements are data alliances with rules: neutral platforms where a shipping line's schedule intentions and a terminal's yard forecast combine, with commercial confidentiality enforced by design rather than handshake.",
      "China's automated terminals offer the most complete preview. At Yangshan's fourth phase, no human drives a vehicle or positions a container; straddle carriers and IGVs swarm under central orchestration, cranes are remote-operated from office buildings, and the terminal's throughput per meter of quay ranks among the world's best while running dark and crewless in rain that would stop a manual operation. Rotterdam's delta labs, Singapore's next-gen programs and Long Beach's data alliances each approach the same destination from different engineering cultures.",
      "The constraint is no longer technical. Cameras see; models predict; twins rehearse. What remains scarce is the organizational courage to let a system act on its own forecasts — to reschedule labor on a prediction, to refuse a berth plan because the twin says it will gridlock. The ports that master that last step will run the trade of the next half-century; the rest will own very good archives."
    ],
    gloss: {
      "terminal":  { pos: "n.",    def: "码头（集装箱）" },
      "replica":   { pos: "n.",    def: "复制品；孪生体" },
      "mirror":    { pos: "v.",    def: "镜像；反映" },
      "roster":    { pos: "v./n.", def: "排班；名册" },
      "debugged":  { pos: "v.",    def: "调试完毕的" },
      "congestion": { pos: "n.",   def: "拥堵" },
      "slow-steam": { pos: "v.",   def: "降速航行" },
      "bunching":  { pos: "n.",    def: "（车辆）扎堆到达" },
      "haulier":   { pos: "n.",    def: "卡车承运人" },
      "probabilistic": { pos: "adj.", def: "概率性的" },
      "signature": { pos: "n.",    def: "（振动）特征谱；签名" },
      "gearbox":   { pos: "n.",    def: "齿轮箱" },
      "confidentiality": { pos: "n.", def: "保密性" },
      "orchestration": { pos: "n.", def: "集中调度；编排" },
      "straddle":  { pos: "n.",    def: "跨运车（straddle carrier）" },
      "crewless":  { pos: "adj.",  def: "无人（操作）的" },
      "gridlock":  { pos: "n.",    def: "僵局；彻底拥堵" }
    }
  },

  /* ================ 港机设备领域（15 篇：a51-a65） ================ */

  { id: "a51", lv: 1, lvName: "低", topic: "港机·岸桥",
    title: "Meet the Quay Crane",
    titleZh: "认识岸桥",
    paras: [
      "The biggest machine at a container port stands right at the water's edge. It is the quay crane, and it looks like a giant steel horse drinking from the sea. Its long boom reaches out over the ship. Its two legs stand on rails along the quay wall. Whole trains of containers could pass between them.",
      "The crane driver sits in a small cabin high above the deck. From there, the containers below look like toys. The driver moves a joystick, and a heavy steel frame travels out along the boom. This frame is called the trolley. It carries the lifting frame down to the ship, picks up a container, and brings it back to the land side.",
      "A quay crane can lift a forty-ton box as easily as you lift a school bag. But the driver must be exact. The container must land in its place on the truck or the ship, between two stacks, with only a few centimeters of space on each side. One wrong move, and steel bends or people get hurt. So drivers train for months before they work alone.",
      "When a big ship finishes, the crane does not rest. It moves along the quay on its rails, like a slow walker, to serve the next vessel. At night, lamps on the boom turn the ship's deck into daylight. In a storm, the boom is lifted up and locked, so the wind cannot push the giant machine over.",
      "Next time you see a photo of a port, look for the tallest machines by the water. They stand there day and night, lifting the world's boxes, one by one, millions of times a year."
    ],
    gloss: {
      "quay":      { pos: "n.",    def: "码头岸壁" },
      "boom":      { pos: "n.",    def: "（起重机）臂架" },
      "rail":      { pos: "n.",    def: "钢轨；轨道" },
      "cabin":     { pos: "n.",    def: "驾驶室；小屋" },
      "trolley":   { pos: "n.",    def: "（起重机）载重小车" },
      "joystick":  { pos: "n.",    def: "操纵杆" },
      "frame":     { pos: "n.",    def: "框架" },
      "exact":     { pos: "adj.",  def: "精确的" },
      "centimeter": { pos: "n.",   def: "厘米" },
      "train":     { pos: "n.",    def: "一排；列车" },
      "storm":     { pos: "n.",    def: "暴风雨" },
      "lock":      { pos: "v.",    def: "锁住；锁定" },
      "lamp":      { pos: "n.",    def: "灯" },
      "vessel":    { pos: "n.",    def: "船舶" }
    }
  },

  { id: "a52", lv: 1, lvName: "低", topic: "港机·场桥",
    title: "The Cranes Behind the Wall",
    titleZh: "堆场里的起重机",
    paras: [
      "Behind the busy quay, the port has a second world: the yard. Thousands of containers wait there in tall rows. To stack them, the port uses yard cranes. The most common one has a funny name — the rubber-tired gantry crane, or RTG.",
      "The RTG looks like a big steel door. Two long beams stand on four legs, and the legs end in rubber wheels instead of rails. The wheels let the crane drive anywhere in the yard. It can even turn its wheels sideways and travel in a new row, like a crab walking across the sand.",
      "The operator sits in a cabin on one side. Below the crane, a truck stops with a container. The crane's spreader comes down, locks onto the four corners of the box, and lifts it up. Then the crane carries the box over its own legs and sets it down in the stacks — one, two, three, even seven boxes high.",
      "An RTG driver needs a strong memory. In a yard with thousands of look-alike boxes, the driver must remember which box goes where. Modern cranes help with screens and computers, but the eyes and hands still do the real work.",
      "Some ports use a cousin of the RTG that runs on steel rails instead of rubber wheels. It cannot travel freely, but it needs no driver on board. It can be controlled from a far-away office, or even work alone, guided by computers. Both machines, wheel or rail, are the quiet giants that keep the yard in order."
    ],
    gloss: {
      "yard":      { pos: "n.",    def: "堆场" },
      "rubber":    { pos: "n.",    def: "橡胶" },
      "gantry":    { pos: "n.",    def: "门式起重机" },
      "beam":      { pos: "n.",    def: "横梁" },
      "wheel":     { pos: "n.",    def: "车轮" },
      "spreader":  { pos: "n.",    def: "（集装箱）吊具" },
      "corner":    { pos: "n.",    def: "角；角落" },
      "lock":      { pos: "v.",    def: "锁住；旋锁" },
      "stack":     { pos: "n./v.", def: "堆码；垛" },
      "operator":  { pos: "n.",    def: "操作员" },
      "memory":    { pos: "n.",    def: "记忆" },
      "guide":     { pos: "v.",    def: "引导；指导" },
      "cousin":    { pos: "n.",    def: "同类物；表亲" },
      "crab":      { pos: "n.",    def: "螃蟹" }
    }
  },

  { id: "a53", lv: 1, lvName: "低", topic: "港机·吊具",
    title: "The Smart Metal Hand",
    titleZh: "聪明的铁手——吊具",
    paras: [
      "A crane is strong, but strength is not enough. To lift a steel box that weighs as much as ten cars, the crane needs a hand. In the port, this hand is called the spreader. It is the metal frame that grips the container and holds it tight in the air.",
      "At each corner of a container, there is a small metal hole called a twist-lock pocket. The spreader has four cones that drop into these holes. Then the cones twist, like small keys in locks. Now the box and the spreader are one piece, and the crane can lift with full power.",
      "Containers come in two common sizes: twenty feet and forty feet. A good spreader can change its own length. It stretches from twenty to forty feet in seconds, with the driver watching a green light that says \"ready\". Some spreaders can even hold two small boxes side by side, one in each hand.",
      "The spreader is full of sensors. It knows when it is level, when the locks have turned, and when the box is sitting safely down. If one corner fails to lock, the spreader refuses to lift. This rule has saved many lives, because a box that falls from thirty meters can break a ship like a cookie.",
      "The next time you watch a crane at work, do not look at the tall steel. Look at the small frame hanging at the end of the ropes. That busy little hand, locking and unlocking all day, is the true heart of the machine."
    ],
    gloss: {
      "spreader":  { pos: "n.",    def: "（集装箱）吊具" },
      "grip":      { pos: "v.",    def: "抓紧；夹住" },
      "tight":     { pos: "adv.",  def: "紧紧地" },
      "corner":    { pos: "n.",    def: "角" },
      "twist":     { pos: "v.",    def: "扭转" },
      "cone":      { pos: "n.",    def: "锥形锁头" },
      "drop":      { pos: "v.",    def: "落入；掉下" },
      "key":       { pos: "n.",    def: "钥匙" },
      "stretch":   { pos: "v.",    def: "伸展" },
      "sensor":    { pos: "n.",    def: "传感器" },
      "level":     { pos: "adj.",  def: "水平的" },
      "refuse":    { pos: "v.",    def: "拒绝" },
      "meter":     { pos: "n.",    def: "米" },
      "cookie":    { pos: "n.",    def: "饼干" }
    }
  },

  { id: "a54", lv: 1, lvName: "低", topic: "港机·钢丝绳",
    title: "The Ropes That Never Rest",
    titleZh: "永不停歇的绳——钢丝绳",
    paras: [
      "Steel looks hard and dead, but in a crane it lives. The ropes that lift containers are made of many thin steel wires, twisted together like a braid of hair. Each rope has a soft heart of fiber, and around it, strand after strand of wire. This design makes the rope strong and a little flexible, like a muscle.",
      "A quay crane uses several of these ropes. The hoist ropes lift the load up and down. The gantry ropes move the trolley along the boom. Every rope runs over wheels called sheaves, bends into drums, and winds itself up like thread on a spool. When the crane works, the ropes sing a low, steady song.",
      "But steel gets tired. Each bend, each lift, each shock makes tiny cracks inside the wires. After months of work, single wires begin to break. Engineers call this \"fatigue\", and they take it very seriously. An old rope with too many broken wires must be cut off and replaced, even if it still looks strong outside.",
      "Every port has a rope doctor: the inspector. With gloves and a lamp, the inspector walks the rope inch by inch, counting broken wires and measuring how thin the rope has become. Some ports now use small machines that test the rope with magnetic fields and find the hidden damage inside.",
      "A rope costs a few thousand dollars. A falling container costs millions. That is why the oldest rule in the crane book is also the shortest: when in doubt, change the rope. The strong song of the wires must never turn into a sudden, silent snap."
    ],
    gloss: {
      "wire":      { pos: "n.",    def: "钢丝；电线" },
      "twist":     { pos: "v.",    def: "捻制；扭转" },
      "braid":     { pos: "n.",    def: "辫子；编织" },
      "strand":    { pos: "n.",    def: "股（绳股）" },
      "fiber":     { pos: "n.",    def: "纤维" },
      "flexible":  { pos: "adj.",  def: "柔韧的；灵活的" },
      "muscle":    { pos: "n.",    def: "肌肉" },
      "hoist":     { pos: "n./v.", def: "起升（机构）" },
      "sheave":    { pos: "n.",    def: "滑轮（绳轮）" },
      "drum":      { pos: "n.",    def: "（绞车）卷筒" },
      "spool":     { pos: "n.",    def: "线轴" },
      "fatigue":   { pos: "n.",    def: "疲劳" },
      "inspector": { pos: "n.",    def: "检查员" },
      "glove":     { pos: "n.",    def: "手套" },
      "snap":      { pos: "n.",    def: "断裂；啪声" }
    }
  },

  { id: "a55", lv: 1, lvName: "低", topic: "港机·水平运输",
    title: "The Working Horses of the Yard",
    titleZh: "堆场里的驮马——集卡与运输车",
    paras: [
      "Between the ship and the stacks, someone must carry the containers. This is the job of the yard trucks. At many ports, normal road trucks drive in at the gate, pick up a box under the quay crane, and pull it to a place in the yard. All day, they run back and forth in short, steady circles.",
      "Driving a terminal truck is not like driving on the road. The lanes are narrow, and everywhere around you are big cranes, steel stacks, and busy workers in orange vests. The driver must stop at the right mark, exactly under the spreader, then wait. The crane does the lifting; the truck does the waiting and the driving.",
      "Some ports use special trucks that never leave the terminal. They have no cabin at all — just a flat bed on strong wheels, like a steel sled with an engine. Newer ones drive themselves, following lines on the ground or following a map inside their computer brains. People call them AGVs, automatic guided vehicles.",
      "The newest kind looks like a four-legged metal table on wheels. It slides its legs over a container, lifts the box from the ground, and carries it away, straddling it like a spider over its prey. These straddle carriers can pick up their own containers, with no crane to help.",
      "Whatever shape they take, these machines are the blood flow of the port. A ship is served in hours, not days, because hundreds of boxes are always on the move under the cranes and between the stacks. The horses of steel never tire, but they still need drivers, fuel, and clean, wide lanes to run in."
    ],
    gloss: {
      "stack":     { pos: "n.",    def: "（集装箱）垛" },
      "circle":    { pos: "n.",    def: "循环；圈" },
      "lane":      { pos: "n.",    def: "车道；巷道" },
      "vest":      { pos: "n.",    def: "背心；马甲" },
      "mark":      { pos: "n.",    def: "标记；记号" },
      "flat":      { pos: "adj.",  def: "平坦的" },
      "bed":       { pos: "n.",    def: "（车）底盘；床" },
      "sled":      { pos: "n.",    def: "雪橇" },
      "guided":    { pos: "adj.",  def: "引导的" },
      "leg":       { pos: "n.",    def: "腿；支柱" },
      "slide":     { pos: "v.",    def: "滑动" },
      "straddle":  { pos: "v./n.", def: "跨骑；跨运车" },
      "spider":    { pos: "n.",    def: "蜘蛛" },
      "prey":      { pos: "n.",    def: "猎物" },
      "tire":      { pos: "v.",    def: "疲倦" }
    }
  },

  { id: "a56", lv: 2, lvName: "中", topic: "港机·远程操控",
    title: "Crane Drivers Who Work from an Office",
    titleZh: "坐在办公室里的吊机司机",
    paras: [
      "For half a century, the crane driver's office was a glass box sixty meters above the quay — hot in summer, cold in winter, reached by a climb of stairs in the wind. The view was magnificent. The toilet was four floors of ladder away. Today, in a growing number of terminals, the same driver sits in an air-conditioned building beside the yard, watching forty screens instead of one window.",
      "Remote operation replaces presence with bandwidth. High resolution cameras cover the spreader, the twist locks, the truck below and the ship's bay above; some systems add laser guides that draw the container's landing place in colored lines. The driver's joystick commands travel by fiber to the real machine, and the machine's every shudder returns as force feedback through the seat.",
      "The difficult part is not the eyes but the balance. A crane driver's core skill is feeling the swing of the load and damping it with small, anticipatory moves of the trolley. Early remote stations lost that feel, and productivity fell by half. The solutions came from two directions: better haptics that recreate the pendulum in the seat and steering wheel, and anti-sway software that lets the driver command the container's destination while the crane kills the swing itself.",
      "One operator can then supervise several cranes. Routine moves — landing on a marked truck, stacking in a known row — run automatically; the driver intervenes for the exceptions, a damaged corner casting, a shifted truck, an oddly trimmed ship. Terminals report that a remote driver comfortably handles two to four machines, and the job posting quietly changes from \"crane operator\" to \"terminal supervisor with a joystick\".",
      "The human gains are the real argument. No more climbs in storm weather; no more vibration injuries from the cabin's constant tremble; shifts that end with a walk to the parking lot instead of a descent by elevator and ladder. Terminals in dark, cold or typhoon-exposed ports find that remote seats fill faster with trainees, and that a skilled driver's career lasts twenty years longer.",
      "The office of a remote crane driver still overlooks the yard — through cameras, on screens, at the flicker rate of a good network. The magnificent view is gone. In its place is something rarer in heavy industry: a normal working day, with the world's containers still moving through the driver's hands."
    ],
    gloss: {
      "remote":    { pos: "adj.",  def: "远程的" },
      "bandwidth": { pos: "n.",    def: "带宽" },
      "resolution": { pos: "n.",   def: "分辨率" },
      "laser":     { pos: "n.",    def: "激光" },
      "fiber":     { pos: "n.",    def: "光纤；纤维" },
      "shudder":   { pos: "n.",    def: "颤动" },
      "feedback":  { pos: "n.",    def: "反馈" },
      "damping":   { pos: "n.",    def: "阻尼；减振" },
      "anticipatory": { pos: "adj.", def: "提前预判的" },
      "trolley":   { pos: "n.",    def: "载重小车" },
      "haptics":   { pos: "n.",    def: "触觉反馈技术" },
      "pendulum":  { pos: "n.",    def: "钟摆；摆" },
      "intervene": { pos: "v.",    def: "介入；干预" },
      "casting":   { pos: "n.",    def: "铸件（角件）" },
      "supervise": { pos: "v.",    def: "监督；照看" },
      "tremble":   { pos: "n./v.", def: "颤抖" }
    }
  },

  { id: "a57", lv: 2, lvName: "中", topic: "港机·维护",
    title: "Fix It Before It Breaks",
    titleZh: "坏之前修好它——港机预防性维护",
    paras: [
      "A quay crane that stops mid-vessel costs a terminal thousands of dollars an hour in delayed demurrage, rescheduled labor and furious shipping lines. A yard crane that seizes at midnight costs a quieter sum, paid in missed trains and overtime. Port machinery is therefore maintained like aircraft, not like cars: on schedule, by evidence, and with breakdown treated as a scandal rather than a surprise.",
      "The old discipline was preventive maintenance by calendar: grease every bearing at 500 hours, change every filter at 2,000, inspect every wire rope monthly. It works, and most of the world's ports still run on it. Its weakness is conservatism — parts are replaced long before their useful life ends, and labor is spent whether or not anything needs doing.",
      "The newer discipline goes by evidence. Sensors on gearboxes record vibration signatures; motor currents betray a struggling brake; cycle-time drift exposes a trolley drive that is losing its edge. Each machine builds a health file, and algorithms compare today's signature with its own history and its fleet-mates'. A crane is pulled from service when its data says so — often weeks before a human could feel the difference.",
      "The economics are studied to the dollar. A failed hoist gearbox on a quay crane can mean a quarter-million-euro repair, weeks of downtime and a salvage operation on the boom; the same gearbox, replaced on schedule, is a planned weekend. Terminal maintenance budgets are justified by avoided demurrage alone, before anyone counts the safety dividend of bolts that do not shear under a driver's cabin.",
      "The work itself remains gloriously physical. Ropes must still be walked by inspectors with lamps and gloves; structures still climbed by riggers with torque wrenches; booms are still inspected at height, from a lift basket at dawn. What changed is the queue: the maintenance planner's morning list is now ranked by predicted failure, and the climbing crew goes first to the machine whose numbers look worst.",
      "The endpoint of the trend is maintenance as a design feature. New cranes arrive with condition sensors factory-fitted, lubrication routed to centralized pumps, and inspection platforms built into the structure. The machine that reports its own health is no longer science fiction; it is the procurement baseline. In ports, the deepest compliment to an engineer has become silence — machinery that runs so predictably it never makes the news."
    ],
    gloss: {
      "demurrage": { pos: "n.",    def: "滞期费（延误赔偿）" },
      "machinery": { pos: "n.",    def: "机械（总称）" },
      "breakdown": { pos: "n.",    def: "故障；崩溃" },
      "preventive": { pos: "adj.", def: "预防性的" },
      "grease":    { pos: "v.",    def: "加润滑脂" },
      "filter":    { pos: "n.",    def: "过滤器；滤芯" },
      "conservatism": { pos: "n.", def: "保守" },
      "gearbox":   { pos: "n.",    def: "齿轮箱" },
      "signature": { pos: "n.",    def: "（振动）特征谱" },
      "brake":     { pos: "n.",    def: "制动器；刹车" },
      "drift":     { pos: "n.",    def: "漂移；渐变" },
      "dividend":  { pos: "n.",    def: "红利；回报" },
      "bolt":      { pos: "n.",    def: "螺栓" },
      "shear":     { pos: "v.",    def: "剪切；剪断" },
      "wrench":    { pos: "n.",    def: "扳手" },
      "procurement": { pos: "n.",  def: "采购" }
    }
  },

  { id: "a58", lv: 2, lvName: "中", topic: "港机·状态监测",
    title: "The Crane Learns to Complain",
    titleZh: "会抱怨的吊机——设备状态监测",
    paras: [
      "Machines fail loudly at the end and quietly at the beginning. A bearing that will seize next month announces itself today as a whisper: a temperature half a degree high, a vibration at a frequency only an instrument can hear, a lubricant carrying three hundred parts per million of iron instead of two hundred. Condition monitoring is the art of teaching a port to hear the whisper.",
      "Vibration is the richest language. Every rotating part — a gearbox mesh, a motor shaft, a sheave — vibrates at tones set by its geometry. A healthy bearing sings one spectrum; a bearing with a spalled raceway adds harmonics at precise, calculable frequencies. Analysts read these spectra like cardiograms, naming the failing component, often its exact race and sometimes its remaining weeks.",
      "Oil carries the evidence of contact. A sample from a gearbox is burned in a spectrometer and read for iron, copper and silicon — wear metals that name the parts rubbing together, and grit that names the seal that failed. Trended over months, the chemistry turns a mysterious gearbox into a documented one. Many terminals now fit inline particle counters that count metal fragments in the flow itself.",
      "The port-specific twist is duty. A crane is not a lathe running at constant speed; it accelerates, brakes, shocks and idles, between wind gusts and temperature swings that would invalidate a factory baseline. Port monitoring systems therefore learn each machine's own duty cycle and compare it only to its own history — a twin of itself in better days.",
      "What the data buys is scheduling power. A terminal can run a suspect crane gently through the current vessel, order the part overnight, and swap it in the idle window between ships — instead of losing the machine for a fortnight at the wrong moment, plus the demurrage of the vessel that waited. Prediction converts maintenance from an interruption into a plan.",
      "The frontier is listening to everything at once. Terminals are wiring strain gauges into boom welds, thermal cameras onto brake discs, and ammeters onto every drive; machine-learning models correlate the streams and flag the combinations that historically preceded failure. The crane has learned to complain — precisely, in numbers, and always in time to keep the ship working."
    ],
    gloss: {
      "bearing":   { pos: "n.",    def: "轴承" },
      "seize":     { pos: "v.",    def: "卡死；抱死" },
      "whisper":   { pos: "n.",    def: "低语；微兆" },
      "vibration": { pos: "n.",    def: "振动" },
      "frequency": { pos: "n.",    def: "频率" },
      "instrument": { pos: "n.",   def: "仪器" },
      "monitoring": { pos: "n.",   def: "监测" },
      "spectrum":  { pos: "n.",    def: "频谱" },
      "spall":     { pos: "v.",    def: "剥落（轴承滚道）" },
      "raceway":   { pos: "n.",    def: "轴承滚道" },
      "harmonic":  { pos: "n.",    def: "谐波" },
      "cardiogram": { pos: "n.",   def: "心电图" },
      "lubricant": { pos: "n.",    def: "润滑剂" },
      "spectrometer": { pos: "n.", def: "光谱仪" },
      "silicon":   { pos: "n.",    def: "硅" },
      "grit":      { pos: "n.",    def: "砂粒；碎屑" },
      "seal":      { pos: "n.",    def: "密封件" },
      "duty":      { pos: "n.",    def: "（载荷）工况" },
      "ammeter":   { pos: "n.",    def: "电流表" }
    }
  },

  { id: "a59", lv: 2, lvName: "中", topic: "港机·传动",
    title: "Why Big Motors Whisper Now",
    titleZh: "大电机为何学会了耳语——变频驱动",
    paras: [
      "An old crane motor had two voices: full roar and silence. It started with a surge that dimmed the terminal's lights, slammed gears through their mesh, and torqued the structure like a hammer. Then came the variable frequency drive, and crane motors learned to whisper — starting soft, holding any speed, stopping without a shudder.",
      "The principle is elegant. An alternating current motor's speed follows the frequency of its supply; change the frequency, and the motor turns slower or faster at the command of power electronics. The drive rectifies the grid to direct current, then rebuilds it as three-phase current at whatever frequency the job requires. A hoist can inch a forty-ton box at a centimeter per second, or run flat out, with the same hardware.",
      "The mechanical dividends cascade. Soft starts remove the shocks that cracked gearboxes and snapped wire ropes; precise low speed lets drivers land containers without the bounce; braking energy, instead of burning in resistors, flows back into the terminal grid as regenerated power. A quay crane doing a ship can return a meaningful share of its consumption to the network each hour, simply by descending with loads.",
      "The electrical dividends are quieter but larger. A drive draws current proportional to work actually done, not to a motor's nameplate appetite; terminals that converted fleets of cranes from resistance control to drives cut their demand charges decisively. Power factors improve; the flicker complaints from neighboring buildings stop; the substation headroom freed up can power a new berth without new transformers.",
      "The cost is electronic fragility. Drives are sensitive to grid disturbances, harmonics and salt-laden cooling air; they demand filtered ventilation, conditioned rooms and spares-literate electricians. A terminal learns to treat its drives as instruments — and to keep one crane on old-fashioned contactors as a backup that can always stomp, badly, in an emergency.",
      "The direction of travel is still toward softness. Drives now network into crane management systems, reporting torque, temperature and fault history to the maintenance planner; the newest hoists pair them with energy buffers so that peak draws flatten into whispers. The loudest thing about a modern crane, visitors increasingly notice, is the steel containers themselves — the machinery beneath them has learned manners."
    ],
    gloss: {
      "surge":     { pos: "n.",    def: "浪涌；骤增" },
      "torque":    { pos: "n./v.", def: "扭矩；扭" },
      "frequency": { pos: "n.",    def: "频率" },
      "alternating": { pos: "adj.", def: "交流的；交变的" },
      "rectify":   { pos: "v.",    def: "整流；纠正" },
      "inch":      { pos: "v.",    def: "缓慢挪动" },
      "mesh":      { pos: "n.",    def: "齿轮啮合" },
      "regenerate": { pos: "v.",   def: "（能量）回馈" },
      "consumption": { pos: "n.",  def: "消耗（量）" },
      "resistor":  { pos: "n.",    def: "电阻器" },
      "nameplate": { pos: "n.",    def: "铭牌" },
      "flicker":   { pos: "n.",    def: "（灯光）闪变" },
      "headroom":  { pos: "n.",    def: "余量；裕度" },
      "substation": { pos: "n.",   def: "变电站" },
      "harmonic":  { pos: "n.",    def: "谐波" },
      "contactors": { pos: "n.",   def: "接触器" },
      "buffer":    { pos: "n.",    def: "缓冲器；储能" }
    }
  },

  { id: "a60", lv: 2, lvName: "中", topic: "港机·选型",
    title: "Rubber Tires or Steel Rails",
    titleZh: "轮胎还是钢轨——场桥选型之争",
    paras: [
      "Every growing container yard eventually faces the same fork in the road: cranes on rubber tires that roam freely, or cranes on steel rails that follow fixed lines. The industry calls them RTG and RMG, and the choice quietly shapes the terminal for the next thirty years — its labor, its density, its automation path and its electricity bill.",
      "The rubber-tired gantry is the industry's flexible friend. It steers between stack rows, rotates to travel lanes, and redeploys wherever the cargo concentrates; a yard of RTGs can be reconfigured over a weekend. It runs on diesel or, increasingly, on hybrid drives with cable reels — but its wheels sink into soft ground, its wheel loads punish the pavement, and every driver needs a cabin, a chair and a shift.",
      "The rail-mounted gantry is the opposite temperament. Its wheels run on precisely laid rails; its position is always known and its geometry never changes; it can stack one container row higher and span six or eight wide across a block. Freed of steering and driver, it electrifies from a busbar, works in wind that stops an RTG fleet, and connects naturally to automated horizontal transport. Its demands are upfront: rail foundations must be laid to millimeter tolerance, and a block's layout is thereafter fixed.",
      "Density is where RMG usually wins. Because the crane spans whole blocks, trucks and AGVs drive through the middle without fighting the crane for space; stacking heights of one-over-five or higher become routine; the same footprint stores decisively more boxes. RTG yards, where trucks share lanes with crane legs, trade that density for flexibility — a trade many terminals with variable cargo flows still happily make.",
      "The automation era has tilted the scales. An RMG is a fixed-geometry machine, which is exactly what a control system wants: every position is an address, every move is a repeatable recipe. Remote-controlled and fully automatic RMG blocks now run with one operator supervising four to six cranes; automating an RTG's free-roaming steering remains an engineering exercise that few terminals have justified at scale.",
      "The practical answer, at large ports, is both: rubber-tired flexibility in the outer yard where flows are irregular, rail-mounted automation in the high-volume core blocks where trains and vessels repeat. The fork in the road, looked at closely, is not a single choice — it is a map of where a terminal's cargo is steady enough to deserve rails."
    ],
    gloss: {
      "gantry":    { pos: "n.",    def: "门式起重机" },
      "roam":      { pos: "v.",    def: "漫游；自由移动" },
      "redeploy":  { pos: "v.",    def: "重新部署" },
      "hybrid":    { pos: "adj.",  def: "混合动力的" },
      "reel":      { pos: "n.",    def: "（电缆）卷筒" },
      "pavement":  { pos: "n.",    def: "铺面；堆场面层" },
      "temperament": { pos: "n.",  def: "气质；脾性" },
      "busbar":    { pos: "n.",    def: "（滑触）母线" },
      "tolerance": { pos: "n.",    def: "（安装）公差" },
      "density":   { pos: "n.",    def: "密度（堆存密度）" },
      "span":      { pos: "v.",    def: "跨（越）" },
      "block":     { pos: "n.",    def: "（堆场）箱区" },
      "footprint": { pos: "n.",    def: "占地（面积）" },
      "geometry":  { pos: "n.",    def: "几何；结构" },
      "recipe":    { pos: "n.",    def: "配方；固定程序" },
      "irregular": { pos: "adj.",  def: "不规则的" }
    }
  },

  { id: "a61", lv: 3, lvName: "高", topic: "港机·钢结构",
    title: "The Enemy Inside the Steel",
    titleZh: "钢铁内部的敌人——港机结构疲劳",
    paras: [
      "A quay crane's structure is designed against a logic that never quite matches its life. The drawings assume loads that repeat in tidy, counted cycles — a hoist, a trolley traverse, a gantry travel, a wind below the operating limit. Reality improvises: ships trim oddly, containers slam down hard, gusts slam the boom sideways, and a quarter-century of these improvisations writes itself into the welds as invisible arithmetic. Engineers call the sum of that arithmetic fatigue, and it is the quiet principal cause of port crane structure failures.",
      "The mechanism is democratic in its cruelty. Each cycle of stress concentrates at the places geometry chose not to smooth: the toe of a weld, a hole in a plate, the corner where a diaphragm meets a boom chord. Microscopic slip develops into a crack the width of a hair; the crack advances a sliver per day, indifferent to the calendar of inspections; and one ordinary lift — well within the rated load — opens it across the member. The structure that failed was never overloaded. It was simply tired in one small place.",
      "The industry's answer is a two-layer defense. The first layer is detail engineering: welds ground to smooth transitions, no attachment welded in the wrong direction to the stress flow, high tensile bolts where fatigue-critical joints must be made on site. Modern crane specifications now grade welds by consequence — the boom-to-pylon connection is designed, inspected and documented as if it were a pressure vessel.",
      "The second layer is surveillance of the invisible. Magnetic-particle and ultrasonic examination walk the critical welds on fixed schedules; strain gauges, glued permanently to suspect members, stream every cycle into a counting algorithm that consumes the structure's design life in real time. Some terminals now fit crack-detection fiber along the welds themselves — a hairline opening breaks the light path and alarms before a human eye could ever see it.",
      "The economics discipline the engineering. A boom weld repair means weeks of outage, scaffolding aloft and welding procedures qualified for high-tension steel in sea air; a full boom rebuild can cost a third of a new crane. Fatigue management is therefore portfolio work: measure the cycles, retire or reinforce the worst details early, and budget the end of the machine's life before the machine decides it on its own.",
      "The deepest change is philosophical. Port engineers once equated strength with thickness; the fatigue era teaches that geometry and continuity govern longevity — that a structure's life is spent at its details, one small slip at a time. The cranes that age gracefully are the ones whose smallest corners were designed by someone who understood this: that the enemy inside the steel is patient, and that only counting beats it."
    ],
    gloss: {
      "fatigue":   { pos: "n.",    def: "疲劳（金属）" },
      "improvise": { pos: "v.",    def: "即兴；临时应变" },
      "weld":      { pos: "n.",    def: "焊缝；焊接" },
      "cycle":     { pos: "n.",    def: "（应力）循环" },
      "stress":    { pos: "n.",    def: "应力" },
      "diaphragm": { pos: "n.",    def: "横隔板" },
      "chord":     { pos: "n.",    def: "弦杆（主桁构件）" },
      "hairline":  { pos: "n.",    def: "发丝般的细缝" },
      "sliver":    { pos: "n.",    def: "细片；一丝" },
      "indifferent": { pos: "adj.", def: "无动于衷的" },
      "rated":     { pos: "adj.",  def: "额定的" },
      "member":    { pos: "n.",    def: "（结构）构件" },
      "transition": { pos: "n.",   def: "过渡（段）" },
      "attachment": { pos: "n.",   def: "附件；附加件" },
      "tensile":   { pos: "adj.",  def: "抗拉的" },
      "ultrasonic": { pos: "adj.", def: "超声（检测）的" },
      "gauge":     { pos: "n.",    def: "（应变）片；计量仪" },
      "scaffolding": { pos: "n.",  def: "脚手架" },
      "outage":    { pos: "n.",    def: "停机（期）" },
      "longevity": { pos: "n.",    def: "寿命；持久性" }
    }
  },

  { id: "a62", lv: 3, lvName: "高", topic: "港机·自动化码头",
    title: "The Terminal That Drives Itself",
    titleZh: "自己会开车的码头——全自动化集装箱码头",
    paras: [
      "Visit a fully automated container terminal at two in the morning and the impression is not robotic but biological: dozens of unmanned vehicles swarm between the stacks in choreographed lanes, yard cranes pick and place without a soul aboard, and the quay cranes move to the rhythm of a plan that no foreman is shouting. The terminal is awake, thinking, and entirely indifferent to darkness, rain or the hour of the shift.",
      "The horizontal fleet is the signature choice. Automated guided vehicles follow magnetic grids or transponder maps to fixed interchange points; intelligent guided vehicles add free-path navigation with laser obstacle detection and battery-swap stations where a depleted unit exchanges packs in minutes. The alternative school — battery AGVs with opportunity charging, or straddle carrier automation in the European style — differs in hardware but shares the principle: no driver, no cabin, no headlight needed, and a control system that knows every unit's position to the centimeter.",
      "The yard is where automation compounds. Rail-mounted gantries span each block, addressed by row-and-tier coordinates that never change; because positions are certain, cranes can stack higher and land faster than any human-eyes operation. The automation kernel optimizes the whole yard as one puzzle — reshuffling containers that will load early to accessible tiers, keeping export boxes near the berth side, and clearing a path for the next vessel before it arrives.",
      "The quay remains the human frontier. Ship-to-shore cranes still need remote operators for the final centimeters over a vessel that pitches and trims with the tide — though anti-sway, optical positioning and laser landing aids now let one driver supervise several cranes, intervening in bursts. The industry's sharpest debates are exactly here: how much of the quay can be trusted to software before reliability, rather than safety, becomes the binding constraint.",
      "The economics arrive obliquely. Labor cost per move falls, but the deeper gains are consistency and density — the same moves per hour at midnight as at noon, more containers per square meter of expensive waterfront, and error rates measured in anomalies per million rather than per shift. The costs are equally structural: civilization-grade software, redundancy in everything electrical, and terminals that must retrain planners, not recruit drivers.",
      "What the自动化 revolution has not removed is judgment. Humans moved up the stack: a handful of supervisors in a control tower watch exception queues — a jammed twist-lock, a misread container number, a vehicle that hesitated — and the quality of a terminal is now measured by how rarely they must touch anything. The terminal that drives itself is, in the end, a machine for making decisions boring."
    ],
    gloss: {
      "choreograph": { pos: "v.",  def: "编舞；编排调度" },
      "unmanned":   { pos: "adj.", def: "无人的" },
      "swarm":      { pos: "v.",   def: "蜂拥；群集" },
      "guided":    { pos: "adj.",  def: "（自动）引导的" },
      "transponder": { pos: "n.",  def: "应答器；信标" },
      "depleted":   { pos: "adj.", def: "耗尽的" },
      "battery":    { pos: "n.",   def: "电池" },
      "straddle":   { pos: "n.",   def: "跨运车" },
      "kernel":     { pos: "n.",   def: "（调度）内核" },
      "tier":       { pos: "n.",   def: "层（堆放层）" },
      "reshuffle":  { pos: "v.",   def: "倒箱；重新洗牌" },
      "pitch":      { pos: "v.",   def: "纵摇；颠簸" },
      "trim":       { pos: "v.",   def: "纵倾（调整）" },
      "obliquely":  { pos: "adv.", def: "间接地；倾斜地" },
      "consistency": { pos: "n.",  def: "一致性；稳定性" },
      "waterfront": { pos: "n.",   def: "滨水岸线" },
      "redundancy": { pos: "n.",   def: "冗余（备份）" },
      "exception":  { pos: "n.",   def: "异常；例外" },
      "anomaly":    { pos: "n.",   def: "异常（事件）" },
      "boring":     { pos: "adj.", def: "无聊的；平淡的" }
    }
  },

  { id: "a63", lv: 3, lvName: "高", topic: "港机·数字孪生",
    title: "A Spare Crane Made of Numbers",
    titleZh: "用数字造的备用吊机——港机数字孪生",
    paras: [
      "Every physical crane at a modern terminal is haunted by a twin made of numbers. It has the same mass, the same wire-rope stiffness, the same gearbox backlash and the same control-loop constants as the steel original, and it lives in a simulation that runs beside — and sometimes ahead of — reality. Engineers feed it the terminal's real duty cycles, and it experiences each vessel call in software: every lift, every gust, every braking event that the actual machine will face tomorrow.",
      "The twin's first job is to age. Fatigue accumulation at each critical weld is computed cycle by cycle on the simulated structure, using load histories that the real crane's sensors stream into the model. Where the drawing office once assumed a nominal hoist spectrum, the twin consumes the measured one — the double-picks, the hard landings, the storms with boom secured — and the structure's remaining life becomes a live number on the maintenance planner's dashboard rather than a paragraph in a fifteen-year-old report.",
      "Its second job is to rehearse change. Before a trolley-drive retrofit alters the machine's dynamics, the modified twin runs ten thousand simulated cycles: does the new control tuning excite boom sway at particular speeds; do the regenerated braking currents overload the bus; does the heavier spreader stress the rope terminations beyond margin? Failures that would cost weeks of outage on the quay cost an evening of compute in the model.",
      "Its third job is forensic. When the real crane behaves strangely — a hoist that shudders at high speed, a vibration that appears only with laden containers above thirty tonnes — the twin reproduces the symptom by hypothesis: inject a failing bearing stiffness here, a loosened counterweight bolt there, and see which story matches the measured spectrum. Diagnosis becomes differential testing against a machine that cannot be damaged.",
      "The frontier is closed-loop control between the twins. Terminals are beginning to run the yard twin and the machine twins in one federation, so that a predicted congestion pattern changes crane duty assignments before the queues form — and each container's route through tomorrow's operation is chosen partly by how tired each crane's structure is. The scheduler, in effect, has begun to consult the metallurgy.",
      "The discipline's skeptics are right about one thing: a twin is a hypothesis, and models drift. The craft lies in twin maintenance — recalibrating stiffnesses from measured natural frequencies, reconciling simulated cycle counts with actual — so that the ghost stays honest. But the direction is settled. The next generation of crane engineers will inherit two fleets: the steel one outside, and the one made of numbers, where the future is rehearsed before anyone welds a thing."
    ],
    gloss: {
      "twin":      { pos: "n.",    def: "孪生（体）" },
      "simulation": { pos: "n.",   def: "仿真；模拟" },
      "duty":      { pos: "n.",    def: "工况（载荷谱）" },
      "gust":      { pos: "n.",    def: "阵风" },
      "backlash":  { pos: "n.",    def: "（齿轮）背隙" },
      "nominal":   { pos: "adj.",  def: "名义上的；标称的" },
      "spectrum":  { pos: "n.",    def: "谱（载荷谱/频谱）" },
      "rehearse":  { pos: "v.",    def: "排练；预演" },
      "retrofit":  { pos: "n./v.", def: "改造（升级）" },
      "tuning":    { pos: "n.",    def: "（控制）整定" },
      "excite":    { pos: "v.",    def: "激励（振动）" },
      "sway":      { pos: "n.",    def: "摇摆" },
      "termination": { pos: "n.",  def: "（绳）端部固定" },
      "margin":    { pos: "n.",    def: "裕度；余量" },
      "forensic":  { pos: "adj.",  def: "鉴证式的；用于诊断的" },
      "hypothesis": { pos: "n.",   def: "假设" },
      "inject":    { pos: "v.",    def: "注入；施加" },
      "bearing":   { pos: "n.",    def: "轴承" },
      "counterweight": { pos: "n.", def: "配重" },
      "federation": { pos: "n.",   def: "联邦（多模型联合）" },
      "metallurgy": { pos: "n.",   def: "冶金（材料性能）" },
      "recalibrate": { pos: "v.", def: "重新标定；校准" },
      "honest":    { pos: "adj.",  def: "（数据）忠实可靠的" }
    }
  },

  { id: "a64", lv: 3, lvName: "高", topic: "港机·润滑",
    title: "The Thin Film That Carries Millions",
    titleZh: "托起百万吨的薄膜——港机润滑工程",
    paras: [
      "A container crane is a machine built to move forty tonnes in seconds, and almost every one of its moving survivals depends on a film of oil or grease a few micrometers thick. The wire ropes that hoist the load, the bearings that carry the boom's trolley, the girth gears that swing the crane: each survives because two steel surfaces never quite touch. Lubrication is the least glamorous engineering in a port and the most quietly decisive.",
      "The environment is lubrication's worst laboratory. Salt fog corrodes while it lubricates; monsoon rain washes grease from exposed sheaves; tropic heat thins oil toward water; arctic cold thickens it toward wax; and dust from bulk terminals nearby grinds itself into every open race. A port lubricant is thus a chemical compromise, chosen more for what it survives than what it does in a clean room.",
      "The economics of getting it wrong are studied to the bolt. A single sheave bearing seized by dried grease can destroy a hoist rope by sawing it against the groove — a failure chain priced at the rope, the sheave, the outage and the vessel's schedule. Girth gears on yard cranes, scuffed by lubrication breakdown, cost six figures to replace and are rarely stocked. Against these sums, the terminal's annual grease budget looks like a rounding error with a leverage ratio of a thousand.",
      "The engineering response has industrialized. Centralized lubrication pumps now meter grease through drilled channels to hundreds of points on a schedule, replacing the rigger with a grease gun and a clipboard; automatic rope lubricators bathe the strands in pass-through baths as the rope runs. Oil analysis programs turn each machine's lubricant into a wear-metal newspaper: rising iron names the gear, rising copper names the bearing, silicon names the seal that let the dust in.",
      "The newest chapter is frugality by design. Re-greasing intervals that once ran to fixed calendars are now set by condition — temperature, vibration signature, moisture in the lubricant — because over-greasing has its own failures: churn heating in packed bearings, grease bleeding onto brake discs, environmental discharge in rainwater. Ports under environmental permits now specify biodegradable base oils for every point that faces the harbor, and lubricant choice has become a compliance document.",
      "The discipline's veterans summarize it in one sentence: cranes do not wear out, their interfaces do. Somewhere in every major failure investigation there is a moment when someone asks what was between the two steels — and the honest terminal keeps records able to answer, to the gram and the day, what film was carrying the millions."
    ],
    gloss: {
      "grease":    { pos: "n.",    def: "润滑脂" },
      "micrometer": { pos: "n.",   def: "微米" },
      "hoist":     { pos: "n.",    def: "起升机构" },
      "bearing":   { pos: "n.",    def: "轴承" },
      "trolley":   { pos: "n.",    def: "载重小车" },
      "girth":     { pos: "n.",    def: "（回转）大齿圈" },
      "fog":       { pos: "n.",    def: "雾（盐雾）" },
      "monsoon":   { pos: "n.",    def: "雨季；季风" },
      "sheave":    { pos: "n.",    def: "滑轮" },
      "tropic":    { pos: "adj.",  def: "热带的" },
      "compromise": { pos: "n.",   def: "折中方案" },
      "seized":    { pos: "adj.",  def: "卡死的" },
      "saw":       { pos: "v.",    def: "锯磨（损伤）" },
      "groove":    { pos: "n.",    def: "绳槽" },
      "scuffed":   { pos: "adj.",  def: "胶合磨损的" },
      "clipboard": { pos: "n.",    def: "写字夹板" },
      "meter":     { pos: "v.",    def: "定量供给；计量" },
      "churn":     { pos: "v.",    def: "搅动（发热）" },
      "brake":     { pos: "n.",    def: "制动器" },
      "biodegradable": { pos: "adj.", def: "可生物降解的" },
      "frugality": { pos: "n.",    def: "节约；节制" },
      "interface": { pos: "n.",    def: "界面；结合面" }
    }
  },

  { id: "a65", lv: 3, lvName: "高", topic: "港机·防风安全",
    title: "When the Wind Speaks, Cranes Kneel",
    titleZh: "风起时，吊机下跪——港机防风安全",
    paras: [
      "Every veteran of a typhoon coast carries the same album of photographs: gantry cranes folded against each other like wounded animals, a boom twisted over a fallen machine, an RTG driven half a kilometer from its yard with its wheels melted to the rails. Wind is the port industry's apex predator — the only force that regularly destroys entire cranes — and the entire safety architecture of a terminal is, in one sense, a set of prayers against it.",
      "The physics is brutal and unintuitive. A crane's boom acts as a sail with tons of drag; the machine's own weight, which secures it against gravity, contributes nothing against a horizontal shove. Above a certain gust speed — often 20 to 25 meters per second for operation, higher for secured survival — the choice is binary: the crane must be anchored to the ground with positive, mechanical restraint, or it will move. History's disasters almost all reduce to an anchored machine that was not, or one anchored only by its brakes.",
      "The defensive system has three layers, and their order is law. First, anemometers on every crane and at tower height feed a warning cascade — operational limits falling, then non-operational limits, then a storm alarm that stops work entirely. Second, the securing drill: booms raised to their storm position and pinned, trolleys locked at designated storm stowage, slew brakes set, and — decisively — anchor bolts or twist-locks driven home at the rails so that the machine is tied to the earth, not merely to its own brakes.",
      "The third layer is planning the geometry of failure. Crane layout rules keep machines spaced so that one toppling cannot domino its neighbors; storm weeks see containers stacked lower near the quay to reduce the wind-wall that stacks themselves become; and at terminals where gusts funnel between hills or buildings, each crane position's wind microclimate is mapped and the worst positions are emptied first. Escape drills rehearse the minutes between alarm and anchoring, because the last machine secured in a rising wind is the one that catches the gust.",
      "The engineering frontier is making restraint automatic. Self-anchoring gantries drop storm pins by gravity when power fails; rail clamps grip mechanically, beyond anything a hydraulic system must maintain; and the newest machines interlock their own anemometer with movement, refusing to gantry-travel above survival thresholds even if ordered. The old discipline — a worker with a torch checking every bolt at each crane — is being encoded into hardware, which is where port safety has always matured.",
      "What has not changed is the humility at the center of the practice. Wind rules are written in the blood of machines, and every terminal that survives a typhoon begins the next day inspecting its anchors as if the storm had found them wanting. The cranes kneel — booms up, pins in, brakes set — not as ritual but as physics acknowledged. The wind decides nothing else in the port's day; but on this one subject, it holds the veto."
    ],
    gloss: {
      "typhoon":   { pos: "n.",    def: "台风" },
      "apex":      { pos: "n.",    def: "顶点；之最" },
      "predator":  { pos: "n.",    def: "捕食者" },
      "boom":      { pos: "n.",    def: "臂架" },
      "drag":      { pos: "n.",    def: "阻力；风阻" },
      "gust":      { pos: "n.",    def: "阵风" },
      "binary":    { pos: "adj.",  def: "二元的；非此即彼的" },
      "anchor":    { pos: "v./n.", def: "锚定；锚" },
      "restraint": { pos: "n.",    def: "约束；固定" },
      "anemometer": { pos: "n.",   def: "风速仪" },
      "cascade":   { pos: "n.",    def: "级联（报警层级）" },
      "drill":     { pos: "n.",    def: "演练；钻" },
      "pin":       { pos: "n.",    def: "销轴；插销" },
      "trolley":   { pos: "n.",    def: "载重小车" },
      "slew":      { pos: "n./v.", def: "回转" },
      "stowage":   { pos: "n.",    def: "安置位；堆放位" },
      "twist-lock": { pos: "n.",   def: "旋锁" },
      "domino":    { pos: "v.",    def: "多米诺式连锁倒下" },
      "microclimate": { pos: "n.", def: "小气候（局地风场）" },
      "interlock": { pos: "v.",    def: "联锁" },
      "funnel":    { pos: "v.",    def: "（风）灌入收窄处" },
      "veto":      { pos: "n.",    def: "否决权" }
    }
  },

  /* ================ 物流与贸易（10 篇：a66-a75） ================ */

  { id: "a66", lv: 1, lvName: "低", topic: "物流·报关",
    title: "The Paper Worker at the Gate",
    titleZh: "关口上的文件工人——报关员",
    paras: [
      "When a ship arrives, the boxes must pass a border before they can be sold. Food, machines, clothes, toys — every kind of goods needs papers. The person who prepares these papers is the customs broker. It is a desk job with the power to stop a whole truck.",
      "Customs is the office that checks goods crossing a country. It looks at three big questions: What is inside the boxes? How much are they worth? And are any rules broken? To answer, the broker fills long forms with numbers and codes. One code says \"this is a bicycle\"; another says \"this is a bicycle part\". A wrong code can mean a wrong tax or a long delay.",
      "The broker's tools are simple: a computer, a strong memory for rules, and a phone that never stops. Clients send lists of goods; the broker finds the right codes, calculates the tax, and sends everything to customs before the ship even lands. When the ship docks, the papers are ready, and the boxes can go straight to the shop.",
      "A good broker also watches for trouble. Some goods need special permits — plants, medicines, chemicals. Some goods cannot enter at all. If a client forgets to say that a box holds wooden chairs, and the wood lacks a health paper, the box will sit in a warehouse for weeks. The broker's job is to see these traps early.",
      "Next time you buy something from another country, remember the quiet worker behind it. The box crossed the sea in a ship, but it crossed the border in a form, filled by a person who knew the codes. Trade moves on paper as much as on water."
    ],
    gloss: {
      "goods":     { pos: "n.",    def: "货物；商品" },
      "customs":   { pos: "n.",    def: "海关" },
      "broker":    { pos: "n.",    def: "经纪人；（报关）代理" },
      "form":      { pos: "n.",    def: "表格" },
      "code":      { pos: "n.",    def: "编码；代码" },
      "tax":       { pos: "n.",    def: "税" },
      "delay":     { pos: "n.",    def: "延误" },
      "permit":    { pos: "n.",    def: "许可证" },
      "medicine":  { pos: "n.",    def: "药品；医学" },
      "chemical":  { pos: "n.",    def: "化学品" },
      "warehouse": { pos: "n.",    def: "仓库" },
      "trap":      { pos: "n.",    def: "陷阱；圈套" },
      "client":    { pos: "n.",    def: "客户" },
      "memory":    { pos: "n.",    def: "记忆" }
    }
  },

  { id: "a67", lv: 1, lvName: "低", topic: "物流·多式联运",
    title: "From the Ship to Your Shelf",
    titleZh: "从船到货架",
    paras: [
      "A toy begins its trip in a factory far away. It travels by truck to a river port, then by barge to the sea, then by ship across the ocean, then by train, and finally by a small van to a shop near your home. Five vehicles, one box, one price. This long relay race has a name: multimodal transport.",
      "\"Multi\" means many, and \"modal\" means ways of moving. Ships are cheap but slow. Trucks are fast but costly. Trains sit in the middle. Barges carry a lot and pollute little. A smart planner mixes them like ingredients: sea for the long part, rail or barge for the middle, truck only for the first and last kilometers.",
      "The hard part is the handover. Every time the box changes vehicle, someone must lift it, check it, and record it. Each handover is a chance for delay or loss. That is why containers are so useful: the box stays closed from door to door, and only the vehicle under it changes.",
      "For the last part of the trip, cities have a special problem. Shops are close together, streets are narrow, and everyone wants their goods in the morning. The industry calls this \"the last mile\", and it often costs more than the whole ocean crossing. Electric vans, cargo bicycles, and night deliveries are all attempts to win this short but expensive race.",
      "So when you pull a toy, a phone, or a pair of shoes from the shelf, think of the box's journey: five machines, many hands, and one quiet plan that moved it across the world without ever opening its doors."
    ],
    gloss: {
      "multimodal": { pos: "adj.", def: "多式联运的" },
      "barge":     { pos: "n.",    def: "驳船" },
      "relay":     { pos: "n.",    def: "接力；中继" },
      "handover":  { pos: "n.",    def: "交接" },
      "vehicle":   { pos: "n.",    def: "车辆；运输工具" },
      "ingredient": { pos: "n.",   def: "原料；成分" },
      "container": { pos: "n.",    def: "集装箱" },
      "delay":     { pos: "n.",    def: "延误" },
      "mile":      { pos: "n.",    def: "英里" },
      "van":       { pos: "n.",    def: "厢式货车" },
      "delivery":  { pos: "n.",    def: "投递；交付" },
      "journey":   { pos: "n.",    def: "旅程" },
      "shelf":     { pos: "n.",    def: "货架" }
    }
  },

  { id: "a68", lv: 1, lvName: "低", topic: "物流·仓储",
    title: "The Quiet Building That Never Stops",
    titleZh: "永不停歇的安静大楼——仓库",
    paras: [
      "Behind every shop, there is a quiet giant. It has no windows, high roofs, and long rows of steel shelves. This is the warehouse — the memory of the trade world. Goods rest here between the factory and the shop, waiting for the right day to move.",
      "A day in the warehouse starts early. Trucks arrive at the loading docks — big doors where vehicles back in. Workers scan each box with a small gun that reads barcodes. The computer says where the box must go: Shelf B, Row 7, Floor 3. A forklift — a small truck with two steel fingers — lifts the box and carries it into the tall shelves.",
      "The heart of the building is its computer. It knows every box, every shelf, and every order. When a shop asks for twenty radios and thirty lamps, the computer prints a list. Workers walk or drive along the rows, pick the goods, and pack them into new boxes. This dance — receive, store, pick, pack, send — repeats all day.",
      "Big warehouses now use robots. Small orange machines slide under shelves and carry them to the packers, like waiters carrying tables. Tall machines pick boxes from shelves five times higher than a person. People still do the thinking jobs: checking quality, solving problems, and packing gifts with care.",
      "A good warehouse is measured in small numbers: minutes to find a box, mistakes per thousand orders, boxes sent per hour. It looks calm from outside. Inside, it is a clockwork of machines, lists, and quiet hands — the hidden engine that keeps shops full every morning."
    ],
    gloss: {
      "warehouse": { pos: "n.",    def: "仓库" },
      "shelf":     { pos: "n.",    def: "货架" },
      "dock":      { pos: "n.",    def: "装卸位；月台" },
      "scan":      { pos: "v.",    def: "扫描" },
      "barcode":   { pos: "n.",    def: "条形码" },
      "forklift":  { pos: "n.",    def: "叉车" },
      "order":     { pos: "n.",    def: "订单；命令" },
      "pack":      { pos: "v.",    def: "打包；装箱" },
      "receive":   { pos: "v.",    def: "收货；接收" },
      "robot":     { pos: "n.",    def: "机器人" },
      "waiter":    { pos: "n.",    def: "服务员" },
      "clockwork": { pos: "n.",    def: "精密钟表装置" },
      "mistake":   { pos: "n.",    def: "错误" }
    }
  },

  { id: "a69", lv: 2, lvName: "中", topic: "物流·提单",
    title: "The Piece of Paper That Owns the Cargo",
    titleZh: "拥有货物的那张纸——提单",
    paras: [
      "A container of coffee leaves Santos for Rotterdam. Somewhere during the Atlantic crossing, the cargo is sold twice, pledged to a bank, and re-routed to a new buyer in Hamburg — all while the beans themselves sit untouched in a steel box at sea. The instrument that makes this possible is a document older than the steamship: the bill of lading, shipping's master document.",
      "The bill wears three hats at once, and each is legally distinct. It is a receipt, signed by the carrier, stating what was received aboard and in what apparent condition. It is evidence of the contract of carriage, setting out the terms on which the goods ride. And — uniquely — when issued \"to order\", it is a document of title: whoever legitimately holds the original paper holds the power to demand the cargo at destination.",
      "That third hat turns an administrative form into an instrument of trade finance. A bank financing the purchase takes the original bills as security, releasing them only against payment; the buyer needs the endorsed original to take delivery; the carrier must deliver against presentation of an original, to the right presenter, or answer in damages. The piece of paper, in effect, is the cargo's shadow self, and possession of paper is possession of goods.",
      "The system's weakness is its own sophistication. Original bills travel by courier while ships travel by schedule; on short routes, the vessel beats the paper to port, and cargo waits in detention while documents chase it. Fraud attacks the title function directly: a forged bill presented by a smooth stranger once emptied more than one hold in the industry's casebooks, which is why banks and carriers check signatures, sequences and authenticity with archival care.",
      "The digital answer has been decades in arriving, because the obstacle was never technology but law: thousands of jurisdictions recognized possession of a physical original, and no server. The breakthroughs are electronic bills resting on new statutes — platforms operating under rules that give an electronic record the same title effect as paper — now accepted by major carriers and banks on selected trades.",
      "For the learner of trade English, the bill of lading is the richest single document to study: clean versus claused, straight versus order, shipped versus received-for-shipment — each adjective quietly rewrites who may collect the cargo and on what terms. It remains what it has been for three centuries: the paper that owns the goods, printed three times, signed in ink, and honored like money."
    ],
    gloss: {
      "pledge":    { pos: "v.",    def: "质押；抵押" },
      "bill":      { pos: "n.",    def: "（bill of lading）提单" },
      "lading":    { pos: "n.",    def: "装载；载货" },
      "receipt":   { pos: "n.",    def: "收据" },
      "carrier":   { pos: "n.",    def: "承运人" },
      "carriage":  { pos: "n.",    def: "货物运输" },
      "title":     { pos: "n.",    def: "（货物）所有权" },
      "legitimately": { pos: "adv.", def: "合法地" },
      "endorse":   { pos: "v.",    def: "背书（转让）" },
      "delivery":  { pos: "n.",    def: "交付；提货" },
      "presentation": { pos: "n.", def: "提示（交单）" },
      "damages":   { pos: "n.",    def: "损害赔偿金" },
      "security":  { pos: "n.",    def: "担保品；安全" },
      "detention": { pos: "n.",    def: "滞留；扣留" },
      "courier":   { pos: "n.",    def: "快递员；信使" },
      "forged":    { pos: "adj.",  def: "伪造的" },
      "jurisdiction": { pos: "n.", def: "司法辖区" },
      "statute":   { pos: "n.",    def: "成文法" },
      "claused":   { pos: "adj.",  def: "有批注（不清洁）的" }
    }
  },

  { id: "a70", lv: 2, lvName: "中", topic: "物流·货运代理",
    title: "The Travel Agent for Cargo",
    titleZh: "货物的旅行代理人——货代",
    paras: [
      "A factory manager in Ningbo needs to move forty containers of machinery to a buyer in Poland. She has no ships, no rail contacts, no customs desk in Gdansk, and no time to build any. She makes one phone call instead — to a freight forwarder, the professional traveler of cargo, and the puzzle begins to solve itself.",
      "The forwarder's essence is brokerage plus orchestration. It buys transport in wholesale — vessel slots by the dozen, rail capacity by the block, trucking by the lane — and sells it in retail portions matched to each shipper's need. It compares routes the way a travel agent compares flights: direct versus transshipment, all-water versus rail-bridge, fast versus cheap, and books the combination that fits the cargo's calendar and budget.",
      "Execution is where the craft lives. The forwarder arranges the empty container to the factory, the export customs declaration, the loading, the ocean leg, the transshipment in Singapore or Piraeus, import clearance in Europe, the truck from Gdansk to the buyer's gate — and the insurance wrapping the whole journey. Each handover is tracked; each anomaly — a rolled container, a missed connection, a strike in a transit port — is met with a re-booking before the client has finished asking.",
      "The paperwork is the invisible half of the service. Commercial invoice, packing list, bill of lading, certificates of origin, dangerous-goods declarations: the forwarder assembles the document set that customs, banks and buyers will each examine. One mis-declared cargo description can strand a shipment for weeks — the forwarder's desk is where trade's typos go to be caught.",
      "The economics reward scale and nerve. A forwarder with volume negotiates rates a single shipper cannot approach; a forwarder with market intelligence warns clients before rate spikes or capacity crunches; and those who consolidate small lots into full containers create economy for shippers too small to fill one. In the digital era, booking platforms press the simple trades, and the forwarder's value concentrates in the complex: project cargo, dangerous goods, chartering, and the customs frontier.",
      "The relationship, when it works, is quietly permanent. Shippers change carriers yearly but keep their forwarder for decades, because what is being bought is not a slot on a ship but a professional vigilance — someone who thinks about a client's cargo at 3 a.m. in a transit time zone, so the client does not have to."
    ],
    gloss: {
      "forwarder": { pos: "n.",    def: "货运代理" },
      "brokerage": { pos: "n.",    def: "经纪业务" },
      "orchestration": { pos: "n.", def: "统筹编排" },
      "wholesale": { pos: "n./adj.", def: "批发（的）" },
      "retail":    { pos: "n./adj.", def: "零售（的）" },
      "slot":      { pos: "n.",    def: "舱位" },
      "transshipment": { pos: "n.", def: "中转；转运" },
      "declaration": { pos: "n.",  def: "报关单；申报" },
      "clearance": { pos: "n.",    def: "清关" },
      "insurance": { pos: "n.",    def: "保险" },
      "anomaly":   { pos: "n.",    def: "异常" },
      "rolled":    { pos: "adj.",  def: "被甩柜的（滚装到下一班）" },
      "consolidate": { pos: "v.",  def: "拼箱；整合" },
      "vigilance": { pos: "n.",    def: "警觉；不间断照看" },
      "lot":       { pos: "n.",    def: "（货）批" }
    }
  },

  { id: "a71", lv: 2, lvName: "中", topic: "物流·保税区",
    title: "The Warehouse Where Duty Sleeps",
    titleZh: "关税睡着的地方——保税区",
    paras: [
      "Inside a fenced compound beside a Chinese port stands a warehouse of peculiar legal character: goods from Japan, German machinery and Chilean wine rest here for months, yet in the eyes of the customs ledger they have arrived nowhere. Duty has not been paid, because duty has not yet fallen due. The compound is a bonded zone — a place where the border is drawn twice, once in space and once in time.",
      "The mechanism is clean in principle. Goods entering the zone are \"under customs supervision\": they may be stored, re-packed, sorted, graded, assembled, blended or combined with domestic components, all without import taxes being triggered. Taxable importation happens only when the goods leave the fence into the domestic market — and if they instead depart again by ship, they were never imports at all. For traders playing price cycles, the zone is a waiting room with fiscal suspension.",
      "The value-added version goes further. In a bonded processing arrangement, foreign components enter the zone, are transformed — assembled into machines, stitched into garments, baked into food — and the finished goods re-export, with duties waived on the foreign parts that physically crossed a border but commercially never landed. Asia's export manufacturing corridors grew around exactly this arrangement.",
      "Modern free-trade port areas stack further layers: cross-border e-commerce parcels clear here under simplified declarations; oil and grain are held in bonded tanks for trading houses; art and wine rest in bonded vaults while titles change hands and taxes wait. The zone becomes a stage on which goods act out their commercial lives — being sold, financed, blended, split — before their fiscal life begins.",
      "The administration is the invisible craft. Every pallet's legal status must be tracked to the shelf: which goods are bonded, which cleared, which re-exported. Inspectors audit the fence as much as the books. A zone that loses track of its goods loses the government's trust, and with it the entire premise — so the quiet discipline of inventory, in these compounds, approaches the rigor of a bank vault.",
      "For the English learner in trade, \"bonded\" is a word worth unpacking: a bond is a financial guarantee to customs, posted as security that supervised goods will not quietly vanish into the market. The warehouse, at bottom, is a promise with walls — the state agreeing to wait for its tax, and trade agreeing to stay visible while it waits."
    ],
    gloss: {
      "bonded":    { pos: "adj.",  def: "保税的" },
      "compound":  { pos: "n.",    def: "场区；大院" },
      "duty":      { pos: "n.",    def: "关税；义务" },
      "ledger":    { pos: "n.",    def: "账簿；台账" },
      "supervision": { pos: "n.",  def: "监管" },
      "assemble":  { pos: "v.",    def: "组装；装配" },
      "blend":     { pos: "v.",    def: "掺混；调和" },
      "taxable":   { pos: "adj.",  def: "应税的" },
      "importation": { pos: "n.",  def: "进口" },
      "fiscal":    { pos: "adj.",  def: "财政的" },
      "trigger":   { pos: "v.",    def: "触发" },
      "waive":     { pos: "v.",    def: "豁免；放弃" },
      "cross-border": { pos: "adj.", def: "跨境电商的；跨境的" },
      "vault":     { pos: "n.",    def: "保管库；拱顶" },
      "pallet":    { pos: "n.",    def: "托盘" },
      "audit":     { pos: "v.",    def: "审计；核查" },
      "inventory": { pos: "n.",    def: "库存；盘点" },
      "guarantee": { pos: "n.",    def: "担保；保证" }
    }
  },

  { id: "a72", lv: 2, lvName: "中", topic: "物流·中欧班列",
    title: "The Steel Camel Caravan",
    titleZh: "钢铁驼队——中欧班列",
    paras: [
      "From a rail yard in Chongqing or Xi'an, a freight train pulls out carrying fifty containers of laptops, electric cars and solar panels. Eleven to eighteen days later, it rolls into Duisburg or Madrid, having crossed one of the harshest geographies on Earth. It is the China-Europe Railway Express — the modern revival of the Silk Road, running on steel rails instead of camel hooves.",
      "The journey is a relay of gauges and paperwork. China's railways and Europe's use the standard gauge of 1,435 millimeters; Russia and Central Asia use the broad 1,520. At the border town of Khorgos and at Alashankou, containers are lifted from one train to another — cranes moving an entire cargo in hours — while customs officers on both sides process a single electronic manifest. Every crossing is a negotiation of rail, law and language.",
      "The economics sit in a deliberate gap. Sea freight from China to Europe takes 30 to 40 days and costs least; air freight takes days and costs a fortune. The train occupies the middle: roughly half the ocean transit time at several times the ocean price — cheap enough for machinery, autos, electronics and fashion, fast enough for products whose market value decays by the week.",
      "The route has grown from an experiment into an industry. Dozens of Chinese cities now operate scheduled services to European hubs; return trains that once ran half-empty now carry European machinery, cars, timber and food east. Governments subsidize the imbalance strategically, valuing the route as trade diversification — a land corridor that typhoons cannot close, canals cannot choke, and geopolitics can only reroute, never fully sever.",
      "The vocabulary of the corridor is its own education: block trains that run assembled end-to-end; bonded transit that moves goods across intermediate borders without repeated clearance; digital manifests and GPS-tracked containers that let a shipper in Wenzhou watch a laptop box cross the Kazakh steppe in real time. The trains carry more than cargo — they carry a demonstration that logistics maps are revisable.",
      "The steel camels have limits, of course — capacity measured in trains per day against ships' tens of thousands of boxes, and a dependence on the politics of every rail gauge along the way. But as insurance for supply chains that learned in recent years what a single blocked canal can do, the caravan now runs in both directions, on time, through weather that stops everything else."
    ],
    gloss: {
      "express":   { pos: "n.",    def: "快运班列；快车" },
      "revival":   { pos: "n.",    def: "复兴；复苏" },
      "gauge":     { pos: "n.",    def: "轨距" },
      "manifest":  { pos: "n.",    def: "（货物）舱单；载货清单" },
      "relay":     { pos: "n.",    def: "接力" },
      "transit":   { pos: "n.",    def: "过境运输" },
      "decay":     { pos: "v.",    def: "衰减；腐朽" },
      "hub":       { pos: "n.",    def: "枢纽" },
      "subsidize": { pos: "v.",    def: "补贴" },
      "diversification": { pos: "n.", def: "多元化" },
      "sever":     { pos: "v.",    def: "切断" },
      "block":     { pos: "n.",    def: "（铁路）整列直达班列；箱区" },
      "clearance": { pos: "n.",    def: "清关" },
      "steppe":    { pos: "n.",    def: "草原" },
      "revisable": { pos: "adj.",  def: "可修改的" },
      "reroute":   { pos: "v.",    def: "改道" }
    }
  },

  { id: "a73", lv: 3, lvName: "高", topic: "贸易·关税",
    title: "The Oldest Lever of Trade Policy",
    titleZh: "最古老的贸易政策杠杆——关税",
    paras: [
      "A tariff is the oldest and bluntest instrument in trade policy: a tax that customs officers levy at the border, priced as a percentage of value or a fixed charge per unit, collected by customs before goods may enter. For five centuries states have used it to raise revenue, protect infant industries, punish rivals and reward allies — usually all at once, and rarely with the precision its designers advertise.",
      "The protectionist arithmetic is seductive and incomplete. A duty on imported steel raises the domestic steel price, and the mill's orders, employment and shareholders all benefit visibly. Invisibly, every downstream industry — car makers, appliance plants, construction — now pays more for its inputs, employing fewer people than the tariff saved upstream. Studies of large-scale protection consistently find the downstream losses larger: tariffs move jobs between industries rather than creating them, while charging consumers a fee for the relocation.",
      "The modern tariff's most consequential feature is its legal scaffolding. Under the World Trade Organization's rules, members bound their tariffs at negotiated ceilings and agreed to settle disputes rather than retaliate unilaterally. That architecture made the decades after 1995 an era of predictable, low and declining duties — the quiet legal foundation of the container age, in which a shirt's journey across six borders could be costed years ahead.",
      "The weaponized decade reversed the direction. National-security tariffs on steel and aluminum, tech-trade duties aimed at strategic rivals, and sanctions regimes that weaponize customs documentation have all stretched \"security\" into a broad legal harbor. Companies responded by re-engineering supply chains — re-routing through third countries, re-labelling origin, splitting production stages — a compliance-and-craft industry that customs offices now race to audit.",
      "The port feels the whole story at its gates. A terminal's customs lane volumes swing with each duty change; bonded warehouses fill when importers delay clearance to await a ruling; trade patterns shift so that transshipment hubs rise and fall with tariff differentials rather than geography. The customs broker's desk for tariff classification — deciding which code, and therefore which rate, applies — has become a boardroom-relevant profession.",
      "The deepest lesson is psychological. Tariffs feel like strength because their costs are scattered across millions of purchases while their benefits concentrate in visible factories and collected revenue. The counter-lesson of five centuries is equally plain: borders taxed are borders crossed anyway, at higher cost; and the prosperity of the port age was built, above all, on the radical experiment of taxing trade less."
    ],
    gloss: {
      "tariff":    { pos: "n.",    def: "关税" },
      "levy":      { pos: "v.",    def: "征收（税款）" },
      "protectionist": { pos: "adj./n.", def: "保护主义的（者）" },
      "infant":    { pos: "adj.",  def: "初期的（infant industry 幼稚产业）" },
      "downstream": { pos: "adj.", def: "下游的" },
      "upstream":  { pos: "adj.",  def: "上游的" },
      "relocation": { pos: "n.",   def: "迁移；重新布局" },
      "scaffolding": { pos: "n.",  def: "脚手架；制度框架" },
      "bound":      { pos: "v.",   def: "约束（税率封顶）" },
      "retaliate":  { pos: "v.",   def: "报复" },
      "unilaterally": { pos: "adv.", def: "单方面地" },
      "weaponize":  { pos: "v.",   def: "武器化" },
      "sanction":   { pos: "n.",   def: "制裁" },
      "differential": { pos: "n.", def: "差价；差别" },
      "transshipment": { pos: "n.", def: "中转" },
      "classification": { pos: "n.", def: "（税则）归类" },
      "consequential": { pos: "adj.", def: "后果重大的" }
    }
  },

  { id: "a74", lv: 3, lvName: "高", topic: "贸易·运价",
    title: "The Price of Moving a Box",
    titleZh: "一只箱子的运价——航运市场的经济学",
    paras: [
      "Freight is the purest commodity market outside a grain pit: an undifferentiated service — move this box from A to B — priced by the daily collision of capacity and cargo. Nothing in modern economics oscillates like it. The cost of shipping a container from Shanghai to Los Angeles has within a few years spanned from under two thousand dollars to over twenty, a ten-fold swing that no physical input — fuel, steel, labor — could begin to explain. What moves is not cost but the market's opinion of scarcity.",
      "The indices translate this opinion into numbers the industry trades by. The Shanghai Containerized Freight Index polls rates across routes; the Drewry World Container Index blends spot assessments; the Baltic Dry Index does the same for the raw-materials trades that iron ore, coal and grain ships carry. A charterer reading them knows the day's balance of fear and greed across the world's cranes and berths.",
      "The volatility has structural causes. Capacity is lumpy — ships ordered in optimism arrive three years later into whatever mood prevails; a single 24,000-TEU vessel entering a route moves the price. Demand is inelastic — a factory that must ship components does not ship 40 percent fewer because rates rose 40 percent. And demand itself spikes with the inventory cycle: when retailers fear shortage, each orders as if for themselves and their rivals, and the port drowns in the sum.",
      "Contract structures tame some of the chaos. Large shippers negotiate annual contracts at fixed or banded rates, accepting a premium over the worst spot market in exchange for certainty; carriers form alliances to share vessels and rationalize capacity, damping the ruinous price wars of the pre-alliance era. Spot and contract prices then drift apart — during crises, spot explodes while contract holds, and every negotiation season becomes a fight over who absorbed that divergence.",
      "The costs beneath the cycle are their own study. Fuel — bunkers in industry speech — can be a third of a voyage's cost, which is why slow steaming became an art: cutting speed 20 percent cuts fuel 40 and turns excess capacity into fuel economy. Port charges, canal tolls, insurance against war-risk areas, and the demurrage clock on delayed equipment all layer on. The quoted freight rate is merely the loudest line in a quiet ledger.",
      "For an economy, freight is a tax that markets levy on distance. When it falls, import shelves cheapen and remote factories become neighbors; when it spikes, inflation gains a freight line and central bankers learn port geography. The box moves for whatever the day says it is worth — and the day, being a market, is under no obligation to be reasonable."
    ],
    gloss: {
      "freight":   { pos: "n.",    def: "运费；货物" },
      "commodity": { pos: "n.",    def: "大宗商品" },
      "undifferentiated": { pos: "adj.", def: "无差别的" },
      "oscillate": { pos: "v.",    def: "振荡；摆动" },
      "scarcity":  { pos: "n.",    def: "稀缺" },
      "index":     { pos: "n.",    def: "指数" },
      "poll":      { pos: "v.",    def: "采集（报价）；民调" },
      "assessment": { pos: "n.",   def: "估定（价格）" },
      "lumpy":     { pos: "adj.",  def: "成块的；不连续的" },
      "inelastic": { pos: "adj.",  def: "（需求）缺乏弹性的" },
      "spike":     { pos: "n./v.", def: "尖峰；暴涨" },
      "inventory": { pos: "n.",    def: "库存" },
      "banded":    { pos: "adj.",  def: "区间限定的" },
      "alliance":  { pos: "n.",    def: "联盟" },
      "rationalize": { pos: "v.",  def: "合理化整合" },
      "divergence": { pos: "n.",   def: "背离；分歧" },
      "bunker":    { pos: "n.",    def: "（船用）燃料油" },
      "demurrage": { pos: "n.",    def: "滞期费" },
      "levy":      { pos: "v.",    def: "征收" }
    }
  },

  { id: "a75", lv: 3, lvName: "高", topic: "贸易·供应链",
    title: "Supply Chains Learn to Hedge",
    titleZh: "学会避险的供应链——全球化重构",
    paras: [
      "The supply chain of 2019 was a triumph of optimization: one planet, one plan, every factory where it was cheapest, every buffer stripped to zero. Then came the years that optimization had not priced — a pandemic that closed cities, a canal blockage that knotted three continents, a war that redrew energy maps, and harbor congestion that turned logistics into headline news. The lesson the industry extracted was not that global trade failed, but that the cheapest possible chain is also the most breakable one.",
      "The restructuring vocabulary arrived almost overnight. Resilience became a board-level word: the capacity of a chain to absorb shock and keep serving customers. Nearshoring moved final assembly closer to consumers — Mexico for North America, Central Europe for the EU, Southeast Asia for the factories that once filled a single delta. Friend-shoring weighted suppliers by alliance as well as price. Diversification, the oldest rule in risk, returned as \"multi-sourcing\": the same component from three countries, at some cost to unit economics, in exchange for the ability to survive any one of them failing.",
      "The invisible change is in inventory philosophy. The just-in-time doctrine — decades of engineering toward near-zero stock — has made room for just-in-case buffers of critical inputs. Semiconductor buyers now hold months of chips; pharmacy chains warehouse strategic reserves. The corporate treasury discovered that a warehouse is a hedge, and that carrying cost is an insurance premium paid in floor space.",
      "The visible change is in geography. Trade inside Asia now grows faster than trade across the Pacific; \"China plus one\" has seeded industrial clusters in Vietnam, India, Indonesia and Mexico, each specializing in stages their neighbors once performed. The container map follows: new feeder loops, new port investments at secondary gateways, and corridors — rail, land bridges — that exist to make any single chokepoint less singular.",
      "The costs of caution are real and distributed. Redundant suppliers, duplicated tooling and fatter buffers all charge rent, some of which appears in prices. The strategic debate — how much resilience is enough — has no settled answer, because its arithmetic depends on the probability of events whose sizes are only knowable in retrospect. Boards now conduct exactly this debate annually, the way they review insurance.",
      "What persists is the deeper engine: comparative advantage did not retire, it diversified. The world's supply chains are not shortening into walls but braiding into nets — costlier at the node, harder to sever at the whole. The port, as ever, is where the philosophy becomes crane loads: more origins, more destinations, more smaller batches, and a schedule whose value is judged less by speed than by the odds it keeps."
    ],
    gloss: {
      "optimization": { pos: "n.", def: "最优化" },
      "buffer":    { pos: "n.",    def: "缓冲（库存）" },
      "resilience": { pos: "n.",   def: "韧性" },
      "nearshoring": { pos: "n.",  def: "近岸外包" },
      "friend-shoring": { pos: "n.", def: "友岸外包" },
      "multi-sourcing": { pos: "n.", def: "多元采购" },
      "just-in-case": { pos: "adj.", def: "以防万一式的" },
      "doctrine":  { pos: "n.",    def: "教条；主义" },
      "semiconductor": { pos: "n.", def: "半导体" },
      "treasury":  { pos: "n.",    def: "（公司）财务部门；金库" },
      "hedge":     { pos: "n.",    def: "对冲；避险手段" },
      "premium":   { pos: "n.",    def: "保险费；溢价" },
      "cluster":   { pos: "n.",    def: "产业集群" },
      "feeder":    { pos: "n.",    def: "支线航线/船" },
      "gateway":   { pos: "n.",    def: "门户港" },
      "chokepoint": { pos: "n.",   def: "咽喉要道" },
      "redundant": { pos: "adj.",  def: "冗余的" },
      "braiding":  { pos: "v.",    def: "编织成辫（braid 的进行式）" },
      "sever":     { pos: "v.",    def: "切断" }
    }
  },

  /* ================ 综合主题（25 篇：a76-a100） ================ */

  { id: "a76", lv: 1, lvName: "低", topic: "生活·阅读",
    title: "A Rainy Day in the Library",
    titleZh: "雨天图书馆",
    paras: [
      "Rain falls softly on the city all morning. The streets are wet and gray, and most people stay home. But one old building is full of light and quiet: the public library. On a rainy day, it is the warmest place in town.",
      "Inside, the smell of paper fills the air. Shelf after shelf stands in long rows, full of books of every color. Near the window, an old man reads a newspaper slowly, page by page. A young mother sits on a small carpet with her daughter, turning the pages of a picture book. The girl points at a drawing of a rabbit and laughs quietly.",
      "A student takes a seat near the back wall. She opens her notebook, then a thick book about the sea. Around her, the room is almost silent. Only the rain taps on the glass, like a slow clock. From time to time, someone walks past with soft steps, carrying a book.",
      "The librarian moves quietly between the shelves. She knows where every book lives. When a visitor cannot find something, she leads the way without noise. On rainy days, she says, people stay longer. They read more pages and ask better questions.",
      "In the corner, a boy reads a story about ships and islands. Outside the window, the rain keeps falling. But in his book, the sun is bright over a green sea. That is the magic of a library: bad weather outside, good weather inside.",
      "When the sky grows dark, the visitors leave one by one. Some borrow books to take home. The old man folds his newspaper and smiles at the door. The rain still falls, but everyone carries a little light with them."
    ],
    gloss: {
      "library":   { pos: "n.",    def: "图书馆" },
      "shelf":     { pos: "n.",    def: "书架" },
      "carpet":    { pos: "n.",    def: "地毯" },
      "librarian": { pos: "n.",    def: "图书管理员" },
      "silent":    { pos: "adj.",  def: "寂静的" },
      "tap":       { pos: "v.",    def: "轻敲" },
      "borrow":    { pos: "v.",    def: "借" },
      "fold":      { pos: "v.",    def: "折叠" },
      "visitor":   { pos: "n.",    def: "访客" },
      "magic":     { pos: "n.",    def: "魔法；魔力" },
      "rabbit":    { pos: "n.",    def: "兔子" },
      "island":    { pos: "n.",    def: "岛屿" },
      "weather":   { pos: "n.",    def: "天气" }
    }
  },

  { id: "a77", lv: 1, lvName: "低", topic: "生活·自然",
    title: "Our Small Vegetable Garden",
    titleZh: "我们的小菜园",
    paras: [
      "Behind our building, there is a small piece of ground. Last spring, my mother said, \"Let us grow something here.\" Now it is a little garden with tomatoes, beans, and three rows of green onions.",
      "At first, the work was hard. We pulled out the old grass and took turns to dig the soil with small tools. The earth smelled wet and rich. My mother mixed in dark food for the soil, and we waited for a week. Then we planted the small seeds, one by one, in long lines.",
      "Every morning, I water the garden before school. Watering is simple, but it matters. Too little, and the plants fall asleep. Too much, and each leaf turns yellow. My mother taught me to touch the soil first: if it is dry on top, give water; if it is soft and cool, wait.",
      "In June, the first green tomatoes appeared, small and hard as stones. The beans climbed up their sticks like little climbers. One rainy week did half of my watering job for me, and everything grew fast.",
      "Last Sunday, we picked our first dinner from the garden: six red tomatoes, a bowl of beans, and a handful of onions. My mother cooked them with eggs. \"Food from our own ground tastes different,\" she said. She was right. It tasted like patience.",
      "A garden teaches slow lessons. Seeds do not hurry, and neither should the gardener. Next year, we want to try potatoes and small carrots. The ground is ready. We have time."
    ],
    gloss: {
      "garden":    { pos: "n.",    def: "花园；菜园" },
      "soil":      { pos: "n.",    def: "土壤" },
      "seed":      { pos: "n.",    def: "种子" },
      "dig":       { pos: "v.",    def: "挖" },
      "water":     { pos: "v.",    def: "浇水" },
      "leaf":      { pos: "n.",    def: "叶子" },
      "tomato":    { pos: "n.",    def: "西红柿" },
      "bean":      { pos: "n.",    def: "豆子" },
      "onion":     { pos: "n.",    def: "洋葱" },
      "climber":   { pos: "n.",    def: "攀爬的植物；攀登者" },
      "patience":  { pos: "n.",    def: "耐心" },
      "carrot":    { pos: "n.",    def: "胡萝卜" },
      "hurry":     { pos: "v.",    def: "匆忙" }
    }
  },

  { id: "a78", lv: 1, lvName: "低", topic: "生活·饮食文化",
    title: "Grandma's Dumplings",
    titleZh: "外婆的饺子",
    paras: [
      "Every Chinese New Year, my family gathers in my grandma's kitchen. The table is covered with flour, and everyone's hands are busy. We are making dumplings — jiaozi — together.",
      "Grandma makes the skin first. Flour, water, and her strong old hands. She does not measure anything. The dough comes out soft every time, like a white cloud. Then she covers it with a wet cloth and lets it rest. \"Dough is like people,\" she says. \"It needs rest before work.\"",
      "The filling is pork and cabbage, with a little ginger. Grandma cuts everything by hand into tiny pieces. My father mixes the filling with salt and oil, always in one direction. \"Round and round, so the meat wakes up,\" Grandma instructs, though nobody knows if it is true. It works anyway.",
      "Then we fold. Grandma's dumplings are small works of art, each with twelve folds, standing up straight like little soldiers. Mine look like tired pillows. My little cousin's dumplings are mostly open on one side. Grandma fries the broken ones first and gives them to us, the young cooks.",
      "At midnight, the dumplings swim in boiling water. Grandma says the floating ones are ready. We eat them with vinegar, and everyone talks at once — aunts, uncles, cousins, noise and steam.",
      "Years later, in a city far away, I make dumplings alone in a small kitchen. My folds count twelve. I do not know when I learned this. Some lessons from grandma do not need teaching; they just settle into your hands."
    ],
    gloss: {
      "dumpling":  { pos: "n.",    def: "饺子" },
      "flour":     { pos: "n.",    def: "面粉" },
      "dough":     { pos: "n.",    def: "面团" },
      "filling":   { pos: "n.",    def: "馅" },
      "pork":      { pos: "n.",    def: "猪肉" },
      "cabbage":   { pos: "n.",    def: "白菜；卷心菜" },
      "ginger":    { pos: "n.",    def: "姜" },
      "fold":      { pos: "n./v.", def: "褶；捏合" },
      "boiling":   { pos: "adj.",  def: "沸腾的" },
      "vinegar":   { pos: "n.",    def: "醋" },
      "cousin":    { pos: "n.",    def: "表亲；堂亲" },
      "steam":     { pos: "n.",    def: "蒸汽" },
      "pillow":    { pos: "n.",    def: "枕头" }
    }
  },

  { id: "a79", lv: 1, lvName: "低", topic: "生活·城市",
    title: "The Cat at the Gate",
    titleZh: "门口的猫",
    paras: [
      "She appeared one cold morning at the gate of our street: a small orange cat with one torn ear and careful eyes. Nobody knew where she came from. She did not ask for anything. She only sat there and watched the world — the buses, the schoolchildren, the old men playing chess.",
      "The shopkeeper of the small store gave her the first food, a piece of dried fish. She ate it slowly, keeping one eye on him. The next day, she was there again. In a week, everyone on the street knew her.",
      "People gave her names. The children called her Orange. The chess players called her Little Boss, because she sometimes slept on the corner of their table. The name that stayed was the simplest one: Gate Cat.",
      "Winter came, and the shopkeeper put a box with old clothes behind his store. Gate Cat moved in without saying thank you, which is the way of cats. On snowy days, she watched the street from the warm box, like a captain in her small ship.",
      "She never let anyone carry her home. She was not a sad cat or a wild cat. She was a street cat with a full life — fed by many, owned by no one. When new people moved to the street, the old neighbors told them the rule: do not try to take her. Just say hello, and maybe she will sit near your feet on a sunny afternoon.",
      "The city is full of small lives like hers: birds under the bridge, dogs at the market, cats at the gates. They share our streets without sharing our addresses. And somehow, the street feels friendly because they are there."
    ],
    gloss: {
      "gate":      { pos: "n.",    def: "大门" },
      "torn":      { pos: "adj.",  def: "撕裂的；破的" },
      "ear":       { pos: "n.",    def: "耳朵" },
      "shopkeeper": { pos: "n.",   def: "店主" },
      "chess":     { pos: "n.",    def: "国际象棋" },
      "winter":    { pos: "n.",    def: "冬天" },
      "snowy":     { pos: "adj.",  def: "下雪的" },
      "captain":   { pos: "n.",    def: "船长；队长" },
      "own":       { pos: "v.",    def: "拥有" },
      "address":   { pos: "n.",    def: "地址" },
      "friendly":  { pos: "adj.",  def: "友好的" },
      "sunny":     { pos: "adj.",  def: "晴朗的" }
    }
  },

  { id: "a80", lv: 1, lvName: "低", topic: "成长·职场",
    title: "My First Job Interview",
    titleZh: "我的第一次求职面试",
    paras: [
      "The letter said: \"Interview on Thursday at 10 a.m.\" I read it four times. My first real job interview. I was nervous for three days and slept badly on Wednesday night.",
      "On Thursday morning, I put on my only formal shirt and arrived forty minutes early. The office was on the ninth floor. From the window, the city looked small and quiet, like a toy town. I sat in the waiting area and repeated my answers to questions nobody had asked yet.",
      "The manager was younger than I expected. She offered me water, and I held the cup with both hands like a child. The first question was easy: \"Tell me about yourself.\" I had prepared an answer, but suddenly I said something different — the true story of why I chose this field, my small failures, and what I learned from them.",
      "She listened and wrote nothing. Then came harder questions. \"What is your weakness?\" I said, \"I am slow to trust my own work. I check everything twice. Sometimes three times.\" She smiled a little. \"That is not a weakness in our team,\" she said. \"That is a job description.\"",
      "The last question surprised me: \"What do you want to learn here — not earn, learn?\" Nobody had asked me that before. I thought for a moment and answered honestly. On the way down in the elevator, I decided that even without the job, the interview was worth the fear.",
      "They called me on Monday. I got the job — not because I was perfect, but because I was honest about not being perfect. Years later, when I interview young people myself, I look for the same thing: not polished answers, but true ones."
    ],
    gloss: {
      "interview": { pos: "n.",    def: "面试；采访" },
      "nervous":   { pos: "adj.",  def: "紧张的" },
      "formal":    { pos: "adj.",  def: "正式的" },
      "manager":   { pos: "n.",    def: "经理" },
      "prepare":   { pos: "v.",    def: "准备" },
      "failure":   { pos: "n.",    def: "失败" },
      "weakness":  { pos: "n.",    def: "弱点" },
      "description": { pos: "n.",  def: "描述；职位说明" },
      "surprise":  { pos: "v.",    def: "使惊讶" },
      "honestly":  { pos: "adv.",  def: "诚实地" },
      "elevator":  { pos: "n.",    def: "电梯" },
      "polished":  { pos: "adj.",  def: "打磨过的；圆滑的" }
    }
  },

  { id: "a81", lv: 1, lvName: "低", topic: "文化·节日",
    title: "The Night of a Thousand Lanterns",
    titleZh: "千灯之夜——元宵节",
    paras: [
      "The fifteenth day of the first lunar month is a special night in China. The New Year celebrations end with a festival of lights: the Lantern Festival. On this night, the streets become rivers of glowing colors.",
      "In the old town park, workers hang lanterns for a whole week before the festival. Round red ones like the moon. Long golden dragons that seem to swim in the air. Rabbit lanterns for children, with paper ears that move in the wind. By evening, hundreds of lanterns light the paths, and the park looks like a second sky full of soft stars.",
      "Families walk slowly under the lights. Grandparents tell old stories about each lantern's meaning. Children carry small lanterns on sticks, proud as generals. In the main square, a puzzle game fills the evening: riddles written on paper strips hang from the lanterns. Read one, guess the answer, win a small prize. A little girl next to me guesses three in a row and wins a paper fan.",
      "The food of the night is round and sweet: yuanxiao, or tangyuan — sticky rice balls with black sesame or peanut inside. They float in hot sugar water like little moons in a warm lake. \"Round means family together,\" my grandmother always says while serving them.",
      "At nine o'clock, fireworks open above the river. For twenty minutes, the sky blooms in gold and green. The crowd looks up together, hundreds of quiet faces in the changing light. Children sit on their fathers' shoulders. An old man holds his wife's hand.",
      "Then the lanterns go out one by one, and the streets return to normal night. But something warm stays. The festival's simple wish — light for everyone, family around the table — packs itself into the heart like a small lantern, and waits there for next year."
    ],
    gloss: {
      "lantern":   { pos: "n.",    def: "灯笼" },
      "lunar":     { pos: "adj.",  def: "农历的；月亮的" },
      "festival":  { pos: "n.",    def: "节日" },
      "glow":      { pos: "v.",    def: "发光" },
      "dragon":    { pos: "n.",    def: "龙" },
      "riddle":    { pos: "n.",    def: "谜语" },
      "prize":     { pos: "n.",    def: "奖品" },
      "sticky":    { pos: "adj.",  def: "黏的" },
      "sesame":    { pos: "n.",    def: "芝麻" },
      "peanut":    { pos: "n.",    def: "花生" },
      "firework":  { pos: "n.",    def: "烟花" },
      "shoulder":  { pos: "n.",    def: "肩膀" },
      "grandmother": { pos: "n.",  def: "祖母；外婆" }
    }
  },

  { id: "a82", lv: 1, lvName: "低", topic: "成长·运动",
    title: "Learning to Swim",
    titleZh: "学游泳",
    paras: [
      "The water was warm, but my legs did not believe it. I stood at the edge of the pool, holding my teacher's hand. \"The water holds you,\" she said. \"You only need to learn how to let it.\"",
      "First, we learned to blow bubbles. Face in the water, breath out slowly, then turn and breathe in. It felt strange at first, like saying goodbye a hundred times. After a week, it felt like nothing.",
      "Then came floating. I lay on my back in the shallow water, arms wide, looking at the ceiling. My teacher held one finger under my back — not lifting, just touching. \"Feel the water under you,\" she said. One day, her finger was gone, and I was still floating. I did not know how long I lay there, quiet as a leaf, before I noticed.",
      "Kicking came next. Legs straight, up and down from the hips, small fast splashes. Then arms: reach forward, pull the water back, like opening a big door again and again. Breathing to the side was the hardest part — turn, breathe, return, without stopping the arms. For two weeks, I drank half the pool.",
      "One Friday evening, everything joined by itself. Arms, legs, breath, glide. I crossed the pool without stopping, touched the far wall, and looked back at the water I had conquered. My teacher clapped once. That single clap felt like a medal.",
      "Now swimming is my quiet place. The world under the surface is blue and slow, and problems stay above it. Every skill is like this, I think: a hundred small strange steps, then one day the water simply holds you, and you fly."
    ],
    gloss: {
      "pool":      { pos: "n.",    def: "泳池；水池" },
      "bubble":    { pos: "n.",    def: "气泡" },
      "breathe":   { pos: "v.",    def: "呼吸" },
      "float":     { pos: "v.",    def: "漂浮" },
      "shallow":   { pos: "adj.",  def: "浅的" },
      "ceiling":   { pos: "n.",    def: "天花板" },
      "kick":      { pos: "v.",    def: "踢；打腿" },
      "splash":    { pos: "n.",    def: "水花" },
      "glide":     { pos: "n./v.", def: "滑行" },
      "conquer":   { pos: "v.",    def: "征服" },
      "medal":     { pos: "n.",    def: "奖牌" },
      "surface":   { pos: "n.",    def: "水面；表面" }
    }
  },

  { id: "a83", lv: 1, lvName: "低", topic: "生活·城市",
    title: "Dinner at the Night Market",
    titleZh: "夜市晚餐",
    paras: [
      "When the sun goes down, a small street in the old part of the city wakes up. Little tables appear. Lights turn on above each food stand. The smell of grilled meat, sweet corn, and hot soup mixes in the air. The night market has opened.",
      "Mrs. Lin's stand sells noodles. She cooks them in a big pot of soup that has boiled for hours. Her hands move fast — noodles, vegetables, two spoons of chili oil — and a hot bowl reaches you in one minute. \"Extra egg?\" she asks every regular customer by name.",
      "Next to her, a young man from the northwest makes bread in a clay oven. The smell of fresh bread brings people from two streets away. Across the way, an old couple sells sweet rice cakes — soft, warm things that they wrap in green leaves.",
      "At seven, the street is full. Office workers with loose ties eat standing up. Children chase each other between the tables. A street singer sets up a small speaker, and sings old love songs, not perfectly but happily.",
      "The market is also a place of small talks. The vegetable seller asks about your mother's knee. The fruit man saves the sweetest oranges for the old teacher who comes every Friday. Money changes hands, but so do greetings, jokes, and news.",
      "By eleven, the stands close one by one. Workers sweep the street clean, and the tables fold away. Tomorrow, the same street will be a quiet place where cars park. But tonight, for a few hours, it was the warmest kitchen in the city — open to everyone, with no reservation needed."
    ],
    gloss: {
      "market":    { pos: "n.",    def: "市场" },
      "stand":     { pos: "n.",    def: "摊位" },
      "grill":     { pos: "v.",    def: "烧烤" },
      "noodle":    { pos: "n.",    def: "面条" },
      "chili":     { pos: "n.",    def: "辣椒" },
      "oven":      { pos: "n.",    def: "烤炉" },
      "wrap":      { pos: "v.",    def: "包裹" },
      "loose":     { pos: "adj.",  def: "松的" },
      "chase":     { pos: "v.",    def: "追逐" },
      "seller":    { pos: "n.",    def: "卖者" },
      "sweep":     { pos: "v.",    def: "清扫" },
      "reservation": { pos: "n.",  def: "预订" }
    }
  },

  { id: "a84", lv: 2, lvName: "中", topic: "心理·效率",
    title: "The Multitasking Myth",
    titleZh: "多任务的迷思",
    paras: [
      "You have done it a hundred times: email in one window, report in another, phone buzzing beside the keyboard, a colleague talking over the partition. It feels like productivity at full burn — four streams at once, a modern mind in motion. Cognitive science has bad news: what feels like multitasking is mostly rapid switching, and the switching itself is the tax you never see on the invoice.",
      "The bill arrives in two parts. Switch costs are the fractions of a second your brain needs to disengage from one task and load the rules of another — file closures, goal changes, attention re-targeting. Individually tiny, they compound cruelly across a day of toggling. The second cost is subtler: after an interruption, attention doesn't fully return; a residue of the previous task keeps occupying working memory like a guest who won't leave the table.",
      "The laboratory numbers are unkind to the habit. Studies of interrupted knowledge workers find that a single stopped-and-resumed task takes measurably longer and produces more errors than the same task done whole. The famous exception — the small percentage of people who genuinely perform better with multiple streams — replicates so rarely that researchers study them as a curiosity, not a model.",
      "Why, then, does multitasking feel so good? Partly because task-switching offers escape: each jump delivers a small reward of novelty and relief from difficulty, and the brain's dopamine system approves. Partly because we are poor judges of our own performance while divided — busyness masquerades as achievement, and the errors surface later, in someone else's inbox.",
      "The practical antidotes are unglamorous but proven. Batch similar shallow tasks into fixed windows — email at three set times, not sixty. Protect one deep block daily and defend it like a meeting with your career. Make switching physically expensive: close tabs, silence the phone, put it in another room — distance beats discipline, because willpower is the resource the interruptions are consuming.",
      "The deepest shift is redefining what a working hour is for. Attention, not time, is the scarce commodity of the knowledge economy; an hour of full attention outproduces three of divided gaze. The myth of multitasking persists because it flatters us — all streams, all speed. The truth is quieter and better: one thing, done well, finishes early."
    ],
    gloss: {
      "multitasking": { pos: "n.", def: "多任务（并行）" },
      "cognitive": { pos: "adj.",  def: "认知的" },
      "switch":    { pos: "n.",    def: "切换" },
      "tax":       { pos: "n.",    def: "税；代价" },
      "disengage": { pos: "v.",    def: "脱离；解除" },
      "toggle":    { pos: "v.",    def: "来回切换" },
      "residue":   { pos: "n.",    def: "残留物" },
      "interrupt": { pos: "v.",    def: "打断" },
      "replicate": { pos: "v.",    def: "复现（实验）" },
      "novelty":   { pos: "n.",    def: "新鲜感" },
      "dopamine":  { pos: "n.",    def: "多巴胺" },
      "masquerade": { pos: "v.",   def: "伪装；冒充" },
      "antidote":  { pos: "n.",    def: "解药" },
      "batch":     { pos: "v.",    def: "批量处理" },
      "discipline": { pos: "n.",   def: "自律；纪律" },
      "willpower": { pos: "n.",    def: "意志力" },
      "commodity": { pos: "n.",    def: "商品；资源" }
    }
  },

  { id: "a85", lv: 2, lvName: "中", topic: "文化·地理",
    title: "Why We Love Maps",
    titleZh: "我们为何热爱地图",
    paras: [
      "Spread a map of the world on a table and watch what happens. Someone will lean over it within a minute. A finger will trace a coastline, find a hometown, follow a mountain range across a continent. No other printed object invites the body so immediately. Maps are the most beloved form of data humanity has ever produced, and their appeal hides a small philosophical scandal.",
      "The scandal is that no map is true. A map is a selective argument: its maker chooses what to show, what to shrink, what to omit. The projection problem is the classic case — the earth's curved surface cannot be flattened without tearing or stretching something. The famous Mercator projection, built for sixteenth-century navigation, wildly enlarges the high latitudes; Greenland appears the size of Africa, which in truth could contain fourteen Greenlands. Every world map you have ever loved is, in some dimension, a polite lie.",
      "What maps never fake is their function: compression. A good map holds a continent of information in a sheet you can fold into a pocket — coastlines and capitals, railways and reefs, the texture of the world ranked by what its user needs. The portolan charts of medieval mariners coiled coastlines into a web of compass bearings; subway maps sacrifice all geography to clarity, straightening curves into angles, and by that \"error\" become more useful than any photograph.",
      "The digital era changed the verb. To map is now something data does to itself — disease maps itself through case reports, cities map their own noise, shipping routes map themselves from transponder pings into golden threads across the sea. The map has stopped being a document and become a live layer, updated by the second, personalized to the question. Yet the old magic survives intact: open a live ship-tracking site and the same crowd gathers, tracing routes, following one container ship through the strait that a paper map named.",
      "Maps also hold a mirror. What a civilization charts reveals what it values: medieval maps filled unknown seas with serpents and kept heaven at the top; colonial maps redrew entire continents with straight rulers; modern ones crowd with population density and night-time light. Read a period's maps and you read its anxieties and its ambitions, drawn at one-tenth the scale of history itself.",
      "Perhaps the love is simpler than all this. A map is a promise that the world is knowable — that chaos has a shape, that every place has an address in the grand arrangement. To read one is to rehearse mastery over distance while sitting still. That is why the leaning-over never stops: on the table, the world lies flat, labeled, and quietly waiting for the next finger to plan a journey."
    ],
    gloss: {
      "coastline": { pos: "n.",    def: "海岸线" },
      "philosophical": { pos: "adj.", def: "哲学的" },
      "scandal":   { pos: "n.",    def: "丑闻；令人震惊的事" },
      "projection": { pos: "n.",   def: "（地图）投影" },
      "latitude":  { pos: "n.",    def: "纬度" },
      "compression": { pos: "n.",  def: "压缩" },
      "portolan":  { pos: "n.",    def: "波托兰海图（中古航海图）" },
      "bearing":   { pos: "n.",    def: "方位角" },
      "clarity":   { pos: "n.",    def: "清晰度" },
      "transponder": { pos: "n.",  def: "应答器" },
      "serpent":   { pos: "n.",    def: "海蛇；巨蛇" },
      "colonial":  { pos: "adj.",  def: "殖民的" },
      "anxiety":   { pos: "n.",    def: "焦虑" },
      "knowable":  { pos: "adj.",  def: "可知的" },
      "rehearse":  { pos: "v.",    def: "排练；预演" },
      "mastery":   { pos: "n.",    def: "掌控；精通" }
    }
  },

  { id: "a86", lv: 2, lvName: "中", topic: "文化·饮食",
    title: "A Leaf That Conquered the World",
    titleZh: "征服世界的一片叶子",
    paras: [
      "It began as a medicine in the mountains of southwest China — a bitter leaf, chewed or boiled, credited with sharpening attention and calming digestion. Today that leaf steeps in cups from Lagos to Lisbon, anchors ceremonies in Kyoto, fuels business in Mumbai, and is second only to water as the most consumed beverage on Earth. Tea's career is the strangest success story in the history of plants.",
      "The turning point was chemistry plus commerce. All tea comes from one species, Camellia sinensis; the six great families — green, white, yellow, oolong, black, dark — are the same leaf arrested at different points of oxidation. Green tea is dried before the leaf's enzymes can work; black tea is allowed to fully oxidize, developing the tannins that dissolve beautifully in hard water and boiling milk. That last property, quite by accident, made tea portable across empires: it could survive years at sea and still taste of something in a London drawing room.",
      "The trade it created redrew the world economy. Silver flowed east for chests of tea; when silver ran short, the trade invented darker substitutes, and the wars that followed taught two empires the price of a tariff on a habit. Clipper ships were built for its speed premium — the first Taeping and Ariel race home from Foochow made front-page news in 1866 — and the afternoon tea ritual restructured the British day around a beverage its climate could not grow.",
      "The cultures that adopted it wrote their own meanings into the cup. Japan turned preparation into a philosophy of presence — the ceremony where each gesture is fixed, and the imperfect bowl is prized over the perfect one. Britain armored it with porcelain and class codes. Tibet churned it with butter and salt into a meal that fights altitude. Morocco poured it from a height over mint and sugar, a gesture of hospitality performed as theater. The leaf arrived everywhere; each civilization brewed its own soul into it.",
      "Modern science arrived late and confirmed the obvious in laboratory prose: moderate caffeine, an amino acid that steadies the lift, a library of polyphenols — with honest caveats that the mortality benefits of tea drinking are difficult to untangle from the lives of people who drink tea. The marketers translated this into promises the leaf never made.",
      "In the end the leaf's conquest was never really chemical. It is the rare drug that demands a pause — water must boil, leaves must steep, time must pass. Every tea culture on Earth, whatever else it disagrees on, built the same still center into the ritual: a small waiting, a warm cup, a moment of ordinary peace. The world adopted the pause, and called it tea."
    ],
    gloss: {
      "beverage":  { pos: "n.",    def: "饮料" },
      "oxidation": { pos: "n.",    def: "氧化" },
      "enzyme":    { pos: "n.",    def: "酶" },
      "tannin":    { pos: "n.",    def: "单宁" },
      "dissolve":  { pos: "v.",    def: "溶解" },
      "chest":     { pos: "n.",    def: "（茶叶）箱" },
      "tariff":    { pos: "n.",    def: "关税" },
      "clipper":   { pos: "n.",    def: "飞剪式快速帆船" },
      "premium":   { pos: "n.",    def: "溢价；奖励" },
      "ritual":    { pos: "n.",    def: "仪式" },
      "ceremony":  { pos: "n.",    def: "茶道；仪式" },
      "churn":     { pos: "v.",    def: "搅打（酥油茶）" },
      "altitude":  { pos: "n.",    def: "海拔" },
      "hospitality": { pos: "n.",  def: "好客；款待" },
      "caffeine":  { pos: "n.",    def: "咖啡因" },
      "polyphenol": { pos: "n.",   def: "多酚" },
      "mortality": { pos: "n.",    def: "死亡率" },
      "untangle":  { pos: "v.",    def: "理清；解开" }
    }
  },

  { id: "a87", lv: 2, lvName: "中", topic: "科技·农业",
    title: "The Farm Moves Upstairs",
    titleZh: "搬到楼上的农场——城市垂直农业",
    paras: [
      "In a warehouse on the edge of Singapore, lettuce grows in towers nine meters tall under lights the color of an alien dawn. No soil touches the roots; a thin film of nutrients slides past them on their way to a drain. Outside, the tropics press against the walls with ninety-percent humidity and pests of every appetite. Inside, the climate is a set point, and the only living things are the plants and a few engineers in clean-room coats.",
      "Vertical farming is the industrial answer to an agricultural anxiety: arable land shrinks while cities swell, and the fields that feed them sit at the end of fragile, weather-exposed supply lines. A vertical farm inverts the geometry — stacking growing area in layers, multiplying yield per square meter of land by the number of floors. Water circulates in closed loops, using a fraction of field irrigation; pesticide use collapses to near zero, since the pests never get in; and the harvest no longer consults the season.",
      "The technology is an ensemble. LED spectrums tuned to the photosynthetic wavelengths plants actually favor; hydroponic or aeroponic root zones delivering nutrients dissolved in water or mist; sensors reading temperature, humidity, carbon dioxide and leaf color every minute; algorithms adjusting light recipes by growth stage. The farm becomes less a field than a factory whose raw material is electricity and whose product is biomass.",
      "The arithmetic is where the dream must earn its keep. Lighting a plant factory is energy-intensive — electricity can be the majority of operating cost, which is why the industry clusters near cheap power and why the economics shine brightest for crops where freshness commands a premium: salad greens, herbs, micro-vegetables. Rice, wheat and potatoes — the caloric backbone of humanity — remain firmly cheaper in open fields, where the sun works for free.",
      "The strategic case, though, keeps the industry funded through its losses. Land-scarce states — Singapore above all — treat local green-vegetable capacity as food security, the way others treat grain reserves. Cold-climate cities see winter greens without airfreight. The technology spins off: the same controlled-environment recipes feed space-agriculture research, pharmaceutical plant cultivation, and seedling factories for open farms.",
      "Whether the vertical farm becomes the wheat field of the future or merely the greenhouse of the rich depends on a race between falling LED costs and rising field externalities — water scarcity, volatile climates, transport fuel. What is already decided is the direction of the imagination: agriculture, the oldest outdoor art, has learned that a controlled room can be a place where things grow."
    ],
    gloss: {
      "lettuce":   { pos: "n.",    def: "生菜" },
      "humidity":  { pos: "n.",    def: "湿度" },
      "pest":      { pos: "n.",    def: "害虫" },
      "arable":    { pos: "adj.",  def: "可耕种的" },
      "stack":     { pos: "v.",    def: "堆叠" },
      "irrigation": { pos: "n.",   def: "灌溉" },
      "pesticide": { pos: "n.",    def: "农药" },
      "ensemble":  { pos: "n.",    def: "成套设备；整体" },
      "spectrum":  { pos: "n.",    def: "光谱" },
      "photosynthetic": { pos: "adj.", def: "光合作用的" },
      "hydroponic": { pos: "adj.", def: "水培的" },
      "aeroponic": { pos: "adj.",  def: "气雾培的" },
      "biomass":   { pos: "n.",    def: "生物量" },
      "premium":   { pos: "n.",    def: "溢价" },
      "caloric":   { pos: "adj.",  def: "热量的" },
      "volatile":  { pos: "adj.",  def: "多变的；不稳定的" },
      "externalitie": { pos: "n.", def: "外部成本" },
      "seedling":  { pos: "n.",    def: "幼苗" }
    }
  },

  { id: "a88", lv: 2, lvName: "中", topic: "心理·人际",
    title: "The Quiet Power of No",
    titleZh: "\"不\"的静默力量",
    paras: [
      "The request arrives politely: another committee, a weekend favor, \"just one small thing\" that will only take an afternoon. You feel the yes forming in your throat before your calendar has been consulted — because the yes is social grease, and no has the reputation of a slammed door. Whole careers are quietly buried under an architecture of never saying it.",
      "The asymmetry is real, and psychology measures it. Saying no risks the relationship in the moment — an awkward silence, disappointment, the sense of having failed someone. Saying yes risks nothing today and everything later: the over-committed week, the resentfully done task, the reputation built on reliability until the day reliability collapses. The fees for yes you can defer; no charges you immediately and pays you back over years.",
      "The skill separates three different refusals. The capacity no is honest arithmetic — \"I would, but the next three weeks are already promised.\" The priority no is self-knowledge wearing a suit — \"I'm protecting my mornings for the writing, so I don't take morning meetings.\" The values no is the rarest and cleanest — \"this isn't work I want to do, regardless of time.\" Each one closes a door and, more importantly, tells the other person which doors remain open.",
      "Technique makes the medicine easier to swallow. Lead with the decision, not the apology chain — a paragraph of sorry signals that the no is negotiable. Offer the shape of an alternative when one genuinely exists: a name, a smaller version, a later date. But beware the soft no that isn't one — \"maybe, let me think about it\" — which merely forwards the awkwardness with interest to your future self.",
      "The masters of the art treat their yes as capital, because that is what it is. Every commitment buys a piece of your finite attention; a yes given carelessly is a purchase made without reading the price. Warren Buffett's version is the one worth taping to a monitor: the difference between successful people and really successful people is that really successful people say no to almost everything.",
      "None of this licenses the joyless refusal. The point of a well-defended no is not a smaller life but a chosen one — the ability to be fully present for the handful of commitments that matter, because all the other doors were closed on purpose. Saying no well is simply the ongoing maintenance of your own yes."
    ],
    gloss: {
      "committee": { pos: "n.",    def: "委员会" },
      "grease":    { pos: "n.",    def: "润滑剂；润滑（社交）" },
      "asymmetry": { pos: "n.",    def: "不对称" },
      "awkward":   { pos: "adj.",  def: "尴尬的" },
      "over-committed": { pos: "adj.", def: "过度承诺的" },
      "defer":     { pos: "v.",    def: "延期；推迟" },
      "refusal":   { pos: "n.",    def: "拒绝" },
      "arithmetic": { pos: "n.",   def: "算术（账）" },
      "negotiable": { pos: "adj.", def: "可协商的" },
      "resentful": { pos: "adj.",  def: "心怀不满的" },
      "reliability": { pos: "n.",  def: "可靠性" },
      "apology":   { pos: "n.",    def: "道歉" },
      "capital":   { pos: "n.",    def: "资本" },
      "finite":    { pos: "adj.",  def: "有限的" },
      "license":   { pos: "v.",    def: "准许；纵容" },
      "maintenance": { pos: "n.",  def: "维护；保养" }
    }
  },

  { id: "a89", lv: 2, lvName: "中", topic: "工程·结构",
    title: "How Bridges Carry Us",
    titleZh: "桥如何承载我们",
    paras: [
      "Stand under a highway bridge and look up at the underside. What carries forty thousand vehicles a day is not the concrete you see but an invisible argument: a conversation of forces — push, pull, and their patient settlement into balance. Every bridge ever built is one of four answers to a single question: how do we get compression and tension to cooperate across a gap?",
      "The beam is the first answer and the oldest: lay something stiff across, and let it carry load in bending — its top surface squeezed, its bottom surface stretched. Simple, honest, and limited: make a beam too long and its own weight defeats it. The arch is the second answer, and it is a trick of genius — invert the problem. Curve the structure so that all its material sits in compression, and let the abutments at each end absorb the outward thrust. Stone, weak in tension but mighty in compression, becomes a bridge material; hence two thousand years of Roman arches still standing.",
      "The suspension bridge turns the arch inside out and hangs the road from cables in pure tension. The tower and anchorages take the pull; the deck, freed from carrying, can be a ribbon of steel spanning two kilometers of strait. Its elegance has one enemy — the wind, which can feed a deck energy until it dances itself apart, a lesson written into every bridge code since Tacoma Narrows in 1940. The cable-stayed bridge, the modern fourth form, runs straight diagonal cables from towers to deck, each stay a direct suspension in miniature — stiffer, easier to balance, the favorite of the last half-century.",
      "The engineering lives in the details the eye never sees. Expansion joints let a steel bridge grow half a meter on a summer afternoon; bearings translate a deck's slow breathing into harmless motion; foundations carry everything into soil or rock, because a bridge is ultimately a building standing on ground that may liquefy, settle or shrug in an earthquake. The load cases studied before a single bolt is ordered fill books: dead load, live load, wind, temperature, braking trucks, ship impact, a century of corrosion allowance.",
      "Maintenance is the second life of the craft. A bridge ages as its elements work: water finds the steel inside concrete and rusts it silently outward; salt accelerates the plot; bearings wear into slopes; cables fret at their anchors. The inspector's vocabulary is medical — cracking, spalling, scour under foundations — and the schedule of inspection is a promise the public never reads until it is broken.",
      "What bridges quietly teach is a philosophy of load: nothing carries anything alone. Forces are always being invited to travel the path of least stiffness, and the engineer's art is building the path deliberately — channeling a truck's weight through a deck, into a cable, down a tower, through a pier, into the planet. The next time you cross one, you are riding that entire conversation of push and pull, which has been having itself, patiently and without your notice, since the first stone was set."
    ],
    gloss: {
      "compression": { pos: "n.",   def: "压力（压应力）" },
      "tension":   { pos: "n.",    def: "拉力（拉应力）" },
      "beam":      { pos: "n.",    def: "梁" },
      "bend":      { pos: "v.",    def: "弯曲（受弯）" },
      "arch":      { pos: "n.",    def: "拱" },
      "abutment":  { pos: "n.",    def: "桥台" },
      "thrust":    { pos: "n.",    def: "推力" },
      "suspension": { pos: "n.",   def: "悬索（吊桥）" },
      "anchorage": { pos: "n.",    def: "锚碇" },
      "cable-stayed": { pos: "adj.", def: "斜拉（桥）的" },
      "expansion": { pos: "n.",    def: "膨胀（热伸长）" },
      "bearing":   { pos: "n.",    def: "支座" },
      "liquefy":   { pos: "v.",    def: "液化" },
      "corrosion": { pos: "n.",    def: "腐蚀" },
      "spalling":  { pos: "n.",    def: "剥落" },
      "scour":     { pos: "n.",    def: "冲刷（桥墩掏底）" },
      "stiffness": { pos: "n.",    def: "刚度" },
      "pier":      { pos: "n.",    def: "桥墩" }
    }
  },

  { id: "a90", lv: 2, lvName: "中", topic: "环境·气候",
    title: "The Ice That Keeps the Score",
    titleZh: "记录成绩的冰",
    paras: [
      "On the high glaciers of the Tibetan Plateau, the ice keeps an archive. Each year's snowfall lies down as a layer, sealing in the air of that year — its dust, its pollen, its chemistry, the invisible signature of the atmosphere above. Drill three hundred meters down and you withdraw a column of time: a climate diary written in bubbles, readable like tree rings, older than any empire.",
      "The score it has kept is steepening. Ice cores from mountain glaciers across the Himalaya, the Andes and the Alps tell one consistent story — the last fifty years of accumulation are warmer than any comparable stretch in the record behind them, and the uppermost layers, the recent ones, carry the unmistakable chemistry of industrial air. Then the diary begins to melt at both ends: the surface loses years to meltwater percolating downward, blurring the recent entries, while the oldest ice at the bottom thins toward the bedrock. The archive that proves the warming is being erased by it.",
      "The mountain ice is small next to the polar sheets but disproportionately dear to human life. These are the water towers of Asia and South America — glaciers that intercept snow in the cold months and release it as reliable summer flow to rivers serving billions downstream. A glacier in health is a patient bank: deposits and withdrawals balance across the year. A glacier in deficit spends its principal, and the rivers below learn a new rhythm — first floods as the wasting ice accelerates, then, decades later, thirst as the reservoir itself disappears.",
      "The measurement has become a race. Teams drill cores before the melt reaches them, rushing the longest, oldest ice to cold storage; satellite gravimetry weighs the ice sheets year by year; laser altimeters count the meters of loss. The numbers converge from every method: mountain glaciers worldwide are losing hundreds of gigatons annually, and the loss rate itself is accelerating — a curve bending away from every projection made a decade ago.",
      "What the disappearing ice removes is not only water but memory — of climates past, in the bubbles; of landscapes, in the valleys it sculpted; of certainty, in the mountain communities whose festivals, agriculture and even borders were drawn around glaciers that are no longer where the maps say. The communities adapt with invention: artificial glaciers in Ladakh built as ice terraces to hold spring water; painting programs that armor remaining ice with reflective fabric against the sun.",
      "The ice's last service to us is the clarity of its message. Ice melts according to arithmetic, not argument: energy in, temperature up, water out. It keeps the score without opinion, and the score is running. Somewhere tonight on a high plateau, another layer of this year's snow is settling over the archive — the newest entry in a diary being read even as it burns."
    ],
    gloss: {
      "glacier":   { pos: "n.",    def: "冰川" },
      "archive":   { pos: "n.",    def: "档案" },
      "core":      { pos: "n.",    def: "（冰）芯" },
      "accumulation": { pos: "n.", def: "积累（积雪量）" },
      "percolate": { pos: "v.",    def: "渗透；下渗" },
      "bedrock":   { pos: "n.",    def: "基岩" },
      "polar":     { pos: "adj.",  def: "极地的" },
      "disproportionately": { pos: "adv.", def: "不成比例地" },
      "reservoir": { pos: "n.",    def: "水库；蓄水池" },
      "gravimetry": { pos: "n.",   def: "重力测量" },
      "altimeter": { pos: "n.",    def: "测高仪" },
      "gigaton":   { pos: "n.",    def: "十亿吨（吉吨）" },
      "sculpt":    { pos: "v.",    def: "雕凿（地形）" },
      "invention": { pos: "n.",    def: "发明；应变之策" },
      "reflective": { pos: "adj.", def: "反光的" },
      "arithmetic": { pos: "n.",   def: "算术（规律）" }
    }
  },

  { id: "a91", lv: 2, lvName: "中", topic: "经济·共享",
    title: "Everything Is Rentable Now",
    titleZh: "万物皆可租——共享经济的得与失",
    paras: [
      "A decade ago, ownership was the grammar of daily life: you had a car in the garage, a drill in the closet, a stack of DVDs on a shelf. Then the platforms arrived with a different sentence structure: access instead of ownership, idle capacity rented by the minute, the whole city turned into a warehouse without walls. The sharing economy promised efficiency, community and a little extra income — and delivered, as disruptive ideas do, a stranger and more complicated world.",
      "The pure logic was seductive. The average power drill is used twelve minutes in its entire life; the average car sits parked twenty-three hours a day. Match idle assets to scattered demand with a phone app, and the same capital serves ten households instead of one — less waste, lower cost per use, fewer objects manufactured to rust unused. Early sharing platforms felt almost utopian: couches surfed, tools lent, cars split among neighbors.",
      "Scale changed the character of the thing. The apartment shared occasionally became a short-term rental business; the car shared on weekends became a fleet; the surplus of one's labor became a full-time job with no employer, no benefits and an algorithm for a boss. The platform's incentives rule the market it creates: ratings discipline workers, surge pricing disciplines demand, and the \"community\" matures into an extraction pipeline with friendly typography.",
      "The urban texture absorbed the shocks unevenly. Ride-hailing put a car within everyone's reach and traffic back into everyone's streets; short-term rentals raised the rent floor in the world's tourist cities while hollowing some neighborhoods into hotel districts with kettles. Regulators arrived late and bluntly — caps, licenses, night bans — each rule revealing that \"sharing\" had quietly become three different industries wearing one jacket: transport, hospitality and gig labor.",
      "The consumer verdict, meanwhile, is warm. Convenience won: the app generation expects a car to appear, a scooter to unlock, a tool to arrive, and pays happily for never owning the friction. The portfolio of rentable life keeps expanding — clothing subscription, furniture rental, tool libraries reborn as apps, even pet-sharing. Ownership is retreating to what people identity-attach to: the home, the keepsake, the bicycle they love.",
      "The honest ledger has two columns and no total. On one side: assets used intensely, carbon possibly saved, flexible income real for millions, and a generation spared the cost of owning what it rarely uses. On the other: work stripped of its floors, cities turned into marketplaces, and the quiet conversion of neighbors into counterparties. The sharing economy did not fail its promise — it kept exactly half of it, and we are still deciding which half was the point."
    ],
    gloss: {
      "ownership": { pos: "n.",    def: "所有权" },
      "idle":      { pos: "adj.",  def: "闲置的" },
      "capacity":  { pos: "n.",    def: "产能；容量" },
      "platform":  { pos: "n.",    def: "（数字）平台" },
      "utopian":   { pos: "adj.",  def: "乌托邦式的" },
      "fleet":     { pos: "n.",    def: "车队；机群" },
      "algorithm": { pos: "n.",    def: "算法" },
      "surge":     { pos: "n.",    def: "（价格）高峰加价" },
      "extraction": { pos: "n.",   def: "抽取；榨取" },
      "hollow":    { pos: "v.",    def: "掏空" },
      "regulator": { pos: "n.",    def: "监管机构" },
      "gig":       { pos: "n.",    def: "零工" },
      "hospitality": { pos: "n.",  def: "酒店住宿业；好客" },
      "subscription": { pos: "n.", def: "订阅" },
      "counterparty": { pos: "n.", def: "交易对手" },
      "ledger":    { pos: "n.",    def: "账簿" }
    }
  },

  { id: "a92", lv: 3, lvName: "高", topic: "科技·社会",
    title: "The Economy That Eats Your Gaze",
    titleZh: "吞噬目光的经济——注意力经济",
    paras: [
      "There is a market you enter a hundred times a day without signing anything. Its commodity is the next thirty seconds of your awareness; its traders are the platforms that package it and the advertisers that bid on it; its exchange rate is measured in engagement. Economists spent two centuries pricing land, labor and capital. It took one decade of the smartphone to discover the scarcer resource was the human gaze.",
      "The business model explains the architecture. When the service is free and the user is the product, every design decision optimizes toward the same metric: time on platform. The infinite scroll abolishes the natural stopping cue; the pull-to-refresh installs a slot machine's variable reward; autoplay removes even the decision to continue. None of this is an accident of engineering taste — an interface that let you leave would be, in this economy, a pricing error.",
      "The cognitive cost is now measured with uncomfortable precision. Attention residue from a single check of the phone degrades subsequent task performance for minutes; the mere presence of a screen on the desk — face down, silent — measurably reduces working-memory capacity, because suppressing the urge to look is itself a workload. Deep reading, the sustained attention that complex thought requires, is not being destroyed so much as untrained: the mind adapts to whatever diet it is fed, and the feed is a stadium of interruptions.",
      "The social layer compounds the individual one. Recommendation algorithms optimize for engagement, and engagement is not evenly distributed across the emotional palette — outrage, fear and tribal affirmation are the cheapest attention multipliers. The public sphere inherits the bias: the content that rises is the content that provokes, not the content that is true, and entire political cultures now run on incentives written by advertising engineers.",
      "The countermeasures are developing their own economy of ideas. Regulation arrives by analogy — attention as a public health concern, screen time as a consumer protection matter, algorithmic amplification as something to be audited like any other infrastructure that concentrates power. Design counters design: ethical interfaces with stopping cues, feed-less products, devices marketed by what they refuse to do. And a quieter movement treats attention itself as the asset — the deliberate retraining of focus, the defense of boredom as the soil of original thought.",
      "The stakes are best seen at the individual scale, where the abstraction becomes biography. A person's attention is the raw material of every skill they will build, every relationship they will deepen, every idea they will have. To surrender its allocation to an optimizing system is to outsource the composition of one's life. The attention economy's deepest product, in the end, is not the ads sold — it is the habits formed in the people who watched them."
    ],
    gloss: {
      "gaze":      { pos: "n.",    def: "注视；目光" },
      "commodity": { pos: "n.",    def: "商品" },
      "awareness": { pos: "n.",    def: "意识；觉察" },
      "advertiser": { pos: "n.",   def: "广告主" },
      "engagement": { pos: "n.",   def: "用户参与度" },
      "scroll":    { pos: "n.",    def: "滚动（流）" },
      "autoplay":  { pos: "n.",    def: "自动连播" },
      "residue":   { pos: "n.",    def: "残留（注意力残留）" },
      "suppress":  { pos: "v.",    def: "抑制；压抑" },
      "untrained": { pos: "adj.",  def: "被荒废的（训练消退的）" },
      "palette":   { pos: "n.",    def: "调色板；范围" },
      "outrage":   { pos: "n.",    def: "愤怒；义愤" },
      "tribal":    { pos: "adj.",  def: "部落式的；阵营的" },
      "amplification": { pos: "n.", def: "放大（效应）" },
      "audit":     { pos: "v.",    def: "审计" },
      "boredom":   { pos: "n.",    def: "无聊" },
      "biography": { pos: "n.",    def: "传记；人生轨迹" },
      "outsource": { pos: "v.",    def: "外包" }
    }
  },

  { id: "a93", lv: 3, lvName: "高", topic: "健康·睡眠",
    title: "The Overnight Shift of the Mind",
    titleZh: "大脑的夜班——睡眠的科学",
    paras: [
      "Sleep was the embarrassment of twentieth-century science: a state in which every measurable output drops, one that consumes a third of every human life, and that no theory could convincingly cost-justify. Evolution, ruthless with waste, allowed it — which meant sleep was doing something the laboratories had failed to invoice. The invoice has now been itemized, and it is the length of a library.",
      "The night shift runs in cycles of roughly ninety minutes, each a descent through stages with separate jobs. Deep slow-wave sleep is the physical restoration wing — growth hormone release, immune recalibration, the synaptic down-scaling that keeps networks trim. REM sleep, the stage of vivid dreams, is the integration bureau: emotional memory filed with the sting removed, procedural skills consolidated, the brain's off-line rehearsal of what waking rehearsed badly.",
      "The most celebrated discovery is the glymphatic system — the brain's overnight plumbing. Cerebrospinal fluid flushes along channels that widen only in deep sleep, carrying away the metabolic debris of the day, including the protein waste whose accumulation marks neurodegenerative disease. The metaphor writes itself: the office that never cleans at night eventually drowns in its own paper. Chronic short sleep is now tracked, in long-horizon studies, as a risk factor with the seriousness once reserved for smoking.",
      "The performance data have dismantled the macho arithmetic of sleeping less. After seventeen waking hours, cognitive impairment matches legal drunkenness; a week of six-hour nights produces a deficit the sleeper can no longer perceive — subjective adaptation, objective decline. The one percent of short-sleepers with genetic luck are a footnote, not a plan. The all-nighter's true cost is revealed by its curve: the hours gained are spent at half-power, and the debt compounds interest in the hippocampus for days after.",
      "The practical science has condensed into a short, unglamorous list. Consistency of timing outweighs duration gymnastics — the circadian system prizes regularity above heroics. Light is the master signal: bright mornings to open the day, dim last hours to close it, and the screen's blue fraction down-shifted or banished. Temperature drops the body into sleep, hence the cool room and warm bath paradox. Caffeine has a six-hour half-life, which makes the four-o'clock coffee a mortgage on the first deep cycle of the night.",
      "What the science keeps circling is a reframing: sleep is not the opposite of productivity but its substrate — the offline maintenance that makes the online hours worth anything. The industries now built around its optimization, from sleep clinics to tracker rings, are downstream of a simpler cultural admission: the all-conquering waking mind turns out to have been a night-shift worker all along, dependent on a department it spent centuries pretending not to need."
    ],
    gloss: {
      "embarrassment": { pos: "n.", def: "难堪；令学界困惑之物" },
      "itemize":   { pos: "v.",    def: "逐项列出" },
      "slow-wave": { pos: "adj.",  def: "慢波（深睡眠）的" },
      "hormone":   { pos: "n.",    def: "激素" },
      "synaptic":  { pos: "adj.",  def: "突触的" },
      "down-scaling": { pos: "n.", def: "缩幅（突触修剪）" },
      "integration": { pos: "n.",  def: "整合" },
      "consolidate": { pos: "v.",  def: "巩固（记忆）" },
      "glymphatic": { pos: "adj.", def: "胶淋巴（系统）的" },
      "cerebrospinal": { pos: "adj.", def: "脑脊液的" },
      "debris":    { pos: "n.",    def: "碎屑；代谢垃圾" },
      "neurodegenerative": { pos: "adj.", def: "神经退行性的" },
      "impairment": { pos: "n.",   def: "损伤；机能减退" },
      "subjective": { pos: "adj.", def: "主观的" },
      "circadian": { pos: "adj.",  def: "昼夜节律的" },
      "half-life": { pos: "n.",    def: "半衰期" },
      "mortgage":  { pos: "n.",    def: "抵押（比喻预支代价）" },
      "substrate": { pos: "n.",    def: "基底；根基" }
    }
  },

  { id: "a94", lv: 3, lvName: "高", topic: "科技·伦理",
    title: "The Moral Machine Problem",
    titleZh: "道德机器难题——人工智能伦理",
    paras: [
      "A trolley is hurtling toward five people; you may pull a lever to divert it onto one. Philosophy departments ran this thought experiment for fifty years to map the contours of moral intuition, and it remained safely hypothetical — until the lever was welded to a steering column and the philosopher became a certification requirement. The autonomous vehicle did not invent machine ethics; it merely removed the excuse of abstraction.",
      "The trolley framing, however, flatters the problem by oversimplifying it. Real machine-ethics dilemmas are not single dramatic switches but millions of quiet calibrations: a medical triage model's threshold for denying a scan; a hiring algorithm's implicit discount of career gaps; a content recommender's balance between engagement and truth; a credit model trained on a history of redlined neighborhoods. Each setting encodes a value judgment, each dataset a prejudice of the past, and neither announces itself — bias enters the pipeline as arithmetic and exits as policy.",
      "Three fault lines organize the field. The alignment problem asks whether powerful optimizing systems can be made to want what we want — trivially easy to state, unsolved in practice, and growing less abstract as systems plan across longer horizons. The fairness problem asks which of mathematics' many incompatible definitions of fairness a society should mandate, since satisfying one provably violates another. The accountability problem asks who answers when the machine errs — the developer, the deployer, the data, or the user who trusted it — and current law answers mostly with silence and occasionally with scapegoats.",
      "The governance experiments have begun in earnest. The European Union's regulatory approach imposes risk tiers and documentation duties on high-stakes systems; China has moved first with binding rules for recommendation algorithms and generative content; standard-setters are exporting checklists — audit trails, human-in-the-loop provisions, incident reporting — that turn ethics from seminar to compliance department. Critics on all sides see the same flaw: regulation certifies the paperwork, not the conscience.",
      "The engineers' own front is a discipline in formation. Interpretability research opens the black box to inspection — tracing which features moved a decision; fairness toolkits measure disparities across the groups the law protects; red-teaming deploys adversarial humans to break the system before the public does. The uncomfortable finding recurs: making a system explainable can degrade it, and making it fair by one metric unfair by another — every technical choice is revealed as the moral choice it always was.",
      "The deepest issue predates the machines and will outlast them. Every human institution already embeds value judgments at scale — courts, markets, insurance tables — and societies learned, slowly and incompletely, to subject them to appeal, revision and shame. The question the machine age actually poses is whether we will hold our artifacts to the standard we only sometimes met ourselves: decisions that are transparent about their values, contestable by those they govern, and humble before the cases they cannot see."
    ],
    gloss: {
      "trolley":   { pos: "n.",    def: "（有轨）电车" },
      "hurtle":    { pos: "v.",    def: "飞驰；猛冲" },
      "hypothetical": { pos: "adj.", def: "假设的" },
      "certification": { pos: "n.", def: "认证" },
      "abstraction": { pos: "n.",  def: "抽象" },
      "calibration": { pos: "n.",  def: "校准；参数设定" },
      "triage":    { pos: "n.",    def: "分诊；甄别" },
      "implicit":  { pos: "adj.",  def: "隐含的" },
      "redline":   { pos: "v.",    def: "划红线（贷款歧视）" },
      "prejudice": { pos: "n.",    def: "偏见" },
      "alignment": { pos: "n.",    def: "（价值）对齐" },
      "provably":  { pos: "adv.",  def: "可证明地" },
      "accountability": { pos: "n.", def: "问责" },
      "scapegoat": { pos: "n.",    def: "替罪羊" },
      "interpretability": { pos: "n.", def: "可解释性" },
      "adversarial": { pos: "adj.", def: "对抗性的" },
      "contestable": { pos: "adj.", def: "可质疑的；可申诉的" }
    }
  },

  { id: "a95", lv: 3, lvName: "高", topic: "环境·城市",
    title: "Cities That Breathe Heat",
    titleZh: "会呼吸热的城市——城市热岛",
    paras: [
      "On a still August evening, drive from the countryside into any large city with a thermometer on the dashboard. In twenty kilometers the reading climbs — three, five, sometimes eight degrees — and the reason is not the weather. It is the city itself: an island of its own climate, constructed from asphalt, masonry and the waste heat of everything the modern world plugs in. Meteorologists mapped the effect two centuries ago; this century made it a health crisis.",
      "The physics of the heat island is a tale of materials and geometry. Stone and asphalt store the day's solar energy and release it slowly through the night, so the urban dusk starts pre-heated; the deep street canyon traps radiation that open ground would shed; the absence of vegetation removes the ancient air conditioner of evapotranspiration — a mature tree can transpire hundreds of liters of water on a hot day, spending it as cooling. Four million square meters of parking lot does neither.",
      "The health ledger is the part that turned concern into policy. Heat is the deadliest weather phenomenon of the modern era — deadlier in most countries than storms and floods combined — and its victims fall along the heat island's gradient: the dense wards, the top floors without insulation, the apartments whose windows open onto exhaust vents. The 2003 European heatwave, seventy thousand excess deaths, rewrote the continent's emergency planning; every heat plan since has begun with a map of which streets kill.",
      "The countermeasures are the rare climate solutions that pay for themselves. Urban forestry returns shade, cooling and storm absorption — the albedo-and-canopy combination can cut local afternoon temperature several degrees. Reflective roofs and light-colored pavement raise the albedo that dark cities erased. Water features and wind corridor planning restore the physics of the pre-urban site. District cooling replaces ten thousand compressor units with one efficient plant. Each measure compounds the others, and none requires inventing anything.",
      "The inequality maps onto the geography with uncomfortable precision. The leafiest districts — oldest money, tallest trees — run coolest; the concreted quarters of the poor run hottest, in the same city, on the same day. Heat-vulnerability indices now blend surface temperature, age structure, health and air-conditioning access into planning maps, and tree canopy equity has entered city politics with its own data dashboard. Adaptation, it turns out, is not only engineering but distribution.",
      "The long arc bends toward redesign. Cities that began as answers to cold — dense, walled, absorbing — must become instruments of cooling: porous, reflective, greened, watered, and lit by less waste heat. The transformation is measured in decades of planting and repaving, punctuated by the emergency of each record summer. The cities that breathe heat are learning, street by street, to exhale."
    ],
    gloss: {
      "asphalt":   { pos: "n.",    def: "沥青" },
      "masonry":   { pos: "n.",    def: "砖石结构" },
      "canyon":    { pos: "n.",    def: "（街道）峡谷效应" },
      "evapotranspiration": { pos: "n.", def: "蒸散（作用）" },
      "transpire": { pos: "v.",    def: "蒸腾" },
      "ledger":    { pos: "n.",    def: "账簿；账" },
      "gradient":  { pos: "n.",    def: "梯度" },
      "insulation": { pos: "n.",   def: "隔热；绝缘" },
      "exhaust":   { pos: "n.",    def: "排气" },
      "vent":      { pos: "n.",    def: "通风口" },
      "excess":    { pos: "adj.",  def: "超额的（超额死亡）" },
      "albedo":    { pos: "n.",    def: "反照率" },
      "canopy":    { pos: "n.",    def: "林冠（覆盖率）" },
      "corridor":  { pos: "n.",    def: "（通风）廊道" },
      "compressor": { pos: "n.",   def: "压缩机" },
      "porous":    { pos: "adj.",  def: "多孔透水的" },
      "repave":    { pos: "v.",    def: "重铺（路面）" },
      "exhale":    { pos: "v.",    def: "呼出" }
    }
  },

  { id: "a96", lv: 3, lvName: "高", topic: "经济·货币",
    title: "Money Is Losing Its Body",
    titleZh: "货币正在失去它的肉身",
    paras: [
      "Money has worn many bodies — shells on Pacific beaches, salt blocks in Ethiopia, silver shekels, paper notes backed by gold and then by nothing but habit. Each body was a technology, chosen for scarcity and trust, and each eventually died of obsolescence. The body now dissolving is the physical one itself: in a growing share of the world's economies, money is already a ledger entry that never materializes, and the changes underway are a fight over what replaces the cash it leaves behind.",
      "Three successors are contesting the inheritance. The private digital ledger is the incumbent: bank balances and phone wallets that are, in truth, entries in databases, moving through card networks and payment apps. Its strength is distribution and its weakness is concentration — a handful of firms and banks becoming the gatekeepers of spending, with fees, surveillance and de-platforming as their quiet powers.",
      "The second successor is the cryptographic one. Bitcoin proposed money as a ledger with no custodian — trust replaced by proof-of-work and replication — an experiment whose monetary policy was written before its first block and cannot be changed by anyone's fiat. Its descendants split the ambition: some seek digital gold, others programmable settlement rails, stablecoins the bridge back to familiar units. The technology has survived a dozen declared deaths; what it has not yet earned is the ordinariness that money requires — the boring reliability of a ten-yuan note.",
      "The third successor is the sovereign digital currency — the central bank issuing directly to wallets, money as a public utility rather than a bank liability. Pilots across dozens of economies test programmable subsidies, offline payments, instant settlement; the objections are equally serious — disintermediating the banking system, building an instrument of perfect surveillance, and handing governments a kill-switch no cash economy ever contained. The design debates are, in reality, constitutional ones: which freedoms live inside the money itself.",
      "Beneath the contest, the economics of scale operate without sentiment. Digital money is cheaper to move, harder to tax invisibly, impossible to counterfeit, and traceable to a degree cash never permitted — properties that recommend it to treasuries and horrify dissidents in equal measure. The informal economies of the world, the remittance corridors that charge the poor the highest fees on earth, and the central banks watching private networks mint money-like things without permission: all are being pulled toward the same ledger future at different speeds.",
      "What history suggests is that the body matters less than the discipline it enforces. Gold's scarcity, the issuer remaining solvent, the database's integrity — each body was a technology for making promises expensive to break. The question the cashless century actually faces is not which interface wins but whose promise discipline persists when money can be created, frozen, watched or programmed by whoever holds the ledger. Money is losing its body; the argument is over its soul."
    ],
    gloss: {
      "ledger":    { pos: "n.",    def: "账本" },
      "materialize": { pos: "v.",  def: "实体化；出现" },
      "obsolescence": { pos: "n.", def: "过时；报废" },
      "incumbent": { pos: "n.",    def: "在位者" },
      "gatekeeper": { pos: "n.",   def: "守门人" },
      "de-platform": { pos: "v.",  def: "封禁账户（逐出平台）" },
      "custodian": { pos: "n.",    def: "托管人；保管者" },
      "proof-of-work": { pos: "n.", def: "工作量证明" },
      "replication": { pos: "n.",  def: "（账本）复制" },
      "fiat":      { pos: "n.",    def: "法定（命令）；法偿货币" },
      "settlement": { pos: "n.",   def: "结算" },
      "stablecoin": { pos: "n.",   def: "稳定币" },
      "sovereign": { pos: "adj.",  def: "主权的" },
      "utility":   { pos: "n.",    def: "公共设施；效用" },
      "liability": { pos: "n.",    def: "负债" },
      "programmable": { pos: "adj.", def: "可编程的" },
      "disintermediate": { pos: "v.", def: "去中介化" },
      "kill-switch": { pos: "n.",  def: "（远程）关闭开关" },
      "remittance": { pos: "n.",   def: "汇款" },
      "mint":      { pos: "v.",    def: "铸造（货币）" },
      "discipline": { pos: "n.",   def: "纪律；约束机制" },
      "solvent":   { pos: "adj.",  def: "有偿付能力的" }
    }
  },

  { id: "a97", lv: 3, lvName: "高", topic: "文化·语言",
    title: "The Quiet Extinction",
    titleZh: "寂静的消亡——语言的死亡",
    paras: [
      "In a village in the Andes, an elderly woman is the last fluent speaker of a language that once negotiated empires. When she dies, so does a literature, an oral history, a way of parsing the alpine world into words — and the event will make no headline, because it happens, on average, every few weeks somewhere on Earth. Linguists' mid-range projections are stark: of the roughly seven thousand languages spoken today, perhaps half will fall silent within a century.",
      "Languages rarely die of linguistic weakness; they die of social arithmetic. A language survives when its speakers find advantage in transmitting it — markets, marriage, status, schooling conducted in the tongue. It dies when parents make the rational, loving calculation that their children's prospects run through the dominant language alone, and the transmission chain breaks in a single generation. The killer is not grammar but economics, backed occasionally by the harder instruments of forced schooling, relocation and shame.",
      "What is lost with each language is not merely a list of words. Each tongue is a completed experiment in cognition: taxonomies of ice that carve the Arctic into navigable categories; evidential systems that grammatically encode how you know what you assert; mathematical structures that count by twenties or leave nouns unnumbered. Whole literatures — epics, songs, legal formulas, botanical knowledge refined over millennia — exist in no other medium. A library burns with each last speaker, and the library had only one copy.",
      "The counter-movement has learned what works, mostly by failing first. Reverence and recording preserve archives, not speakers; a language in a database is a specimen, not a life. Revival succeeds where it rebuilds the transmission condition: immersion schools that make the tongue the medium of real knowledge; media — pop songs, radio, dubbed cartoons — that make it the medium of desire; official status that makes it a medium of paperwork and power. Hebrew remains the great proof of concept: a liturgical language re-engineered into the daily speech of millions. Welsh, Māori and Hawaiian chart the modern playbook at smaller scale.",
      "The digital era cuts both ways with unprecedented sharpness. The platform economy's indifference — interfaces unsupported, keyboards unadapted, autocorrect mocking minority spellings — accelerates abandonment; a language absent from the phone's world is absent from a teenager's. Yet the same tools enable the largest-scale transmission ever attempted: endangered languages gaining keyboards, speech corpora, online courses and subtitled media that reach scattered speakers no village school ever could. The keyboard is becoming the new battleground of continuity.",
      "The stakes are finally a matter of what humanity wants to be. A monoculture of a hundred mega-languages is computationally efficient and imaginatively poor — a world converging on fewer ways to say morning. Every surviving small language is a control group for the human mind, a variation that proves our repertoire. The quiet extinction is not fate; it is the aggregate of a million private decisions, each rational, that only collective choices — schools, bandwidth, respect — can bend. Languages do not disappear. They are decided away, which means they can also be decided back."
    ],
    gloss: {
      "fluent":    { pos: "adj.",  def: "流利的" },
      "projection": { pos: "n.",   def: "预测；推算" },
      "arithmetic": { pos: "n.",   def: "算术（理性计算）" },
      "transmission": { pos: "n.", def: "（语言）传承" },
      "prospects": { pos: "n.",    def: "前途；前景" },
      "taxonomy":  { pos: "n.",    def: "分类体系" },
      "evidential": { pos: "adj.", def: "证据性（语法）的" },
      "encode":    { pos: "v.",    def: "编码；体现" },
      "epic":      { pos: "n.",    def: "史诗" },
      "botanical": { pos: "adj.",  def: "植物学的" },
      "specimen":  { pos: "n.",    def: "标本" },
      "immersion": { pos: "n.",    def: "沉浸式（教学）" },
      "liturgical": { pos: "adj.", def: "礼仪（语言）的" },
      "playbook":  { pos: "n.",    def: "剧本；成套方法" },
      "autocorrect": { pos: "n.",  def: "自动纠错" },
      "corpora":   { pos: "n.",    def: "语料库（复数）" },
      "monoculture": { pos: "n.",  def: "单一文化" },
      "repertoire": { pos: "n.",   def: "全部曲目；能力库" },
      "collective": { pos: "adj.", def: "集体的" }
    }
  },

  { id: "a98", lv: 3, lvName: "高", topic: "社会·消费",
    title: "Wearing the Machine Slowly",
    titleZh: "慢慢穿旧一台机器——慢时尚运动",
    paras: [
      "A cotton T-shirt travels a longer road than most people's careers: fiber spun in one country, knit in another, dyed with chemicals formulated in a third, cut and sewn in a fourth, air-freighted with the season's palette to a fifth, worn an average of seven times, and landfilled or incinerated within a year. The fashion industry moves a hundred billion garments a year through this pipeline — one of the great industrial achievements of the age, and one of its most exacting ecological bills.",
      "Fast fashion's genius was compressing the calendar. Where the industry once worked in four seasons, it learned to work in fifty-two micro-seasons — design to rack in weeks, prices pitched below the cost of repair, psychology tuned to the dopamine of novelty. The garment became disposable by construction: quality engineered to a price point, trends engineered to expire. Consumption followed: clothing production doubled in fifteen years while the average garment's life before discard collapsed.",
      "The environmental ledger is the movement's founding text. Fashion's emissions rival aviation's; a single kilogram of cotton embodies thousands of liters of water in the right river basin; polyester garments shed microfibers into every wash and thence into every ocean food web; dye houses discharge to the rivers of manufacturing regions; and the post-consumer stream — less than one percent recycled into new clothing — is the industry's quiet monument to linearity.",
      "Slow fashion answers with a philosophy before a business model: garments as durable goods, valued for craft and kept for years. Its practices range from the artisanal — natural fibers, visible mending, tailoring — to the industrial: capsule collections, made-to-order manufacturing that kills overproduction, rental and resale platforms that raise each garment's working hours, and design for easy disassembly that lets a coat's fibers return to spinning. The brands that practice it speak in decades; the customers who follow it learn to read a garment like an engineer — seam density, fiber content, construction honesty.",
      "The economics of the shift are the honest battleground. Ethical production costs more at the rack and less at the planetary level — externalities made visible as price. Fast fashion's defenders note, correctly, that cheap clothing lifted a global wardrobe floor, and that the industry's wages, however jarring, anchor regional economies. The movement's counter is that the current model's discount is drawn on accounts no one signed: aquifers, climate, and the workers at the seams, whose factory disasters gave the movement its martyrs and its catalytic conscience.",
      "The consumer end of the bargain is cultural, and it is moving: the resale market growing faster than retail itself; the repair cafe and visible mending of garments as quiet status; the capsule wardrobe as a productivity philosophy worn on the body. Fashion was always the most honest of industries — it tells you exactly what it thinks you are. The slow movement is the sector's ongoing renegotiation of that answer: not a walking billboard of the new, but a second skin with a biography, kept long enough to be worth writing."
    ],
    gloss: {
      "garment":   { pos: "n.",    def: "衣服；服装" },
      "knit":      { pos: "v.",    def: "针织" },
      "dye":       { pos: "v./n.", def: "染色；染料" },
      "palette":   { pos: "n.",    def: "（当季）配色系列" },
      "landfill":  { pos: "v./n.", def: "填埋（垃圾场）" },
      "incinerate": { pos: "v.",   def: "焚毁" },
      "micro-season": { pos: "n.", def: "微型季度" },
      "dopamine":  { pos: "n.",    def: "多巴胺" },
      "novelty":   { pos: "n.",    def: "新鲜感" },
      "discard":   { pos: "v.",    def: "丢弃" },
      "linearity": { pos: "n.",    def: "线性（生产-废弃）" },
      "artisanal": { pos: "adj.",  def: "手工艺的" },
      "mending":   { pos: "n.",    def: "缝补" },
      "capsule":   { pos: "adj.",  def: "胶囊（精简）式的" },
      "disassembly": { pos: "n.",  def: "拆解" },
      "externality": { pos: "n.",  def: "外部性（成本）" },
      "aquifer":   { pos: "n.",    def: "含水层" },
      "martyr":    { pos: "n.",    def: "殉道者；标志性牺牲" },
      "biography": { pos: "n.",    def: "传记；来历" }
    }
  },

  { id: "a99", lv: 3, lvName: "高", topic: "工程·能源",
    title: "The Largest Machine Needs a New Brain",
    titleZh: "最大的机器需要新大脑——电网的世纪挑战",
    paras: [
      "Physicists have a favorite half-joke: the power grid is the largest machine ever built. Millions of synchronized generators, tens of thousands of kilometers of conductor, frequency held to fractions of a hertz across continents — a single spinning organism of steel and copper, governed by the strictest physics of any infrastructure. That machine is now being asked to change its fuel, its architecture and its control philosophy simultaneously, mid-flight, over one human lifetime.",
      "The stress arrives from physics first. The old grid ran on rotating mass — turbine generators whose spinning inertia was a shock absorber, smoothing the balance between load and generation by sheer momentum. Solar and wind produce electricity through electronics that provide none; a grid of high renewable share is a grid of lower physical inertia, where a fault propagates faster and the milliseconds available for response shrink. The system's stabilizers must now be synthesized — batteries and inverters programmed to mimic and improve upon the flywheel.",
      "The second stress is geography. The best wind and sun lie far from the load — deserts, plateaus, shallow seas — so the transmission build-out is continental in scale: high-voltage direct current corridors moving tens of gigawatts across thousands of kilometers with losses the AC era could not approach. China's ultra-high-voltage lines carry western sunlight to eastern factories; Europe debates desert-to-continent links; the grid becomes, for the first time, a machine whose purpose includes the relocation of weather.",
      "The third stress is the demand side growing teeth. A century of passive consumption is ending: electric vehicles are batteries that park in driveways; heat pumps convert building stock into thermal storage; industrial electrolyzers can eat when power is cheap and idle when it is scarce. The smart grid's founding idea — demand as a dispatchable resource — finally has the hardware to run on. Its price is an information architecture the grid never needed: meters that negotiate, tariffs that change by the minute, and an attack surface measured in every connected appliance.",
      "The reliability margin is where the politics concentrates. Variable generation forces every system to solve the dunkelflaute — the dark, windless fortnight — with storage, overbuild, interconnection, or firm backup, and each solution offends someone's cost-benefit analysis. California and Germany publish the emerging doctrine in their outage statistics; the industry's own vocabulary has shifted from baseload to flexibility as the organizing virtue. The grid of the future is less a cathedral than a market-clearing organism that treats every electron and every idle vehicle as a bid.",
      "The decade's verdict will be written in two numbers: kilometers of wire built and hours of storage dispatched. Both must scale by an order of magnitude while the machine — the same one, still synchronized, still physics-bound — continues to deliver the most taken-for-granted miracle of modern life every second of the transition. Rebuilding the largest machine while it runs: history's largest piece of live maintenance, performed on all of civilization at once."
    ],
    gloss: {
      "synchronize": { pos: "v.",  def: "使同步" },
      "hertz":     { pos: "n.",    def: "赫兹" },
      "inertia":   { pos: "n.",    def: "惯性（转动惯量）" },
      "absorber":  { pos: "n.",    def: "减振器；吸收器" },
      "momentum":  { pos: "n.",    def: "动量" },
      "inverter":  { pos: "n.",    def: "逆变器" },
      "flywheel":  { pos: "n.",    def: "飞轮" },
      "corridor":  { pos: "n.",    def: "（输电）廊道" },
      "gigawatt":  { pos: "n.",    def: "吉瓦（十亿瓦）" },
      "relocation": { pos: "n.",   def: "重新布局" },
      "thermal":   { pos: "adj.",  def: "热（能储存）的" },
      "electrolyzer": { pos: "n.", def: "电解槽" },
      "dispatchable": { pos: "adj.", def: "可调度的" },
      "tariff":    { pos: "n.",    def: "（电价）费率" },
      "dunkelflaute": { pos: "n.", def: "暗风期（无光无风时段）" },
      "overbuild": { pos: "n.",    def: "超配（装机冗余）" },
      "interconnection": { pos: "n.", def: "（电网）互联" },
      "baseload":  { pos: "n.",    def: "基荷" },
      "flexibility": { pos: "n.",  def: "灵活性（调节能力）" },
      "maintenance": { pos: "n.",  def: "检修；维护" }
    }
  },

  { id: "a100", lv: 3, lvName: "高", topic: "文化·阅读",
    title: "Deep Reading in the Age of the Feed",
    titleZh: "信息流时代的深阅读",
    paras: [
      "There is a specific, ancient act — the long, absorbed passage through a demanding text, attention held steady across pages, meaning accumulating like interest — and for most of literate history it was simply called reading. It now needs an adjective. Deep reading has become a practice defended in essays, trained in courses, and practiced by appointment, because its natural habitat has been drained by the feed: the endless, personalized, thumb-scrollable stream that reorganized the written word around interruption.",
      "The two modes are not rivals but different species. Feed reading is reconnaissance — fast, wide, shallow by design, optimized for orientation and for the feeling of being current. Deep reading is digestion: slow integration of long arcs of thought, the construction in working memory of a model that only exists if nothing displaces it. The skills are real and separable, and each will atrophy without use. The worry documented in reading research is not that people read less; it is that the deep mode, once the default, is becoming the exception — trained out by a decade of reinforcement for the shallow one.",
      "The literary essayists who declared a crisis were early; the cognitive data arrived later and more precisely. Eye-tracking studies show screen reading settling into F-shaped scanning patterns — full first lines, then skims; comprehension studies find long digital texts understood worse than the same texts on paper, with the gap widening as the text demands more integration. The medium is not destiny — motivated readers go deep on screens daily — but the default settings matter, and the default settings of the feed are set against depth by the economics that fund it.",
      "The counterpractice is neither nostalgia nor retreat. Print persists because its affordances — fixity, boundedness, absence of the next thing — are engineering choices that favor absorption; the e-reader stripped of notifications is the same choice in silicon. The practical craft is architectural: reading as a scheduled place, not a stolen moment; long texts given whole evenings rather than interstitial minutes; notes taken by hand, which forces the re-expression that seals memory. The serious readers of the feed age are not those who fled it, but those who built walls with doors in them.",
      "What is actually at stake exceeds culture-war noise about screens. The long text is one of the few technologies that trains sustained synthetic thought — the construction of an argument's whole shape, held in mind, compared with reality. Democracies run on the ability of citizens to follow an argument longer than a headline; sciences run on papers whose methods sections demand half an hour of integration; professions run on statutes, contracts and codebases that punish the skim. A civilization optimizing itself for reconnaissance alone is amputating its capacity for digestion.",
      "The honest conclusion is symmetrical. The feed is genuine progress — access, breadth, the democratization of the written word at a scale Gutenberg never imagined; nobody sane exchanges it away. Deep reading is also genuine — irreplaceable, trainable, and newly fragile. The age's task is not choosing between them but sequencing them: reconnaissance to find, digestion to keep. The feed brings the world to your thumb; the book still brings your mind to the world."
    ],
    gloss: {
      "absorbed":  { pos: "adj.",  def: "专注入迷的" },
      "accumulate": { pos: "v.",   def: "积累" },
      "habitat":   { pos: "n.",    def: "栖息地" },
      "reconnaissance": { pos: "n.", def: "侦察（式浏览）" },
      "digestion": { pos: "n.",    def: "消化（吸收）" },
      "displace":  { pos: "v.",    def: "取代；挤走" },
      "atrophy":   { pos: "v./n.", def: "萎缩" },
      "reinforcement": { pos: "n.", def: "强化（训练）" },
      "eye-tracking": { pos: "n.", def: "眼动追踪" },
      "comprehension": { pos: "n.", def: "理解（力）" },
      "affordance": { pos: "n.",   def: "可供性（界面的自然倾向）" },
      "boundedness": { pos: "n.",  def: "有界性（有限篇幅）" },
      "interstitial": { pos: "adj.", def: "间隙的（碎片时间）" },
      "amputate":  { pos: "v.",    def: "截肢；切除" },
      "symmetrical": { pos: "adj.", def: "对称的；两面平衡的" },
      "democratization": { pos: "n.", def: "民主化；普及化" },
      "sequencing": { pos: "n.",   def: "排序；先后安排" }
    }
  }
];

/* ---------------- 合并进全局数据层（须在 data.js 之后加载） ----------------
   ① 新文章注入 ARTICLES；
   ② 新文章 gloss 注入 DICT（悬浮取词 / 词汇栏 / 新闻热词共享同一词典）。 */
if (typeof ARTICLES !== "undefined" && Array.isArray(EV_ARTICLES_EXT)) {
  EV_ARTICLES_EXT.forEach(a => {
    ARTICLES.push(a);
    if (typeof DICT !== "undefined" && a.gloss) {
      Object.keys(a.gloss).forEach(k => {
        if (!(k in DICT)) DICT[k] = { pos: a.gloss[k].pos, def: a.gloss[k].def, lv: "阅读", src: "gloss" };
      });
    }
  });
}
