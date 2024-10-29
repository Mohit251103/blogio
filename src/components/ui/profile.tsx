"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { EditIcon, Router, X } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import { SingleImageDropzoneUsage } from "./profilePicEdit";
import { ProfileContext } from "@/context/profile-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register } from "module";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";

const IProfileForm = z.object({
    image: z.string().optional(),
    name: z.string().min(1, "Cannot be empty").max(20, "Cannot exceed more than 20 characters"),
    desc: z.string().optional()
})

const Profile = () => {
    const { data: session } = useSession();
    const { imageUrl } = useContext(ProfileContext);
    const [update, setUpdate] = useState<boolean>(false);
    const [editImage, setEditImage] = useState<boolean>(false);
    const [profile, setProfile] = useState({
        userId: "",
        image: "",
        name: "",
        desc: ""
    })
    const router = useRouter();
    const handleEditImage = (e: any) => {
        e.preventDefault();
        setEditImage(true);
    }

    const handleUpdate = () => {
        setUpdate(true);
    }

    const handleCancelUpdate = () => {
        setUpdate(false);
    }

    const { register,handleSubmit, formState: { errors } } = useForm<z.infer<typeof IProfileForm>>({
        resolver: zodResolver(IProfileForm)
    })

    const handleFormSubmit = async () => {
        try {
            const res = await axiosInstance.post("/api/profile/update", profile);
            console.log(res);
            toast({
                title: res.data.message
            })
        } catch (error) {
            console.log(error);
            // toast({
            //     title: res.data.message
            // })
        }
    }

    useEffect(() => {
        if (session) {
            setProfile({
                userId: session.user?.id as string,
                name: session.user?.name as string,
                image: session.user?.image as string,
                desc: ""
            })
        }
    }, [session])
    
    useEffect(() => {
        if (imageUrl) {
            setProfile({
                ...profile, image: imageUrl
            })
        }
    },[imageUrl])

    if (!session) {
        return (
            <Loader />
        )
    }
    return (
        <div className="flex justify-center items-center flex-col min-h-screen overflow-hidden">
            <div className={`absolute top-0 flex justify-center items-center min-h-screen bg-black bg-opacity-60 backdrop-blur-sm w-full ${!editImage ? "hidden" : "z-50"}`}>
                <button className="bg-none absolute top-1 right-1" onClick={()=> setEditImage(false)}><X/></button>
                <SingleImageDropzoneUsage/>
            </div>
            <Button variant="outline" className="absolute top-2 left-4" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            <div className="flex flex-col justify-center items-center w-fit h-fit p-3 relative border rounded-sm">
                <div className="absolute top-1 right-1 peer">
                    <button className="bg-none" onClick={handleUpdate}>
                        <EditIcon className="w-4 h-4"></EditIcon>
                    </button>
                </div>
                <p className="bg-secondary text-secondary-foreground text-xs p-1 rounded-md absolute top-0 right-0 translate-x-16 opacity-0 peer-hover:opacity-100 transition-opacity duration-200">Edit Profile</p>
                <div className="relative rounded-full w-fit h-fit group aspect-square">
                    <Image src={profile.image} width={100} height={100} alt="user profile pic" className="rounded-full aspect-square" />
                    <div className="bg-black bg-opacity-60 flex justify-center items-center opacity-0 absolute top-0 w-full h-full group-hover:opacity-100 rounded-full">
                        <button onClick={handleEditImage}>
                            <EditIcon />
                        </button>
                    </div>
                </div>
                <div className="grow">
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Label htmlFor="username">Username</Label>
                        <Input {...register('name')} type="text" id="username" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} disabled={!update}></Input>
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" value={session.user?.email as string} disabled={true}></Input>

                        <Label htmlFor="desc">Description</Label>
                        <Input {...register('desc')} type="text" id="desc" value={profile.desc} placeholder="Description" onChange={(e)=> setProfile({...profile, desc: e.target.value})} disabled={!update}></Input>
                        {errors.desc && <p className="text-sm text-red-500">{errors.desc.message}</p>}

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