import z from "zod";
export const createExpertiseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isActive: z.boolean().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});
export const uptadeExpertiseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isActive: z.boolean().optional(),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateExpertiseInput = z.infer<typeof createExpertiseSchema>;
export type UpdateExpertiseInput = z.infer<typeof uptadeExpertiseSchema>;
