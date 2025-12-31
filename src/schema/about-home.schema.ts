import z from "zod";
const sectorsSchema = z.object({
  title: z.string().optional(),
});

const statisticsSchema = z.object({
  title: z.string().optional(),
  suffix: z.string().optional(),
  count: z.string().optional(),
});
export const upsertHomeAboutSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  subtitle: z.string().optional(),
  statistics: z.array(statisticsSchema).optional(),
  sectors: z.array(sectorsSchema).optional(),
  locale: z.enum(["az", "en", "ru"], { message: "Dil düzgün seçilməyib" }),
});

export type UpsertHomeAboutInput = z.infer<typeof upsertHomeAboutSchema>;
