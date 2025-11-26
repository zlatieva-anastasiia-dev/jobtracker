import { z } from "zod";

export const JobFormSchema = z
  .object({
    title: z.string().trim().min(2, "Job Title is required."),
    company: z.string().trim().min(1, "Company is required."),
    location: z.string().trim(),
    date: z.string().min(1, "Application date is required."),
    contactName: z.string().optional(),
    contactEmail: z
      .string()
      .email("Invalid email address.")
      .optional()
      .or(z.literal("")),
    contactPhone: z.string().optional(),
    status: z.enum(["applied", "interview", "offer", "rejected", "closed"]),
    description: z.string().trim().max(1000),
  })
  .transform((data) => ({
    ...data,
    contact: {
      name: data.contactName || "",
      email: data.contactEmail || "",
      phone: data.contactPhone || "",
    },
  }));

export type JobFormData = z.infer<typeof JobFormSchema>;
