import { GithubSignUpButton, GoogleSignUpButton } from "@/components/auth/SocialSignUp";
import { ModeToggle } from "@/components/ui/theme";

const SignIn = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-background text-foreground">
            <ModeToggle />
            <h2 className="text-4xl max-sm:text-3xl font-bold mb-4">Sign Up to Blog.io</h2>
            <div className="w-1/4 max-sm:w-3/5 max-lg:w-3/6 flex justify-center items-center flex-col">
                <div className="flex flex-col items-center w-full">
                    <GoogleSignUpButton />
                    <GithubSignUpButton />
                </div>
            </div>
        </div>
    )
}

export default SignIn;