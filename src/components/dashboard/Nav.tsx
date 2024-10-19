import { auth } from "@/auth"
import { ModeToggle } from "../ui/theme"
import Image from "next/image";
import Hamburger from "../ui/hamburger";
import SearchComponent from "@/components/dashboard/Search"

const Nav = async () => {
    const session = await auth();
    return (
        <div className="w-full border-b flex justify-between px-2 py-1 overflow-y-auto overflow-x-hidden">
            <div className="ml-2 max-sm:ml-1 flex">
                <Hamburger />
                <p className="text-2xl max-lg:hidden font-extrabold my-auto">Blog.io</p>
                <p className="lg:hidden text-md font-extrabold">B.io</p>
            </div>
            <div className="flex justify-center items-center">
                <SearchComponent/>
                <ModeToggle />
                <div className="">
                    <Image src={session?.user?.image as string} className="rounded-md border mx-2 max-sm:w-[25px] max-sm:h-[25px]" alt="profile" width={35} height={35} />
                </div>
            </div>
        </div>
    )
}

export default Nav;