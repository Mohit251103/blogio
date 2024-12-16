"use client"
import { cn } from "@/lib/utils"
import { useState } from "react"

const Summary = ({ children, className, style }: { children: React.ReactNode, className?: string, style: any }) => {
    return (
        <div className={cn("rounded-xl border bg-muted bg-opacity-60 text-foreground",
            className
        )} style={style}>
            {children}
        </div>
    )
}

export default Summary