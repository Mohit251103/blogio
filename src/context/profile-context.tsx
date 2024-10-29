"use client";
import React, { createContext, SetStateAction, useState } from "react";

type IProfile = {
    imageUrl: string,
    setImageUrl: React.Dispatch<SetStateAction<string>>
}

const ProfileContext = createContext<IProfile>({
    imageUrl: "",
    setImageUrl: ()=>{}
})

const ProfileProvider = (
    {children}:{children: React.ReactNode}
) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    return (
        <ProfileContext.Provider value={{imageUrl, setImageUrl}}>
            {children}
        </ProfileContext.Provider>
    )
}

export {ProfileProvider, ProfileContext};