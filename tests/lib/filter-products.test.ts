import { edgeAIMapContent } from "@/content/edge-ai-map";
import {
  filterCategories,
  getExplorerStats,
  parseCategoryFilter,
  parsePriorityFilter,
} from "@/lib/filter-products";

describe("filter helpers", () => {
  it("returns stable global stats", () => {
    expect(getExplorerStats(edgeAIMapContent)).toEqual({
      categories: 10,
      products: 47,
      highPriority: 15,
    });
  });

  it("filters by priority and category", () => {
    const results = filterCategories(edgeAIMapContent, {
      query: "",
      priority: "high",
      category: "adas",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.products).toHaveLength(5);
    expect(results[0]?.products.every((product) => product.priority === "high")).toBe(true);
  });

  it("searches across extended fields such as vendors", () => {
    const results = filterCategories(edgeAIMapContent, {
      query: "Novatek",
      priority: "all",
      category: "all",
    });

    expect(results).toHaveLength(1);
    expect(results[0]?.products).toHaveLength(1);
    expect(results[0]?.products[0]?.name).toBe("行車記錄器 (DVR/Dashcam)");
  });

  it("normalizes invalid query params to safe defaults", () => {
    expect(parsePriorityFilter("critical")).toBe("all");
    expect(parseCategoryFilter("unknown", edgeAIMapContent.categories)).toBe("all");
  });
});
