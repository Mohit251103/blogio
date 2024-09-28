import { signIn } from "@/auth"
import { Button } from "../ui/button";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const handleGoogleSubmit = async () => {
    "use server"
    await signIn("google", { redirect: true, redirectTo: "/dashboard" });
}

const handleGithubSubmit = async () => {
    "use server"
    await signIn("github", { redirect: true, redirectTo: "/dashboard" });
}

export const GoogleSignUpButton = () => {
    return <form action={handleGoogleSubmit} className="w-full">
        <Button type="submit" className="w-full my-1"><GoogleIcon className="mx-2" />{" "}Sign Up with Google</Button>
    </form>
}

export const GithubSignUpButton = () => {
    return <form action={handleGithubSubmit} className="w-full">
        <Button type="submit" className="w-full my-1"><GitHubIcon className="mx-2" />{" "}Sign Up with Github</Button>
    </form>
}