"use client"
import { Channel } from "pusher-js";
import React, { createContext, SetStateAction, useCallback, useEffect, useState } from "react";
import Pusher from "pusher-js";
// import { pusherClient } from "@/lib/pusher";

type IPusherContext = {
    channel: Channel | null,
    setChannel: React.Dispatch<SetStateAction<Channel | null>>
}

const PusherContext = createContext<IPusherContext>({
    channel: null,
    setChannel: ()=>{}
});

const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string, {
    cluster: 'ap2'
});

const PusherProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [channel, setChannel] = useState<Channel | null>(null)
    const startPusher = useCallback(async () => {
        setChannel(pusherClient.subscribe("blog_io"));
    },[])
    useEffect(() => {
        startPusher()
        return () => {
            pusherClient.unsubscribe("blog_io");
        }
    }, [])

    return (
        <PusherContext.Provider value={{ channel, setChannel }}>
            {children}
        </PusherContext.Provider>
    )

}

export {PusherContext, PusherProvider}

