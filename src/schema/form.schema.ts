import z from "zod";

export const createCallActionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  email: z.string().min(1, "Email is required"),
  phone: z.string().min(1, "Phone is required"),
  services: z.string().min(1, "Services is required"),
  message: z.string().optional(),
});

export type CreateCallActionInput = z.infer<typeof createCallActionSchema>;
