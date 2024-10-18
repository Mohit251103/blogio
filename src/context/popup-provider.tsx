"use client";
import React, { createContext, SetStateAction, useState } from "react";

interface PopupContextType{
    editorMenu: boolean,
    setEditorMenu: React.Dispatch<SetStateAction<boolean>>

    sideNav: boolean,
    setSideNav: React.Dispatch<SetStateAction<boolean>>,

    blogStarter: boolean,
    setBlogStarter: React.Dispatch<SetStateAction<boolean>>
}

const PopupContext = createContext<PopupContextType>({
    editorMenu: false,
    setEditorMenu: () => { },
    sideNav: false,
    setSideNav: () => { },
    blogStarter: false,
    setBlogStarter: ()=>{ }
})


const PopupProvider = (
    {children}:{children:React.ReactNode}
) => {
    const [editorMenu, setEditorMenu] = useState(false);
    const [sideNav, setSideNav] = useState(false);
    const [blogStarter, setBlogStarter] = useState(false);
    return (
        <PopupContext.Provider value={{ editorMenu, setEditorMenu, sideNav, setSideNav, blogStarter, setBlogStarter }}>
        {children}
        </PopupContext.Provider>
    )
}
export type { PopupContextType } ;
export { PopupProvider, PopupContext };