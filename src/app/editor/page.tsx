"use client";
import { auth } from "@/auth";
import Tiptap from "@/components/editor/Editor";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import EditorNav from "@/components/editor/EditorNav";
import { PopupContext, PopupContextType } from "@/context/popup-provider";
const Editor = () => {
    const [jobDescription, setJobDescription] = useState("");
    const { data: session } = useSession();
    const { editorMenu, setEditorMenu } = useContext<PopupContextType>(PopupContext);
    return (
        <div className="bg-background text-foreground flex justify-center items-center flex-col" onClick={()=> setEditorMenu(false)}>
            <div className="w-full sticky top-0 z-50 bg-blue text-foreground bg-opacity-80 backdrop-blur-sm h-fit">
                <div className="md:w-[70%] max-md:w-[85%] mx-auto">
                    <EditorNav user={{ name: session?.user?.name, email: session?.user?.email, image: session?.user?.image }} />
                </div>
            </div>
            <Tiptap >
                <form>
                    <textarea name="title" className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none " placeholder="Write title here ... " />
                </form>
            </Tiptap>
        </div>
    )
}

export default Editor;