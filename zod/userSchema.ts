import * as z from "zod/v4"

const userSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
  uid: z.string(),
})

export default userSchema