import {z} from "zod";
export const formSchema = z.object({
    email: z.string().email("Must be a valid email").min(1, "Cannot be empty")
})