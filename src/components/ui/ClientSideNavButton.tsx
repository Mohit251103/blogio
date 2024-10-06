"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useRouter } from "next/navigation"

const buttonStyles = cva("text-start hover:bg-secondary p-2 rounded-md hover:cursor-pointer", {
    variants:{}
})
const SideNavButton = (
    {children, route, className}:{children:React.ReactNode, route:string, className?:string | null}
) => {
    const router = useRouter();
    return (
        <div className={cn(buttonStyles({className}) )} onClick={()=>{ router.push(route) }}>
            {children}
        </div>
    )
}

export default SideNavButton;