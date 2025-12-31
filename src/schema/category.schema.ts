import z from "zod";
const featuresSchema = z.object({
  title: z.string().optional(),
});
export const createCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "A slug is required"),
  metaTitle: z.string().optional(),
  highlight: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  features: z.array(featuresSchema).optional(),
  imageId: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  highlight: z.string().optional(),
  slug: z.string().min(1, "A slug is required"),
  metaTitle: z.string().optional(),
  features: z.array(featuresSchema).optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof uptadeCategorySchema>;
