import z from "zod";
import { Locales } from "../generated/prisma/enums";

export const createSliderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  imageId: z.string().optional(),
  locale: z.enum(Locales, "Dil düzgün seçilməyib"),
});

export const updateSliderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  locale: z.enum(Locales, "Dil düzgün seçilməyib"),
});

export type CreateSliderInput = z.infer<typeof createSliderSchema>;
export type UpdateSliderInput = z.infer<typeof updateSliderSchema>;
