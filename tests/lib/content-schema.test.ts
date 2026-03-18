import { edgeAIMapContent } from "@/content/edge-ai-map";
import { mapContentSchema } from "@/lib/content-schema";

describe("content schema", () => {
  it("preserves the full category and product inventory", () => {
    const productIds = edgeAIMapContent.categories.flatMap((category) =>
      category.products.map((product) => product.id),
    );

    expect(edgeAIMapContent.categories).toHaveLength(10);
    expect(productIds).toHaveLength(47);
    expect(new Set(productIds).size).toBe(productIds.length);
  });

  it("rejects content with missing stable ids", () => {
    expect(() =>
      mapContentSchema.parse({
        ...edgeAIMapContent,
        categories: [
          {
            ...edgeAIMapContent.categories[0],
            products: [
              {
                ...edgeAIMapContent.categories[0].products[0],
                id: "",
              },
            ],
          },
        ],
      }),
    ).toThrow();
  });
});
