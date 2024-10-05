"use client";
import React, { createContext, SetStateAction, useState } from "react";

interface EditorContextType{
    editorState: string,
    setEditorState: React.Dispatch<SetStateAction<string>>

    drafting: boolean,
    setDrafting: React.Dispatch<SetStateAction<boolean>>

    blogData: {
        slug: string
    },
    setBlogData: React.Dispatch<SetStateAction<{slug:string}>>
}

const EditorContext = createContext<EditorContextType>({
    editorState: "",
    setEditorState: () => { },
    drafting: false,
    setDrafting: () => { },
    blogData: {
        slug: ""
    },
    setBlogData: () => { }
})


const EditorProvider = (
    {children}:{children:React.ReactNode}
) => {
    const [editorState, setEditorState] = useState<string>("second");
    const [drafting, setDrafting] = useState<boolean>(false);
    const [blogData, setBlogData] = useState<EditorContextType["blogData"]>({slug:" "});
    return (
        <EditorContext.Provider value={{editorState, setEditorState, drafting, setDrafting, blogData, setBlogData}}>
            {children}
        </EditorContext.Provider>
    )
}

export { EditorProvider, EditorContext };