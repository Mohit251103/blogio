"use client";
import SideNavButton from "../ui/ClientSideNavButton";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "@/components/ui/select"
import { BookDashed, Bookmark, LayoutDashboard, NotebookPen, PlusCircle, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PopupContext } from "@/context/popup-provider";


const SideNav = () => {
    const [path, setPath] = useState<string>("");
    // const handleSubmit = async () => {
    // }


    const { sideNav, setSideNav, setBlogStarter } = useContext(PopupContext)

    useEffect(() => {
        setPath(window.location.pathname);
    }, []);

    useEffect(() => {
        const temp = matchMedia('(min-width: 1024px)').matches;
        if (temp) {
            setSideNav(!temp);
        }
    })

    return (
        <div className={`flex flex-col justify-between items-center border-r ${!sideNav ? "max-lg:w-0" : "max-lg:w-52 z-50"} max-lg:absolute max-lg:top-0 max-lg:h-[100vh] lg:h-[92vh] max-lg:bg-background overflow-y-auto max-lg:transition-all max-lg:ease-out max-lg:duration-400 lg:min-w-[15vw] sticky left-0`}>
            <div className="w-full h-full relative">
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
                    <SideNavButton className={`flex items-center my-2 ${path === "/published" ? "bg-secondary" : ""}`} route="/published">
                        <NotebookPen className="w-4 h-4 mr-2" />
                        <p className="text-md"> Published</p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2 ${path === "/draft" ? "bg-secondary" : ""}`} route="/draft">
                        <BookDashed className="w-4 h-4 mr-2" />
                        <p className="text-md"> Drafts</p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2`} onClick={() => {
                        setSideNav(false);
                        setBlogStarter(true);
                    }}>
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <p className="text-md"> Create Blog</p>
                    </SideNavButton>
                    <SideNavButton className={`flex items-center my-2`} route="/bookmarks">
                        <Bookmark className="w-4 h-4 mr-2" />
                        <p className="text-md"> Bookmark</p>
                    </SideNavButton>
                    {/* <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Your Subscriptions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>No Subscriptions</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select> */}
                </div>
            </div>
        </div>
    )
}

export default SideNav;