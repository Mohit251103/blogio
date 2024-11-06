"use client"
import { getUserDetails } from "@/actions";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

type IUser = { subscribers: { userId: string; subscriberId: string; subscribedAt: Date; }[]; } & { id: string; name: string | null; email: string; description: string | null; emailVerified: Date | null; image: string | null; createdAt: Date; updatedAt: Date; } | null | undefined

const PublicProfile = () => {
    const { userId }: { userId: string } = useParams();
    const [user, setUser] = useState<IUser>()

    const getUser = async () => {
        const res = await getUserDetails(userId);
        setUser(res);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <Image src={user?.image as string} width={70} height={70} alt="user profile pic" className="rounded-full aspect-square"></Image>
                <h3 className="text-2xl font-bold">{user?.name}</h3>
                <p className="text-secondary-foreground text-md">{user?.email}</p>
            </div>
        </div>
    )
}

export default PublicProfile