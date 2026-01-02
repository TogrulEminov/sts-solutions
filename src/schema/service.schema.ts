import z from "zod";

export const createServiceCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  imageId: z.string().optional(),
  isMain: z.boolean().optional(),
  galleryIds: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeServiceCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  isMain: z.boolean().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateServiceCategoryInput = z.infer<
  typeof createServiceCategorySchema
>;
export type UpdateServiceCategoryInput = z.infer<
  typeof uptadeServiceCategorySchema
>;
