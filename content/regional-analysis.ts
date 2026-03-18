export const regionIds = ["cn", "jp", "kr", "eu", "us"] as const;
export type RegionId = (typeof regionIds)[number];

export interface RegionProfile {
  id: RegionId;
  flag: string;
  name: string;
  strategy: string;
  drivers: string;
  oems: string[];
  chips: string[];
}

export interface DomainScore {
  domainName: string;
  scores: Record<RegionId, number>;
}

export interface RegionalTrend {
  id: string;
  title: string;
  summary: string;
}

export interface ChipEntry {
  oem: string;
  chip: string;
  process: string;
  tops: string;
  status: string;
}

export interface RegionalAnalysisContent {
  regions: RegionProfile[];
  scoringMatrix: DomainScore[];
  trends: RegionalTrend[];
  chipRace: ChipEntry[];
}

export const regionalAnalysisContent: RegionalAnalysisContent = {
  regions: [
    {
      id: "cn",
      flag: "🇨🇳",
      name: "中國",
      strategy: "速度領先 — 最快上車、最大規模",
      drivers: "市場競爭 + 政府補貼 + C-NCAP",
      oems: ["BYD", "NIO", "XPeng", "理想", "華為(問界)", "小米", "吉利/極氪"],
      chips: ["NVIDIA Orin", "華為昇騰 610", "地平線 J6", "小鵬圖靈", "蔚來神璣 NX9031", "黑芝麻 A2000"],
    },
    {
      id: "jp",
      flag: "🇯🇵",
      name: "日本",
      strategy: "穩健轉型 — 品質優先、合作驅動",
      drivers: "SDV 國家戰略 + 全球出口合規",
      oems: ["Toyota", "Honda", "Nissan", "Subaru", "Mazda"],
      chips: ["Renesas R-Car", "TI TDA4", "Mobileye EyeQ", "NVIDIA Orin (Toyota 合作)"],
    },
    {
      id: "kr",
      flag: "🇰🇷",
      name: "韓國",
      strategy: "硬體供應鏈 + 差異化創新",
      drivers: "半導體/面板生態 + Euro NCAP 合規",
      oems: ["Hyundai", "Kia", "Genesis"],
      chips: ["Samsung Exynos Auto", "Qualcomm SA8295P", "Mobileye", "Hyundai Mobis 自研"],
    },
    {
      id: "eu",
      flag: "🇪🇺",
      name: "歐洲",
      strategy: "法規驅動 + 頂級技術展示",
      drivers: "Euro NCAP 2026 + EU GSR + 品牌溢價",
      oems: ["Mercedes-Benz", "BMW", "VW/Audi", "Volvo", "Stellantis", "Porsche"],
      chips: ["Qualcomm Ride (BMW)", "NVIDIA Orin (Mercedes/Volvo)", "Mobileye Chauffeur", "Bosch/Continental/Valeo"],
    },
    {
      id: "us",
      flag: "🇺🇸",
      name: "美國",
      strategy: "軟體為王 — 定義架構與平台標準",
      drivers: "矽谷生態 + 資本驅動 + 數據規模",
      oems: ["Tesla", "GM (Cadillac/Cruise)", "Ford", "Rivian", "Lucid", "Waymo"],
      chips: ["Tesla FSD HW4 (自研)", "NVIDIA DRIVE", "Qualcomm Snapdragon Ride", "Mobileye"],
    },
  ],

  scoringMatrix: [
    {
      domainName: "ADAS 感測融合",
      scores: { cn: 9, jp: 7, kr: 7, eu: 9, us: 10 },
    },
    {
      domainName: "座艙 DMS/OMS",
      scores: { cn: 7, jp: 6, kr: 7, eu: 9, us: 6 },
    },
    {
      domainName: "語音 AI / GenAI",
      scores: { cn: 8, jp: 5, kr: 6, eu: 9, us: 7 },
    },
    {
      domainName: "IVI 資訊娛樂",
      scores: { cn: 9, jp: 6, kr: 8, eu: 8, us: 7 },
    },
    {
      domainName: "BMS AI 電池管理",
      scores: { cn: 9, jp: 7, kr: 7, eu: 7, us: 8 },
    },
    {
      domainName: "底盤安全控制",
      scores: { cn: 7, jp: 8, kr: 7, eu: 9, us: 7 },
    },
    {
      domainName: "V2X 車聯網",
      scores: { cn: 10, jp: 5, kr: 6, eu: 7, us: 5 },
    },
    {
      domainName: "智慧照明",
      scores: { cn: 7, jp: 6, kr: 6, eu: 9, us: 6 },
    },
    {
      domainName: "自動泊車",
      scores: { cn: 9, jp: 6, kr: 8, eu: 7, us: 7 },
    },
    {
      domainName: "車身電子與舒適",
      scores: { cn: 8, jp: 7, kr: 8, eu: 8, us: 6 },
    },
  ],

  trends: [
    {
      id: "trend-01",
      title: "中國 vs 歐洲：兩種截然不同的領先模式",
      summary:
        "中國以「市場競爭 + 消費者偏好」驅動，3-6 個月快速適配，堆料降價配備全面下放。優勢領域：V2X、LiDAR 上車、AR-HUD、泊車。歐洲以「法規標準 + 品牌溢價」驅動，2-3 年開發週期，頂級旗艦技術展示。優勢領域：DMS 法規、底盤安全、智慧照明、L3 認證。",
    },
    {
      id: "trend-02",
      title: "日本的轉型挑戰",
      summary:
        "Toyota GAIA + Honda Helm.ai 標誌著日系加速 AI 化，但 Keiretsu 供應鏈模式限制跨界合作速度。METI SDV 戰略目標 30% 全球市佔，需要打破公司間壁壘。固態電池（Toyota 2027-2028 目標）可能是重新洗牌的關鍵技術。",
    },
    {
      id: "trend-03",
      title: "韓國的差異化路徑",
      summary:
        "Samsung + LG 半導體/面板供應鏈是獨特優勢。Genesis 生物辨識（人臉+指紋）全球首創，走差異化科技豪華路線。Hyundai Mobis 垂直整合能力強，同時供應內外客戶。風險：在 L3 自駕和 GenAI 座艙上需加速追趕。",
    },
    {
      id: "trend-04",
      title: "美國的生態優勢",
      summary:
        "NVIDIA + Qualcomm + Mobileye 三大晶片商定義全球標準。Tesla FSD 數據量 + Waymo L4 商業化構成最強軟體壁壘。但在基礎設施（V2X/ADB 法規）和製造供應鏈上存在短板。矽谷 AI 人才和資本是持續創新的核心引擎。",
    },
  ],

  chipRace: [
    {
      oem: "Tesla",
      chip: "FSD HW4 (AI4)",
      process: "Samsung 7nm",
      tops: "~300 TOPS",
      status: "量產中",
    },
    {
      oem: "XPeng 小鵬",
      chip: "圖靈 Turing",
      process: "5nm",
      tops: "~500 TOPS",
      status: "2025 年 6 月量產",
    },
    {
      oem: "NIO 蔚來",
      chip: "神璣 NX9031",
      process: "5nm",
      tops: "500 億電晶體",
      status: "2025 年 3 月首搭",
    },
    {
      oem: "Li Auto 理想",
      chip: "M100 (開發中)",
      process: "TBD",
      tops: "TBD",
      status: "開發階段",
    },
    {
      oem: "Huawei 華為",
      chip: "昇騰 610",
      process: "7nm",
      tops: "~400 TOPS",
      status: "量產中",
    },
  ],
};
