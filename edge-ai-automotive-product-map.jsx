import { useState, useEffect } from "react";

const data = [
  {
    id: "adas",
    icon: "🛡️",
    category: "ADAS 先進駕駛輔助",
    color: "#E63946",
    products: [
      { name: "前向攝影機模組", ai: "物件偵測 / 車道辨識 / 交通號誌識別", edge: "CNN 即時推論 (YOLOv8-nano / MobileNet)", chip: "TI TDA4VM / Mobileye EyeQ", priority: "high" },
      { name: "環景攝影機系統 (AVM)", ai: "3D 環景拼接 / 障礙物偵測 / 自動停車輔助", edge: "魚眼鏡頭畸變校正 + BEV 感知", chip: "Renesas R-Car V4H / Qualcomm SA8650P", priority: "high" },
      { name: "毫米波雷達模組", ai: "目標追蹤 / 速度估算 / 碰撞預警 (FCW/AEB)", edge: "CFAR + 點雲聚類 + 追蹤濾波", chip: "TI AWR2944 / NXP S32R45", priority: "high" },
      { name: "光達 LiDAR 模組", ai: "3D 點雲語意分割 / SLAM 建圖", edge: "PointPillars / CenterPoint 即時推論", chip: "NVIDIA Orin / Mobileye Chauffeur", priority: "high" },
      { name: "超音波感測器陣列", ai: "近距障礙物偵測 / 自動停車 (APA)", edge: "ToF 融合 + 佔據柵格推論", chip: "NXP S32K3 + 專用 MCU", priority: "mid" },
      { name: "感測融合控制器 (Fusion ECU)", ai: "多感測器融合決策 / 路徑規劃", edge: "Transformer BEV 融合模型", chip: "NVIDIA Orin-X / Qualcomm Ride", priority: "high" },
    ],
  },
  {
    id: "cabin",
    icon: "🧑‍✈️",
    category: "座艙智能監控",
    color: "#457B9D",
    products: [
      { name: "駕駛監控系統 (DMS)", ai: "疲勞偵測 / 分心偵測 / 視線追蹤", edge: "人臉 Landmark + 眨眼頻率 + 頭部姿態推論", chip: "Seeing Machines Occula / TI TDA4", priority: "high" },
      { name: "乘客監控系統 (OMS)", ai: "乘客計數 / 兒童遺留偵測 / 安全帶偵測", edge: "輕量人體骨架偵測模型", chip: "Ambarella CV72 / NXP i.MX 8M Plus", priority: "mid" },
      { name: "手勢辨識模組", ai: "非接觸式手勢操控 (空調/音量/接聽)", edge: "3D ToF + CNN 手勢分類", chip: "Infineon REAL3 + 專用 NPU", priority: "mid" },
      { name: "車內語音助理 (Voice AI)", ai: "離線語音辨識 / NLU 意圖解析 / TTS 語音合成", edge: "Whisper-tiny / 端側 LLM (Phi-3 mini)", chip: "Qualcomm SA8295P / MediaTek Dimensity Auto", priority: "high" },
      { name: "車內空氣品質感測器", ai: "PM2.5/VOC/CO₂ 預測與空調自動調節", edge: "時序預測模型 + PID 控制策略", chip: "Bosch BME688 + 車用 MCU", priority: "low" },
      { name: "生物特徵辨識模組", ai: "人臉解鎖 / 指紋啟動 / 座椅記憶連動", edge: "ArcFace-lite 特徵比對 + Anti-spoofing", chip: "NXP EdgeLock SE + i.MX RT", priority: "mid" },
    ],
  },
  {
    id: "ivi",
    icon: "🎛️",
    category: "車載資訊娛樂 (IVI)",
    color: "#2A9D8F",
    products: [
      { name: "中控智慧螢幕主機", ai: "個人化推薦 / 情境式 UI / AR 導航疊加", edge: "推薦引擎 + On-device LLM 對話", chip: "Qualcomm SA8295P / Samsung Exynos Auto V920", priority: "high" },
      { name: "數位儀表板 (Digital Cluster)", ai: "動態 HUD 資訊排序 / 駕駛風格適配", edge: "注意力優先級模型", chip: "Renesas R-Car S4 / TI Jacinto 7", priority: "mid" },
      { name: "後座娛樂螢幕", ai: "內容推薦 / 家長控制 / 多螢互動", edge: "邊緣推薦 + 串流優化", chip: "MediaTek MT8678 / Qualcomm QCS8550", priority: "low" },
      { name: "車載 Wi-Fi / 5G T-Box", ai: "網路切片選擇 / OTA 差分更新排程", edge: "連線品質預測 + 流量調度", chip: "Qualcomm SDX75 / Samsung Exynos Modem", priority: "mid" },
      { name: "車載 AR-HUD 抬頭顯示器", ai: "AR 路標疊加 / 導航箭頭貼合路面", edge: "道路平面估計 + 即時渲染", chip: "TI DLP + Qualcomm SA8295P", priority: "mid" },
    ],
  },
  {
    id: "ev",
    icon: "⚡",
    category: "電動車動力與能源",
    color: "#E9C46A",
    products: [
      { name: "電池管理系統 (BMS)", ai: "SOC/SOH 預測 / 熱失控預警 / 均衡策略優化", edge: "LSTM/Transformer 時序模型 + 異常偵測", chip: "TI BQ79718 + C2000 MCU", priority: "high" },
      { name: "馬達控制器 (MCU Inverter)", ai: "效率最佳化扭矩分配 / 故障預診斷", edge: "RL 控制策略 + 振動頻譜分析", chip: "Infineon AURIX TC4xx / NXP S32E", priority: "mid" },
      { name: "智慧充電模組 (EVSE/OBC)", ai: "充電排程 / 電網負載預測 / V2G 策略", edge: "時序預測 + 強化學習調度", chip: "ST SPC58 + 通訊 MCU", priority: "mid" },
      { name: "能量回收控制器", ai: "再生制動力道 AI 適配 / 駕駛習慣學習", edge: "輕量 RL Agent + 地形感知模型", chip: "Infineon AURIX + 慣性感測器", priority: "mid" },
      { name: "熱管理控制器", ai: "電池/馬達/座艙聯合熱管理 AI 排程", edge: "多目標最佳化 + 數位孿生", chip: "NXP S32K3 + 多路溫度感測", priority: "low" },
    ],
  },
  {
    id: "chassis",
    icon: "🏎️",
    category: "底盤與安全",
    color: "#F4A261",
    products: [
      { name: "電子穩定控制 (ESC/ESP)", ai: "路面摩擦係數估算 / 側滑預測", edge: "即時狀態估測 Kalman + ML 融合", chip: "Infineon AURIX TC3xx / NXP S32S", priority: "high" },
      { name: "電子轉向系統 (EPS)", ai: "車道維持扭矩輔助 / 自適應轉向手感", edge: "駕駛風格辨識 + 即時扭矩控制", chip: "Renesas RH850 / Infineon AURIX", priority: "mid" },
      { name: "主動懸吊系統", ai: "路面掃描預測 + 乘坐舒適度 AI 調節", edge: "頻域分析 + 預測控制 MPC", chip: "NXP S32Z / TI C2000", priority: "mid" },
      { name: "智慧煞車系統 (EMB/BBW)", ai: "煞車力道預測分配 / AEB 執行端", edge: "<5ms 即時推論 + 功能安全冗餘", chip: "Infineon AURIX TC4xx (ASIL-D)", priority: "high" },
      { name: "胎壓監測系統 (TPMS)", ai: "輪胎壽命預測 / 漏氣趨勢預警", edge: "時序異常偵測 + 溫壓融合模型", chip: "Infineon SP49 + 專用 MCU", priority: "low" },
    ],
  },
  {
    id: "v2x",
    icon: "📡",
    category: "V2X 車聯網通訊",
    color: "#6A4C93",
    products: [
      { name: "C-V2X 通訊模組 (PC5/Uu)", ai: "交叉路口碰撞預警 / 協同感知融合", edge: "Cooperative Perception + 時空圖推論", chip: "Qualcomm 9150 / Autotalks Tekton3", priority: "high" },
      { name: "V2X 路側單元 (RSU)", ai: "交通流量分析 / 行人過街意圖預測", edge: "多攝影機跨視角追蹤 + 群體行為預測", chip: "NVIDIA Jetson Orin Nano / Qualcomm SA6155P", priority: "mid" },
      { name: "高精地圖更新模組", ai: "眾包地圖差異偵測 / 車道級定位修正", edge: "視覺 SLAM + 語意變化偵測", chip: "域控制器搭載 / Mobileye REM", priority: "mid" },
      { name: "OTA 遠端更新管理器", ai: "差分更新策略 / 更新失敗預測與回滾", edge: "A/B 分區管理 + 異常預警模型", chip: "NXP S32G3 Gateway SoC", priority: "mid" },
    ],
  },
  {
    id: "lighting",
    icon: "💡",
    category: "智慧照明系統",
    color: "#E76F51",
    products: [
      { name: "矩陣式 LED 頭燈 (ADB)", ai: "對向來車遮蔽 / 行人高亮標示", edge: "即時物件追蹤 → 像素級光型控制", chip: "Infineon LITIX + AURIX / TI TPS929", priority: "high" },
      { name: "數位微鏡 (DLP) 投影頭燈", ai: "路面投射資訊 (導航/警告/動畫)", edge: "場景識別 → 動態投影內容生成", chip: "TI DLP5534-Q1 + 專用 SoC", priority: "mid" },
      { name: "氛圍燈控制模組", ai: "情境感知燈光 (音樂/駕駛模式/疲勞)", edge: "情緒推論 + 色彩場景映射", chip: "OSRAM OSIRE / NXP LPC MCU", priority: "low" },
      { name: "智慧尾燈通訊 (V2V Light)", ai: "光通訊 (LiFi) 車間訊息傳遞", edge: "調變解調 + 簡單訊息分類", chip: "專用光通訊 IC + MCU", priority: "low" },
    ],
  },
  {
    id: "parking",
    icon: "🅿️",
    category: "自動泊車與停車",
    color: "#264653",
    products: [
      { name: "自動泊車系統 (APA/RPA)", ai: "車位偵測 / 路徑規劃 / 自動轉向控制", edge: "BEV 車位分割 + RRT* 路徑規劃", chip: "TI TDA4VH / NVIDIA Orin", priority: "high" },
      { name: "自主代客泊車 (AVP)", ai: "無人低速自駕 / 地下停車場 SLAM 導航", edge: "視覺 SLAM + 局部路徑規劃", chip: "NVIDIA Orin / Qualcomm Ride", priority: "mid" },
      { name: "車位偵測攝影機", ai: "空位辨識 / 車牌識別 / 停車計時", edge: "輕量分類模型 + OCR", chip: "Ambarella CV25 / HiSilicon", priority: "low" },
    ],
  },
  {
    id: "body",
    icon: "🚗",
    category: "車身電子與舒適",
    color: "#8D99AE",
    products: [
      { name: "車身控制模組 (BCM)", ai: "智慧進入 / 預測性門鎖 / 情境聯動", edge: "行為預測 + 場景規則引擎", chip: "NXP S32K3 / Infineon AURIX Lite", priority: "mid" },
      { name: "數位後視鏡 (CMS)", ai: "後方物件偵測 / 夜間影像增強 / 盲點警示", edge: "即時影像增強 ISP + CNN 推論", chip: "Ambarella CV72 / TI TDA4", priority: "mid" },
      { name: "智慧座椅控制器", ai: "壓力分佈分析 / 坐姿矯正 / 疲勞緩解按摩", edge: "壓力矩陣分類 + 時序疲勞模型", chip: "專用 MCU + 壓力感測陣列", priority: "low" },
      { name: "智慧雨刷控制器", ai: "雨量強度辨識 / 自適應刷速控制", edge: "輕量影像分類模型", chip: "車用 MCU + 雨滴感測器", priority: "low" },
      { name: "電子後視鏡自動防眩", ai: "後方強光偵測 / 漸變調光", edge: "光線強度分類 + 調光控制", chip: "專用光感 IC + MCU", priority: "low" },
    ],
  },
  {
    id: "fleet",
    icon: "🚛",
    category: "車隊管理與後市場",
    color: "#3D5A80",
    products: [
      { name: "行車記錄器 (DVR/Dashcam)", ai: "事件自動標記 / 碰撞偵測 / 危險駕駛辨識", edge: "影像事件分類 + G-sensor 融合", chip: "Ambarella H32 / Novatek NT96580", priority: "high" },
      { name: "車載邊緣閘道器 (Edge Gateway)", ai: "CAN 匯流排異常偵測 / 預測性維護", edge: "時序異常偵測 + Federated Learning", chip: "NXP S32G3 / Renesas R-Car S4", priority: "mid" },
      { name: "UBI 車險 OBD 模組", ai: "駕駛行為評分 / 風險定價模型", edge: "加速度特徵提取 + 輕量 ML 評分", chip: "車用 OBD MCU + BLE/4G", priority: "mid" },
      { name: "車載 AI 黑盒子", ai: "全車 ECU 日誌分析 / 事故重建", edge: "多源資料壓縮 + 異常序列偵測", chip: "NXP S32G + eMMC 儲存", priority: "low" },
    ],
  },
];

