import { z } from "zod";

export const checkoutSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^(\+234|0)[789][01]\d{8}$/,
      "Please enter a valid Nigerian phone number",
    ),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
