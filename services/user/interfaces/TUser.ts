import userSchema from "@/zod/userSchema";
import z from "zod/v4";

type TUser = z.infer<typeof userSchema>;

export default TUser