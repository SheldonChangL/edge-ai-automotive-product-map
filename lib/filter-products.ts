import type { AutomotiveCategory, MapContent, ProductPriority } from "@/lib/content-schema";

export type ProductPriorityFilter = ProductPriority | "all";

export type ExplorerFilters = {
  category: string;
  priority: ProductPriorityFilter;
  query: string;
};

export function parsePriorityFilter(value: string | null | undefined): ProductPriorityFilter {
  if (value === "high" || value === "mid" || value === "low") {
    return value;
  }

  return "all";
}

export function parseCategoryFilter(
  value: string | null | undefined,
  categories: AutomotiveCategory[],
): string {
  if (!value) {
    return "all";
  }

  return categories.some((category) => category.id === value) ? value : "all";
}

export function matchesProductQuery(product: AutomotiveCategory["products"][number], query: string) {
  const normalized = query.trim().toLocaleLowerCase("zh-Hant");

  if (!normalized) {
    return true;
  }

  return [product.name, product.ai, product.edge, product.chip, ...(product.tags ?? []), ...(product.vendors ?? [])]
    .join(" ")
    .toLocaleLowerCase("zh-Hant")
    .includes(normalized);
}

export function filterCategories(content: MapContent, filters: ExplorerFilters) {
  return content.categories
    .map((category) => {
      const categorySelected = filters.category === "all" || filters.category === category.id;
      const products = category.products.filter((product) => {
        const matchesPriority =
          filters.priority === "all" || product.priority === filters.priority;

        return categorySelected && matchesPriority && matchesProductQuery(product, filters.query);
      });

      return {
        ...category,
        products,
      };
    })
    .filter((category) => category.products.length > 0);
}

export function getExplorerStats(content: MapContent) {
  const products = content.categories.flatMap((category) => category.products);

  return {
    categories: content.categories.length,
    products: products.length,
    highPriority: products.filter((product) => product.priority === "high").length,
  };
}

export function getFilteredProductCount(categories: AutomotiveCategory[]) {
  return categories.reduce((sum, category) => sum + category.products.length, 0);
}
