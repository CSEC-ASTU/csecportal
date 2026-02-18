import { z } from "zod";

export const newMemberValidation = z.object({
  email: z.string().email({ message: "please enter the valid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});