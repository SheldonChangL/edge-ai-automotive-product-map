export const reportOverview = {
  summary:
    "本網站整理 Edge AI 在車用電子領域的 47 項產品應用，涵蓋 10 大核心領域。每項產品均對應 AI 應用場景、邊緣推論方案、參考晶片平台、量產現況，以及全球主要車廠 (OEM) 的實際導入情況與關鍵洞察。",
  findings: [
    "ADAS 感測融合與座艙 DMS 已進入法規強制期，由 Euro NCAP 2026 和 EU GSR 驅動",
    "車載語音 AI 正經歷 GenAI 變革，Mercedes/BMW 率先整合 ChatGPT/Gemini/Alexa+",
    "AI-BMS 市場 CAGR 達 24%，Tesla/BYD/CATL 垂直整合模式領先",
    "中國 OEM 在 LiDAR、環景、AR-HUD、C-V2X 等領域上車速度遠超歐美",
    "NVIDIA Orin 和 Qualcomm SA8295P 分別主導 ADAS 域控和 IVI 座艙兩大平台",
  ],
  outlook: [
    "法規驅動加速：Euro NCAP 2026 將 DMS/OMS 列為五星必要條件，EU GSR 強制 EDR/DMS/ISA，推動車廠全面導入 AI 安全系統。中國 C-NCAP 2024 納入 C-V2X 評分，加速車聯網部署。",
    "GenAI 重塑座艙體驗：2025-2026 年是車載大語言模型元年。Mercedes (Gemini + ChatGPT)、BMW (Alexa+)、VW (ChatGPT)、Tesla (Grok) 紛紛將 GenAI 導入語音助理，端側推論需求推動高通 SA8295P 成為標準平台。",
    "中國 OEM 領跑：中國品牌在 LiDAR 上車 (禾賽/速騰)、AR-HUD (華為 87 吋)、C-V2X (27 萬+量產車)、環景泊車等領域進度顯著領先歐美。BYD 雲輦懸吊、華為 MDC 域控等自研方案崛起。",
    "晶片雙雄格局：NVIDIA Orin 系列主導 ADAS 高階域控 (供 NIO/XPeng/Mercedes/Volvo 等)；Qualcomm SA8295P 主導 IVI 座艙 (供 BMW/Mercedes/NIO 等)。高通 Ride 搶下 BMW Neue Klasse ADAS 大單，挑戰 NVIDIA 在 ADAS 的地位。",
    "SDV 軟體定義車輛：OTA 能力已成電動車標配。Tesla 累計推送上百次更新，Mercedes 可 OTA 更新 L3 Drive Pilot。車載邊緣閘道 (NXP S32G/Renesas R-Car S4) 是 SDV 架構核心，支援域控集中化和預測性維護。",
  ],
} as const;

