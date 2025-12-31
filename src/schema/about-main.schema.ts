import z from "zod";
const advantageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

const statisticsSchema = z.object({
  title: z.string().optional(),
  suffix: z.string().optional(),
  count: z.string().optional(),
});
export const upsertAboutMainSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  highlightWord: z.string().optional(),
  statistics: z.array(statisticsSchema).optional(),
  advantages: z.array(advantageSchema).optional(),
  locale: z.enum(["az", "en", "ru"], { message: "Dil düzgün seçilməyib" }),
});

export type UpsertAboutMainInput = z.infer<typeof upsertAboutMainSchema>;
