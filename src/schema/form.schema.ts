import z from "zod";

export const createCallActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  company: z.string().min(1, "Company is required"),
  services: z.string().min(1, "Services is required"),
  message: z.string().optional(),
});

export type CreateCallActionInput = z.infer<typeof createCallActionSchema>;
