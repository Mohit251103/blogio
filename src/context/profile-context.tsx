"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { createContext, SetStateAction, useState } from "react";

type IProfile = {
    imageUrl: string,
    setImageUrl: React.Dispatch<SetStateAction<string>>
    session: Session | null
}

const ProfileContext = createContext<IProfile>({
    imageUrl: "",
    setImageUrl: () => { },
    session: null
})

const ProfileProvider = (
    {children}:{children: React.ReactNode}
) => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const { data: session } = useSession();
    return (
        <ProfileContext.Provider value={{imageUrl, setImageUrl, session}}>
            {children}
        </ProfileContext.Provider>
    )
}

export {ProfileProvider, ProfileContext};