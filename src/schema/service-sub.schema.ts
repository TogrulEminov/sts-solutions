import z from "zod";
const featuresSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
export const createServiceSubCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  features: z.array(featuresSchema).optional(),
  imageId: z.string().optional(),
  servicesCategoryId: z.string().min(1,'Category is requires'),
  galleryIds: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeServiceSubCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  servicesCategoryId: z.string().min(1,'Category is requires'),
  features: z.array(featuresSchema).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateServiceSubCategoryInput = z.infer<
  typeof createServiceSubCategorySchema
>;
export type UpdateServiceSubCategoryInput = z.infer<
  typeof uptadeServiceSubCategorySchema
>;
