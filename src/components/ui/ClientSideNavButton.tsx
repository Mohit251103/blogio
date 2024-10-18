"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation"

const buttonStyles = cva("text-start hover:bg-secondary p-2 rounded-md hover:cursor-pointer", {
    variants: {}
})
const SideNavButton = (
    { children, route, className, onClick }: { children: React.ReactNode, route?: string, className?: string | null, onClick?: () => void }
) => {
    const router = useRouter();
    return (
        <div className={cn(buttonStyles({ className }))} onClick={() => { onClick ? onClick() : route ? router.push(route) : undefined }}>
            {children}
        </div>
    )
}

export default SideNavButton;