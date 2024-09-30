"use client";
import { auth } from "@/auth";
import Tiptap from "@/components/ui/Editor";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSession } from "next-auth/react";
const Editor = () => {
    const [jobDescription, setJobDescription] = useState("");
    const { data: session } = useSession();
    return (
        <div className="bg-background text-foreground flex justify-center items-center flex-col">
            {/* <h2 className="text-3xl font-bold">{session?.user?.name}'s, Text Editor</h2> */}
            <Tiptap />
        </div>
    )
}

export default Editor;