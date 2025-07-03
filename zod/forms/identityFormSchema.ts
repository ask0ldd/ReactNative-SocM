import * as z from "zod/v4";

const currentYear = new Date().getFullYear()

const identityFormSchema = z.object({
    username: z.string().trim().min(5, "Votre nom d'utilisateur doit contenir au moins 5 caractères."),
    lastname: z.string().trim().min(1, "Nom obligatoire."),
    firstname: z.string().trim().min(1, "Prénom obligatoire."),
    gender: z.enum(['M', 'F', 'NC']),
    dateOfBirth: z.object({
        day: z.number().min(1, "Jour invalide").max(31, "Jour invalide."),
        month: z.number().min(1, "Mois invalide").max(12, "Mois invalide."),
        year: z.number().min(1900, "Année invalide").max(currentYear, "Année invalide."),
    }),
})

export default identityFormSchema

export type TIdentityForm = z.infer<typeof identityFormSchema>