const priorityConfig = {
  high: { label: "高", color: "#E63946", bg: "rgba(230,57,70,0.12)" },
  mid: { label: "中", color: "#E9C46A", bg: "rgba(233,196,106,0.12)" },
  low: { label: "低", color: "#8D99AE", bg: "rgba(141,153,174,0.12)" },
};

export default function EdgeAIAutomotiveMap() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const filteredData = data.map(cat => ({
    ...cat,
    products: cat.products.filter(p => {
      const matchSearch = search === "" || 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.ai.toLowerCase().includes(search.toLowerCase()) ||
        p.edge.toLowerCase().includes(search.toLowerCase()) ||
        p.chip.toLowerCase().includes(search.toLowerCase());
      const matchPriority = filterPriority === "all" || p.priority === filterPriority;
      return matchSearch && matchPriority;
    })
  })).filter(cat => cat.products.length > 0);

  const totalProducts = data.reduce((s, c) => s + c.products.length, 0);
  const filteredCount = filteredData.reduce((s, c) => s + c.products.length, 0);

  const stats = {
    categories: data.length,
    products: totalProducts,
    high: data.reduce((s, c) => s + c.products.filter(p => p.priority === "high").length, 0),
  };

  return (
    <div style={{
      fontFamily: "'Noto Sans TC', 'SF Pro Display', -apple-system, sans-serif",
      background: "#0B0F1A",
      color: "#E8ECF4",
      minHeight: "100vh",
      padding: "0",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0B0F1A 0%, #1A1F35 50%, #0B0F1A 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "32px 28px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "radial-gradient(ellipse 600px 300px at 30% 20%, rgba(230,57,70,0.07), transparent), radial-gradient(ellipse 500px 250px at 70% 80%, rgba(42,157,143,0.06), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontFamily: "JetBrains Mono", color: "#E63946", letterSpacing: 3, fontWeight: 600, textTransform: "uppercase" }}>Edge AI × Automotive</span>
          </div>
          <h1 style={{
            fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 900, margin: "4px 0 10px",
            background: "linear-gradient(135deg, #FFFFFF 0%, #A8B4C8 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            lineHeight: 1.2, letterSpacing: -0.5,
          }}>
            車用電子 AI 產品全景圖
          </h1>
          <p style={{ fontSize: 14, color: "#6B7A94", maxWidth: 600, lineHeight: 1.6, margin: 0 }}>
            涵蓋 {stats.categories} 大領域、{stats.products} 項產品，從感測融合到座艙智能，完整對應 Edge AI 晶片與推論方案
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
            {[
              { n: stats.categories, label: "產品領域", accent: "#E63946" },
              { n: stats.products, label: "產品項目", accent: "#2A9D8F" },
              { n: stats.high, label: "高優先級", accent: "#E9C46A" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 10, padding: "12px 20px", minWidth: 100,
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: s.accent, fontFamily: "JetBrains Mono" }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#6B7A94", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "20px 28px 0",
        display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ position: "relative", flex: "1 1 260px" }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜尋產品、AI 應用、晶片方案..."
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10, padding: "11px 16px 11px 40px",
              color: "#E8ECF4", fontSize: 14, outline: "none",
              fontFamily: "'Noto Sans TC', sans-serif",
            }}
          />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔍</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { key: "all", label: "全部" },
            { key: "high", label: "🔴 高" },
            { key: "mid", label: "🟡 中" },
            { key: "low", label: "⚪ 低" },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilterPriority(f.key)}
              style={{
                background: filterPriority === f.key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                border: filterPriority === f.key ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 8, padding: "8px 14px", color: "#E8ECF4",
                fontSize: 13, cursor: "pointer", fontFamily: "'Noto Sans TC', sans-serif",
                transition: "all 0.2s",
              }}
            >{f.label}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#6B7A94" }}>
          顯示 {filteredCount} / {totalProducts} 項
        </div>
      </div>

      {/* Category nav */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "16px 28px 0",
        display: "flex", gap: 6, flexWrap: "wrap",
      }}>
        {data.map(cat => {
          const isActive = activeCategory === cat.id;
          const hasResults = filteredData.find(c => c.id === cat.id);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(isActive ? null : cat.id)}
              style={{
                background: isActive ? `${cat.color}22` : "rgba(255,255,255,0.02)",
                border: isActive ? `1px solid ${cat.color}55` : "1px solid rgba(255,255,255,0.04)",
                borderRadius: 8, padding: "6px 12px",
                color: isActive ? cat.color : (hasResults ? "#8D99AE" : "#3A4259"),
                fontSize: 12, cursor: "pointer",
                fontFamily: "'Noto Sans TC', sans-serif",
                transition: "all 0.2s",
                opacity: hasResults ? 1 : 0.4,
              }}
            >
              {cat.icon} {cat.category.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "20px 28px 40px" }}>
        {filteredData
          .filter(cat => !activeCategory || cat.id === activeCategory)
          .map((cat, ci) => (
          <div key={cat.id} style={{
            marginBottom: 28,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${ci * 0.06}s`,
          }}>
            {/* Category Header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
              paddingBottom: 8, borderBottom: `1px solid ${cat.color}22`,
            }}>
              <span style={{ fontSize: 22 }}>{cat.icon}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: cat.color }}>{cat.category}</span>
              <span style={{
                fontSize: 11, background: `${cat.color}18`, color: cat.color,
                padding: "2px 8px", borderRadius: 20, fontFamily: "JetBrains Mono",
              }}>{cat.products.length}</span>
            </div>

            {/* Product Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 10 }}>
              {cat.products.map((p, pi) => {
                const isExpanded = expandedProduct === `${cat.id}-${pi}`;
                const pCfg = priorityConfig[p.priority];
                return (
                  <div
                    key={pi}
                    onClick={() => setExpandedProduct(isExpanded ? null : `${cat.id}-${pi}`)}
                    style={{
                      background: isExpanded ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                      border: isExpanded ? `1px solid ${cat.color}44` : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 12, padding: "14px 16px",
                      cursor: "pointer", transition: "all 0.25s ease",
                      position: "relative", overflow: "hidden",
                    }}
                  >
                    {/* Priority indicator */}
                    <div style={{
                      position: "absolute", top: 0, right: 0,
                      width: 0, height: 0,
                      borderLeft: "24px solid transparent",
                      borderTop: `24px solid ${pCfg.color}44`,
                    }} />

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <h3 style={{
                        fontSize: 14, fontWeight: 700, margin: 0, color: "#E8ECF4",
                        lineHeight: 1.4,
                      }}>{p.name}</h3>
                      <span style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 4,
                        background: pCfg.bg, color: pCfg.color,
                        fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                        fontFamily: "JetBrains Mono",
                      }}>P:{pCfg.label}</span>
                    </div>

                    {/* AI Application */}
                    <div style={{ marginTop: 8 }}>
                      <div style={{ fontSize: 10, color: "#6B7A94", marginBottom: 3, fontFamily: "JetBrains Mono", letterSpacing: 1 }}>AI 應用</div>
                      <div style={{ fontSize: 13, color: "#A8B4C8", lineHeight: 1.5 }}>{p.ai}</div>
                    </div>

                    {/* Expanded content */}
                    <div style={{
                      maxHeight: isExpanded ? 200 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s ease",
                    }}>
                      <div style={{ paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 10 }}>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: "#6B7A94", marginBottom: 3, fontFamily: "JetBrains Mono", letterSpacing: 1 }}>EDGE 推論方案</div>
                          <div style={{ fontSize: 12, color: "#2A9D8F", lineHeight: 1.5, fontFamily: "JetBrains Mono", fontWeight: 400 }}>{p.edge}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: "#6B7A94", marginBottom: 3, fontFamily: "JetBrains Mono", letterSpacing: 1 }}>參考晶片平台</div>
                          <div style={{ fontSize: 12, color: "#E9C46A", lineHeight: 1.5 }}>{p.chip}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{
                      marginTop: 8, fontSize: 10, color: "#4A5568",
                      textAlign: "center", fontFamily: "JetBrains Mono",
                    }}>
                      {isExpanded ? "▲ 收合" : "▼ 展開技術細節"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#4A5568" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 16 }}>沒有符合條件的產品</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>嘗試調整搜尋關鍵字或篩選條件</div>
          </div>
        )}

        {/* Footer summary */}
        <div style={{
          marginTop: 32, padding: "20px 24px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#6B7A94", marginBottom: 10, fontFamily: "JetBrains Mono", letterSpacing: 1 }}>EDGE AI 車用趨勢摘要</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { title: "主流推論晶片", items: "NVIDIA Orin 系列、Qualcomm SA8295P、TI TDA4、Renesas R-Car V4H、Ambarella CV7x" },
              { title: "關鍵 AI 框架", items: "TensorRT / SNPE / TIDL / ONNX Runtime / TFLite — 端側量化 INT8 部署" },
              { title: "安全標準", items: "ISO 26262 ASIL-B/D、SOTIF ISO 21448、Cybersecurity ISO/SAE 21434" },
              { title: "市場驅動力", items: "L2+ ADAS 法規強制、SDV 軟體定義車輛、EV 能源管理、座艙個人化體驗" },
            ].map((t, i) => (
              <div key={i}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#E63946", marginBottom: 4 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "#8D99AE", lineHeight: 1.6 }}>{t.items}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
