import z from "zod";

export const createEmployeeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  email: z.string().optional(),
  description: z.string().optional(),
  orderNumber: z.number().optional(),
  imageId: z.string().optional(),
  phone: z.string().optional(),
  positionId: z.string().min(1, "Position is required"),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export const uptadeEmployeeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  email: z.string().optional(),
  description: z.string().optional(),
  orderNumber: z.number().optional(),
  phone: z.string().optional(),
  positionId: z.string().min(1, "Position is required"),
  locale: z.enum(["az", "en", "ru"], "Dil düzgün seçilməyib"),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof uptadeEmployeeSchema>;
