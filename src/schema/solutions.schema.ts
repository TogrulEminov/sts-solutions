import z from "zod";
const problemsSchema = z.object({
  title: z.string().optional(),
});
export const createSolutionsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subTitle: z.string().optional(),
  subDescription: z.string().optional(),
  imageId: z.string().optional(),
  problems: z.array(problemsSchema).optional(),
  galleryIds: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeSolutionsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  description: z.string().optional(),
  subDescription: z.string().optional(),
  problems: z.array(problemsSchema).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateSolutionsInput = z.infer<typeof createSolutionsSchema>;
export type UpdateSolutionsInput = z.infer<typeof uptadeSolutionsSchema>;
