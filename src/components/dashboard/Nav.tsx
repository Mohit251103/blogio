import { auth } from "@/auth"
import { ModeToggle } from "../ui/theme"
import Image from "next/image";
import Hamburger from "../ui/hamburger";
import SearchComponent from "@/components/dashboard/Search"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOutIcon, Settings, User } from "lucide-react";
import { redirect } from "next/navigation";

const ProfileButton = () => {
    const handleSubmit = async () => {
        "use server";
        redirect("/profile");
    }
    return (
        <form action={handleSubmit}>
            <button className="bg-none" type="submit">Profile</button>
        </form>
    )
}

const Nav = async ({ origin }: { origin: string }) => {
    const session = await auth();
    return (
        <div className="w-full border-b flex justify-between px-2 py-1 overflow-y-auto overflow-x-hidden sticky top-0">
            <div className="ml-2 max-sm:ml-1 flex">
                <Hamburger />
                <p className="text-2xl max-lg:hidden font-extrabold my-auto">Blog.io</p>
                <p className="lg:hidden text-md font-extrabold">B.io</p>
            </div>
            <div className="flex justify-center items-center">
                <SearchComponent origin={origin} />
                <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image src={session?.user?.image as string} className="rounded-md border mx-2 max-sm:w-[25px] max-sm:h-[25px]" alt="profile" width={35} height={35} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem><User className="w-4 h-4 mr-1" /> <ProfileButton/></DropdownMenuItem>
                        <DropdownMenuItem><Settings className="w-4 h-4 mr-1" /> Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex flex-col">
                            <p className="flex flex-start w-full my-1"><LogOutIcon className="w-4 h-4 mr-1" /> Sign-Out</p>
                            <p className="text-xs text-secondary-foreground">{session?.user?.email?.substring(0, 5) + "***" + session?.user?.email?.substring(session.user.email.length - 9)}</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Nav;