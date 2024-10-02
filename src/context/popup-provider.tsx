"use client";
import React, { createContext, SetStateAction, useState } from "react";

interface PopupContextType{
    editorMenu: boolean,
    setEditorMenu: React.Dispatch<SetStateAction<boolean>>
}

const PopupContext = createContext<PopupContextType>({
    editorMenu: false,
    setEditorMenu: ()=>{}
})


const PopupProvider = (
    {children}:{children:React.ReactNode}
) => {
    const [editorMenu, setEditorMenu] = useState(false);
    return (
        <PopupContext.Provider value={{ editorMenu, setEditorMenu }}>
        {children}
        </PopupContext.Provider>
    )
}
export type { PopupContextType } ;
export { PopupProvider, PopupContext };