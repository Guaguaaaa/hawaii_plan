/**
 * Hawaii Oahu Trip 2026 Data Source
 * Period: 2026.08.16 - 2026.08.22 (6 Days 5 Nights)
 */

const TRIP_DATA = {
  meta: {
    title: "夏威夷欧胡岛 6天5晚 深度游",
    subtitle: "2026.08.16 (周日) — 2026.08.22 (周六)",
    startDate: "2026-08-16",
    endDate: "2026-08-22",
    destination: "Honolulu, Oahu, Hawaii",
    currency: "USD / RMB",
    exchangeRate: 7.25, // 1 USD ≈ 7.25 RMB
    travelers: 2,
    timezoneDiff: "檀香山 (HST) 比 洛杉矶 (PDT) 慢 3 小时"
  },

  // Google Sheets Live Sync Configuration (Optional)
  googleSheets: {
    budgetCsvUrl: "", // 填入你的 Google Sheets Budget 发布 CSV 链接
    checklistCsvUrl: "", // 填入你的 Google Sheets Checklist 发布 CSV 链接
    todoCsvUrl: "" // 填入你的 Google Sheets Todo List 发布 CSV 链接
  },

  // 🏥 酒店附近 Urgent Care & 医疗救助诊所
  urgentCare: [
    {
      name: "Straub Doctors on Call (Sheraton 酒店内)",
      location: "Sheraton Waikiki Beach Resort 底楼 (Lower Level)",
      phone: "(808) 971-6000",
      hours: "每天 08:00 - 18:00",
      mapQuery: "Doctors on Call at Sheraton Waikiki",
      notes: "🌟 就在 Sheraton 酒店楼下！提供门诊、X光、化验，提供 Waikiki 区域酒店免费班车接送"
    },
    {
      name: "Kuhio Medical Clinic (Malia 酒店旁)",
      location: "2310 Kuhio Ave, Suite 223 (距 Malia 酒店步行 1 分钟)",
      phone: "(808) 924-6688",
      hours: "周一至周五 08:00-17:00, 周六 09:00-17:00",
      mapQuery: "Kuhio Medical Clinic Honolulu",
      notes: "🌟 紧邻 Waikiki Malia 酒店，出门过马路即到"
    },
    {
      name: "Doctors of Waikiki (夜间急诊诊所)",
      location: "120 Liliuokalani Ave #101, Honolulu",
      phone: "(808) 922-2112",
      hours: "每天 08:00 - 22:00 (营业至晚 10 点)",
      mapQuery: "Doctors of Waikiki",
      notes: "Waikiki 营业时间最长的综合 Urgent Care，适合晚间不适就医"
    },
    {
      name: "Urgent Care Clinic of Waikiki",
      location: "2155 Kalakaua Ave, Suite 308",
      phone: "(808) 924-3399",
      hours: "周一至周五 09:00-17:00, 周日 09:00-12:00",
      mapQuery: "Urgent Care Clinic of Waikiki",
      notes: "位于 Kalakaua 大道，提供 Waikiki 区域内免费出租车接送至诊所"
    }
  ],

  todoList: [
    {
      phase: "🔥 当务之急",
      task: "订洛杉矶往返檀香山机票 (LAX↔HNL)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "8/16 21:50抵HNL，8/21 21:00飞离HNL"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Sheraton Waikiki 酒店 (8/16-8/18 2晚)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "海景房，无边泳池度假"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Waikiki Malia 酒店 (8/18-8/21 3晚)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "环岛结束后入住"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Avis / Hertz 租车 (8/18早-8/20晚 3天)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "Waikiki 门店取还车"
    },
    {
      phase: "🎟️ 预订抢票",
      task: "预订古兰尼牧场 Kualoa Ranch (UTV / Jungle)",
      priority: "🟠 高",
      deadline: "提前 1 个月",
      status: "未完成",
      notes: "热门 UTV Tour 极易售罄，需提前官网上锁"
    },
    {
      phase: "🎟️ 预订抢票",
      task: "预订珍珠港 USS Arizona 纪念馆门票",
      priority: "🟠 高",
      deadline: "提前 8 周 / 前一天15:00",
      status: "未完成",
      notes: "Recreation.gov 抢票"
    },
    {
      phase: "🎟️ 预订抢票",
      task: "预约钻石山 Diamond Head 登顶名额",
      priority: "🟡 中",
      deadline: "提前 14 天 (8/7左右)",
      status: "未完成",
      notes: "预约 8/21 早晨 06:30 场次"
    },
    {
      phase: "🎟️ 预订抢票",
      task: "抢恐龙湾 Hanauma Bay 门票",
      priority: "🔴 紧急",
      deadline: "提前 2 天早7:00 (HST)",
      status: "未完成",
      notes: "8/16 早 7:00 (HST) 抢 8/18 (Day3) 门票"
    },
    {
      phase: "🧳 行前打包",
      task: "检查护照有效期 & 驾照原件/翻译件",
      priority: "🟠 高",
      deadline: "出发前 7 天",
      status: "未完成",
      notes: "租车及机场安检必需"
    },
    {
      phase: "🧳 行前打包",
      task: "采购 Reef-Safe 环保防晒霜 & 涉水鞋/面镜",
      priority: "🟡 中",
      deadline: "出发前 3 天",
      status: "未完成",
      notes: "夏威夷法律规定使用环保防晒"
    },
    {
      phase: "🧳 行前打包",
      task: "打包夏日服饰、长裙、薄外套、充电宝",
      priority: "🟡 中",
      deadline: "出发前 1 天 (8/15)",
      status: "未完成",
      notes: "防晒衣服与室内空调薄外套"
    },
    {
      phase: "✈️ 旅行期间",
      task: "8/16 深夜抵达 HNL & 打车入住 Sheraton",
      priority: "🟢 低",
      deadline: "8/16 22:30",
      status: "未完成",
      notes: "机场 ABC Store 买水零食"
    },
    {
      phase: "✈️ 旅行期间",
      task: "8/18 早前往 Waikiki Avis/Hertz 取车",
      priority: "🟠 高",
      deadline: "8/18 08:30",
      status: "未完成",
      notes: "开启 Day 3 东南岸自驾"
    },
    {
      phase: "✈️ 旅行期间",
      task: "8/18 办理 Malia 入住 & 寄存行李",
      priority: "🟡 中",
      deadline: "8/18 傍晚",
      status: "未完成",
      notes: "退房 Sheraton，入住 Malia"
    },
    {
      phase: "✈️ 旅行期间",
      task: "8/20 18:00 Waikiki 门店还车",
      priority: "🟠 高",
      deadline: "8/20 18:00",
      status: "未完成",
      notes: "加满油后顺畅还车"
    },
    {
      phase: "✈️ 旅行期间",
      task: "8/21 18:30 酒店拿行李打车前往机场",
      priority: "🔴 紧急",
      deadline: "8/21 18:30",
      status: "未完成",
      notes: "预留 2h+ 办理登机手续"
    }
  ],

  hotels: [
    {
      date: "8/16 – 8/18 (周日 - 周二)",
      name: "Sheraton Waikiki Beach Resort",
      nights: 2,
      priceRMB: 5864.90,
      status: "未预订",
      address: "2255 Kalakaua Ave, Honolulu, HI 96815",
      notes: "奢华海景度假日，玩水看日落；8/18 自驾停车 1 晚约 $60"
    },
    {
      date: "8/18 – 8/21 (周二 - 周五)",
      name: "Waikiki Malia",
      nights: 3,
      priceRMB: 3539.83,
      status: "未预订",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "北岸与古兰尼完结后入住，停车 1 晚约 $35"
    }
  ],

  rentalCar: {
    period: "8/18 (早) — 8/20 (晚) 连续三天",
    providers: "Avis / Hertz (Waikiki 门店取还车)",
    carTypes: ["Toyota Corolla", "Nissan Sentra", "Hyundai Elantra"],
    costEstimateUSD: 280,
    parkingEstimateUSD: 95,
    gasEstimateUSD: 40,
    totalMileageMiles: "180 - 220 英里 (290 - 355 公里)"
  },

  budgetSummary: {
    hotelsTotalRMB: 9404.73,
    hotelsPerPersonRMB: 4702.36,
    rentalCarUSD: 280,
    parkingUSD: 95,
    gasUSD: 40,
    ticketsUSD: 160,
    foodUSD: 500
  },

  reservations: [
    {
      id: "hanauma",
      name: "Hanauma Bay 恐龙湾",
      required: true,
      window: "提前 2 天当地时间早 7:00 抢票",
      officialLink: "https://pros.hnl.info/hanauma-bay",
      mapQuery: "Hanauma Bay, Honolulu, HI",
      notes: "火山海湾渐变色，浮潜天堂。周一/周二闭园注意确认。"
    },
    {
      id: "kualoa",
      name: "Kualoa Ranch 古兰尼牧场",
      required: true,
      window: "建议提前 1-2 个月在官网预订",
      officialLink: "https://www.kualoa.com/",
      mapQuery: "Kualoa Ranch, Kaneohe, HI",
      notes: "侏罗纪公园取景地。UTV Tour / Movie Sites Tour / Jungle Adventure。"
    },
    {
      id: "diamondhead",
      name: "Diamond Head 钻石山",
      required: true,
      window: "提前 14 天预约登顶时间",
      officialLink: "https://gostateparks.hawaii.gov/diamondhead",
      mapQuery: "Diamond Head State Monument",
      notes: "看火奴鲁鲁全景与日出，建议预约早晨场避免正午暴晒。"
    },
    {
      id: "pearlharbor",
      name: "Pearl Harbor 珍珠港亚利桑那号",
      required: true,
      window: "提前 8 周或前一天 15:00 抢票",
      officialLink: "https://www.recreation.gov/ticket/facility/233301",
      mapQuery: "Pearl Harbor National Memorial",
      notes: "USS Arizona Memorial 门票预订，预计游查 2.5 小时。"
    }
  ],

  days: [
    {
      dayNum: 1,
      date: "8月16日 (周日)",
      title: "洛杉矶 ✈️ 檀香山｜晚间抵达入住",
      tag: "transit",
      carStatus: "🚫 不租车 (Uber)",
      hotelStay: "Sheraton Waikiki Beach Resort",
      summary: "从洛杉矶飞行抵达夏威夷，入住 Waikiki 酒店并采购物资",
      timeline: [
        {
          time: "21:50",
          activity: "抵达檀香山机场 (HNL)",
          location: "Daniel K. Inouye International Airport",
          mapQuery: "Daniel K. Inouye International Airport",
          type: "flight",
          details: "领取行李，顺畅出关"
        },
        {
          time: "22:30",
          activity: "打 Uber 前往 Waikiki",
          location: "Sheraton Waikiki Beach Resort",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "transit",
          details: "车程约 25 分钟，直达 Sheraton Waikiki"
        },
        {
          time: "23:00",
          activity: "入住 & ABC Store 采购",
          location: "ABC Stores Waikiki",
          mapQuery: "ABC Store Kuhio Ave Waikiki",
          type: "shopping",
          details: "买矿泉水、防晒喷雾及夜宵零食，早点休息补觉"
        }
      ]
    },
    {
      dayNum: 2,
      date: "8月17日 (周一)",
      title: "Sheraton 度假日｜市区艺术与日落",
      tag: "relax",
      carStatus: "🚫 不租车 (步行 / Uber)",
      hotelStay: "Sheraton Waikiki Beach Resort",
      summary: "打卡 HoMA 艺术馆，Sheraton 玩水，逛黑皮 Kitty，Waikiki 看日落",
      timeline: [
        {
          time: "10:00",
          activity: "Honolulu Museum of Art (HoMA)",
          location: "Honolulu Museum of Art",
          mapQuery: "Honolulu Museum of Art",
          type: "culture",
          details: "出片神地！日式中庭与现代艺术展览，氛围感拉满"
        },
        {
          time: "13:00",
          activity: "Royal Hawaiian & International Market Place",
          location: "Royal Hawaiian Center",
          mapQuery: "Royal Hawaiian Center",
          type: "shopping",
          details: "逛街，打卡 ABC Store 寻找夏威夷限定 **黑皮 Kitty** 玩偶！"
        },
        {
          time: "15:30",
          activity: "Sheraton 边缘无边泳池 & 泡酒店",
          location: "Sheraton Waikiki Edge Infinity Pool",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "relax",
          details: "入住 Sheraton，无边泳池玩水看海景，享受纯正夏威夷度假感"
        },
        {
          time: "18:30",
          activity: "Waikiki Beach 日落时刻",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach Honolulu",
          type: "view",
          details: "漫步金黄沙滩，欣赏威基基经典椰林落日"
        }
      ]
    },
    {
      dayNum: 3,
      date: "8月18日 (周二)",
      title: "东南海岸线自驾｜果冻海与俯瞰夜景",
      tag: "drive",
      carStatus: "🚗 租车 Day 1 (东南岸大环线)",
      hotelStay: "Waikiki Malia (停车 $35)",
      summary: "步行取车，打卡恐龙湾、喷泉洞、绝美 Lanikai 细白沙滩、平等院，坦塔罗斯山看夜景，入住 Malia",
      timeline: [
        {
          time: "08:30",
          activity: "步行取车 (Avis / Hertz)",
          location: "Waikiki Rental Car Branch",
          mapQuery: "Avis Rent A Car Waikiki",
          type: "transit",
          details: "办理手续，检查车况，开启自驾大环线"
        },
        {
          time: "09:30",
          activity: "Hanauma Bay 恐龙湾",
          location: "Hanauma Bay Nature Preserve",
          mapQuery: "Hanauma Bay",
          type: "nature",
          badge: "需提前预约",
          details: "火山海湾，渐变果冻海，夏威夷最出名的浮潜天堂"
        },
        {
          time: "11:00",
          activity: "Kahala Beach & Halona Blowhole",
          location: "Halona Blowhole Lookout",
          mapQuery: "Halona Blowhole Lookout",
          type: "view",
          details: "Jennie 拍照同款 Kahala 海滩 -> Halona 岩洞海浪喷泉 (She Her Hers 封面同款绿浪)"
        },
        {
          time: "12:00",
          activity: "Lanai Lookout & Makapuʻu Lookout",
          location: "Makapuʻu Point Lookout",
          mapQuery: "Makapuʻu Point Lookout",
          type: "view",
          details: "黑色火山岩与整段火山悬崖海岸线"
        },
        {
          time: "13:00",
          activity: "Lanikai Beach & Kailua Town 午餐",
          location: "Lanikai Beach / Kailua",
          mapQuery: "Lanikai Beach",
          type: "food",
          details: "细白沙滩玻璃海。午餐推荐 Kalapawai Cafe 或 Adela's Country Eatery"
        },
        {
          time: "15:30",
          activity: "Byodo-in Temple 平等院",
          location: "Byodo-In Temple Hawaii",
          mapQuery: "Byodo-In Temple Hawaii",
          type: "culture",
          details: "山脚下的日式禅意寺庙，绿意盎然，拍照极其出片"
        },
        {
          time: "18:30",
          activity: "Tantalus Lookout 日落与夜景",
          location: "Tantalus Lookout",
          mapQuery: "Tantalus Lookout Puu Ualakaa State Park",
          type: "view",
          details: "俯瞰整条檀香山天际线与钻石头山的壮丽夕阳与夜景"
        },
        {
          time: "20:00",
          activity: "Waikiki 特色 Poke 晚餐 & 入住 Malia",
          location: "Waikiki Malia Hotel",
          mapQuery: "Waikiki Malia Hotel",
          type: "food",
          details: "打卡超赞饭团 Musubi Cafe 或 Maguro Spot Poke Bowl，入住 Malia 酒店"
        }
      ]
    },
    {
      dayNum: 4,
      date: "8月19日 (周三)",
      title: "北岸大环线自驾｜菠萝园与海龟探访",
      tag: "drive",
      carStatus: "🚗 租车 Day 2 (北岸环线)",
      hotelStay: "Waikiki Malia",
      summary: "菠萝冰淇淋，Haleiwa 小镇刨冰与史努比，Laniakea 海龟，北岸日落",
      timeline: [
        {
          time: "09:00",
          activity: "前往 Dole 菠萝园",
          location: "Dole Plantation",
          mapQuery: "Dole Plantation Hawaii",
          type: "attraction",
          details: "坐 Pineapple Express 观光小火车，打卡 Dole Whip 菠萝冰淇淋，买菠萝 Kitty 限定"
        },
        {
          time: "12:00",
          activity: "北岸美食午餐 (蒜蓉虾饭)",
          location: "Giovanni's Shrimp Truck / Haleiwa Joe's",
          mapQuery: "Giovanni's Shrimp Truck Haleiwa",
          type: "food",
          details: "Giovanni's 经典 Garlic Shrimp 蒜蓉虾饭，或 Haleiwa Joe's 风景饭"
        },
        {
          time: "13:30",
          activity: "Haleiwa 复古小镇漫步",
          location: "Haleiwa Town",
          mapQuery: "Haleiwa Town Oahu",
          type: "shopping",
          details: "Matsumoto Shave Ice 必吃葡萄味刨冰，Snoopy’s Surf Shop 买超萌冲浪史努比"
        },
        {
          time: "15:30",
          activity: "Laniakea Beach 看野生海龟",
          location: "Laniakea Beach",
          mapQuery: "Laniakea Beach Turtle Beach",
          type: "nature",
          details: "知名 Turtle Beach，常有巨大的野生夏威夷绿海龟在沙滩晒太阳"
        },
        {
          time: "17:00",
          activity: "Waimea Bay & Sunset Beach 日落",
          location: "Sunset Beach Park",
          mapQuery: "Sunset Beach Park Oahu",
          type: "view",
          details: "玻璃海戏水，在北岸最出名的 Sunset Beach 欣赏震撼冲浪者海岸日落"
        },
        {
          time: "20:00",
          activity: "返回 Waikiki Malia",
          location: "Waikiki Malia Hotel",
          mapQuery: "Waikiki Malia Hotel",
          type: "transit",
          details: "返回 Malia 酒店停车休息"
        }
      ]
    },
    {
      dayNum: 5,
      date: "8月20日 (周四)",
      title: "古兰尼牧场｜侏罗纪冒险与雨林植物园",
      tag: "adventure",
      carStatus: "🚗 租车 Day 3 (傍晚 Waikiki 还车)",
      hotelStay: "Waikiki Malia",
      summary: "古兰尼牧场 UTV/电影之旅，Kualoa 海滨公园明信片机位，植物园侏罗纪仙境，还车",
      timeline: [
        {
          time: "08:30",
          activity: "Kualoa Ranch 古兰尼牧场",
          location: "Kualoa Ranch",
          mapQuery: "Kualoa Ranch Hawaii",
          type: "adventure",
          badge: "需提前预约",
          details: "侏罗纪电影取景地！体验 UTV 越野车 / Movie Sites Tour / Jungle Adventure"
        },
        {
          time: "12:30",
          activity: "牧场午餐 (Ranch House)",
          location: "Kualoa Ranch House",
          mapQuery: "Kualoa Ranch House",
          type: "food",
          details: "享用当地牛肉汉堡与牛肉饭，休整补充体力"
        },
        {
          time: "14:00",
          activity: "Kualoa Regional Park 明信片机位",
          location: "Kualoa Regional Park",
          mapQuery: "Kualoa Regional Park",
          type: "view",
          details: "面向 Chinaman's Hat (草帽岛) 的绿草坪海滩，拍出夏威夷明信片同款大片"
        },
        {
          time: "15:30",
          activity: "Ho'omaluhia Botanical Garden",
          location: "Ho'omaluhia Botanical Garden",
          mapQuery: "Ho'omaluhia Botanical Garden",
          type: "nature",
          details: "宛如真正的侏罗纪公园入口！高耸火山崖壁下的热带雨林植物园"
        },
        {
          time: "18:00",
          activity: "返回 Waikiki 还车 & 自由漫步",
          location: "Waikiki Rental Branch",
          mapQuery: "Avis Rent A Car Waikiki",
          type: "transit",
          details: "顺畅还车，无需再考虑停车费！傍晚在 Waikiki 海滩散步晚餐"
        }
      ]
    },
    {
      dayNum: 6,
      date: "8月21日 (周五)",
      title: "钻石头山日出 ✈️ 珍珠港｜离岛返程 (8/22晨抵LAX)",
      tag: "transit",
      carStatus: "🚫 不租车 (Uber)",
      hotelStay: "无 (今晚返程飞 LAX)",
      summary: "登顶 Diamond Head 看火奴鲁鲁，参观珍珠港亚利桑那号，傍晚返程飞洛杉矶 (8/22 早上抵达 LAX)",
      timeline: [
        {
          time: "06:30",
          activity: "Diamond Head 钻石山徒步",
          location: "Diamond Head State Monument",
          mapQuery: "Diamond Head State Monument",
          type: "adventure",
          badge: "需提前预约",
          details: "晨间登顶火山口，俯瞰整个太平洋与 Waikiki 城市全景"
        },
        {
          time: "10:00",
          activity: "Pearl Harbor 珍珠港历史怀古",
          location: "Pearl Harbor National Memorial",
          mapQuery: "Pearl Harbor National Memorial",
          type: "culture",
          badge: "需提前预约",
          details: "参观 USS Arizona Memorial 亚利桑那号纪念馆，感受历史庄严沉淀"
        },
        {
          time: "14:00",
          activity: "市区最后采购与午后咖啡",
          location: "Waikiki Shopping Plaza",
          mapQuery: "Waikiki Shopping Plaza",
          type: "shopping",
          details: "补齐纪念品与伴手礼，享受夏威夷最后的阳光咖啡"
        },
        {
          time: "18:30",
          activity: "回酒店取行李 -> 机场",
          location: "Daniel K. Inouye International Airport",
          mapQuery: "Daniel K. Inouye International Airport",
          type: "transit",
          details: "18:30 酒店拿行李，19:00 Uber 抵达机场（预留 2h+ 办登机）"
        },
        {
          time: "21:00",
          activity: "✈️ 飞往洛杉矶 (8/22 晨抵达 LAX)",
          location: "HNL Airport Gate",
          type: "flight",
          details: "带着美好的夏威夷记忆踏上归途！次日 (8/22) 早上抵达洛杉矶"
        }
      ]
    }
  ],

  packingCategories: [
    {
      category: "📄 必备证件与财务",
      items: [
        { id: "p1", text: "护照 & 护照复印件/电子件" },
        { id: "p2", text: "驾照原件 & 翻译件/租车确认单" },
        { id: "p3", text: "银行卡 (Visa/Mastercard)" },
        { id: "p4", text: "少量美金现金 (小费与停车)" },
        { id: "p5", text: "酒店/机票/景点预约单电子件" }
      ]
    },
    {
      category: "🤿 海滩与水上装备",
      items: [
        { id: "p6", text: "Reef-Safe 环保防晒霜 (夏威夷规定)" },
        { id: "p7", text: "泳衣 / 泳裤 / 防晒冲浪服" },
        { id: "p8", text: "浮潜面镜 & 咬嘴" },
        { id: "p9", text: "防滑涉水鞋 (火山岩防刮脚)" },
        { id: "p10", text: "手机防水袋 & 速干海滩巾" }
      ]
    },
    {
      category: "👕 服饰与随身配件",
      items: [
        { id: "p11", text: "夏日清凉服装 & 出片长裙" },
        { id: "p12", text: "轻薄外套 / 防晒衣 (室内空调强)" },
        { id: "p13", text: "太阳镜 & 遮阳帽" },
        { id: "p14", text: "徒步运动鞋 (钻石山 & 牧场)" },
        { id: "p15", text: "人字拖 / 凉鞋" }
      ]
    },
    {
      category: "🎁 限定纪念品必买清单",
      items: [
        { id: "p16", text: "ABC Store 夏威夷黑皮 Hello Kitty" },
        { id: "p17", text: "Dole 菠萝园菠萝限定 Kitty" },
        { id: "p18", text: "Snoopy's Surf Shop 冲浪史努比周边" },
        { id: "p19", text: "Honolulu Cookie 铁盒曲奇饼干" },
        { id: "p20", text: "Kona 考纳咖啡豆" }
      ]
    }
  ]
};
