"use client";
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
import { BookDashed, LayoutDashboard, NotebookPen, PlusCircle, X } from "lucide-react";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "@/context/popup-provider";


const SideNav = () => {
    const [path, setPath] = useState<string>("");
    const handleSubmit = async () => {
    }

    const handleLogOut = async () => {
        await signOut({ redirect: true, redirectTo: "/sign-in" });
    }

    const { sideNav, setSideNav, setBlogStarter } = useContext(PopupContext)

    useEffect(() => {
        setPath(window.location.pathname);
    }, [window.location.pathname]);

    return (
        <div className={`flex flex-col justify-between items-center border-r mr-2 ${!sideNav ? "max-lg:w-0" : "max-lg:w-52 z-50"} max-lg:absolute max-lg:top-0 max-lg:h-[100vh] max-lg:bg-background overflow-y-auto relative max-lg:transition-all max-lg:ease-out max-lg:duration-400 min-w-[15vw]`}>
            <div className="">
                <div className={`lg:hidden absolute top-1 right-1`} onClick={()=>setSideNav(false)}>
                    <X/>
                </div>
                <div className={`lg:hidden my-6`}>
                    <p className=" text-md font-extrabold text-center">Blog.io</p>
                </div>
                <div className="m-2">
                    <SideNavButton className={`flex items-center my-2 ${path === "/dashboard" ? "bg-secondary":""}`} route="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        <p className="text-md"> Feed</p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2 ${path === "/published" ? "bg-secondary" : ""}`} route="/dashboard">
                        <NotebookPen className="w-4 h-4 mr-2" />
                        <p className="text-md"> Your Blogs</p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2 ${path === "/draft" ? "bg-secondary" : ""}`} route="/draft">
                        <BookDashed className="w-4 h-4 mr-2" />
                        <p className="text-md"> Drafts<span className="ml-2">1</span></p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2`} onClick={() => {
                        console.log("entered");
                        setBlogStarter(true);
                    }}>
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
            <div className="flex flex-col items-center mb-2">
                <form action={handleLogOut}>
                    <Button type="submit">Log Out</Button>
                </form>
            </div>
        </div>
    )
}

export default SideNav;