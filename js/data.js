/**
 * Hawaii Oahu Trip 2026 Data Source (Door-to-Door Complete Journey)
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
    budgetCsvUrl: "",
    checklistCsvUrl: "",
    todoCsvUrl: ""
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
      priority: "🟢 已完成",
      deadline: "已确定 (8/7)",
      status: "已完成",
      notes: "已确定阿拉斯加航空：去程 8/16 AS803 (10:05-12:58)，回程 8/21 AS826 (11:33-19:53)"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Waikiki Malia 酒店 (8/16 1晚)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "8/16 首晚入住 (896.41 + 321.33 = 1,217.74 RMB)"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Sheraton Waikiki 酒店 (8/17-8/18 2晚)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "奢华海景度假日 (5029.62 + 835.28 = 5,864.90 RMB)，无边泳池"
    },
    {
      phase: "🔥 当务之急",
      task: "预订 Waikiki Malia 酒店 (8/19-8/20 2晚)",
      priority: "🔴 紧急",
      deadline: "尽快 (8月上旬)",
      status: "未完成",
      notes: "环岛与古兰尼完结后入住 (1679.42 + 642.67 = 2,322.09 RMB)"
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
      deadline: "提前 14 天 (8/3左右)",
      status: "未完成",
      notes: "预约 8/17 早晨 06:30 场次"
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
    }
  ],

  hotels: [
    {
      date: "8/16 (周日 1晚)",
      name: "Waikiki Malia",
      nights: 1,
      priceRMB: 1217.74,
      status: "待查确认",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "首晚入住 (896.41+321.33 RMB)，方便离机场交通，次日搬至 Sheraton",
      pnrPlaceholder: "MALIA-CONF-NIGHT1"
    },
    {
      date: "8/17 – 8/18 (周一 - 周二 2晚)",
      name: "Sheraton Waikiki Beach Resort",
      nights: 2,
      priceRMB: 5864.90,
      status: "待查确认",
      address: "2255 Kalakaua Ave, Honolulu, HI 96815",
      notes: "奢华海景度假日 (5029.62+835.28 RMB)，无边泳池；8/18 自驾停车 1 晚约 $60",
      pnrPlaceholder: "SHERATON-CONF-8899"
    },
    {
      date: "8/19 – 8/20 (周三 - 周四 2晚)",
      name: "Waikiki Malia",
      nights: 2,
      priceRMB: 2322.09,
      status: "待查确认",
      address: "2470 Kuhio Ave, Honolulu, HI 96815",
      notes: "环岛与古兰尼完结后入住 (1679.42+642.67 RMB)，8/19 自驾停车 1 晚约 $35",
      pnrPlaceholder: "MALIA-CONF-NIGHT2"
    }
  ],

  rentalCar: {
    period: "8/18 (早) — 8/20 (晚) 连续三天",
    providers: "Avis / Hertz (Waikiki 门店取还车)",
    carTypes: ["Toyota Corolla", "Nissan Sentra", "Hyundai Elantra"],
    costEstimateUSD: 280,
    parkingEstimateUSD: 95,
    gasEstimateUSD: 40,
    totalMileageMiles: "180 - 220 英里 (290 - 355 公里)",
    pnrPlaceholder: "AVIS-WAIKIKI-7788"
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
      notes: "火山海湾渐变色，浮潜天堂。周一/周二闭园注意确认。",
      codePlaceholder: "HANAUMA-RSV-1029"
    },
    {
      id: "kualoa",
      name: "Kualoa Ranch 古兰尼牧场",
      required: true,
      window: "建议提前 1-2 个月在官网预订",
      officialLink: "https://www.kualoa.com/",
      mapQuery: "Kualoa Ranch, Kaneohe, HI",
      notes: "侏罗纪公园取景地。UTV Tour / Movie Sites Tour / Jungle Adventure。",
      codePlaceholder: "KUALOA-UTV-5566"
    },
    {
      id: "diamondhead",
      name: "Diamond Head 钻石山",
      required: true,
      window: "提前 14 天预约登顶时间",
      officialLink: "https://gostateparks.hawaii.gov/diamondhead",
      mapQuery: "Diamond Head State Monument",
      notes: "看火奴鲁鲁全景与日出，建议预约早晨场避免正午暴晒。",
      codePlaceholder: "DH-HIKE-0821"
    },
    {
      id: "pearlharbor",
      name: "Pearl Harbor 珍珠港亚利桑那号",
      required: true,
      window: "提前 8 周或前一天 15:00 抢票",
      officialLink: "https://www.recreation.gov/ticket/facility/233301",
      mapQuery: "Pearl Harbor National Memorial",
      notes: "USS Arizona Memorial 门票预订，预计游查 2.5 小时。",
      codePlaceholder: "PEARL-REC-9922"
    }
  ],

  days: [
    {
      dayNum: 1,
      date: "8月16日 (周日)",
      title: "洛杉矶家中 ➔ LAX ✈️ HNL ➔ 入住 Waikiki Malia",
      tag: "transit",
      carStatus: "🚫 不租车 (Uber)",
      hotelStay: "Waikiki Malia",
      summary: "搭乘 Alaska Airlines AS803 直飞檀香山，下午入住 Waikiki Malia 酒店，Waikiki 海滩漫步与 sunset 晚餐",
      timeline: [
        {
          time: "07:00",
          activity: "从家中出发前往 LAX 机场",
          location: "Home ➔ Los Angeles International Airport (LAX)",
          mapQuery: "Los Angeles International Airport",
          type: "transit",
          details: "检查护照、驾照原件、银行卡及手机充电宝，提前 3 小时前往 LAX Terminal 6",
          modalData: {
            title: "🚗 家中 ➔ LAX 机场送机",
            category: "出发交通",
            items: [
              { label: "出发地点", value: "洛杉矶家中" },
              { label: "目的地", value: "LAX Terminal 6 (Alaska Airlines Check-in)" },
              { label: "建议出发时间", value: "07:00 (预留 1h 路程 + 2h 机场安检托运)" },
              { label: "出行方式", value: "Uber / Lyft / 朋友送机" },
              { label: "行前最后检查", value: "护照、驾照、银行卡、手机充电宝、环保防晒霜" }
            ]
          }
        },
        {
          time: "10:05 - 12:58",
          activity: "LAX ✈️ HNL (航班: 阿拉斯加航空 AS 803)",
          location: "LAX Terminal 6 ➔ HNL Terminal 1",
          mapQuery: "LAX Airport Terminal 6",
          type: "flight",
          badge: "航班卡片与追踪",
          details: "飞行 5 小时 53 分钟，跨太平洋直飞檀香山 (HNL)",
          modalData: {
            title: "✈️ 去程航班: LAX ➔ HNL",
            category: "去程航班",
            flightNum: "AS 803 (Alaska Airlines)",
            pnr: "已确认 (已出票)",
            flightStatusLink: "https://www.google.com/search?q=AS803+flight+status",
            items: [
              { label: "航空公司与航班号", value: "Alaska Airlines AS 803 (已确认)" },
              { label: "预订确认码 (PNR)", value: "已确认 / 电子机票已出", copyable: true },
              { label: "出发 Terminal / 登机口", value: "LAX Terminal 6" },
              { label: "到达 Terminal / 登机口", value: "HNL Terminal 1" },
              { label: "起飞与降落时间", value: "10:05 (LAX PDT) ➔ 12:58 (HNL HST)" },
              { label: "座位分配", value: "主舱 / 已选座" },
              { label: "托运行李额度", value: "每人 1 件托运行李 (限重 50 lbs / 23kg)" },
              { label: "Check-in 柜台", value: "LAX Terminal 6 Alaska Airlines Check-in" },
              { label: "登机凭证", value: "已保存在 Alaska Airlines App / Apple Wallet" }
            ]
          }
        },
        {
          time: "13:30",
          activity: "打 Uber 前往 Waikiki Malia 酒店",
          location: "Daniel K. Inouye International Airport ➔ Waikiki Malia",
          mapQuery: "Waikiki Malia Hotel",
          type: "transit",
          details: "HNL 机场 Ride-share 指定上车点 (Terminal 1 出发层 Ride-Share Zone)",
          modalData: {
            title: "🚕 HNL 机场接机 ➔ Waikiki Malia 酒店",
            category: "接机交通",
            items: [
              { label: "上车地点", value: "HNL Terminal 1 Ride-Share Pickup Zone" },
              { label: "预估车程与车费", value: "约 25 分钟 (约 $35 - $45 USD)" },
              { label: "目的地", value: "Waikiki Malia Main Lobby Drop-off" }
            ]
          }
        },
        {
          time: "14:30",
          activity: "Waikiki Malia 办理入住 & 寄存行李",
          location: "Waikiki Malia",
          mapQuery: "Waikiki Malia Hotel",
          type: "hotel",
          badge: "首晚入住确认",
          details: "办理 Waikiki Malia 首晚入住 (896.41+321.33 RMB)，前往房间休息",
          modalData: {
            title: "🏨 Waikiki Malia Hotel 办理入住 (首晚)",
            category: "酒店入住详情",
            pnr: "MALIA-CONF-NIGHT1",
            items: [
              { label: "预订确认号 (Confirmation)", value: "MALIA-CONF-NIGHT1 (示例)", copyable: true },
              { label: "地址", value: "2470 Kuhio Ave, Honolulu, HI 96815" },
              { label: "入住时间", value: "8/16 14:30 入住 | 8/17 退房换至 Sheraton" },
              { label: "周边便利", value: "出门即到 ABC Store 及周边餐厅" }
            ]
          }
        },
        {
          time: "16:00",
          activity: "Waikiki 海滩漫步 & ABC Store 采购",
          location: "Kalakaua Ave & Waikiki Beach",
          mapQuery: "Waikiki Beach Honolulu",
          type: "relax",
          details: "漫步 Waikiki 海滩，去楼下 ABC Store 采购水、零食及防晒霜"
        },
        {
          time: "18:30",
          activity: "Waikiki 享用海滩晚宴 & 观赏夏威夷日落",
          location: "Waikiki Beach",
          mapQuery: "Waikiki Beach",
          type: "view",
          details: "在海滩边餐厅享用晚餐，体验夏威夷第一天的浪漫夕阳与海风"
        }
      ]
    },
    {
      dayNum: 2,
      date: "8月17日 (周一)",
      title: "Sheraton 度假日｜钻石山日出与市区艺术",
      tag: "relax",
      carStatus: "🚫 不租车 (步行 / Uber)",
      hotelStay: "Sheraton Waikiki Beach Resort",
      summary: "晨间登顶 Diamond Head 看火奴鲁鲁全景，打卡 HoMA 艺术馆，Sheraton 无边泳池玩水看日落",
      timeline: [
        {
          time: "06:30",
          activity: "Diamond Head 钻石山徒步日出",
          location: "Diamond Head State Monument",
          mapQuery: "Diamond Head State Monument",
          type: "adventure",
          badge: "需提前预约",
          details: "晨间登顶火山口，俯瞰整个太平洋与 Waikiki 城市全景",
          modalData: {
            title: "🏔️ Diamond Head 钻石山预约凭证",
            category: "登顶预约",
            pnr: "DH-CONF-8821",
            items: [
              { label: "预约确认号", value: "DH-CONF-8821 (示例)", copyable: true },
              { label: "预约登顶时间段", value: "06:30 AM - 08:00 AM" },
              { label: "门票与交通", value: "门票 $5/人，Uber 车程约 10 分钟" }
            ]
          }
        },
        {
          time: "10:00",
          activity: "Malia 退房 ➔ 前往 Sheraton 寄存行李",
          location: "Waikiki Malia ➔ Sheraton Waikiki",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "hotel",
          details: "办理 Waikiki Malia 退房，前往 Sheraton Waikiki 礼宾部免费寄存行李"
        },
        {
          time: "10:30",
          activity: "Honolulu Museum of Art (HoMA)",
          location: "Honolulu Museum of Art",
          mapQuery: "Honolulu Museum of Art",
          type: "culture",
          details: "出片神地！日式中庭与现代艺术展览，氛围感拉满",
          modalData: {
            title: "🎨 Honolulu Museum of Art (HoMA)",
            category: "艺术门票",
            items: [
              { label: "地址", value: "900 S Beretania St, Honolulu, HI 96814" },
              { label: "门票信息", value: "成人约 $20 USD / 现场或官网购票" },
              { label: "开放时间", value: "10:00 - 18:00 (周一开放)" },
              { label: "拍照建议", value: "日式庭院、咖啡厅与现代艺术走廊" }
            ]
          }
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
          time: "15:00",
          activity: "Sheraton 办理 Check-in & 边缘无边泳池",
          location: "Sheraton Waikiki Edge Infinity Pool",
          mapQuery: "Sheraton Waikiki Beach Resort",
          type: "relax",
          badge: "Check-in 15:00",
          details: "下午 3 点返回 Sheraton 办理 Check-in 入住奢华海景房，在无边泳池玩水看海景！（在酒店玩水！休息诶嘿嘿嘿～🤤）"
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
      hotelStay: "Sheraton Waikiki Beach Resort (停车 $60)",
      summary: "步行取车，打卡恐龙湾、喷泉洞、绝美 Lanikai 细白沙滩、平等院，坦塔罗斯山看夜景，回 Sheraton 停车休息",
      timeline: [
        {
          time: "08:30",
          activity: "步行前往 Avis / Hertz 门店取车",
          location: "Waikiki Rental Car Branch",
          mapQuery: "Avis Rent A Car Waikiki",
          type: "transit",
          badge: "租车凭证与确认号",
          details: "办理手续，检查车况，开启自驾大环线",
          modalData: {
            title: "🚗 Avis / Hertz Waikiki 门店取车",
            category: "租车订单详情",
            pnr: "AVIS-HI-778899",
            items: [
              { label: "租车确认号 (Confirmation)", value: "AVIS-HI-778899 (示例)", copyable: true },
              { label: "取车地点", value: "Avis / Hertz Waikiki International Market Place 门店" },
              { label: "预订车型", value: "Standard Sedan (Toyota Corolla / Nissan Sentra 或同级)" },
              { label: "租期", value: "8/18 08:30 - 8/20 18:00 (连续 3 天)" },
              { label: "取车必需凭证", value: "主驾驶驾照原件、翻译件、主驾驶名下信用卡" },
              { label: "燃油政策", value: "Full-to-Full (满油取车，满油还车)" }
            ]
          }
        },
        {
          time: "09:30",
          activity: "Hanauma Bay 恐龙湾",
          location: "Hanauma Bay Nature Preserve",
          mapQuery: "Hanauma Bay",
          type: "nature",
          badge: "需提前预约",
          details: "火山海湾，渐变果冻海，夏威夷最出名的浮潜天堂",
          modalData: {
            title: "🤿 Hanauma Bay 恐龙湾浮潜预约",
            category: "门票预约凭证",
            pnr: "HANAUMA-CONF-1029",
            items: [
              { label: "预约确认码", value: "HANAUMA-CONF-1029 (示例)", copyable: true },
              { label: "入园时间段", value: "09:30 AM (需提前 15 分钟抵达门外排队)" },
              { label: "门票费用", value: "$25/人 (非夏威夷居民，现场或网上已付)" },
              { label: "停车费", value: "$3 USD (现金/刷卡，车位先到先得)" },
              { label: "入园要求", value: "需出示所有入园者带照片身份证明 (Passport / ID)" }
            ]
          }
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
          type: "hotel",
          badge: "Malia 入住确认",
          details: "打卡超赞饭团 Musubi Cafe 或 Maguro Spot Poke Bowl，入住 Malia 酒店",
          modalData: {
            title: "🏨 Waikiki Malia Hotel 办理入住",
            category: "酒店入住详情",
            pnr: "MALIA-CONF-334455",
            items: [
              { label: "预订确认号", value: "MALIA-CONF-334455 (示例)", copyable: true },
              { label: "地址", value: "2470 Kuhio Ave, Honolulu, HI 96815" },
              { label: "入住晚数", value: "8/18 - 8/21 (共 3 晚)" },
              { label: "停车信息", value: "酒店代客停车约 $35/晚" },
              { label: "紧急诊所提醒", value: "对面 2310 Kuhio Ave 设 Kuhio Medical Clinic" }
            ]
          }
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
      summary: "退房 Sheraton 入住 Malia，打卡 Dole 菠萝园，Haleiwa 小镇刨冰与史努比，Laniakea 海龟，北岸日落",
      timeline: [
        {
          time: "09:00",
          activity: "前往 Dole 菠萝园",
          location: "Dole Plantation",
          mapQuery: "Dole Plantation Hawaii",
          type: "attraction",
          details: "坐 Pineapple Express 观光小火车，打卡 Dole Whip 菠萝冰淇淋，买菠萝 Kitty 限定（不用全部项目，和你在一起就足够啦❤️）"
        },
        {
          time: "12:00",
          activity: "北岸美食午餐 (蒜蓉虾饭 / 漂亮饭)",
          location: "Giovanni's Shrimp Truck / Haleiwa Joe's",
          mapQuery: "Giovanni's Shrimp Truck Haleiwa",
          type: "food",
          details: "Giovanni's 经典 Garlic Shrimp 蒜蓉虾饭，或 Haleiwa Joe's fine dining 风景好的漂亮饭"
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
          activity: "入住 Waikiki Malia 酒店",
          location: "Waikiki Malia Hotel",
          mapQuery: "Waikiki Malia Hotel",
          type: "hotel",
          badge: "Malia 再次入住",
          details: "入住 Waikiki Malia 酒店 (后2晚 1679.42+642.67 RMB)，代客停车 $35/晚",
          modalData: {
            title: "🏨 Waikiki Malia Hotel 办理入住 (后2晚)",
            category: "酒店入住详情",
            pnr: "MALIA-CONF-NIGHT2",
            items: [
              { label: "预订确认号", value: "MALIA-CONF-NIGHT2 (示例)", copyable: true },
              { label: "入住时间", value: "8/19 - 8/21 (共 2 晚)" },
              { label: "停车信息", value: "酒店代客停车约 $35/晚 (8/19 停 1 晚)" }
            ]
          }
        }
      ]
    },
    {
      dayNum: 5,
      date: "8月20日 (周四)",
      title: "古兰尼牧场 & 珍珠港｜雨林冒险与还车",
      tag: "adventure",
      carStatus: "🚗 租车 Day 3 (傍晚 Waikiki 还车)",
      hotelStay: "Waikiki Malia (无停车费)",
      summary: "珍珠港亚利桑那号历史怀古，古兰尼牧场 UTV/电影之旅，Kualoa 草帽岛，侏罗纪雨林植物园，傍晚还车",
      timeline: [
        {
          time: "08:30",
          activity: "Pearl Harbor 珍珠港历史怀古",
          location: "Pearl Harbor National Memorial",
          mapQuery: "Pearl Harbor National Memorial",
          type: "culture",
          badge: "需提前预约",
          details: "参观 USS Arizona Memorial 亚利桑那号纪念馆，感受历史沉淀 (预计 2.5h)",
          modalData: {
            title: "⚓ Pearl Harbor 珍珠港亚利桑那号门票",
            category: "纪念馆凭证",
            pnr: "PEARL-REC-5544",
            items: [
              { label: "预订确认号 (Recreation.gov)", value: "PEARL-REC-5544 (示例)", copyable: true },
              { label: "渡轮与纪念馆场次", value: "08:45 AM (需提前 30 分钟通过安检)" },
              { label: "安检安全规定", value: "严禁携带任何背包/手提包 (可携带透明水瓶与口袋相机)" }
            ]
          }
        },
        {
          time: "12:00",
          activity: "前往古兰尼牧场 & Ranch House 午餐",
          location: "Kualoa Ranch House",
          mapQuery: "Kualoa Ranch House",
          type: "food",
          details: "抵达古兰尼牧场，享用 Ranch House 特色牛肉汉堡与牛肉饭休整"
        },
        {
          time: "13:30",
          activity: "Kualoa Ranch 古兰尼牧场",
          location: "Kualoa Ranch",
          mapQuery: "Kualoa Ranch Hawaii",
          type: "adventure",
          badge: "需提前预约",
          details: "侏罗纪公园取景地！体验 UTV 越野车 / Movie Sites Tour / Jungle Adventure",
          modalData: {
            title: "🌋 Kualoa Ranch 古兰尼牧场预订",
            category: "活动预订凭证",
            pnr: "KUALOA-UTV-9988",
            items: [
              { label: "预订确认号", value: "KUALOA-UTV-9988 (示例)", copyable: true },
              { label: "行程项目", value: "Raptor UTV Tour / Movie Sites Tour / Jungle Adventure" },
              { label: "着装提醒", value: "全包全封式鞋子 (Closed-toe shoes)、包头护目镜/太阳镜" }
            ]
          }
        },
        {
          time: "15:30",
          activity: "Kualoa Regional Park & 侏罗纪植物园",
          location: "Kualoa Regional Park & Ho'omaluhia Garden",
          mapQuery: "Ho'omaluhia Botanical Garden",
          type: "nature",
          details: "草帽岛明信片打卡，游览 Ho'omaluhia Botanical Garden 侏罗纪火山雨林"
        },
        {
          time: "18:00",
          activity: "返回 Waikiki 门店还车 & 海滩散步",
          location: "Waikiki Rental Branch",
          mapQuery: "Avis Rent A Car Waikiki",
          type: "transit",
          details: "顺畅归还租车，加满油箱，从今晚起无额外停车费！傍晚在 Waikiki 海滩散步晚餐"
        }
      ]
    },
    {
      dayNum: 6,
      date: "8月21日 (周五)",
      title: "Waikiki 告别 ➔ HNL ✈️ LAX ➔ 回到温馨的家",
      tag: "transit",
      carStatus: "🚫 不租车 (Uber)",
      hotelStay: "无 (今晚抵达 LAX)",
      summary: "享用夏威夷最后早餐，打车前往 HNL 机场搭乘 AS826 航班，傍晚顺利飞抵 LAX 返家",
      timeline: [
        {
          time: "08:00",
          activity: "Waikiki Malia 办理退房 & 告别早餐",
          location: "Waikiki Malia",
          mapQuery: "Waikiki Malia",
          type: "hotel",
          details: "办理退房，在 Waikiki 享用丰盛的夏威夷特色早餐"
        },
        {
          time: "08:40",
          activity: "打 Uber 前往 HNL 檀香山机场",
          location: "Daniel K. Inouye International Airport",
          mapQuery: "Daniel K. Inouye International Airport",
          type: "transit",
          details: "打车前往 HNL 机场 Terminal 1 (预留 2.5 小时办理登机、托运及安检)"
        },
        {
          time: "11:33 - 19:53",
          activity: "HNL ✈️ LAX (航班: 阿拉斯加航空 AS 826)",
          location: "HNL Terminal 1 ➔ LAX Terminal 6",
          mapQuery: "Daniel K. Inouye International Airport Terminal 1",
          type: "flight",
          badge: "返程航班详情",
          details: "直飞 5 小时 20 分钟，当晚 (8/21 周五) 19:53 顺利抵洛杉矶 (LAX)",
          modalData: {
            title: "✈️ 返程航班: HNL ➔ LAX",
            category: "返程航班",
            flightNum: "AS 826 (Alaska Airlines)",
            pnr: "已确认 (已出票)",
            flightStatusLink: "https://www.google.com/search?q=AS826+flight+status",
            items: [
              { label: "航空公司与航班号", value: "Alaska Airlines AS 826 (已确认)" },
              { label: "预订确认码 (PNR)", value: "已确认 / 电子机票已出", copyable: true },
              { label: "出发 Terminal / 登机口", value: "HNL Terminal 1" },
              { label: "到达 Terminal / 登机口", value: "LAX Terminal 6" },
              { label: "起飞与降落时间", value: "11:33 (HNL HST) ➔ 19:53 (LAX PDT)" },
              { label: "座位分配", value: "主舱 / 已选座" },
              { label: "托运行李额度", value: "每人 1 件托运行李 (限重 50 lbs / 23kg)" }
            ]
          }
        },
        {
          time: "20:30 (8/21)",
          activity: "从 LAX 机场接机返回温馨家中",
          location: "LAX Terminal 6 ➔ Home",
          mapQuery: "Los Angeles International Airport",
          type: "transit",
          details: "领取行李，Uber / 朋友接机，安全返回洛杉矶家中，夏威夷之旅圆满结束！",
          modalData: {
            title: "🏠 LAX 机场接机返回家中",
            category: "返程交通",
            items: [
              { label: "接机地点", value: "LAX Terminal 6 Arrivals / Ride-Share Pickup Zone" },
              { label: "目的地", value: "洛杉矶家中" },
              { label: "休息提醒", value: "顺畅返回家中，好好休息与整理夏威夷照片！" }
            ]
          }
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
