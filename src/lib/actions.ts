"use server";
import { signIn } from "@/auth";
import { formSchema } from "@/validators/signUpFormSchema";
import { z } from "zod";

export const handleSignupSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn("resend", values);
}