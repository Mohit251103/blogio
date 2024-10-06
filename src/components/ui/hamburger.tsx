"use client";
import { PopupContext } from "@/context/popup-provider";
import { Menu } from "lucide-react"
import { useContext } from "react";

const Hamburger = () => {
    const { setSideNav } = useContext(PopupContext);
    return <div onClick={() => {
        console.log("Hamburger");
        setSideNav(true)
    }}>
        <Menu className="lg:hidden mr-2" />
    </div>
}

export default Hamburger;