/**
 * Hawaii Oahu Trip 2026 Data Source
 * Period: 2026.08.16 - 2026.08.21 (6 Days 5 Nights)
 */

const TRIP_DATA = {
  meta: {
    title: "夏威夷欧胡岛 6天5晚 深度游",
    subtitle: "2026.08.16 (周日) — 2026.08.21 (周五)",
    startDate: "2026-08-16",
    endDate: "2026-08-21",
    destination: "Honolulu, Oahu, Hawaii",
    currency: "USD / RMB",
    exchangeRate: 7.25, // 1 USD ≈ 7.25 RMB
    travelers: 2
  },

  hotels: [
    {
      date: "8/16 (周日)",
      name: "Waikiki Malia",
      nights: 1,
      priceRMB: 1217.74, // 896.41 + 321.33
      status: "已预订",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "深夜 22:30 抵达后 Uber 前往入住"
    },
    {
      date: "8/17 – 8/18 (周一 - 周二)",
      name: "Sheraton Waikiki Beach Resort",
      nights: 2,
      priceRMB: 5864.90, // 5029.62 + 835.28
      status: "已预订",
      address: "2255 Kalakaua Ave, Honolulu, HI 96815",
      notes: "奢华海景度假日，玩水看日落；8/18 自驾停车 1 晚约 $60"
    },
    {
      date: "8/19 – 8/20 (周三 - 周四)",
      name: "Waikiki Malia",
      nights: 2,
      priceRMB: 2322.09, // 1679.42 + 642.67
      status: "已预订",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "北岸与古兰尼完结后入住，停车 1 晚约 $35"
    }
  ],

  rentalCar: {
    period: "8/18 (早) — 8/20 (晚) 连续三天",
    providers: "Avis / Hertz (Waikiki 门店取还车)",
    carTypes: ["Toyota Corolla", "Nissan Sentra", "Hyundai Elantra"],
    costEstimateUSD: 280, // ~$230-320
    parkingEstimateUSD: 95, // $60 Sheraton + $35 Malia
    gasEstimateUSD: 40, // 180-220 英里
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
      hotelStay: "Waikiki Malia",
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
          location: "Waikiki Malia Hotel",
          mapQuery: "Waikiki Malia",
          type: "transit",
          details: "车程约 25 分钟，直达 Waikiki Malia"
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
      hotelStay: "Sheraton Waikiki (停车 $60)",
      summary: "步行取车，打卡恐龙湾、喷泉洞、绝美 Lanikai 细白沙滩、平等院，坦塔罗斯山看夜景",
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
          activity: "Waikiki 特色 Poke 晚餐",
          location: "Musubi Cafe Iyasume / Maguro Spot",
          mapQuery: "Musubi Cafe Iyasume Kuhio Ave",
          type: "food",
          details: "打卡超赞饭团 Musubi Cafe 或新鲜极致的 Maguro Spot Poke Bowl"
        }
      ]
    },
    {
      dayNum: 4,
      date: "8月19日 (周三)",
      title: "北岸大环线自驾｜菠萝园与海龟探访",
      tag: "drive",
      carStatus: "🚗 租车 Day 2 (北岸环线)",
      hotelStay: "Waikiki Malia (停车 $35)",
      summary: "退房寄存行李，菠萝冰淇淋，Haleiwa 小镇刨冰与史努比，Laniakea 海龟，北岸日落",
      timeline: [
        {
          time: "09:00",
          activity: "退房寄存行李 -> 前往 Dole 菠萝园",
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
          activity: "返回 Waikiki 入住 Malia",
          location: "Waikiki Malia Hotel",
          mapQuery: "Waikiki Malia Hotel",
          type: "transit",
          details: "还车前停 Malia 酒店，入住休息"
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
      title: "钻石头山日出 ✈️ 珍珠港｜离岛返程",
      tag: "transit",
      carStatus: "🚫 不租车 (Uber)",
      hotelStay: "无 (今晚返程飞 LAX)",
      summary: "登顶 Diamond Head 看火奴鲁鲁，参观珍珠港亚利桑那号，傍晚返程飞洛杉矶",
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
          activity: "✈️ 飞往洛杉矶 (LAX)",
          location: "HNL Airport Gate",
          type: "flight",
          details: "带着美好的夏威夷记忆踏上归途！"
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
        { id: "p3", text: "双币信用卡 (Visa/Mastercard)" },
        { id: "p4", text: "少量美元现金 (小费与停车)" },
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
