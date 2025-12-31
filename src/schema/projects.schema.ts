import z from "zod";

export const createProjectsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageId: z.string().optional(),
  galleryIds: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeProjectsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateProjectsInput = z.infer<typeof createProjectsSchema>;
export type UpdateProjectsInput = z.infer<typeof uptadeProjectsSchema>;
