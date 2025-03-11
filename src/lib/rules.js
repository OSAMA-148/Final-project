import { z } from "zod";

export const RegisterFormSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Name must be at least 2 characters long." })
            .trim(),
        email: z
            .string()
            .regex(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
                message:
                    "Please enter a valid email address that starts with a letter.",
            })
            .trim(),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/[A-Z]/, {
                message: "Password must contain at least one uppercase letter.",
            })
            .regex(/[a-z]/, {
                message: "Password must contain at least one lowercase letter.",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number.",
            })
            .regex(/[^a-zA-Z0-9]/, {
                message:
                    "Password must contain at least one special character (e.g., !@#).",
            })
            .trim(),
        confirmPassword: z
            .string()
            .trim()
            .min(1, { message: "Please confirm your password." }),
    })
    .superRefine((val, ctx) => {
        if (val.password !== val.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match.",
                path: ["confirmPassword"],
            });
        }
    });
