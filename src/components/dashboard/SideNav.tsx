import Link from "next/link";
import SideNavButton from "../ui/ClientSideNavButton";
import { Button } from "../ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"
import { BookDashed, LayoutDashboard, NotebookPen, PlusCircle } from "lucide-react";
import { signOut } from "@/auth";


const SideNav = () => {
    const handleSubmit = async () => {
        "use server";
    }

    const handleLogOut = async () => {
        "use server"
        await signOut({ redirect: true, redirectTo: "/sign-in" });
    }

    return (
        <div className="flex flex-col justify-between items-center border-r mr-2 max-lg:hidden overflow-y-auto ">
            <div className="">
                <div className="m-2">
                    <SideNavButton className="flex items-center my-2" route="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        <p className="text-md"> Dashboard</p>
                    </SideNavButton>
                    <SideNavButton className="flex items-center my-2" route="/dashboard">
                        <NotebookPen className="w-4 h-4 mr-2" />
                        <p className="text-md"> Your Blogs</p>
                    </SideNavButton>
                    <SideNavButton className="flex items-center my-2" route="/dashboard">
                        <BookDashed className="w-4 h-4 mr-2" />
                        <p className="text-md"> Drafts<span className="ml-2">1</span></p>
                    </SideNavButton>
                    <SideNavButton className="flex items-center my-2" route="/editor/new">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <p className="text-md"> Create Blog</p>
                    </SideNavButton>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Your Subscriptions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>No Subscriptions</SelectLabel>
                                {/* <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <form action={handleLogOut}>
                    <Button type="submit">Log Out</Button>
                </form>
            </div>
        </div>
    )
}

export default SideNav;