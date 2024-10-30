"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllTags, getTopUsers } from "@/actions";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const SubContent: React.FC = () => {
    const [tags, setTags] = useState<string[] | undefined>();
    const [users, setUsers] = useState<{ id: string | null, name: string | null, image: string | null, desc: string }[] | undefined>([])
    const [showContent, setShowContent] = useState<boolean>(false);
    const router = useRouter();

    const getData = async () => {
        const res = await getAllTags();
        const res_2 = await getTopUsers();
        const users = res_2?.map((user) => {
            return { ...user, desc: user.description as string };
        }) 
        const tags = res?.map((tag) => {
            return tag.name;
        })
        setTags(tags?.slice(0,10));
        setUsers(users?.slice(0, 4));
        setShowContent(true);
    }

    useEffect(() => {
        getData();
    }, [])
    
    if (!showContent) {
        return (
            <div className="grow flex justify-center items-center ">
                <LoaderCircle className="animate-spin"></LoaderCircle>
            </div>
        )
    }

    return (
        <div className="grow flex flex-col max-md:hidden">
            <div className="flex flex-col justify-center items-center w-full ms-3">
                {/* tag area */}
                <div className="flex flex-col p-2 items-start w-full">
                    <p className="font-extrabold text-lg my-3">Topics for you</p>
                    <div className="flex flex-wrap w-4/5 gap-2">
                        {tags?.map((tag, index) => {
                            return <button className="rounded-md p-1 text-sm text-secondary-foreground bg-secondary" key={index} onClick={() => {
                                router.push(`/tag/${tag}`);
                            }}>
                                {tag}
                            </button>
                        })}
                        <button className="text-blue-500 text-sm ms-3 mt-3">See more topics</button>
                    </div>
                </div>
                {/* trending accounts */}
                <div className="flex flex-col p-2 items-start w-full ms-3">
                    <p className="font-extrabold text-lg my-3">People to follow</p>
                    <div className="flex flex-wrap gap-2">
                        {users?.filter((user, index) => index < 5).map((user, index) => {
                            return <div key={index} className="h-fit p-2 rounded-md bg-secondary text-secondary-foreground">
                                <button className="flex">
                                    <Image src={user.image as string} width={25} height={25} alt="profile" className="mr-2 rounded-full aspect-square" />
                                    <p className="text-sm font-bold">{user.name}</p>
                                </button>
                                <p className="text-muted-foreground text-sm my-1">{user?.desc?.substring(0, 30) + (user.desc.length > 30 ? "..." : "")}</p>
                                <Button className="text-xs p-2 h-fit">Subscribe</Button>
                            </div>
                        })}
                    </div>
                    <button className="text-blue-500 text-sm ms-3 mt-3">See more to follow</button>
                </div>
            </div>
            <div className="w-[100%] bg-secondary h-[0.5px]"></div>
            {/* footer */}
            <div className="flex flex-col items-center justify-center grow">
                <p className="text-sm text-bold">Build with &#9829; by <Link href={"https://github.com/mohit251103"} className="italic" target="_blank">Mohit Negi</Link></p>
            </div>
        </div>
    )
}

export default SubContent;