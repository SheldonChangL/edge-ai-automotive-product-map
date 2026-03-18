"use client";

import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  filterCategories,
  getExplorerStats,
  getFilteredProductCount,
  parseCategoryFilter,
  parsePriorityFilter,
  type ProductPriorityFilter,
} from "@/lib/filter-products";
import type { AutomotiveCategory, MapContent } from "@/lib/content-schema";
import { regionalAnalysisContent, regionIds, type RegionId } from "@/content/regional-analysis";

const REGION_COLORS: Record<RegionId, string> = {
  cn: "#f97316",
  jp: "#60a5fa",
  kr: "#4ade80",
  eu: "#a78bfa",
  us: "#ef4444",
};

const REGION_LABELS: Record<RegionId, string> = {
  cn: "中國",
  jp: "日本",
  kr: "韓國",
  eu: "歐洲",
  us: "美國",
};

const RADAR_SHORT_NAMES = [
  "ADAS 感測融合",
  "座艙 DMS/OMS",
  "語音 AI",
  "IVI 座艙",
  "BMS AI",
  "底盤安全",
  "V2X 車聯網",
  "智慧照明",
  "自動泊車",
  "車身電子",
];

function RadarChart({ isEditorial }: { isEditorial: boolean }) {
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const r = 158;
  const labelGap = 30;
  const n = regionalAnalysisContent.scoringMatrix.length;
  const levels = [2, 4, 6, 8, 10];

  const gridColor = isEditorial ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
  const axisColor = isEditorial ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.14)";
  const labelColor = isEditorial ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.68)";
  const levelColor = isEditorial ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.28)";

  function angleOf(i: number) {
    return -Math.PI / 2 + (2 * Math.PI * i) / n;
  }

  function pt(i: number, value: number) {
    const a = angleOf(i);
    return { x: cx + r * (value / 10) * Math.cos(a), y: cy + r * (value / 10) * Math.sin(a) };
  }

  function axisEnd(i: number) {
    const a = angleOf(i);
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  function labelPos(i: number) {
    const a = angleOf(i);
    return { x: cx + (r + labelGap) * Math.cos(a), y: cy + (r + labelGap) * Math.sin(a) };
  }

  function textAnchor(i: number) {
    const c = Math.cos(angleOf(i));
    return c > 0.2 ? "start" : c < -0.2 ? "end" : "middle";
  }

  function dy(i: number) {
    const s = Math.sin(angleOf(i));
    return s < -0.2 ? "-0.45em" : s > 0.2 ? "1em" : "0.32em";
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[460px]"
        aria-label="區域市場評分雷達圖"
      >
        {/* Grid rings */}
        {levels.map((level) => {
          const pts = regionalAnalysisContent.scoringMatrix
            .map((_, i) => { const p = pt(i, level); return `${p.x},${p.y}`; })
            .join(" ");
          return <polygon key={level} points={pts} fill="none" stroke={gridColor} strokeWidth="0.8" />;
        })}

        {/* Axis lines */}
        {regionalAnalysisContent.scoringMatrix.map((_, i) => {
          const e = axisEnd(i);
          return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke={axisColor} strokeWidth="0.8" />;
        })}

        {/* Level labels along top axis */}
        {[2, 4, 6, 8].map((level) => {
          const p = pt(0, level);
          return (
            <text key={level} x={p.x} y={p.y - 5} textAnchor="middle" fill={levelColor} fontSize="9" fontFamily="monospace">
              {level}
            </text>
          );
        })}

        {/* Polygon fills */}
        {regionIds.map((rid) => {
          const pts = regionalAnalysisContent.scoringMatrix
            .map((domain, i) => { const p = pt(i, domain.scores[rid]); return `${p.x},${p.y}`; })
            .join(" ");
          return <polygon key={`f-${rid}`} points={pts} fill={REGION_COLORS[rid]} fillOpacity={0.08} stroke="none" />;
        })}

        {/* Polygon strokes + dots */}
        {regionIds.map((rid) => {
          const color = REGION_COLORS[rid];
          const pts = regionalAnalysisContent.scoringMatrix
            .map((domain, i) => { const p = pt(i, domain.scores[rid]); return `${p.x},${p.y}`; })
            .join(" ");
          return (
            <g key={`s-${rid}`}>
              <polygon points={pts} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
              {regionalAnalysisContent.scoringMatrix.map((domain, i) => {
                const p = pt(i, domain.scores[rid]);
                return <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />;
              })}
            </g>
          );
        })}

        {/* Axis labels */}
        {RADAR_SHORT_NAMES.map((name, i) => {
          const pos = labelPos(i);
          return (
            <text
              key={name}
              x={pos.x}
              y={pos.y}
              textAnchor={textAnchor(i)}
              dy={dy(i)}
              fill={labelColor}
              fontSize="11.5"
              fontFamily="inherit"
            >
              {name}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {regionIds.map((rid) => (
          <div key={rid} className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: REGION_COLORS[rid] }} />
            <span className="text-xs text-[var(--text-muted)]">{REGION_LABELS[rid]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type EdgeAIMapExplorerProps = {
  content: MapContent;
};

type InsightPanel = "priority" | "report" | "trends";
type TopTab = "map" | "regional";
type ExplorerTheme = "matrix" | "editorial";

const themeOptions = [
  {
    id: "matrix",
    label: "Matrix",
    caption: "沉浸式資料地圖",
  },
  {
    id: "editorial",
    label: "Editorial",
    caption: "編輯報紙語氣",
  },
] as const;

const priorityLabels: Record<ProductPriorityFilter, string> = {
  all: "全部優先級",
  high: "高優先級",
  mid: "中優先級",
  low: "低優先級",
};

const priorityBadgeStyles: Record<ProductPriorityFilter, string> = {
  all: "border-[color:var(--border)] bg-[var(--button-surface)] text-[var(--text)]",
  high: "border-[#E63946]/30 bg-[#E63946]/14 text-[#FF9089]",
  mid: "border-[#E9C46A]/30 bg-[#E9C46A]/14 text-[#FFD978]",
  low: "border-[#8D99AE]/30 bg-[#8D99AE]/14 text-[#CCD4E1]",
};

const priorityGuides = [
  {
    level: "high",
    shortLabel: "紅 / 高",
    title: "法規或量產標配",
    examples: "DMS / 前向攝影機 / BMS",
  },
  {
    level: "mid",
    shortLabel: "黃 / 中",
    title: "正在進入放量拐點",
    examples: "AR-HUD / AVP",
  },
  {
    level: "low",
    shortLabel: "灰 / 低",
    title: "偏差異化功能",
    examples: "氛圍燈 AI / 智慧雨刷",
  },
] as const;

function buildQueryString(
  params: URLSearchParams,
  nextState: { query?: string; priority?: ProductPriorityFilter; category?: string },
) {
  const updated = new URLSearchParams(params);

  if (typeof nextState.query !== "undefined") {
    const trimmed = nextState.query.trim();
    if (trimmed) {
      updated.set("q", trimmed);
    } else {
      updated.delete("q");
    }
  }

  if (typeof nextState.priority !== "undefined") {
    if (nextState.priority === "all") {
      updated.delete("priority");
    } else {
      updated.set("priority", nextState.priority);
    }
  }

  if (typeof nextState.category !== "undefined") {
    if (nextState.category === "all") {
      updated.delete("category");
    } else {
      updated.set("category", nextState.category);
    }
  }

  return updated.toString();
}

function CategoryButton({
  category,
  isActive,
  isDimmed,
  count,
  onClick,
}: {
  category: AutomotiveCategory;
  isActive: boolean;
  isDimmed: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
        isActive
          ? "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_14px_30px_rgba(7,17,31,0.28)]"
          : "hover:border-[color:var(--border-strong)] hover:bg-[var(--button-surface-hover)]",
        isDimmed ? "opacity-45" : "opacity-100",
      ].join(" ")}
      style={{
        backgroundColor: isActive ? `${category.color}1A` : "var(--card-surface)",
        borderColor: isActive ? `${category.color}55` : "var(--border)",
        color: isActive ? category.color : "var(--text)",
      }}
      aria-pressed={isActive}
    >
      <span className="text-base">{category.icon}</span>
      <span>{category.category}</span>
      <span
        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
        style={{
          backgroundColor: isActive ? `${category.color}18` : "var(--chip-surface)",
          color: isActive ? category.color : "var(--text-muted)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

export function EdgeAIMapExplorer({ content }: EdgeAIMapExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [priority, setPriority] = useState<ProductPriorityFilter>(
    parsePriorityFilter(searchParams.get("priority")),
  );
  const [category, setCategory] = useState(
    parseCategoryFilter(searchParams.get("category"), content.categories),
  );
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [activeInsightPanel, setActiveInsightPanel] = useState<InsightPanel | null>(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [theme, setTheme] = useState<ExplorerTheme>("matrix");
  const [activeTopTab, setActiveTopTab] = useState<TopTab>("map");

  const deferredQuery = useDeferredValue(query);
  const filteredCategories = filterCategories(content, {
    category,
    priority,
    query: deferredQuery,
  });
  const totalStats = getExplorerStats(content);
  const filteredCount = getFilteredProductCount(filteredCategories);
  const isEditorial = theme === "editorial";

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("edge-ai-theme");
    if (storedTheme === "matrix" || storedTheme === "editorial") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("edge-ai-theme", theme);

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  function pushState(nextState: {
    query?: string;
    priority?: ProductPriorityFilter;
    category?: string;
  }) {
    const queryString = buildQueryString(new URLSearchParams(searchParams.toString()), nextState);

    startTransition(() => {
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    });
  }

  return (
    <main className="app-shell relative isolate min-h-screen" data-theme={theme}>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <section
          className={[
            "overflow-hidden border border-[color:var(--border)] bg-[var(--hero-surface)] shadow-[var(--shadow-glow)]",
            isEditorial ? "rounded-[1rem]" : "rounded-[2rem]",
          ].join(" ")}
        >
          <div className="px-6 py-8 lg:px-10 lg:py-10">
            <div className="space-y-6">
              {isEditorial ? (
                <div className="space-y-4 border-b border-[color:var(--border)] pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--text-faint)]">
                    <span>Wednesday, March 18, 2026</span>
                    <span>Automotive Product Map Special Report</span>
                    <span>47 Products</span>
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.42em] text-[var(--text-faint)]">
                      Edge AI Times
                    </p>
                    <h2 className="text-4xl font-semibold text-[var(--text)] sm:text-6xl">
                      The Edge AI Times
                    </h2>
                  </div>
                  <div className="grid gap-2">
                    <div className="h-px bg-[var(--text)]" />
                    <div className="h-px bg-[color:var(--border)]" />
                  </div>
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.38em] text-[var(--accent)]">
                  {content.hero.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1
                    className={[
                      "max-w-4xl text-[var(--text)]",
                      isEditorial
                        ? "text-5xl font-semibold leading-[0.96] sm:text-7xl"
                        : "text-4xl font-black tracking-[-0.04em] sm:text-5xl",
                    ].join(" ")}
                  >
                    {content.hero.title}
                  </h1>
                  <p
                    className={[
                      "max-w-3xl text-[var(--text-muted)]",
                      isEditorial ? "text-lg leading-8 sm:text-xl" : "text-base leading-8 sm:text-lg",
                    ].join(" ")}
                  >
                    {content.hero.description}
                  </p>
                </div>
              </div>

              <div
                className={[
                  "grid gap-4 sm:grid-cols-3",
                  isEditorial ? "border-t border-[color:var(--border)] pt-6" : "",
                ].join(" ")}
              >
                {[
                  {
                    label: "產品領域",
                    value: totalStats.categories,
                    accent: "var(--accent)",
                  },
                  {
                    label: "產品項目",
                    value: totalStats.products,
                    accent: "var(--accent-secondary)",
                  },
                  {
                    label: "高優先級",
                    value: totalStats.highPriority,
                    accent: "var(--accent-tertiary)",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={[
                      "border border-[color:var(--border)] bg-[var(--card-surface)] px-5 py-4 backdrop-blur",
                      isEditorial ? "rounded-[0.25rem]" : "rounded-3xl",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-[var(--font-mono)] font-semibold",
                        isEditorial ? "text-4xl" : "text-3xl",
                      ].join(" ")}
                      style={{ color: stat.accent }}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top-level tab nav */}
        <nav className="flex gap-1 self-start rounded-full border border-[color:var(--border)] bg-[var(--surface)] p-1 shadow-[var(--shadow-glow)]">
          {([
            { id: "map", label: "產品地圖" },
            { id: "regional", label: "🌏 區域分析" },
          ] as { id: TopTab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTopTab(tab.id)}
              className={[
                "rounded-full px-5 py-2 text-sm font-medium transition",
                activeTopTab === tab.id
                  ? "bg-[var(--button-surface-active)] text-[var(--text)] shadow-sm"
                  : "text-[var(--text-muted)] hover:bg-[var(--button-surface-hover)] hover:text-[var(--text)]",
              ].join(" ")}
              aria-pressed={activeTopTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {activeTopTab === "map" ? (
          <>
        <section
          className={[
            "grid gap-4 border border-[color:var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-glow)] backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_auto_auto_auto] lg:items-center",
            isEditorial ? "rounded-[0.75rem]" : "rounded-[1.75rem]",
          ].join(" ")}
        >
          <label className="relative block">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[var(--text-faint)]">
              ⌕
            </span>
            <input
              aria-label="搜尋產品、AI 應用、晶片方案"
              type="search"
              value={query}
              onChange={(event) => {
                const nextValue = event.target.value;
                setQuery(nextValue);
                pushState({ query: nextValue });
              }}
              placeholder="搜尋產品、AI 應用、晶片方案..."
              className="w-full rounded-2xl border border-[color:var(--border)] bg-[var(--input-surface)] px-12 py-4 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[var(--accent-secondary)] focus:bg-[var(--card-surface)]"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {(["all", "high", "mid", "low"] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => {
                  setPriority(level);
                  pushState({ priority: level });
                }}
                className={[
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  priorityBadgeStyles[level],
                  priority === level ? "shadow-[0_12px_26px_rgba(7,17,31,0.24)]" : "opacity-85 hover:opacity-100",
                ].join(" ")}
                aria-pressed={priority === level}
              >
                {priorityLabels[level]}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-start">
            <div className="rounded-[1rem] border border-[color:var(--border)] bg-[var(--theme-toggle-shell)] p-1 shadow-[var(--theme-toggle-shadow)]">
              <div className="flex gap-1">
                {themeOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setTheme(option.id as ExplorerTheme)}
                    className={[
                      "min-w-[9.5rem] rounded-[0.75rem] border px-3 py-2 text-left transition",
                      theme === option.id
                        ? "border-[color:var(--border-strong)] bg-[var(--theme-toggle-active)] text-[var(--text)]"
                        : "border-transparent bg-transparent text-[var(--text-muted)] hover:border-[color:var(--border)] hover:bg-[var(--theme-toggle-hover)] hover:text-[var(--text)]",
                    ].join(" ")}
                    aria-pressed={theme === option.id}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="mt-1 block text-[11px] leading-4 text-[var(--text-faint)]">
                      {option.caption}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-full border border-[color:var(--border)] bg-[var(--card-surface)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Showing {filteredCount} / {totalStats.products}
          </div>
        </section>

        <section
          className={[
            "border border-[color:var(--border)] bg-[var(--surface-alt)] p-4 shadow-[var(--shadow-glow)]",
            isEditorial ? "rounded-[0.75rem]" : "rounded-[1.5rem]",
          ].join(" ")}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                  Quick Guide
                </p>
                <h2 className="text-lg font-semibold text-[var(--text)]">快速看懂這張圖</h2>
              </div>
              <p className="max-w-3xl text-sm text-[var(--text-muted)]">
                先用分類與優先級縮小範圍；紅、黃、灰代表
                <span className="px-1 text-[var(--text)]">市場成熟度</span>與
                <span className="px-1 text-[var(--text)]">法規驅動力</span>，不是功能好壞。
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: "priority", label: "優先級說明" },
                { id: "report", label: "報告摘要" },
                { id: "trends", label: "延伸觀察" },
              ].map((panel) => (
                <button
                  key={panel.id}
                  type="button"
                  onClick={() =>
                    setActiveInsightPanel((value) =>
                      value === panel.id ? null : (panel.id as InsightPanel),
                    )
                  }
                  className={[
                    "rounded-full border px-4 py-2 text-sm transition",
                    activeInsightPanel === panel.id
                      ? "border-[color:var(--border-strong)] bg-[var(--button-surface-active)] text-[var(--text)]"
                      : "border-[color:var(--border)] bg-[var(--button-surface)] text-[var(--text-muted)] hover:border-[color:var(--border-strong)] hover:bg-[var(--button-surface-hover)] hover:text-[var(--text)]",
                  ].join(" ")}
                  aria-pressed={activeInsightPanel === panel.id}
                >
                  {panel.label}
                </button>
              ))}
            </div>

            {activeInsightPanel === "priority" ? (
              <div className="grid gap-3 border-t border-[color:var(--border)] pt-4 lg:grid-cols-3">
                <div className="space-y-1 lg:col-span-3">
                  <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                    Priority Guide
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text)]">優先級怎麼看？</h3>
                </div>
                {priorityGuides.map((guide) => (
                  <article
                    key={guide.level}
                    className={[
                      "border border-[color:var(--border)] bg-[var(--card-surface)] px-4 py-3",
                      isEditorial ? "rounded-[0.25rem]" : "rounded-[1.15rem]",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            guide.level === "high"
                              ? "#E63946"
                              : guide.level === "mid"
                                ? "#E9C46A"
                                : "#8D99AE",
                        }}
                      />
                      <span
                        className={[
                          "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                          priorityBadgeStyles[guide.level],
                        ].join(" ")}
                      >
                        {guide.shortLabel}
                      </span>
                      <h4 className="text-sm font-semibold text-[var(--text)]">{guide.title}</h4>
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{guide.examples}</p>
                  </article>
                ))}
              </div>
            ) : null}

            {activeInsightPanel === "report" ? (
              <div className="flex flex-col gap-4 border-t border-[color:var(--border)] pt-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-1">
                    <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                      Market Brief
                    </p>
                    <h3 className="text-lg font-semibold text-[var(--text)]">報告重點</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReportDetails((value) => !value)}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--border)] bg-[var(--button-surface)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--button-surface-hover)]"
                    aria-expanded={showReportDetails}
                  >
                    <span>{showReportDetails ? "收合趨勢展望" : "展開趨勢展望"}</span>
                    <span className="text-xs text-[var(--text-faint)]">
                      {showReportDetails ? "▲" : "▼"}
                    </span>
                  </button>
                </div>

                <p className="max-w-5xl text-sm leading-7 text-[var(--text-muted)]">
                  {content.reportOverview.summary}
                </p>

                <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
                  {content.reportOverview.findings.map((item, index) => (
                    <div
                      key={item}
                      className={[
                        "border border-[color:var(--border)] bg-[var(--card-surface)] px-4 py-3",
                        isEditorial ? "rounded-[0.25rem]" : "rounded-[1.1rem]",
                      ].join(" ")}
                    >
                      <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                        Finding {String(index + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-[var(--text)]">{item}</p>
                    </div>
                  ))}
                </div>

                {showReportDetails ? (
                  <div className="grid gap-3 border-t border-[color:var(--border)] pt-4 lg:grid-cols-2">
                    <div className="space-y-1 lg:col-span-2">
                      <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                        Market Outlook
                      </p>
                      <h4 className="text-base font-semibold text-[var(--text)]">趨勢展望</h4>
                    </div>
                    {content.reportOverview.outlook.map((item, index) => (
                      <div
                        key={item}
                        className={[
                          "border border-[color:var(--border)] bg-[var(--card-surface)] px-4 py-3",
                          isEditorial ? "rounded-[0.25rem]" : "rounded-[1.15rem]",
                        ].join(" ")}
                      >
                        <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                          Outlook {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {activeInsightPanel === "trends" ? (
              <div className="grid gap-3 border-t border-[color:var(--border)] pt-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="space-y-1 lg:col-span-2 xl:col-span-4">
                  <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                    Extended Notes
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--text)]">延伸觀察</h3>
                </div>
                {content.trendInsights.map((insight) => (
                  <div
                    key={insight.id}
                    className={[
                      "border border-[color:var(--border)] bg-[var(--card-surface)] px-4 py-3",
                      isEditorial ? "rounded-[0.25rem]" : "rounded-[1.15rem]",
                    ].join(" ")}
                  >
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                      {insight.id}
                    </p>
                    <h4 className="mt-2 text-sm font-semibold text-[var(--text)]">{insight.title}</h4>
                    <div className="mt-3 space-y-3">
                      {insight.items.map((item) => (
                        <p key={item} className="text-sm leading-7 text-[var(--text-muted)]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

          </div>
        </section>

        <section className="flex flex-wrap gap-3">
          <CategoryButton
            category={{
              id: "all",
              icon: "◌",
              category: "全部分類",
              color: "#FFFFFF",
              summary: "",
              products: [],
            }}
            isActive={category === "all"}
            isDimmed={false}
            count={content.categories.length}
            onClick={() => {
              setCategory("all");
              pushState({ category: "all" });
            }}
          />
          {content.categories.map((item) => {
            const result = filteredCategories.find((categoryItem) => categoryItem.id === item.id);
            return (
              <CategoryButton
                key={item.id}
                category={item}
                isActive={category === item.id}
                isDimmed={!result}
                count={result?.products.length ?? 0}
                onClick={() => {
                  const nextCategory = category === item.id ? "all" : item.id;
                  setCategory(nextCategory);
                  pushState({ category: nextCategory });
                }}
              />
            );
          })}
        </section>

        <section className="grid gap-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((categoryBlock) => (
              <article
                key={categoryBlock.id}
                className="overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[var(--surface)] shadow-[var(--shadow-glow)] backdrop-blur-sm"
              >
                <div
                  className="flex flex-col gap-3 border-b border-[color:var(--border)] px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                  style={{
                    background: `linear-gradient(90deg, ${categoryBlock.color}14, var(--card-surface))`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryBlock.icon}</span>
                      <h2 className="text-xl font-bold text-[var(--text)]">{categoryBlock.category}</h2>
                      <span
                        className="rounded-full px-2.5 py-1 font-[var(--font-mono)] text-xs font-medium"
                        style={{
                          backgroundColor: `${categoryBlock.color}16`,
                          color: categoryBlock.color,
                        }}
                      >
                        {categoryBlock.products.length}
                      </span>
                    </div>
                    <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
                      {categoryBlock.summary}
                    </p>
                  </div>
                  <div className="rounded-full border border-[color:var(--border)] bg-[var(--button-surface)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--text-faint)]">
                    {categoryBlock.id}
                  </div>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                  {categoryBlock.products.map((product) => {
                    const expanded = expandedProductId === product.id;

                    return (
                      <section
                        key={product.id}
                        className="group relative rounded-[1.5rem] border border-[color:var(--border)] bg-[var(--card-surface)] p-5 transition hover:border-[color:var(--border-strong)] hover:bg-[var(--surface-elevated)]"
                      >
                        <div
                          className="absolute right-4 top-4 h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              product.priority === "high"
                                ? "#E63946"
                                : product.priority === "mid"
                                  ? "#E9C46A"
                                  : "#8D99AE",
                          }}
                        />
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                {product.id}
                              </p>
                              <h3 className="text-lg font-semibold text-[var(--text)]">{product.name}</h3>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span
                                className={[
                                  "rounded-full border px-3 py-1 text-xs font-semibold",
                                  priorityBadgeStyles[product.priority],
                                ].join(" ")}
                              >
                                {priorityLabels[product.priority]}
                              </span>
                              {product.productionStatus ? (
                                <span className="rounded-full border border-[color:var(--border)] bg-[var(--chip-surface)] px-3 py-1 text-xs text-[var(--text-muted)]">
                                  {product.productionStatus}
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                              AI 應用
                            </p>
                            <p className="text-sm leading-7 text-[var(--text-muted)]">{product.ai}</p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {(product.tags ?? []).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[color:var(--border)] bg-[var(--chip-surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setExpandedProductId(expanded ? null : product.id)
                            }
                            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[var(--button-surface)] px-4 py-2 text-sm text-[var(--text)] transition hover:border-[color:var(--border-strong)] hover:bg-[var(--button-surface-hover)]"
                            aria-expanded={expanded}
                          >
                            <span>{expanded ? "收合技術細節" : "展開技術細節"}</span>
                            <span className="text-xs text-[var(--text-faint)]">
                              {expanded ? "▲" : "▼"}
                            </span>
                          </button>

                          {expanded ? (
                            <div className="grid gap-4 rounded-[1.25rem] border border-[color:var(--border)] bg-[var(--detail-surface)] p-4">
                              <div className="space-y-1">
                                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                  Edge 推論方案
                                </p>
                                <p className="text-sm leading-7 text-[var(--accent-secondary)]">
                                  {product.edge}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                  參考晶片平台
                                </p>
                                <p className="text-sm leading-7 text-[var(--accent-tertiary)]">
                                  {product.chip}
                                </p>
                              </div>
                              {product.oemAdoption ? (
                                <div className="space-y-1">
                                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                    車廠導入現況
                                  </p>
                                  <p className="text-sm leading-7 text-[var(--text-muted)]">
                                    {product.oemAdoption}
                                  </p>
                                </div>
                              ) : null}
                              {product.keyInsight ? (
                                <div className="space-y-1">
                                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                    關鍵洞察
                                  </p>
                                  <p className="text-sm leading-7 text-[var(--text)]">
                                    {product.keyInsight}
                                  </p>
                                </div>
                              ) : null}
                              {!!product.vendors?.length && (
                                <div className="space-y-2">
                                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                    Vendor Focus
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {product.vendors.map((vendor) => (
                                      <span
                                        key={vendor}
                                        className="rounded-full border border-[color:var(--border)] bg-[var(--chip-surface)] px-3 py-1 text-xs text-[var(--text-muted)]"
                                      >
                                        {vendor}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </section>
                    );
                  })}
                </div>
              </article>
            ))
          ) : (
            <section className="rounded-[1.75rem] border border-dashed border-[color:var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
              <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.28em] text-[var(--text-faint)]">
                No Match
              </p>
              <h2 className="mt-4 text-2xl font-bold text-[var(--text)]">沒有符合條件的產品</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                可以試著放寬搜尋關鍵字，或先回到全部分類與全部優先級。
              </p>
            </section>
          )}
        </section>
          </>
        ) : null}

        {activeTopTab === "regional" ? (
          <section className="flex flex-col gap-8">
            {/* Regional header */}
            <div className="space-y-2">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                Regional Market Analysis · 2025–2026
              </p>
              <h2 className={["text-[var(--text)]", isEditorial ? "text-4xl font-semibold" : "text-3xl font-black tracking-tight"].join(" ")}>
                區域市場交叉分析
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
                涵蓋中國、日本、韓國、歐洲、美國五大區域，10 大領域綜合評分（技術先進性 × 量產規模 × 法規推動力 × 供應鏈掌控）。資料時間範圍：2025 年 — 2026 年 Q1。
              </p>
            </div>

            {/* Radar + Matrix side-by-side on large screens */}
            <div className="grid gap-6 xl:grid-cols-[1fr_auto]">
              {/* Radar chart */}
              <div className={[
                "border border-[color:var(--border)] bg-[var(--surface-alt)] p-6",
                isEditorial ? "rounded-[0.75rem]" : "rounded-[1.5rem]",
              ].join(" ")}>
                <p className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                  Radar Chart · 10 Domains × 5 Regions
                </p>
                <RadarChart isEditorial={isEditorial} />
              </div>

              {/* Scoring matrix */}
              <div className={[
                "border border-[color:var(--border)] bg-[var(--surface-alt)] p-6",
                isEditorial ? "rounded-[0.75rem]" : "rounded-[1.5rem]",
              ].join(" ")}>
                <p className="mb-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                  Scoring Matrix · /10
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[340px] border-collapse text-sm">
                    <thead>
                      <tr>
                        <th className="pb-3 pr-4 text-left text-xs font-medium text-[var(--text-muted)]">領域</th>
                        {regionalAnalysisContent.regions.map((r) => (
                          <th key={r.id} className="pb-3 px-2 text-center font-medium text-[var(--text-muted)]">
                            <span className="text-lg">{r.flag}</span>
                            <span className="mt-0.5 block text-[10px] text-[var(--text-faint)]">{r.name}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {regionalAnalysisContent.scoringMatrix.map((row, i) => (
                        <tr key={row.domainName} className={["border-t border-[color:var(--border)]", i === 0 ? "border-t-0" : ""].join(" ")}>
                          <td className="py-2 pr-4 text-xs text-[var(--text)]">{row.domainName}</td>
                          {regionIds.map((rid) => {
                            const score = row.scores[rid];
                            const bg = score >= 9
                              ? "bg-[var(--score-high)] text-[var(--score-high-text)]"
                              : score >= 7
                                ? "bg-[var(--score-mid)] text-[var(--score-mid-text)]"
                                : "bg-[var(--score-low)] text-[var(--score-low-text)]";
                            return (
                              <td key={rid} className="px-2 py-2 text-center">
                                <span className={["inline-block min-w-[2rem] rounded px-1.5 py-0.5 font-[var(--font-mono)] text-xs font-semibold", bg].join(" ")}>
                                  {score}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[color:var(--border-strong)]">
                        <td className="pt-3 pr-4 text-xs font-semibold text-[var(--text)]">平均</td>
                        {regionIds.map((rid) => {
                          const avg = regionalAnalysisContent.scoringMatrix.reduce((sum, row) => sum + row.scores[rid], 0) / regionalAnalysisContent.scoringMatrix.length;
                          return (
                            <td key={rid} className="px-2 pt-3 text-center font-[var(--font-mono)] text-sm font-bold text-[var(--text)]">
                              {avg.toFixed(1)}
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: "9–10 領先", cls: "bg-[var(--score-high)] text-[var(--score-high-text)]" },
                    { label: "7–8 成熟", cls: "bg-[var(--score-mid)] text-[var(--score-mid-text)]" },
                    { label: "5–6 發展中", cls: "bg-[var(--score-low)] text-[var(--score-low-text)]" },
                  ].map((item) => (
                    <span key={item.label} className={["rounded px-2.5 py-0.5 font-[var(--font-mono)] text-[11px]", item.cls].join(" ")}>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Region overview cards — all 5 in a row */}
            <div className="flex flex-col gap-3">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                Region Overview
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {regionalAnalysisContent.regions.map((region) => (
                  <article
                    key={region.id}
                    className={["border bg-[var(--card-surface)] px-5 py-4", isEditorial ? "rounded-[0.25rem] border-[color:var(--border)]" : "rounded-[1.25rem] border-[color:var(--border)]"].join(" ")}
                    style={{ borderTopColor: REGION_COLORS[region.id], borderTopWidth: "2px" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{region.flag}</span>
                      <h3 className="text-sm font-semibold text-[var(--text)]">{region.name}</h3>
                    </div>
                    <p className="mt-2 text-[11px] font-semibold leading-5" style={{ color: REGION_COLORS[region.id] }}>
                      {region.strategy}
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-[var(--text-muted)]">{region.drivers}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {region.oems.slice(0, 4).map((oem) => (
                        <span key={oem} className="rounded-full border border-[color:var(--border)] bg-[var(--chip-surface)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                          {oem}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Key trends */}
            <div className="flex flex-col gap-3">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                Key Trends
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                {regionalAnalysisContent.trends.map((trend) => (
                  <div key={trend.id} className={["border border-[color:var(--border)] bg-[var(--card-surface)] px-5 py-4", isEditorial ? "rounded-[0.25rem]" : "rounded-[1.25rem]"].join(" ")}>
                    <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">{trend.id}</p>
                    <h4 className="mt-2 text-base font-semibold text-[var(--text)]">{trend.title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{trend.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chip race */}
            <div className="flex flex-col gap-3">
              <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                OEM Self-Designed Chip Race · 2025–2026
              </p>
              <div className={["overflow-hidden border border-[color:var(--border)]", isEditorial ? "rounded-[0.25rem]" : "rounded-[1.25rem]"].join(" ")}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[color:var(--border)] bg-[var(--surface-strong)]">
                        {["車廠", "晶片名稱", "製程", "算力", "狀態"].map((col) => (
                          <th key={col} className="px-5 py-3 text-left text-xs font-medium text-[var(--text-muted)]">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {regionalAnalysisContent.chipRace.map((entry, i) => (
                        <tr key={entry.oem} className={["border-t border-[color:var(--border)]", i % 2 === 0 ? "bg-[var(--card-surface)]" : ""].join(" ")}>
                          <td className="px-5 py-3 font-semibold text-[var(--text)]">{entry.oem}</td>
                          <td className="px-5 py-3 font-[var(--font-mono)] text-xs text-[var(--text)]">{entry.chip}</td>
                          <td className="px-5 py-3 text-xs text-[var(--text-muted)]">{entry.process}</td>
                          <td className="px-5 py-3 font-[var(--font-mono)] text-xs font-semibold text-[var(--text)]">{entry.tops}</td>
                          <td className="px-5 py-3 text-xs text-[var(--text-muted)]">{entry.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        ) : null}

      </div>
    </main>
  );
}
