import { z } from "zod/v4";

const emailSchema = z.email("Email invalide.")
  /*.refine((email) => email === "abcd@fg.com", {
    message: "This email is not in our database",
}*)*/;

export default emailSchema