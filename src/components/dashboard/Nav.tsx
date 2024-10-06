import { auth } from "@/auth"
import { ModeToggle } from "../ui/theme"
import Image from "next/image";
import { Input } from "../ui/input";
import { Menu, Search } from "lucide-react";
import { Button } from "../ui/button";

const Nav = async () => {
    const session = await auth();
    return (
        <div className="w-full border-b flex justify-between px-2 py-1 overflow-y-auto overflow-x-hidden">
            <div className="ml-2 max-sm:ml-1 flex">
                <Menu className="lg:hidden mr-2"/>
                <p className="text-2xl max-lg:hidden font-extrabold my-auto">Blog.io</p>
                <p className="lg:hidden text-md font-extrabold">B.io</p>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex items-center max-sm:mx-1 mx-2 border rounded-md max-sm:h-[30px] w-[190px]">
                    <Input placeholder="Search.." className="border-0 mr-1 rounded-e-none mx-0" />
                    <Button className="rounded-s-none rounded-r-md mx-0 h-full max-sm:w-[50px]" variant="outline"><Search /></Button>
                </div>
                <ModeToggle />
                <div className="">
                    <Image src={session?.user?.image as string} className="rounded-md border mx-2 max-sm:w-[25px] max-sm:h-[25px]" alt="profile" width={35} height={35} />
                </div>
            </div>
        </div>
    )
}

export default Nav;