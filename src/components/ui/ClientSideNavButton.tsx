"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation";
import { PopupContext } from "@/context/popup-provider";
import { useContext } from "react"
import { motion } from "motion/react";

const buttonStyles = cva("text-start hover:bg-secondary p-2 rounded-md hover:cursor-pointer", {
    variants: {}
})


const SideNavButton = (
    { children, route, className, onClick, variants }: { children: React.ReactNode, route?: string, className?: string | null, onClick?: () => void, variants: {} }
) => {
    const router = useRouter();
    const { setSideNav, setBlogStarter } = useContext(PopupContext);
    const closeAll = () => {
        setSideNav(false);
        setBlogStarter(false);
    }
    const handleClick = (route: string) => {
        router.push(route);
        closeAll();
    }
    
    return (
        <motion.div variants={variants} className={cn(buttonStyles({ className }))} onClick={() => onClick ? onClick() : route ? handleClick(route) : undefined }>
            {children}
        </motion.div>
    )
}

export default SideNavButton;