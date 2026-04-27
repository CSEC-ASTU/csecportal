import { z } from "zod";

export const requiredInformationSchema = z.object({
  // image may be a FileList or File when uploading; accept any to avoid validation errors
  image: z.any().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  mobile_number: z.string().optional(),
  email_address: z.string().optional(),
  date_of_birth: z.string().optional(),
  github: z.string().optional(),
  gender: z.string().optional(),
  telegram_handle: z.string().optional(),
  graduation_year: z.number().int().optional(),
  specialization: z.array(z.string()).optional(),
  department: z.string().optional(),
  mentor: z.string().optional(),
});

export const optionalInformationSchema = z.object({
  university_id: z.string().optional().nullable(),
  instagram_handle: z.string().optional().nullable(),
  linkedin_account: z.string().optional().nullable(),
  birthdate: z.string().optional().nullable(),
  codeforce_handle: z.string().optional().nullable(),
  cv: z.string().optional().nullable(),
  leetcode: z.string().optional().nullable(),
  joining_date: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});

export const resourceDataSchema = z.object({
  resourceName: z
    .string()
    .min(4, { message: "resource name can't be less than 10 characters" }),
  resourceLink: z
    .string()
    .min(10, { message: "resource link cannot be less than 10" }),
});
