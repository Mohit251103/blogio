"use client"
import { useEffect, useState } from "react"
import { Input } from "./input"
import { Label } from "./label"
import { useSession } from "next-auth/react";
import { Button } from "./button";
import { toast } from "@/hooks/use-toast";

const LinkSharePage = () => {
    const [link, setLink] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);
    const { data: session } = useSession();
    const getLink = async () => {
        const link = `${process.env.NEXT_PUBLIC_APP_URL}/public_profile/${session?.user?.id}`
        setLink(link)
    }

    const handleCopy = async (e : any) => {
        e.preventDefault()
        try {
            await navigator.clipboard.writeText(link)

            toast({
                title:"Copied successfully"
            })
            setCopied(true)
        } catch (error) {
            console.log(error)
            toast({
                title:"Some error occurred"
            })
        }
    }
    useEffect(() => {
        if (session) {
            getLink();
        }
    }, [session])

    return (
        // <div className="absolute top-0 min-h-screen min-w-screen flex justify-center items-center bg-black bg-opacity-70 backdrop-blur-sm">
        <form className="w-fit h-fit p-3 border" action="">
            <Label htmlFor="link">Copy link</Label>
            <Input type="text" id="link" value={link} readOnly className="my-1"></Input>
            <Button variant={"default"} onClick={handleCopy} disabled={copied}>{copied?"Copied" : "Copy Link"}</Button>
        </form>
        // </div>
    )
}

export default LinkSharePage