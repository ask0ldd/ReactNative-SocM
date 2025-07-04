import * as z from "zod/v4";

const currentYear = new Date().getFullYear()

const identitySchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  username: z.string().min(5),
  gender: z.enum(['M', 'F', 'NC']),
  dateOfBirth: z.object({
    day: z.number().min(1).max(31),
    month: z.number().min(1).max(12),
    year: z.number().min(1900).max(currentYear),
  }),
});

export const partialIdentitySchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
});

export default identitySchema