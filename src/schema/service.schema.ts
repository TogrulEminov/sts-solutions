import z from "zod";
const stengthJson = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const otherSchema = z.object({
  title: z.string().optional(),
});
export const createServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  highlight: z.string().optional(),
  ourStrengths: z.array(stengthJson).optional(),
  steps: z.array(otherSchema).optional(),
  offerings: z.array(otherSchema).optional(),
  imageId: z.string().optional(),
  galleryIds: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  expertiseId: z.string().min(1, "Position is required"),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeServiceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  highlight: z.string().optional(),
  ourStrengths: z.array(stengthJson).optional(),
  steps: z.array(otherSchema).optional(),
  offerings: z.array(otherSchema).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  expertiseId: z.string().min(1, "Position is required"),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof uptadeServiceSchema>;
