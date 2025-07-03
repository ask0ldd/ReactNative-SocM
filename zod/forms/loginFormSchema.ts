import * as z from "zod/v4";

const loginFormSchema = z.object({
  email: z.email("Email invalide."),
  password: z.string().trim().min(6, "Mot de passe invalide."),
})


export default loginFormSchema