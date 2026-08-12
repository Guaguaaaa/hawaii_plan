/**
 * Hawaii Oahu Trip 2026 — single editable data source.
 * Keep this file public-safe: never add real names, contact details, home
 * addresses, identity documents, booking references, or private photos.
 */

export const TRIP_DATA = {
  meta: {
    title: "夏威夷Oahu岛 6天5晚",
    subtitle: "2026.08.16 — 2026.08.21",
    startDate: "2026-08-16",
    endDate: "2026-08-21",
    destination: "Honolulu, Oahu, Hawaii",
    destinationLabel: "夏威夷 · 欧胡岛",
    tagline: "和宝贝一起，吹海风",
    exchangeRate: 7.25,
    travelers: 2,
    homeTimezone: "America/Los_Angeles",
    destinationTimezone: "Pacific/Honolulu"
  },

  urgentCare: [
    {
      id: "clinic-straub",
      name: "Straub Doctors on Call",
      context: "Sheraton 酒店内",
      location: "Sheraton Waikiki Beach Resort Lower Level",
      phone: "(808) 971-6000",
      hours: "每天 08:00–18:00",
      mapQuery: "Doctors on Call at Sheraton Waikiki",
      notes: "提供门诊、X 光和化验；可查询 Waikiki 区域酒店接送服务。"
    },
    {
      id: "clinic-kuhio",
      name: "Kuhio Medical Clinic",
      context: "Malia 酒店附近",
      location: "2310 Kuhio Ave, Suite 223",
      phone: "(808) 924-6688",
      hours: "周一至周五 08:00–17:00，周六 09:00–17:00",
      mapQuery: "Kuhio Medical Clinic Honolulu",
      notes: "距 Waikiki Malia 步行约 1 分钟。"
    },
    {
      id: "clinic-doctors-waikiki",
      name: "Doctors of Waikiki",
      context: "营业至晚间",
      location: "120 Liliuokalani Ave #101, Honolulu",
      phone: "(808) 922-2112",
      hours: "每天 08:00–22:00",
      mapQuery: "Doctors of Waikiki",
      notes: "适合晚间非危及生命的不适就医。"
    },
    {
      id: "clinic-urgent-waikiki",
      name: "Urgent Care Clinic of Waikiki",
      context: "Kalakaua 大道",
      location: "2155 Kalakaua Ave, Suite 308",
      phone: "(808) 924-3399",
      hours: "周一至周五 09:00–17:00，周日 09:00–12:00",
      mapQuery: "Urgent Care Clinic of Waikiki",
      notes: "可向诊所确认 Waikiki 区域出租车接送服务。"
    }
  ],

  tasks: [
    {
      id: "book-flights",
      group: "bookings",
      title: "确认洛杉矶往返檀香山机票",
      priority: "high",
      dueAt: "2026-08-07T18:00:00-07:00",
      deadlineLabel: "已于 8/7 确认",
      status: "done",
      fixedDone: true,
      notes: "AS803：8/16 10:05–12:58；AS826：8/21 11:33–19:53。"
    },
    {
      id: "book-malia-first",
      group: "bookings",
      title: "确认 Waikiki Malia 首晚住宿",
      priority: "urgent",
      dueAt: "2026-08-12T18:00:00-07:00",
      deadlineLabel: "已确认",
      status: "done",
      fixedDone: true,
      notes: "8/16 入住，1 晚。"
    },
    {
      id: "book-sheraton",
      group: "bookings",
      title: "确认 Sheraton Waikiki 住宿",
      priority: "urgent",
      dueAt: "2026-08-12T18:00:00-07:00",
      deadlineLabel: "已确认",
      status: "done",
      fixedDone: true,
      notes: "8/17–8/18 入住，2 晚。"
    },
    {
      id: "book-malia-last",
      group: "bookings",
      title: "确认 Waikiki Malia 后段住宿",
      priority: "urgent",
      dueAt: "2026-08-12T18:00:00-07:00",
      deadlineLabel: "已确认",
      status: "done",
      fixedDone: true,
      notes: "8/19–8/20 入住，2 晚。"
    },
    {
      id: "book-rental-car",
      group: "bookings",
      title: "预订 Waikiki 门店租车",
      priority: "urgent",
      dueAt: "2026-08-12T18:00:00-07:00",
      deadlineLabel: "尽快",
      status: "todo",
      notes: "Avis / Hertz；计划 8/18 早至 8/20 晚。"
    },
    {
      id: "book-kualoa",
      group: "tickets",
      title: "预订 Kualoa Ranch 热门项目",
      priority: "high",
      dueAt: "2026-07-20T18:00:00-10:00",
      deadlineLabel: "建议提前 1 个月",
      status: "todo",
      notes: "UTV Tour / Movie Sites Tour / Jungle Adventure。"
    },
    {
      id: "book-pearl-harbor",
      group: "tickets",
      title: "预约 USS Arizona Memorial",
      priority: "high",
      dueAt: "2026-08-19T15:00:00-10:00",
      deadlineLabel: "提前 8 周或前一天 15:00",
      status: "todo",
      notes: "通过 Recreation.gov 查询和预约。"
    },
    {
      id: "book-diamond-head",
      group: "tickets",
      title: "预约 Diamond Head 登顶时段",
      priority: "medium",
      dueAt: "2026-08-03T18:00:00-10:00",
      deadlineLabel: "建议提前 14 天",
      status: "todo",
      notes: "目标：8/17 06:30 时段。"
    },
    {
      id: "book-hanauma",
      group: "tickets",
      title: "预约 Hanauma Bay 入园",
      priority: "urgent",
      dueAt: "2026-08-16T07:00:00-10:00",
      deadlineLabel: "提前 2 天当地时间 07:00",
      status: "todo",
      notes: "出发前再次确认开放日与预约规则。"
    },
    {
      id: "prep-documents",
      group: "preparation",
      title: "检查旅行证件与驾照材料",
      priority: "high",
      dueAt: "2026-08-09T18:00:00-07:00",
      deadlineLabel: "出发前 7 天",
      status: "todo",
      notes: "确认有效期并准备所需副本。"
    },
    {
      id: "prep-sun-water",
      group: "preparation",
      title: "准备环保防晒和海滩用品",
      priority: "medium",
      dueAt: "2026-08-13T18:00:00-07:00",
      deadlineLabel: "出发前 3 天",
      status: "todo",
      notes: "Reef-safe 防晒、泳衣和速干海滩巾。"
    },
    {
      id: "prep-pack",
      group: "preparation",
      title: "完成服装与随身物品打包",
      priority: "medium",
      dueAt: "2026-08-15T20:00:00-07:00",
      deadlineLabel: "8/15 晚前",
      status: "todo",
      notes: "夏装、薄外套、充电宝和防晒用品。"
    }
  ],

  hotels: [
    {
      id: "malia-first",
      name: "Waikiki Malia",
      checkIn: "2026-08-16",
      checkOut: "2026-08-17",
      dateLabel: "8/16 · 1 晚",
      nights: 1,
      priceRMB: 1217.74,
      status: "pending",
      taskId: "book-malia-first",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "抵达首晚入住，次日前往 Sheraton。"
    },
    {
      id: "sheraton",
      name: "Sheraton Waikiki Beach Resort",
      checkIn: "2026-08-17",
      checkOut: "2026-08-19",
      dateLabel: "8/17–8/18 · 2 晚",
      nights: 2,
      priceRMB: 5864.90,
      status: "pending",
      taskId: "book-sheraton",
      address: "2255 Kalakaua Ave, Honolulu, HI 96815",
      notes: "海景度假与无边泳池；8/18 停车预算约 $60。"
    },
    {
      id: "malia-last",
      name: "Waikiki Malia",
      checkIn: "2026-08-19",
      checkOut: "2026-08-21",
      dateLabel: "8/19–8/20 · 2 晚",
      nights: 2,
      priceRMB: 2322.09,
      status: "pending",
      taskId: "book-malia-last",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "自驾行程期间入住；8/19 停车预算约 $35。"
    }
  ],

  rentalCar: {
    id: "rental-car",
    status: "pending",
    taskId: "book-rental-car",
    period: "8/18 早 — 8/20 晚",
    providers: "Avis / Hertz · Waikiki 门店取还",
    carTypes: ["Toyota Corolla", "Nissan Sentra", "Hyundai Elantra"],
    costEstimateUSD: 280,
    parkingEstimateUSD: 95,
    gasEstimateUSD: 40,
    totalMileage: "180–220 英里（290–355 公里）"
  },

  budget: {
    hotelsRMB: 9404.73,
    rentalCarUSD: 280,
    parkingUSD: 95,
    gasUSD: 40,
    ticketsUSD: 160,
    foodUSD: 500
  },

  reservations: [
    {
      id: "hanauma",
      taskId: "book-hanauma",
      name: "Hanauma Bay 恐龙湾",
      window: "提前 2 天当地时间 07:00",
      officialLink: "https://pros.hnl.info/hanauma-bay",
      mapQuery: "Hanauma Bay, Honolulu, HI",
      notes: "预约前确认开放日；抵达后需观看保护区教育短片。"
    },
    {
      id: "kualoa",
      taskId: "book-kualoa",
      name: "Kualoa Ranch 古兰尼牧场",
      window: "热门项目建议提前 1–2 个月",
      officialLink: "https://www.kualoa.com/",
      mapQuery: "Kualoa Ranch, Kaneohe, HI",
      notes: "UTV、Movie Sites 与 Jungle Adventure 需要分别确认余位。"
    },
    {
      id: "diamond-head",
      taskId: "book-diamond-head",
      name: "Diamond Head 钻石山",
      window: "建议提前 14 天",
      officialLink: "https://gostateparks.hawaii.gov/diamondhead",
      mapQuery: "Diamond Head State Monument",
      notes: "优先选择晨间时段，避开正午暴晒。"
    },
    {
      id: "pearl-harbor",
      taskId: "book-pearl-harbor",
      name: "USS Arizona Memorial",
      window: "提前 8 周或前一天 15:00",
      officialLink: "https://www.recreation.gov/ticket/facility/233301",
      mapQuery: "Pearl Harbor National Memorial",
      notes: "预计参观约 2.5 小时，提前确认随身物品限制。"
    }
  ],

  days: [
    {
      id: "day-1",
      dayNum: 1,
      dateISO: "2026-08-16",
      dateLabel: "8月16日 · 周日",
      shortDate: "8/16",
      title: "抵达檀香山",
      vibe: "第一场日落",
      theme: "transit",
      transport: "Uber / 步行",
      hotel: "Waikiki Malia",
      summary: "从洛杉矶飞往檀香山，入住 Malia，在 Waikiki 海边迎接第一场日落。",
      timeline: [
        {
          id: "d1-lax-transfer",
          startTime: "07:00",
          title: "前往 LAX 机场",
          location: "Los Angeles International Airport",
          mapQuery: "Los Angeles International Airport Terminal 6",
          type: "transit",
          details: "预留交通、托运与安检时间，前往 Terminal 6。",
          info: [
            ["建议抵达", "起飞前至少 2 小时"],
            ["出行方式", "Uber / Lyft / 送机"]
          ]
        },
        {
          id: "d1-flight-as803",
          startTime: "10:05",
          endTime: "12:58",
          title: "AS803 · LAX → HNL",
          location: "LAX Terminal 6 → HNL Terminal 1",
          mapQuery: "LAX Airport Terminal 6",
          type: "flight",
          badge: "航班",
          details: "Alaska Airlines 直飞，计划飞行 5 小时 53 分钟。",
          statusLink: "https://www.google.com/search?q=AS803+flight+status",
          info: [
            ["航班", "Alaska Airlines AS803"],
            ["出发", "10:05 · LAX Terminal 6"],
            ["抵达", "12:58 · HNL Terminal 1"],
            ["行李", "两人共 1 件托运行李，限重 50 lbs / 23 kg"]
          ]
        },
        {
          id: "d1-hnl-transfer",
          startTime: "13:30",
          title: "机场前往 Waikiki Malia",
          location: "HNL → Waikiki Malia",
          mapQuery: "Waikiki Malia Hotel",
          type: "transit",
          details: "前往 Terminal 1 指定网约车上车区，预计车程约 25 分钟。",
          info: [
            ["上车", "HNL Terminal 1 Ride-Share Pickup Zone"],
            ["预计车费", "$35–45"]
          ]
        },
        {
          id: "d1-malia-checkin",
          startTime: "14:30",
          title: "Waikiki Malia 办理入住",
          location: "Waikiki Malia",
          mapQuery: "Waikiki Malia Hotel",
          type: "hotel",
          badge: "住宿",
          details: "办理首晚入住，安置行李并稍作休息。",
          info: [
            ["地址", "2470 Kuhio Ave, Honolulu, HI 96815"],
            ["退房", "8/17 前往 Sheraton"]
          ]
        },
        {
          id: "d1-waikiki-walk",
          startTime: "16:00",
          title: "Waikiki 海滩漫步与采购",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach Honolulu",
          type: "relax",
          details: "海边散步，在 ABC Store 补充水、零食和防晒用品。"
        },
        {
          id: "d1-sunset-dinner",
          startTime: "18:30",
          title: "海滩晚餐与日落",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach",
          type: "food",
          mood: "romantic",
          details: "在海边用餐，欣赏抵达夏威夷后的第一场日落。"
        },
        {
          id: "d1-arrival-planning",
          startTime: "20:15",
          title: "预约门票、预订租车并确认后续行程",
          location: "Waikiki Malia",
          type: "relax",
          details: "落地后集中查看门票余位、完成租车预订，并确认接下来几天的行程安排。"
        }
      ]
    },
    {
      id: "day-2",
      dayNum: 2,
      dateISO: "2026-08-17",
      dateLabel: "8月17日 · 周一",
      shortDate: "8/17",
      title: "钻石山与 Sheraton",
      vibe: "山海与日落",
      theme: "relax",
      transport: "Uber / 步行",
      hotel: "Sheraton Waikiki Beach Resort",
      summary: "晨间登顶 Diamond Head，逛艺术馆和市区，下午入住 Sheraton。",
      timeline: [
        {
          id: "d2-diamond-head",
          startTime: "06:30",
          endTime: "08:00",
          title: "Diamond Head 晨间徒步",
          location: "Diamond Head State Monument",
          mapQuery: "Diamond Head State Monument",
          type: "adventure",
          badge: "需预约",
          taskId: "book-diamond-head",
          details: "从火山口俯瞰太平洋和 Waikiki 城市全景。",
          info: [
            ["目标时段", "06:30–08:00"],
            ["门票与交通", "门票约 $5/人，Uber 约 10 分钟"]
          ]
        },
        {
          id: "d2-hotel-transfer",
          startTime: "10:00",
          title: "Malia 退房并寄存行李",
          location: "Waikiki Malia → Sheraton Waikiki",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "hotel",
          details: "退房后前往 Sheraton 礼宾部寄存行李。"
        },
        {
          id: "d2-homa",
          startTime: "10:30",
          title: "Honolulu Museum of Art",
          location: "900 S Beretania St",
          mapQuery: "Honolulu Museum of Art",
          type: "culture",
          details: "参观日式庭院与现代艺术展览。",
          info: [
            ["开放参考", "10:00–18:00，出发前复核"],
            ["门票参考", "成人约 $20"]
          ]
        },
        {
          id: "d2-shopping",
          startTime: "13:00",
          title: "Royal Hawaiian 商圈漫步",
          location: "Royal Hawaiian Center",
          mapQuery: "Royal Hawaiian Center",
          type: "shopping",
          details: "逛 Royal Hawaiian Center、International Market Place 和 ABC Store。"
        },
        {
          id: "d2-sheraton-checkin",
          startTime: "15:00",
          title: "Sheraton 入住与无边泳池",
          location: "Sheraton Waikiki",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "relax",
          badge: "15:00 入住",
          details: "办理入住，在 Edge Infinity Pool 看海放松。"
        },
        {
          id: "d2-sunset",
          startTime: "18:30",
          title: "Waikiki Beach 日落",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach Honolulu",
          type: "view",
          mood: "romantic",
          details: "漫步沙滩，欣赏椰林日落。"
        }
      ]
    },
    {
      id: "day-3",
      dayNum: 3,
      dateISO: "2026-08-18",
      dateLabel: "8月18日 · 周二",
      shortDate: "8/18",
      title: "Sheraton 度假日",
      vibe: "把时间调慢",
      theme: "relax",
      transport: "步行",
      hotel: "Sheraton Waikiki Beach Resort",
      summary: "全天留给酒店、泳池和海滩，放慢节奏享受 Waikiki。",
      timeline: [
        {
          id: "d3-breakfast",
          startTime: "09:00",
          title: "海景早餐",
          location: "Sheraton Waikiki",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "food",
          details: "睡到自然醒，在海景露台享用早餐和咖啡。"
        },
        {
          id: "d3-pool",
          startTime: "11:00",
          title: "Edge Infinity Pool",
          location: "Sheraton Waikiki Edge Infinity Pool",
          mapQuery: "Sheraton Waikiki Edge Infinity Pool",
          type: "relax",
          details: "无边泳池看海、晒太阳和玩水。"
        },
        {
          id: "d3-lunch",
          startTime: "13:30",
          title: "Royal Hawaiian Center 午餐",
          location: "Royal Hawaiian Center",
          mapQuery: "Royal Hawaiian Center",
          type: "food",
          details: "在绿荫中庭午餐并轻松漫步。"
        },
        {
          id: "d3-beach",
          startTime: "16:00",
          title: "海滩与 Sunset 鸡尾酒",
          location: "Sheraton Waikiki Pool Bar",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "relax",
          mood: "romantic",
          details: "海滩戏水，在泳池边感受日落前的海风。"
        },
        {
          id: "d3-dinner",
          startTime: "18:30",
          title: "Waikiki 日落晚餐",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach Honolulu",
          type: "food",
          mood: "romantic",
          details: "在海边用餐，欣赏椰林落日。"
        }
      ]
    },
    {
      id: "day-4",
      dayNum: 4,
      dateISO: "2026-08-19",
      dateLabel: "8月19日 · 周三",
      shortDate: "8/19",
      title: "东南海岸线自驾",
      vibe: "沿海追光",
      theme: "drive",
      transport: "租车 · Day 1",
      hotel: "Waikiki Malia",
      summary: "沿东南海岸打卡恐龙湾、喷泉洞、Lanikai、平等院和 Tantalus 夜景。",
      timeline: [
        {
          id: "d4-car-pickup",
          startTime: "08:30",
          title: "前往 Waikiki Hertz 取车",
          location: "Hertz Rent A Car · Waikiki",
          mapQuery: "Hertz Rent A Car Waikiki",
          type: "transit",
          badge: "取车",
          taskId: "book-rental-car",
          details: "退房后携带行李前往 Waikiki Hertz 门店取车。",
          info: [
            ["门店", "Hertz Waikiki 门店"],
            ["车型", "Standard Sedan 或同级"],
            ["材料", "驾照所需材料与主驾驶信用卡"]
          ]
        },
        {
          id: "d4-hanauma",
          startTime: "09:30",
          endTime: "11:00",
          title: "Hanauma Bay 浮潜",
          location: "Hanauma Bay Nature Preserve",
          mapQuery: "Hanauma Bay",
          type: "adventure",
          badge: "需预约",
          taskId: "book-hanauma",
          details: "在火山海湾浮潜，入园前再次确认开放与预约状态。",
          info: [
            ["目标入园", "09:30，建议提前 15 分钟"],
            ["费用参考", "门票约 $25/人，停车约 $3"]
          ]
        },
        {
          id: "d4-kahala-halona",
          startTime: "11:30",
          title: "Kahala Beach 与 Halona Blowhole",
          location: "Halona Blowhole Lookout",
          mapQuery: "Halona Blowhole Lookout",
          type: "view",
          details: "欣赏 Kahala 海滩、火山岩洞与喷泉般的海浪。"
        },
        {
          id: "d4-lanikai",
          startTime: "13:00",
          title: "Lanikai Beach 与 Kailua 午餐",
          location: "Lanikai / Kailua",
          mapQuery: "Lanikai Beach",
          type: "food",
          mood: "romantic",
          details: "细白沙滩和玻璃海；午餐可选 Kalapawai Cafe 或 Adela's。"
        },
        {
          id: "d4-byodo",
          startTime: "15:30",
          title: "Byodo-In Temple 平等院",
          location: "Valley of the Temples",
          mapQuery: "Byodo-In Temple Hawaii",
          type: "culture",
          details: "游览山脚下的日式寺庙与园林。"
        },
        {
          id: "d4-tantalus",
          startTime: "18:30",
          title: "Tantalus Lookout 日落",
          location: "Tantalus Lookout",
          mapQuery: "Tantalus Lookout Puu Ualakaa State Park",
          type: "view",
          mood: "romantic",
          details: "俯瞰 Honolulu 天际线、Diamond Head 与城市夜景。"
        },
        {
          id: "d4-malia-checkin",
          startTime: "20:00",
          title: "Poke 晚餐并入住 Malia",
          location: "Waikiki Malia",
          mapQuery: "Waikiki Malia Hotel",
          type: "hotel",
          badge: "住宿",
          details: "可选 Musubi Cafe 或 Maguro Spot，随后入住并停车。",
          info: [
            ["入住", "8/19–8/21，共 2 晚"],
            ["停车", "8/19 预算约 $35"]
          ]
        }
      ]
    },
    {
      id: "day-5",
      dayNum: 5,
      dateISO: "2026-08-20",
      dateLabel: "8月20日 · 周四",
      shortDate: "8/20",
      title: "北岸、珍珠港与古兰尼",
      vibe: "岛屿探险",
      theme: "drive",
      transport: "租车 · Day 2",
      hotel: "Waikiki Malia",
      summary: "珍珠港、Dole 菠萝园、北岸午餐与 Kualoa Ranch，傍晚返回 Waikiki 还车。",
      timeline: [
        {
          id: "d5-pearl-harbor",
          startTime: "08:30",
          endTime: "10:30",
          title: "Pearl Harbor 历史参观",
          location: "Pearl Harbor National Memorial",
          mapQuery: "Pearl Harbor National Memorial",
          type: "culture",
          badge: "需预约",
          taskId: "book-pearl-harbor",
          details: "参观 USS Arizona Memorial，预计约 2.5 小时。",
          info: [["建议", "提前 30 分钟抵达并确认安检规则"]]
        },
        {
          id: "d5-dole",
          startTime: "10:30",
          title: "Dole 菠萝园",
          location: "Dole Plantation",
          mapQuery: "Dole Plantation Hawaii",
          type: "attraction",
          details: "体验 Pineapple Express，品尝 Dole Whip 并逛纪念品商店。"
        },
        {
          id: "d5-lunch",
          startTime: "12:00",
          title: "北岸午餐",
          location: "Haleiwa",
          mapQuery: "Giovanni's Shrimp Truck Haleiwa",
          type: "food",
          details: "可选 Giovanni's Garlic Shrimp 或 Haleiwa Joe's。"
        },
        {
          id: "d5-kualoa",
          startTime: "13:30",
          endTime: "15:30",
          title: "Kualoa Ranch 古兰尼牧场",
          location: "Kualoa Ranch",
          mapQuery: "Kualoa Ranch Hawaii",
          type: "adventure",
          badge: "需预约",
          taskId: "book-kualoa",
          details: "体验 UTV、Movie Sites 或 Jungle Adventure 项目。",
          info: [["项目选择", "Raptor UTV / Movie Sites / Jungle Adventure"]]
        },
        {
          id: "d5-garden",
          startTime: "15:30",
          title: "草帽岛与 Ho'omaluhia",
          location: "Kualoa Regional Park / Ho'omaluhia Garden",
          mapQuery: "Ho'omaluhia Botanical Garden",
          type: "nature",
          details: "打卡草帽岛视角，游览火山雨林植物园。"
        },
        {
          id: "d5-return-car",
          startTime: "18:00",
          title: "返回 Waikiki 还车",
          location: "Waikiki Rental Car Branch",
          mapQuery: "Avis Rent A Car Waikiki",
          type: "transit",
          details: "加满油后还车，傍晚回 Waikiki 散步用餐。"
        }
      ]
    },
    {
      id: "day-6",
      dayNum: 6,
      dateISO: "2026-08-21",
      dateLabel: "8月21日 · 周五",
      shortDate: "8/21",
      title: "告别 Waikiki，返回洛杉矶",
      vibe: "把海风带回家",
      theme: "transit",
      transport: "Uber / 步行",
      hotel: "当晚抵达洛杉矶",
      summary: "整理行李后搭乘 AS826 返回 LAX。",
      timeline: [
        {
          id: "d6-breakfast-checkout",
          startTime: "08:00",
          title: "Malia 退房",
          location: "Waikiki Malia",
          mapQuery: "Waikiki Malia",
          type: "hotel",
          details: "办理退房，确认行李后前往机场。"
        },
        {
          id: "d6-airport-transfer",
          startTime: "08:40",
          title: "前往 HNL 机场",
          location: "Daniel K. Inouye International Airport",
          mapQuery: "Daniel K. Inouye International Airport Terminal 1",
          type: "transit",
          details: "前往 Terminal 1，预留登机、托运与安检时间。"
        },
        {
          id: "d6-flight-as826",
          startTime: "11:33",
          endTime: "19:53",
          title: "AS826 · HNL → LAX",
          location: "HNL Terminal 1 → LAX Terminal 6",
          mapQuery: "Daniel K. Inouye International Airport Terminal 1",
          type: "flight",
          badge: "航班",
          details: "Alaska Airlines 直飞，计划飞行 5 小时 20 分钟。",
          statusLink: "https://www.google.com/search?q=AS826+flight+status",
          info: [
            ["航班", "Alaska Airlines AS826"],
            ["出发", "11:33 · HNL Terminal 1"],
            ["抵达", "19:53 · LAX Terminal 6"],
            ["行李", "两人共 1 件托运行李，限重 50 lbs / 23 kg"]
          ]
        },
        {
          id: "d6-home-transfer",
          startTime: "20:30",
          title: "离开 LAX，行程结束",
          location: "LAX Terminal 6",
          mapQuery: "Los Angeles International Airport Terminal 6",
          type: "transit",
          details: "领取行李后乘网约车或接机车辆离开机场。"
        }
      ]
    }
  ],

  packingCategories: [
    {
      id: "documents",
      title: "证件与财务",
      items: [
        { id: "p1", title: "护照等证件及所需副本" },
        { id: "p2", title: "驾照所需材料与租车文件" },
        { id: "p3", title: "银行卡" },
        { id: "p4", title: "少量现金" },
        { id: "p5", title: "机票、酒店与景点预约电子件" }
      ]
    },
    {
      id: "water",
      title: "海滩与水上装备",
      items: [
        { id: "p6", title: "防晒霜" },
        { id: "p7", title: "泳衣" },
        { id: "p8", title: "速干海滩毛巾" }
      ]
    },
    {
      id: "clothing",
      title: "服装与随身配件",
      items: [
        { id: "p9", title: "6 天 5 晚夏日衣物与长裙" },
        { id: "p10", title: "内衣、内裤与袜子" },
        { id: "p11", title: "轻薄外套或防晒衣" },
        { id: "p12", title: "徒步运动鞋" },
        { id: "p13", title: "洞洞鞋" },
        { id: "p14", title: "太阳镜" },
        { id: "p15", title: "遮阳帽" },
        { id: "p16", title: "睡衣" }
      ]
    },
    {
      id: "accessories",
      title: "饰品与贵重随身物品",
      items: [
        { id: "p17", title: "项链" },
        { id: "p18", title: "戒指" },
        { id: "p19", title: "耳钉" },
        { id: "p20", title: "手链/手镯" },
        { id: "p21", title: "手表" }
      ]
    },
    {
      id: "electronics",
      title: "电子设备与配件",
      items: [
        { id: "p22", title: "手机与充电器" },
        { id: "p23", title: "电脑与充电器" },
        { id: "p24", title: "相机及配件" },
        { id: "p25", title: "充电宝（随身携带）" },
        { id: "p26", title: "耳机" },
        { id: "p27", title: "多口充电器与充电线" },
        { id: "p28", title: "相机存储卡与备用电池" },
        { id: "p29", title: "车载充电器" }
      ]
    },
    {
      id: "toiletries",
      title: "洗漱与护肤",
      items: [
        { id: "p30", title: "隐形眼镜" },
        { id: "p31", title: "牙刷牙膏" },
        { id: "p32", title: "身体乳" },
        { id: "p33", title: "香水" },
        { id: "p34", title: "洗面奶" },
        { id: "p35", title: "日常护肤品" },
        { id: "p36", title: "润唇膏" },
        { id: "p37", title: "卸妆油" },
        { id: "p38", title: "保湿水/精华" },
        { id: "p39", title: "面霜" },
        { id: "p40", title: "晒后舒缓或芦荟胶" }
      ]
    },
    {
      id: "makeup",
      title: "化妆与工具",
      items: [
        { id: "p41", title: "底妆" },
        { id: "p42", title: "防水眉笔/眼妆" },
        { id: "p43", title: "腮红/修容" },
        { id: "p44", title: "口红" },
        { id: "p45", title: "定妆" },
        { id: "p46", title: "发圈/发夹" },
        { id: "p47", title: "梳子" },
        { id: "p48", title: "化妆刷或粉扑" },
        { id: "p49", title: "化妆包" }
      ]
    },
    {
      id: "medication",
      title: "常用药品",
      items: [
        { id: "p50", title: "感冒药" },
        { id: "p51", title: "止痛药" },
        { id: "p52", title: "止泻药" },
        { id: "p53", title: "过敏药" },
        { id: "p54", title: "创口贴" },
        { id: "p55", title: "个人处方药" },
      ]
    }
  ],

  arrivalShoppingCategories: [
    {
      id: "arrival-essentials",
      title: "抵达后补给",
      items: [
        { id: "buy-waterproof-pouch", title: "手机防水袋" },
        { id: "buy-bug-repellent", title: "驱蚊用品" },
        { id: "buy-beach-essentials", title: "需要补充的沙滩用品" }
      ]
    }
  ],

  souvenirWishlist: [
    { id: "souvenir-abc-hello-kitty", title: "ABC Store 夏威夷限定 Hello Kitty" },
    { id: "souvenir-dole-kitty", title: "Dole 菠萝限定 Kitty" },
    { id: "souvenir-snoopy-surf", title: "Snoopy's Surf Shop 周边" },
    { id: "souvenir-honolulu-cookie", title: "Honolulu Cookie 铁盒曲奇" },
    { id: "souvenir-kona-coffee", title: "Kona 咖啡豆" }
  ]
};
