"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { checkSubscription, getAllTags, getTopUsers, subscribeUsers } from "@/actions";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { ProfileContext } from "@/context/profile-context";

const SubscribeButton = ({ id, setUsers }: { id: string, setUsers: React.Dispatch<SetStateAction<{ id: string, name: string | null, image: string | null, desc: string }[] | undefined>> }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [subscribing, setSubscribing] = useState<boolean>(false);
    const handleSubscribe = async (userId: string) => {
        setSubscribing(true);
        await subscribeUsers(session?.user?.id as string, userId);
        toast({
            title: "Subscribed"
        });
        setSubscribing(false);
        setUsers((prev) => 
            prev?.filter((user) => {
                return user.id != id;
            }))
        router.replace("/dashboard");
    }
    return (
        <Button className="text-xs p-2 h-fit" onClick={() => {
            handleSubscribe(id);
        }} disabled={subscribing}>{subscribing ? "Subscribing..." : "Subscribe"}</Button>
    )
}

const SubContent: React.FC = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [users, setUsers] = useState<{ id: string, name: string | null, image: string | null, desc: string }[] | undefined>([])
    const [showContent, setShowContent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const { session } = useContext(ProfileContext);

    const isSubscribed = async (authors: string[]) => {
        const res = await checkSubscription(session?.user?.id as string, authors);
        return res;
    }

    let count = 0;

    const getData = async () => {
        setLoading(true);
        count++;
        try {
            
            // console.log("entered", count);
            // const res = await getAllTags();
            
            // console.log("mid", count);
            // const res_2 = await getTopUsers();
            const [res, res_2] = await Promise.all([getAllTags(), getTopUsers()])
            const users = res_2?.map((user) => {
                return { ...user, desc: user.description as string };
            });
            console.log(users);
    
            const subscribed_users = await isSubscribed(users?.map((user) => user.id)!);
    
            // const  = await Promise.all(unresolved_users!)
            // const filtered_users: any[] = [];
            // users?.forEach((user, idx) => {
            //     if (!subscribed_users[idx] && user.id != session?.user?.id) {
            //         filtered_users.push(user);
            //     }
            // })
    
            const tags = res?.map((tag) => {
                return tag.name;
            })
    
            setTags(tags!);
            setUsers(subscribed_users?.map((usr) => { return { ...usr, desc: usr.description as string } }).slice(0, 4));
            setShowContent(true);
            // console.log("reached here?", count)

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        console.log(showContent, session);
        console.log(users);
        async function init() {
            if (session && !loading && users!.length==0) {
                await getData();
            }
        }

        init();

    }, [session])

    if (!showContent) {
        return (
            <div className="grow flex justify-center items-center max-md:hidden">
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
                    {!tags.length && <p className="text-sm font-bold text-center text-muted-foreground">No topics yet</p>}
                    <div className="flex flex-wrap w-4/5 gap-2">
                        {tags?.map((tag, index) => {
                            return <button className="rounded-md p-1 text-sm text-secondary-foreground bg-secondary" key={index} onClick={() => {
                                router.push(`/tag/${tag}`);
                            }}>
                                {tag}
                            </button>
                        })}
                        {!!tags.length && <button className="text-blue-500 text-sm ms-3 mt-3">See more topics</button>}
                    </div>
                </div>
                {/* trending accounts */}
                <div className="flex flex-col p-2 items-start w-full ms-3">
                    <p className="font-extrabold text-lg my-3">People to follow</p>
                    <div className="flex flex-wrap gap-2 w-full">
                        {users?.map((user, index) => {
                            return <div key={index} className="min-h-[45%] p-2 rounded-md bg-secondary text-secondary-foreground w-[45%]">
                                <button className="flex">
                                    <Image src={user.image as string} width={25} height={25} alt="profile" className="mr-2 rounded-full aspect-square" />
                                    <p className="text-sm font-bold">{user.name}</p>
                                </button>
                                {user.desc ? <p className="text-muted-foreground text-sm my-1 ms-2">{user?.desc?.substring(0, 30) + (user.desc.length > 30 ? "..." : "")}</p> : <p className="text-muted-foreground text-sm my-1 ms-2">...</p>}
                                <SubscribeButton id={user.id} setUsers={setUsers} />
                            </div>
                        })}
                        {users?.filter((_, index) => index < 5 && _.id != session?.user?.id).length === 0 && <p className="text-sm font-bold text-center text-muted-foreground">No one to follow yet</p>}
                    </div>
                    {!(users?.filter((_, index) => index < 5 && _.id != session?.user?.id).length === 0) && <button className="text-blue-500 text-sm ms-3 mt-3" onClick={() => { router.push("/search/author") }}>See more to follow</button>}
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

export {SubscribeButton}
export default SubContent;