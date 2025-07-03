import * as z from "zod/v4";

const newPasswordFormSchema = z.object({
  code : z.string().trim().length(4, "Code invalide."),
  newPassword: z.string().trim().min(6, "Mot de passe invalide."),
  newPasswordCheck: z.string().trim().min(6, "Confirmation éronnée."),
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

export type TNewPasswordFormSchema = z.infer<typeof newPasswordFormSchema>


export default newPasswordFormSchema