import z from "zod";

export const upsertContactSchema = z.object({
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
  phoneSecond: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  about: z.string().min(1, "Description is required"),
  hightlightWord: z.string().optional(),
  whatsapp: z.string().min(1, "Whatsapp number is required"),
  adressLink: z.string().min(1, "Adress link is required"),
  adress: z.string().min(1, "Adress is required"),
  workHours: z.string().optional(),
  tag: z.string().optional(),
  support: z.string().optional(),
  locale: z.enum(["az", "en", "ru"], { message: "Dil düzgün seçilməyib" }),
});

export type UpsertContactInput = z.infer<typeof upsertContactSchema>;
