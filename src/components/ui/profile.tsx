"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { EditIcon, Router } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const Profile = async () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);
    const router = useRouter();
    const handleEditImage = () => {

    }

    const handleUpdate = () => {
        setUpdate(true);
    }

    const handleCancelUpdate = () => {
        setUpdate(false);
    }

    useEffect(() => {
        if (!session) {
            setLoading(true);
        }
        else {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoaderCircle className="animate-spin"></LoaderCircle>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center flex-col min-h-screen overflow-hidden">
            <Button variant="outline" className="absolute top-2 left-4" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            <div className="flex flex-col justify-center items-center w-fit h-fit p-3 relative border rounded-sm">
                <div className="absolute top-1 right-1 peer">
                    <button className="bg-none" onClick={handleUpdate}>
                        <EditIcon className="w-4 h-4"></EditIcon>
                    </button>
                </div>
                <p className="bg-secondary text-secondary-foreground text-xs p-1 rounded-md absolute top-0 right-0 translate-x-16 opacity-0 peer-hover:opacity-100 transition-opacity duration-200">Edit Profile</p>
                <div className="relative rounded-full w-fit h-fit group">
                    <Image src={session?.user?.image as string} width={100} height={100} alt="user profile pic" className="rounded-full" />
                    <div className="bg-black bg-opacity-60 flex justify-center items-center opacity-0 absolute top-0 w-full h-full group-hover:opacity-100 rounded-full">
                        <button onClick={handleEditImage}>
                            <EditIcon />
                        </button>
                    </div>
                </div>
                <div className="grow">
                    <form action="">
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" value={session?.user?.name as string} disabled={!update}></Input>

                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={session?.user?.email as string} disabled={!update}></Input>

                        <Label htmlFor="desc">Description</Label>
                        <Input type="text" id="desc" value="" placeholder="Description" disabled={!update}></Input>

                        {update &&
                            <div className="flex">
                                <Button type="submit" className="my-2">Edit Profile</Button>
                                <Button variant="outline" onClick={handleCancelUpdate} className="my-2">Cancel</Button>
                            </div>
                        }
                    </form>
                </div>
            </div>
            <div className=""></div>
        </div>
    )
}

export default Profile;