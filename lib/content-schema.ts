import { z } from "zod";

export const productPrioritySchema = z.enum(["high", "mid", "low"]);

export const automotiveProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  ai: z.string().min(1),
  edge: z.string().min(1),
  chip: z.string().min(1),
  priority: productPrioritySchema,
  tags: z.array(z.string().min(1)).optional(),
  notes: z.string().min(1).optional(),
  vendors: z.array(z.string().min(1)).optional(),
});

export const automotiveCategorySchema = z.object({
  id: z.string().min(1),
  icon: z.string().min(1),
  category: z.string().min(1),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  summary: z.string().min(1),
  products: z.array(automotiveProductSchema).min(1),
});

export const trendInsightSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const mapHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  matrixNotes: z.array(z.string().min(1)).min(1),
});

export const mapContentSchema = z.object({
  hero: mapHeroSchema,
  categories: z.array(automotiveCategorySchema).min(1),
  trendInsights: z.array(trendInsightSchema).min(1),
});

export type ProductPriority = z.infer<typeof productPrioritySchema>;
export type AutomotiveProduct = z.infer<typeof automotiveProductSchema>;
export type AutomotiveCategory = z.infer<typeof automotiveCategorySchema>;
export type TrendInsight = z.infer<typeof trendInsightSchema>;
export type MapContent = z.infer<typeof mapContentSchema>;
