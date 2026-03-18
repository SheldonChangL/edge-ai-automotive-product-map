"use client";

import { startTransition, useDeferredValue, useState } from "react";
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

type EdgeAIMapExplorerProps = {
  content: MapContent;
};

const priorityLabels: Record<ProductPriorityFilter, string> = {
  all: "全部優先級",
  high: "高優先級",
  mid: "中優先級",
  low: "低優先級",
};

const priorityBadgeStyles: Record<ProductPriorityFilter, string> = {
  all: "border-white/12 bg-white/6 text-white",
  high: "border-[#E63946]/30 bg-[#E63946]/14 text-[#FF9089]",
  mid: "border-[#E9C46A]/30 bg-[#E9C46A]/14 text-[#FFD978]",
  low: "border-[#8D99AE]/30 bg-[#8D99AE]/14 text-[#CCD4E1]",
};

const priorityGuides = [
  {
    level: "high",
    shortLabel: "紅 / 高",
    title: "量產標配或法規強推",
    description:
      "代表市場已經成熟，或受到安全法規與 OEM 導入節奏明確拉動，不是單純功能很多，而是更接近「現在就會上車」。",
    examples: "例如 DMS、前向攝影機模組、BMS",
  },
  {
    level: "mid",
    shortLabel: "黃 / 中",
    title: "正在進入量產拐點",
    description:
      "代表需求正在升溫，供應鏈與整車廠開始導入，但還沒有像高優先級那樣成為廣泛標配，通常是下一波放量項目。",
    examples: "例如 AR-HUD、自動代客泊車 AVP",
  },
  {
    level: "low",
    shortLabel: "灰 / 低",
    title: "偏差異化體驗功能",
    description:
      "代表產品仍有價值，但多半由品牌定位、成本帶寬或車型等級驅動，較少由法規直接推進，因此導入節奏相對保守。",
    examples: "例如氛圍燈 AI、智慧雨刷",
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
          : "hover:border-white/18 hover:bg-white/5",
        isDimmed ? "opacity-45" : "opacity-100",
      ].join(" ")}
      style={{
        backgroundColor: isActive ? `${category.color}1A` : "rgba(255,255,255,0.03)",
        borderColor: isActive ? `${category.color}55` : "rgba(255,255,255,0.08)",
        color: isActive ? category.color : "#D4DDEE",
      }}
      aria-pressed={isActive}
    >
      <span className="text-base">{category.icon}</span>
      <span>{category.category}</span>
      <span
        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
        style={{
          backgroundColor: isActive ? `${category.color}18` : "rgba(255,255,255,0.06)",
          color: isActive ? category.color : "#93A5C2",
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

  const deferredQuery = useDeferredValue(query);
  const filteredCategories = filterCategories(content, {
    category,
    priority,
    query: deferredQuery,
  });
  const totalStats = getExplorerStats(content);
  const filteredCount = getFilteredProductCount(filteredCategories);

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
    <main className="app-shell relative isolate min-h-screen">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(8,16,28,0.95),rgba(9,20,37,0.88)_48%,rgba(14,26,45,0.94))] shadow-[var(--shadow-glow)]">
          <div className="px-6 py-8 lg:px-10 lg:py-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.38em] text-[var(--accent)]">
                  {content.hero.eyebrow}
                </p>
                <div className="space-y-4">
                  <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                    {content.hero.title}
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
                    {content.hero.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
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
                    className="rounded-3xl border border-white/10 bg-white/4 px-5 py-4 backdrop-blur"
                  >
                    <div
                      className="font-[var(--font-mono)] text-3xl font-semibold"
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

        <section className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-[rgba(8,16,29,0.72)] p-5 shadow-[0_20px_60px_rgba(7,17,31,0.25)] backdrop-blur-sm lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center">
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
              className="w-full rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.04)] px-12 py-4 text-sm text-white outline-none transition placeholder:text-[var(--text-faint)] focus:border-[var(--accent-secondary)] focus:bg-[rgba(255,255,255,0.06)]"
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

          <div className="rounded-full border border-white/10 bg-white/4 px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Showing {filteredCount} / {totalStats.products}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,19,33,0.92),rgba(8,16,29,0.78))] p-5 shadow-[0_18px_42px_rgba(7,17,31,0.18)]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-2">
                <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.28em] text-[var(--text-faint)]">
                  Priority Guide
                </p>
                <h2 className="text-xl font-semibold text-white">優先級怎麼看？</h2>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
                這裡的優先級不是在評分功能好壞，而是用
                <span className="px-1 text-white">市場成熟度</span>
                和
                <span className="px-1 text-white">法規驅動力</span>
                來幫你判斷哪些品類已經接近標配、哪些正要放量、哪些仍偏差異化。
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {priorityGuides.map((guide) => (
                <article
                  key={guide.level}
                  className="rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.03)] p-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
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
                        "rounded-full border px-3 py-1 text-xs font-medium",
                        priorityBadgeStyles[guide.level],
                      ].join(" ")}
                    >
                      {guide.shortLabel}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{guide.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                    {guide.description}
                  </p>
                  <p className="mt-3 text-sm text-white/88">{guide.examples}</p>
                </article>
              ))}
            </div>
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
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[rgba(8,16,29,0.72)] shadow-[0_20px_50px_rgba(7,17,31,0.22)] backdrop-blur-sm"
              >
                <div
                  className="flex flex-col gap-3 border-b border-white/8 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                  style={{
                    background: `linear-gradient(90deg, ${categoryBlock.color}14, rgba(255,255,255,0.02))`,
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryBlock.icon}</span>
                      <h2 className="text-xl font-bold text-white">{categoryBlock.category}</h2>
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
                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.24em] text-[var(--text-faint)]">
                    {categoryBlock.id}
                  </div>
                </div>

                <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                  {categoryBlock.products.map((product) => {
                    const expanded = expandedProductId === product.id;

                    return (
                      <section
                        key={product.id}
                        className="group relative rounded-[1.5rem] border border-white/8 bg-[rgba(255,255,255,0.03)] p-5 transition hover:border-white/14 hover:bg-[rgba(255,255,255,0.05)]"
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
                              <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                            </div>
                            <span
                              className={[
                                "rounded-full border px-3 py-1 text-xs font-semibold",
                                priorityBadgeStyles[product.priority],
                              ].join(" ")}
                            >
                              {priorityLabels[product.priority]}
                            </span>
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
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]"
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
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white transition hover:border-white/18 hover:bg-black/30"
                            aria-expanded={expanded}
                          >
                            <span>{expanded ? "收合技術細節" : "展開技術細節"}</span>
                            <span className="text-xs text-[var(--text-faint)]">
                              {expanded ? "▲" : "▼"}
                            </span>
                          </button>

                          {expanded ? (
                            <div className="grid gap-4 rounded-[1.25rem] border border-white/8 bg-[rgba(0,0,0,0.2)] p-4">
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
                              {!!product.vendors?.length && (
                                <div className="space-y-2">
                                  <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.24em] text-[var(--text-faint)]">
                                    Vendor Focus
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {product.vendors.map((vendor) => (
                                      <span
                                        key={vendor}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--text-muted)]"
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
            <section className="rounded-[1.75rem] border border-dashed border-white/12 bg-[rgba(8,16,29,0.65)] px-6 py-16 text-center">
              <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.28em] text-[var(--text-faint)]">
                No Match
              </p>
              <h2 className="mt-4 text-2xl font-bold text-white">沒有符合條件的產品</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                可以試著放寬搜尋關鍵字，或先回到全部分類與全部優先級。
              </p>
            </section>
          )}
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {content.trendInsights.map((insight) => (
            <article
              key={insight.id}
              className="rounded-[1.5rem] border border-white/10 bg-[rgba(8,16,29,0.72)] p-5 shadow-[0_20px_40px_rgba(7,17,31,0.2)] backdrop-blur-sm"
            >
              <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.28em] text-[var(--accent)]">
                {insight.id}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-white">{insight.title}</h2>
              <div className="mt-4 space-y-3">
                {insight.items.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[var(--text-muted)]">
                    {item}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
