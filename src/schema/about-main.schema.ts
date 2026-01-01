import z from "zod";
const purposeSchema = z.object({
  title: z.string().optional(),
});

const statisticsSchema = z.object({
  title: z.string().optional(),
  suffix: z.string().optional(),
  count: z.string().optional(),
});
const sectorsSchema = z.object({
  title: z.string().optional(),
});
export const upsertAboutMainSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  sectors: z.array(sectorsSchema).optional(),
  subTitle: z.string().optional(),
  subDescription: z.string().optional(),
  experienceYears: z.number().optional(),
  experienceDescription: z.string().optional(),
  teamDescription: z.string().optional(),
  statistics: z.array(statisticsSchema).optional(),
  purpose: z.array(purposeSchema).optional(),
  locale: z.enum(["az", "en", "ru"], { message: "Dil düzgün seçilməyib" }),
});

export type UpsertAboutMainInput = z.infer<typeof upsertAboutMainSchema>;
