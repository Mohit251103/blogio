"use client";
import { auth } from "@/auth";
import Tiptap from "@/components/editor/Editor";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import EditorNav from "@/components/editor/EditorNav";
import { PopupContext, PopupContextType } from "@/context/popup-provider";
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
const Editor = () => {
    const [jobDescription, setJobDescription] = useState("");
    const { data: session } = useSession();
    const { editorMenu, setEditorMenu } = useContext<PopupContextType>(PopupContext);
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams.get('slug'));
    const handleClick = () => {
        router.push("/dashboard");
    }

    if (!session) {
        return null;
    }

    return (
        <div className="bg-background text-foreground flex justify-center items-center flex-col" onClick={()=> setEditorMenu(false)}>
            <div className="w-full sticky top-0 z-50 text-foreground bg-opacity-80 backdrop-blur-md h-fit flex justify-between">
                <Button variant="outline" className="p-1 ml-3 mt-3" onClick={handleClick}><ChevronLeft/></Button>
                <div className="md:w-[70%] max-md:w-[85%] mx-auto">
                    <EditorNav slug={ searchParams.get('slug') } />
                </div>
            </div>
            <Tiptap slug={searchParams.get('slug')}>
                <form>
                    <textarea name="title" className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none " placeholder="Write title here ... " />
                </form>
            </Tiptap>
        </div>
    )
}

export default Editor;