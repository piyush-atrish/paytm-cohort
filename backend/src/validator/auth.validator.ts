import { z } from "zod";

export const passwordSchema = z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password cannot exceed 20 characters" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[\W_]/, { message: "Must contain at least one special character (e.g., !@#$)" });

export const credSchema = z.object({
    email: z.email({ message: "Invalid email format" }),
    password: passwordSchema,
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    phone: z.string()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(15, { message: "Phone number cannot exceed 15 digits" })
        .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format" })
}).refine((data) => !data.password.includes(data.firstName), {
    message: "Password cannot contain your name",
    path: ["password"]
});

export const updateCredSchema = z.object({
    password: passwordSchema.optional(),
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional(),
    email: z.email({ message: "Invalid email format" }).optional(),
})