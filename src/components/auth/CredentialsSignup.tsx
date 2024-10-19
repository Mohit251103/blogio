"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import EmailIcon from '@mui/icons-material/Email';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { handleSignupSubmit } from "@/lib/actions";
import { formSchema } from "@/validators/signUpFormSchema";

const EmailSignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
    });

    const {toast} = useToast();

    const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
        await handleSignupSubmit(values);
        toast({
            title: "Magic Link",
            description: "Check you email for the verification link",
            variant: "default"
        })
    }

    return (
        <div className="w-full">
            {/* <h3 className="text-xl text-bold my-2">Sign Up with Credentials</h3> */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-2.5 w-full">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input {...register("email")} type="email" id="email" placeholder="Email" />
                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>
                <Button type="submit"><EmailIcon className="mx-2" />Sign Up with Email</Button>
            </form>
        </div>
    )

}

export default EmailSignUp;