import z from "zod";

export const createStrategicGoalsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "A slug is required"),
  imageId: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeStrategicGoalsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  slug: z.string().min(1, "A slug is required"),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateStrategicGoalsInput = z.infer<
  typeof createStrategicGoalsSchema
>;
export type UpdateStrategicGoalsInput = z.infer<
  typeof uptadeStrategicGoalsSchema
>;
