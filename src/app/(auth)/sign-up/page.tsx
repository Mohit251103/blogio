import { ModeToggle } from "@/components/ui/theme";
import { GoogleSignUpButton, GithubSignUpButton } from "@/components/auth/SocialSignUp";
import EmailSignUp from "@/components/auth/CredentialsSignup";
import NavigateButton from "@/components/ui/ClientNavigateButton";
const SignUp = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[100vh] bg-background text-foreground">
            <ModeToggle />
            <div className="w-1/4 max-sm:w-3/5 max-lg:w-3/6 p-4 border rounded-xl mt-2 flex flex-col">
                <h2 className="text-4xl max-sm:text-3xl font-bold mb-4">Sign Up to Blog.io</h2>
                <div className=" flex justify-center items-center flex-col">
                    <div className="flex flex-col items-center w-full">
                        <GoogleSignUpButton />
                        <GithubSignUpButton />
                    </div>
                    <div className="relative w-full flex items-center justify-center my-4"><span className="bg-foreground h-[0.5px] w-2/5 mx-2"></span>or<span className="bg-foreground h-[0.5px] w-2/5 mx-2"></span></div>
                    <EmailSignUp />
                </div>
                <div className="flex items-center">
                    <p className="text-sm text-slate-500">Already have an account?</p>
                    <NavigateButton location="sign-in">Sign In</NavigateButton>
                </div>
            </div>
        </div>
    )
}

export default SignUp;