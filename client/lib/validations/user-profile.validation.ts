import { z } from "zod";

export const requiredInformationSchema = z.object({
  image: z.string().url({ message: "Image must be a valid URL" }),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_number: z.string().min(1, "Mobile number is required"),
  email_address: z.string().email("Invalid email address"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  github: z.string().url("Invalid GitHub URL"),
  gender: z.string().min(1, "Gender is required"),
  telegram_handle: z.string().min(1, "Telegram handle is required"),
  graduation_year: z.number().int("Graduation year must be an integer"),
  specialization: z
    .array(z.string())
    .nonempty("At least one specialization is required"),
  department: z.string().min(1, "Department is required"),
  mentor: z.string().min(1, "Mentor is required"),
});

export const optionalInformationSchema = z.object({
  university_id: z.string().nullable(),
  instagram_handle: z.string().nullable(),
  linkedin_account: z.string().nullable(),
  birthdate: z.string().nullable(),
  codeforce_handle: z.string().nullable(),
  cv: z.string().nullable(),
  leetcode: z.string().nullable(),
  joining_date: z.string().nullable(),
  bio: z.string().nullable(),
});

export const resourceDataSchema = z.object({
  resourceName: z
    .string()
    .min(4, { message: "resource name can't be less than 10 characters" }),
  resourceLink: z
    .string()
    .min(10, { message: "resource link cannot be less than 10" }),
});
