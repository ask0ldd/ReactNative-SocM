import * as z from "zod/v4";

const registrationFormSchema = z.object({
  email: z.email("Email invalide."),
  password: z.string().trim().min(6, "Mot de passe invalide."),
  passwordCheck: z.string().trim().min(6, "Confirmation éronnée."),
})

/* 
export function refinePasswordValidationSchema(schema: ZodRawShape) {
  return passwordValidationSchema
    .extend(schema)
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
}
*/


export default registrationFormSchema