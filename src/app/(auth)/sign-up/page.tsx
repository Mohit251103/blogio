import { ModeToggle } from "@/components/ui/theme";
import { GoogleSignUpButton, GithubSignUpButton } from "@/components/auth/SocialSignUp";
import EmailSignUp from "@/components/auth/CredentialsSignup";
const SignUp = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-background text-foreground">
            <ModeToggle />
            <h2 className="text-4xl max-sm:text-3xl font-bold mb-4">Sign Up to Blog.io</h2>
            <div className="w-1/4 max-sm:w-3/5 max-lg:w-3/6 flex justify-center items-center flex-col">
                <div className="flex flex-col items-center w-full">
                    <GoogleSignUpButton />
                    <GithubSignUpButton />
                </div>
                <div className="relative w-full flex items-center justify-center my-4"><span className="bg-foreground h-[0.5px] w-2/5 mx-2"></span>or<span className="bg-foreground h-[0.5px] w-2/5 mx-2"></span></div>
                <EmailSignUp/>
            </div>
        </div>
    )
}

export default SignUp;