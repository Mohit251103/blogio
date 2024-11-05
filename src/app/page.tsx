import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import Animation from "@/components/ui/animation";
import { ModeToggle } from "@/components/ui/theme";

export default function Home() {
  const handleSignUp = async () => {
    "use server";
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background text-foreground">
      {/* nav */}
      <div className="md:w-[70%] w-[85%] flex flex-col border-r border-l min-h-screen">
        <div className="w-full px-4 mx-auto flex justify-between items-center border-b py-6">
          <h1 className="text-3xl font-extrabold">Blog.io</h1>
          <div className="flex justify-center items-center">
            <ModeToggle />
            <Link href={"https://github.com/mohit251103"} target="_blank" referrerPolicy="no-referrer" className="mx-2"><GitHubLogoIcon width={25} height={25} className="mx-2" /></Link>
            <Link href={"https://x.com/mnegi_/"} target="_blank" referrerPolicy="no-referrer" className="mx-2"><TwitterLogoIcon width={25} height={25} className="mx-2" /></Link>
          </div>
        </div>

        <div className="grow flex flex-col items-center w-full border-b py-12">
          <div className="w-full flex ">
            <div className="md:text-6xl text-4xl font-extrabold text-start inconsolata-900 md:w-[70%] p-4">
              "Create and share your stories seamlessly with our powerful blog platform."
            </div>
            <div className="flex justify-center items-center w-[30%] max-md:hidden"><Animation/></div>
          </div>
          <form action={handleSignUp}>
            <Button type="submit" variant="outline" className="text-xl inconsolata-900 my-2">Get Started</Button>
          </form>
        </div>

        <div className="grow my-6 px-2 flex justify-center items-center">
          <p className="inconsolata-900 text-sm md:text-md">&copy; 2024 Blog.io. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