export const productReportDetails = {
  "adas-forward-camera-module": {
    productionStatus: "量產普及",
    oemAdoption:
      "Tesla (HW4 全車 8-13 攝影機純視覺方案)、Mobileye EyeQ6 供應 BMW/VW/Nissan 等超過 60 家 OEM、Subaru EyeSight 雙鏡頭系統、Volvo 與 Luminar 合作前向感知",
    keyInsight:
      "Tesla 率先放棄雷達改用純視覺路線；Mobileye 佔據全球 ADAS 攝影機處理器超過 70% 市佔。Euro NCAP 要求 AEB 已推動攝影機成為所有新車標配。",
  },
  "adas-around-view-monitor": {
    productionStatus: "量產普及",
    oemAdoption:
      "BMW (Surround View)、Mercedes-Benz (360° Camera)、Hyundai/Kia (Surround View Monitor)、Toyota/Lexus (Panoramic View Monitor)、NIO/XPeng/BYD (全景影像已為中國電動車標配)",
    keyInsight:
      "環景系統已下放至主流車款，如 Toyota RAV4、Hyundai Tucson 等中價位車型。中國品牌如 BYD、理想等將其列為標配，推動成本大幅下降。",
  },
  "adas-mmwave-radar-module": {
    productionStatus: "量產普及",
    oemAdoption:
      "幾乎所有主流車廠均搭載 — BMW/Mercedes/Audi (長距 77GHz)、Bosch (第六代雷達供 VW/Toyota 等)、Continental (供 Ford/GM)、Waymo (自研雷達)。Tesla 為唯一例外，2021 年後移除雷達",
    keyInsight:
      "4D 成像雷達是新趨勢，可提供類 LiDAR 的點雲。Arbe、Vayyar、ZF 等廠商推出 4D 雷達產品。Tesla 雖移除雷達，但多數 OEM 仍視其為 ADAS 安全冗餘的核心感測器。",
  },
  "adas-lidar-module": {
    productionStatus: "高階量產中",
    oemAdoption:
      "Volvo EX90 (Luminar Iris)、Mercedes-Benz S-Class (Valeo SCALA L3)、BMW iX/i7 (Innoviz Two)、蔚來 ET7/ES6 (圖達通 Falcon)、小鵬 G6/G9 (速騰聚創)、理想 L9 (禾賽 AT128)、Waymo/Cruise 自駕計程車",
    keyInsight:
      "Mercedes 是全球首家獲 L3 認證的車廠 (Drive Pilot)，搭載 Valeo LiDAR。中國 OEM 在 LiDAR 上車速度遠超歐美，禾賽、速騰、圖達通等已大規模出貨。成本從早期 $10,000+ 下降至 $500-1,000。",
  },
  "adas-ultrasonic-array": {
    productionStatus: "量產普及 (Tesla 已移除)",
    oemAdoption:
      "BMW/Mercedes/Audi/VW/Toyota/Hyundai (全系列標配 12 顆超音波)。Tesla 自 2022 年移除超音波，改用 Tesla Vision 純視覺替代",
    keyInsight:
      "Tesla 取消超音波是業界特例，多數 OEM 仍將其視為低速泊車的核心感測器。Bosch/Valeo 持續供應全球主要車廠。",
  },
  "adas-fusion-ecu": {
    productionStatus: "高階量產中",
    oemAdoption:
      "Tesla (FSD Computer HW4, 自研晶片)、NVIDIA DRIVE Orin (供 NIO/XPeng/理想/Mercedes/Volvo/BYD 等)、Qualcomm Snapdragon Ride (供 BMW Neue Klasse/GM)、Mobileye Chauffeur (供 Zeekr/Polestar)、Huawei MDC (供問界/阿維塔)",
    keyInsight:
      "NVIDIA Orin 是目前裝車量最大的高階域控制器平台。Tesla 自研 HW4 (Samsung 代工)。高通 Ride 搶下 BMW 新世代平台大單。華為 MDC 在中國市場崛起。",
  },
  "cabin-driver-monitoring-system": {
    productionStatus: "量產普及 (法規驅動)",
    oemAdoption:
      "Volvo ES90 (雙攝 Driver Understanding System，超越 Euro NCAP 2026 要求)、BMW (IR+AI 方案)、Tesla (單攝影機 DMS)、Cadillac/GM Super Cruise (Seeing Machines)、Mercedes (結合 ADAS 的 DMS)、Subaru/Ford/Hyundai (各有 DMS 方案)",
    keyInsight:
      "Euro NCAP 2026 將 DMS 列為五星評級必要條件（佔 25 分），首度納入酒精/藥物損傷偵測。EU GSR 法規已於 2024 強制要求新車搭載 DMS。Seeing Machines、Smart Eye 為主要技術供應商。",
  },
  "cabin-occupant-monitoring-system": {
    productionStatus: "加速導入中",
    oemAdoption:
      "Volvo EX90 (車內雷達感應兒童遺留)、Tesla (座艙攝影機偵測乘客)、Hyundai (後座提醒系統)、BMW (後座安全帶偵測)、Genesis (乘員感知安全氣囊調整)",
    keyInsight:
      "Euro NCAP 2026 將乘員監控納入 30 分評分項目，包含兒童遺留偵測 (CPD)。Hot Car Act 法案推動美國市場。多數 OEM 正在導入中。",
  },
  "cabin-gesture-recognition-module": {
    productionStatus: "豪華車選配",
    oemAdoption:
      "BMW 7 Series/iX (Gesture Control，2015 年率先導入，可旋轉調音量、揮手接聽)、Mercedes S-Class (MBUX 手勢互動)、Hyundai/Genesis (部分車型)",
    keyInsight:
      "BMW 是手勢控制先驅，但市場接受度有限，多數用戶偏好語音控制。部分 OEM 已轉向投資語音 AI 而非手勢。",
  },
  "cabin-voice-ai-assistant": {
    productionStatus: "快速演進中 (GenAI 浪潮)",
    oemAdoption:
      "Mercedes-Benz MBUX (整合 ChatGPT + Google Gemini AI Agent，2025 CLA 首發 MB.OS)、BMW Intelligent Personal Assistant (2026 整合 Amazon Alexa+)、VW IDA (ChatGPT + Cerence)、Tesla Grok (自家 xAI)、Hyundai (與 NVIDIA 數位孿生合作)、Lucid (SoundHound AI)、Ford (Alexa Built-in)",
    keyInsight:
      "2025-2026 是車載語音 AI 分水嶺：Mercedes 同時整合 Microsoft 和 Google 的 AI，BMW 拿下 Alexa+ 首發。端側 LLM 部署成為新戰場，Qualcomm SA8295P 支援端側大模型推論。",
  },
  "cabin-air-quality-sensor": {
    productionStatus: "豪華車選配",
    oemAdoption:
      "Tesla (生化武器防禦模式 HEPA)、Mercedes (ENERGIZING Air Control)、Volvo (CleanZone + PM2.5 感測)、Geely/BYD (中國市場因空污問題已廣泛搭載)",
    keyInsight:
      "中國市場因空氣品質議題，推動空氣感測器快速下放至中低價車款。AI 預測與自動調節仍處早期階段。",
  },
  "cabin-biometric-auth-module": {
    productionStatus: "高階車款導入",
    oemAdoption:
      "Genesis GV60/GV70 (Face Connect 人臉辨識 + 指紋啟動，全球首創)、Subaru (駕駛人臉辨識自動座椅/後視鏡設定)、Tesla (攝影機驅動的駕駛人識別)、BMW (手機數位鑰匙 + 駕駛辨識)、蔚來/小鵬 (人臉辨識上車)",
    keyInsight:
      "Genesis 是生物辨識整合最完整的品牌（人臉+指紋+靜脈辨識）。技術主要用於個人化設定連動，而非取代實體鑰匙。",
  },
  "ivi-smart-central-display": {
    productionStatus: "量產普及",
    oemAdoption:
      "Mercedes MBUX Hyperscreen (56 吋橫貫螢幕)、BMW iDrive/OS X (高通 SA8295P)、Tesla 15.4 吋中控、Rivian (雙螢幕)、BYD (15.6 吋可旋轉螢幕)、小鵬/蔚來/理想 (高通 8295 平台)",
    keyInsight:
      "Qualcomm SA8295P (Snapdragon Digital Chassis) 已成為高階 IVI 的事實標準，供 BMW、Mercedes、NIO、XPeng 等。Samsung Exynos Auto V920 搶下 Hyundai/Kia。",
  },
  "ivi-digital-cluster": {
    productionStatus: "量產普及",
    oemAdoption:
      "幾乎所有主流 OEM 已採用全數位儀表 — BMW (12.3 吋)、Mercedes (12.3 吋 OLED)、Audi (Virtual Cockpit 先驅)、VW、Hyundai/Kia、Toyota。Audi 2014 年以 Virtual Cockpit 開創全數位儀表風潮",
    keyInsight:
      "Audi Virtual Cockpit 是業界標竿。AI 應用目前較淺層（動態資訊排列），深度個人化仍在發展中。",
  },
  "ivi-rear-seat-entertainment": {
    productionStatus: "豪華/MPV 車款",
    oemAdoption:
      "BMW 7 Series (31 吋 Theater Screen, Amazon Fire TV 整合)、Mercedes S/EQS (後座 MBUX 平板)、Volvo EX90 (後座娛樂)、豐田 Alphard/Vellfire (日系 MPV 標配)、BYD 騰勢 D9/理想 L9 (後座娛樂大屏)",
    keyInsight:
      "BMW 7 系的 31 吋 Theater Screen 搭配 Amazon Fire TV 是目前最旗艦方案。中國 MPV 市場（騰勢、理想）推動後座娛樂快速發展。",
  },
  "ivi-connectivity-tbox": {
    productionStatus: "快速導入中",
    oemAdoption:
      "GM OnStar (AT&T 5G，北美連網車龍頭)、BMW ConnectedDrive (5G 2024+ 車型)、Mercedes me connect、Ford (AT&T 合作)、Tesla (自建 Starlink 衛星連網測試中)、中國 OEM (幾乎全部搭載 4G/5G T-Box)",
    keyInsight:
      "GM 與 AT&T 合作擁有超過 6,000 萬台連網車。北美約 50-60% 新車搭載蜂巢式數據機。5G 車聯網預計 2025-2026 大規模上路。",
  },
  "ivi-ar-hud": {
    productionStatus: "豪華車導入，加速下放",
    oemAdoption:
      "Mercedes S-Class/EQS (77 吋 AR-HUD，業界最大)、BMW iX/i7 (AR-HUD)、Audi Q6 e-tron (AR-HUD)、Hyundai Ioniq 5/6 (12 吋 AR-HUD)、小鵬 G6/P7i (AR-HUD)、華為 x XPeng G7 (87 吋 AR-HUD，2025 發表)",
    keyInsight:
      "Mercedes S-Class AR-HUD 是量產車標竿。華為與小鵬合作的 87 吋 AR-HUD 為目前全球最大。AR-HUD 正從豪華車下放至 30-40 萬級電動車。Continental、Nippon Seiki 為主要供應商。",
  },
  "ev-battery-management-system": {
    productionStatus: "量產，AI 化加速中",
    oemAdoption:
      "Tesla (垂直整合 BMS，自研 AI 演算法，透過車隊數據持續優化)、BYD (刀片電池專屬 BMS)、CATL (與 BMW/Mercedes 合作 AI-BMS)、Bosch (ioBMS 工業方案)、TWAICE (雲端電池分析，供 OEM)",
    keyInsight:
      "AI-BMS 市場 2025 年估值 $41 億，預計 2032 年達 $185 億 (CAGR 24%)。Tesla/BYD/CATL 的垂直整合模式領先。LSTM/GRU 是 SOC/SOH 預測主流模型。Physics-Informed Neural Networks (PINNs) 是新興方向。",
  },
  "ev-motor-controller": {
    productionStatus: "量產，AI 優化起步",
    oemAdoption:
      "Tesla (自研碳化矽逆變器，軟體持續 OTA 優化效率)、BYD (八合一電驅 e-Platform 3.0)、Hyundai/Kia (E-GMP 平台 PE 模組)、BMW (第五代 eDrive)、Bosch/ZF/Continental (Tier-1 供應全球 OEM)",
    keyInsight:
      "碳化矽 (SiC) MOSFET 推動逆變器效率提升。AI 主要用於扭矩分配優化和預測性維護，尚處早期階段。Tesla 透過 OTA 持續優化馬達效率曲線。",
  },
  "ev-smart-charging-module": {
    productionStatus: "發展中",
    oemAdoption:
      "Tesla (Supercharger + Wall Connector，智慧排程)、VW (Elli 能源管理)、Ford (Intelligent Backup Power V2H)、Nissan Leaf (V2G 先驅)、BYD (雙向充放電技術)、ChargePoint/ABB (智慧充電網路)",
    keyInsight:
      "V2G/V2H 是新趨勢：Ford F-150 Lightning 支援整屋供電、Nissan 是 V2G 先驅。AI 排程主要在雲端執行，邊緣端 AI 尚未普及。",
  },
  "ev-energy-regeneration-controller": {
    productionStatus: "量產，AI 優化起步",
    oemAdoption:
      "Tesla (基於導航的能量回收，學習駕駛習慣)、BMW (Adaptive Recuperation 結合導航與前車距離)、Mercedes (ECO Assist 預測性回收)、Porsche Taycan (可調回收力道)、Hyundai i-Pedal (單踏板模式)",
    keyInsight:
      "BMW Adaptive Recuperation 和 Mercedes ECO Assist 是目前 AI 化程度最高的回收系統，結合導航、地形與交通預測。大多數 OEM 仍以固定回收模式為主。",
  },
  "ev-thermal-management-controller": {
    productionStatus: "發展中",
    oemAdoption:
      "Tesla (八通閥熱泵整合系統，業界最先進)、BYD (寬溫域高效熱泵)、Hyundai/Kia (E-GMP 熱泵系統)、BMW (第五代 eDrive 整合熱管理)、NIO (熱管理專利眾多)",
    keyInsight:
      "Tesla 的八通閥 (Octovalve) 熱管理系統是電動車產業標竿，實現電池/馬達/座艙熱能交換最佳化。AI 在熱管理中的應用仍處早期研究階段，以數位孿生模擬為主。",
  },
  "chassis-electronic-stability-control": {
    productionStatus: "全球法規強制標配",
    oemAdoption:
      "Bosch ESP (全球市佔超 60%，供所有主流 OEM)、Continental MK C2 (整合 ESC+煞車)、ZF (供 BMW/Stellantis)、Hyundai Mobis (自研 ESC)",
    keyInsight:
      "ESC 自 2012 年起在歐美強制要求，已是成熟技術。AI 應用（路面摩擦估算）仍處研究階段，量產多為傳統 Kalman 濾波。",
  },
  "chassis-electronic-power-steering": {
    productionStatus: "量產普及",
    oemAdoption:
      "Bosch/JTEKT/NSK/ZF (全球四大 EPS 供應商)、Tesla (線控轉向 Cybertruck)、Toyota/Lexus (VGRS 可變齒比)、BMW (整合式主動轉向)、Hyundai (e-Corner 線控轉向概念)",
    keyInsight:
      "線控轉向 (Steer-by-Wire) 是下一代技術，Tesla Cybertruck 率先量產搭載。Lexus 也推出線控轉向。AI 主要用於車道維持的扭矩疊加控制。",
  },
  "chassis-active-suspension-system": {
    productionStatus: "豪華車搭載",
    oemAdoption:
      "Mercedes (Magic Body Control / E-Active Body Control，攝影機掃描路面預測調整)、BMW (Adaptive M Suspension)、Audi (Predictive Active Suspension，e-tron GT)、Tesla (自適應空氣懸吊)、BYD (雲輦系統 DiSus，含智能液壓車身控制)",
    keyInsight:
      "Mercedes E-Active Body Control 是 AI 懸吊標竿，使用攝影機預掃描路面。BYD 雲輦 (DiSus) 系統在中國市場引發熱議，支援車身姿態主動控制。",
  },
  "chassis-smart-brake-system": {
    productionStatus: "過渡期 (iBooster → EMB)",
    oemAdoption:
      "Bosch iBooster (供 Tesla/VW/BMW 等)、Continental MK C2 (整合 ESC+線控煞車)、Brembo Sensify (AI 煞車分配)、華為 (線控煞車 iDC)、比亞迪 (DiSus 整合線控煞車)",
    keyInsight:
      "電子機械煞車 (EMB) 是未來趨勢，取消液壓迴路。Brembo Sensify 是首個 AI 驅動的煞車分配系統。華為 iDC 在中國市場快速上量。",
  },
  "chassis-tire-pressure-monitoring-system": {
    productionStatus: "全球法規強制標配",
    oemAdoption:
      "所有新車標配 (法規要求)。Continental、Sensata、Pacific Industrial 為主要 Tier-1。Tesla/BMW/Mercedes 整合於車機顯示。部分品牌如 Hyundai 提供個別輪胎溫度警示",
    keyInsight:
      "TPMS 已是成熟法規標配。AI 預測輪胎壽命和漏氣趨勢是新興應用，目前多在車隊管理場景中見到 (如 Bridgestone 的 Fleet 解決方案)。",
  },
  "v2x-c-v2x-module": {
    productionStatus: "試點/初期量產",
    oemAdoption:
      "Ford (中國已部署 100+ 路口 C-V2X，計劃全美新車搭載)、GM Cadillac CTS (DSRC V2V 先驅)、Toyota (日本 2016 率先量產 V2X)、VW Golf 8 (歐洲 V2V)、SAIC MG MARVEL R (全球首款 5G V2X SUV)、Audi A6L/A7L 中國版 (5G C-V2X)",
    keyInsight:
      "中國 C-V2X 領先全球，超 270,000 輛量產車搭載，納入 2024 China-NCAP 評分。美國 FCC 已通過 5.9GHz C-V2X 規則。5GAA 聯盟成員含 BMW/Mercedes/Ford/GM/Hyundai 等。",
  },
  "v2x-roadside-unit": {
    productionStatus: "智慧城市試點",
    oemAdoption:
      "非車廠主導 — Qualcomm (RSU 參考設計)、Commsignia、Kapsch TrafficCom、HARMAN (Samsung)、Siemens Mobility。中國百度 Apollo/阿里達摩院大規模部署",
    keyInsight:
      "RSU 部署由政府/基礎設施商主導而非車廠。中國進度最快，多城市已有規模化示範區。美國 USDOT 於 2024 年撥款 $6,000 萬推動 V2X 基建。",
  },
  "v2x-hd-map-update-module": {
    productionStatus: "高度演進中",
    oemAdoption:
      "Mobileye REM (全球最大眾包高精地圖，供 BMW/VW 等)、Tesla (自建地圖透過車隊眾包)、Waymo (自研 HD Map)、HERE HD Live Map (供 Mercedes/BMW)、高德/百度 (中國高精地圖供 NIO/XPeng 等)",
    keyInsight:
      "Mobileye REM 是最大規模的眾包高精地圖方案。Tesla/Wayve 走 Mapless 路線，試圖以端到端 AI 取代高精地圖。中國法規要求地圖數據本地化。",
  },
  "v2x-ota-update-manager": {
    productionStatus: "量產普及",
    oemAdoption:
      "Tesla (OTA 先驅，可遠端更新全車 ECU 含 ADAS/動力系統)、BMW (遠端軟體升級 RSU)、Mercedes (OTA 含 L3 Drive Pilot 更新)、VW (OTA 含 ID.軟體更新)、Ford (Power-Up OTA)、GM (Ultifi 平台 OTA)、NIO/XPeng/BYD (中國品牌全面支援 OTA)",
    keyInsight:
      "Tesla 是 OTA 先驅和標竿，累計推送超過百次重大更新。全車 OTA (含底盤/動力) 已成為電動車標配。VW 因 CARIAD 軟體問題曾嚴重延誤 OTA 進度。",
  },
  "lighting-matrix-led-headlamp": {
    productionStatus: "豪華車標配，主流車下放中",
    oemAdoption:
      "Audi (HD Matrix LED 先驅，64 級調光)、BMW (Adaptive LED/Icon Adaptive/Laserlight)、Mercedes (Digital Light，130 萬像素投影)、Volvo (Pixel LED)、Lexus (BladeScan AHS)、Rivian (全美唯一通過 FMVSS 108 ADB 認證)、Porsche (PDLS+)",
    keyInsight:
      "Mercedes Digital Light 搭載 130 萬像素，可路面投影。Rivian 是唯一在美國完整啟用 ADB 功能的品牌（其他 OEM 因 NHTSA 嚴格規範未啟用）。NHTSA 2022 年才正式允許 ADB。",
  },
  "lighting-dlp-projector-headlamp": {
    productionStatus: "旗艦車款試驗",
    oemAdoption:
      "Mercedes S-Class/EQS (Digital Light 路面投影導航箭頭、警告符號)、Audi (概念展示路面投影)、BMW (部分概念車展示)、Ford (測試路面投影警告)",
    keyInsight:
      "Mercedes 是唯一量產路面投影功能的 OEM。DLP 投影在法規上仍有限制（各國對路面投影內容有不同規範），大規模量產仍需時間。",
  },
  "lighting-ambient-control-module": {
    productionStatus: "廣泛搭載",
    oemAdoption:
      "Mercedes (64 色氛圍燈，業界標竿)、BMW (Interaction Bar 互動燈條)、Audi (30 色氛圍燈)、Hyundai/Kia (雙色氛圍燈)、BYD/NIO/理想 (中國品牌大量搭載 128 色氛圍燈)",
    keyInsight:
      "氛圍燈已從豪華車下放至中國 20 萬級車款。AI 情境聯動（音樂律動、導航提示、DMS 疲勞警示）是差異化方向，但多數仍為手動設定模式。",
  },
  "lighting-v2v-light-communication": {
    productionStatus: "概念/研究階段",
    oemAdoption:
      "Audi (動態尾燈 OLED 概念)、BMW (OLED 尾燈動態顯示)、Mercedes (概念展示)。尚無量產 LiFi V2V 通訊車款",
    keyInsight:
      "光通訊 V2V 仍在學術研究階段。OLED 動態尾燈已量產（BMW/Audi），但僅用於視覺展示而非數據通訊。法規障礙是主要問題。",
  },
  "parking-automatic-parking-assist": {
    productionStatus: "量產普及",
    oemAdoption:
      "Tesla (Autopark + Smart Summon)、BMW (Parking Assistant Plus，支援遙控泊車)、Mercedes (Remote Park Pilot)、Hyundai/Kia (Remote Smart Parking Assist)、BYD/NIO/XPeng (中國品牌幾乎全系標配)",
    keyInsight:
      "遙控泊車 (RPA) 已成為差異化賣點。中國 OEM 在自動泊車功能上推進最快，小鵬 G9 支援記憶泊車。BMW/Mercedes/Hyundai 均支援手機遙控泊車。",
  },
  "parking-autonomous-valet-parking": {
    productionStatus: "示範/限定場景",
    oemAdoption:
      "Mercedes (Automated Valet Parking，全球首個 L4 AVP 認證，與 Bosch 合作在斯圖加特機場部署)、BMW (與 Valeo 合作 AVP)、Hyundai (機場 AVP 示範)、百度 Apollo (中國多城市 AVP 服務)",
    keyInsight:
      "Mercedes + Bosch 在斯圖加特機場的 AVP 是全球首個商業化 L4 自動代客泊車。中國市場 AVP 進展快速，小鵬/理想的記憶泊車已接近 AVP 功能。",
  },
  "parking-spot-detection-camera": {
    productionStatus: "智慧停車場部署",
    oemAdoption:
      "非車廠主導 — 海康威視/大華/宇視 (中國智慧停車場)、SKIDATA、FlashParking、ParkAssist (歐美市場)。車廠端由環景系統整合車位偵測功能",
    keyInsight:
      "車位偵測主要由停車場基礎設施商推動。車端以環景攝影機整合為主趨勢，獨立車位偵測攝影機在車端需求不大。",
  },
  "body-body-control-module": {
    productionStatus: "量產標配 (AI 化起步)",
    oemAdoption:
      "所有 OEM 均搭載 BCM。Tesla (手機鑰匙自動感應解鎖/啟動)、BMW (Digital Key Plus UWB)、Mercedes (MBUX 情境模式聯動)、Hyundai/Genesis (Digital Key 2.0)、Apple CarKey (支援 BMW/Hyundai/BYD 等)",
    keyInsight:
      "UWB 數位鑰匙是新趨勢，取代傳統無線鑰匙。Apple/Samsung CarKey 推動標準化。AI 情境聯動（根據時間/地點/駕駛人自動調整設定）是發展方向。",
  },
  "body-camera-monitor-system": {
    productionStatus: "日系先行，歐美跟進",
    oemAdoption:
      "Lexus ES (全球首款量產 CMS，2018 日本)、Audi e-tron (Virtual Mirror 選配)、Honda e (數位後視鏡)、Hyundai Ioniq 5 (韓國版 CMS)、Mercedes Actros 卡車 (MirrorCam)",
    keyInsight:
      "日本 2016 年率先允許 CMS 取代傳統後視鏡。歐洲 2024 年跟進。Lexus ES 和 Audi e-tron 是最早量產的乘用車。風阻降低 2-3% 是賣點之一。",
  },
  "body-smart-seat-controller": {
    productionStatus: "豪華車選配",
    oemAdoption:
      "Mercedes S-Class (ENERGIZING Comfort 按摩座椅)、BMW 7 Series (Executive Lounge 後座)、Genesis (Ergo Motion 姿勢矯正座椅)、Lincoln (Perfect Position 24 向調整)、蔚來 (零重力座椅)",
    keyInsight:
      "Genesis Ergo Motion 是 AI 座椅的代表，可根據乘坐時間和壓力分佈自動調整姿勢。中國品牌（蔚來/理想）在零重力座椅和按摩功能上投入大量。",
  },
  "body-smart-wiper-controller": {
    productionStatus: "量產 (傳統感測為主)",
    oemAdoption:
      "Tesla (攝影機 AI 辨識雨量，取代傳統雨滴感測器)、其他 OEM 多使用傳統光學雨滴感測器 (Bosch/Hella 供應)",
    keyInsight:
      "Tesla 是唯一使用純攝影機 AI 控制雨刷的車廠，早期效果不佳但已透過 OTA 大幅改善。其他 OEM 仍使用傳統光學感測器，成本低且可靠。",
  },
  "body-auto-dimming-mirror": {
    productionStatus: "廣泛標配",
    oemAdoption:
      "Gentex (全球市佔超 90%，供幾乎所有 OEM)。已是成熟技術，使用電致變色玻璃，無需 AI",
    keyInsight:
      "自動防眩後視鏡由 Gentex 壟斷市場。技術成熟且不需要 AI，屬於傳統電子控制。未來可能整合更多功能（如 CMS/HomeLink）。",
  },
  "fleet-dashcam": {
    productionStatus: "量產普及",
    oemAdoption:
      "Tesla (Sentry Mode + Dashcam，利用既有攝影機)、BMW (內建行車記錄器)、Hyundai/Kia (原廠 DVR 配件)。後市場：Garmin/BlackVue/Viofo/Thinkware (AI 行車記錄器)",
    keyInsight:
      "Tesla Sentry Mode 是車廠整合行車記錄器的標竿，利用 ADAS 攝影機兼任 DVR。中國/韓國市場行車記錄器普及率極高。AI 功能（危險駕駛辨識）主要在車隊管理場景。",
  },
  "fleet-edge-gateway": {
    productionStatus: "商用車/車隊先行",
    oemAdoption:
      "NXP S32G (供 BMW/VW 車載閘道)、Renesas (供 Toyota)、Continental (車載高性能電腦)、華為 CDC (供中國 OEM)。AWS IoT FleetWise、Azure IoT 提供雲端分析",
    keyInsight:
      "車載閘道是 SDV (軟體定義車輛) 的核心。NXP S32G 和 Renesas R-Car S4 是兩大主流平台。預測性維護 AI 主要在雲端執行，邊緣端負責數據採集與初步篩選。",
  },
  "fleet-ubi-obd-module": {
    productionStatus: "保險業推動",
    oemAdoption:
      "非車廠產品 — Progressive Snapshot (北美最大 UBI)、Root Insurance、Cambridge Mobile Telematics (CMT)、Octo Telematics (歐洲)。車廠數據合作：Tesla Insurance (利用 Safety Score)、GM OnStar Insurance、Ford Insure",
    keyInsight:
      "Tesla Insurance 是車廠跨入 UBI 保險的標竿，直接利用車輛 Safety Score 定價。GM 和 Ford 也推出基於車輛數據的保險方案。邊緣 AI 用於即時駕駛評分。",
  },
  "fleet-ai-black-box": {
    productionStatus: "法規推動中",
    oemAdoption:
      "EU 2024 起強制新車搭載 EDR (Event Data Recorder)。Tesla (詳細事故數據記錄)、GM/Ford/Toyota (EDR 法規合規)。EU 推動的 DSSAD (L3+ 自駕資料紀錄器) 要求更全面的數據記錄",
    keyInsight:
      "歐盟 GSR 法規要求 2024 起新車標配 EDR。L3+ 自動駕駛車輛需要 DSSAD 記錄所有決策數據。AI 分析主要在事故後的雲端分析階段。",
  },
} as const;
