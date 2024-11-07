"use client"
import { checkSubscription, getBlogsOfUser, getSubscribers, getUserDetails, subscribeUsers, unsubscribeUser } from "@/actions";
import { Button } from "@/components/ui/button";
import FeedBlogCard from "@/components/ui/feedBlogCard";
import Loader from "@/components/ui/loader";
import { ModeToggle } from "@/components/ui/theme";
import { LucideArrowRightToLine } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

type IUser = { subscribers: { userId: string; subscriberId: string; subscribedAt: Date; }[]; } & { id: string; name: string | null; email: string; description: string | null; emailVerified: Date | null; image: string | null; createdAt: Date; updatedAt: Date; } | null | undefined

type ISubscriber = {
    id: string;
    name: string | null;
    email: string;
    description: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}[] | null;

type IBlog = {
    userId: string;
    id: string;
    description: string;
    title: string;
    slug: string;
    isPublished: boolean;
    publishedOn: Date | null;
    createdOn: Date;
    Like: {
        userId: string;
        id: string;
        blogId: string;
        likedAt: Date;
    }[];
}[] | undefined

const PublicProfile = () => {
    const { data: session } = useSession();
    const { userId }: { userId: string } = useParams();
    const [user, setUser] = useState<IUser>()
    const [subscribers, setSubscribers] = useState<ISubscriber>();
    const [blogs, setBlogs] = useState<IBlog>();
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [subscribing, setSubscribing] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    const getUser = async () => {
        try {
            const res = await getUserDetails(userId);
            const res_sub = await getSubscribers(res?.subscribers);
            const res_blog = await getBlogsOfUser(userId);
            console.log(res_sub)
            if (session) {
                const subs = await checkSubscription(session.user?.id as string, userId)
                setIsSubscribed(subs ?? false)
            }
            setUser(res);
            setSubscribers(res_sub);
            setBlogs(res_blog);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleUnsubscribe = async () => {
        setSubscribing(true);
        await unsubscribeUser(session?.user?.id as string, userId);
        setSubscribing(false);
        setIsSubscribed(false);
    }

    const handleSubscribe = async () => {
        if (!session) {
            router.push("/sign-in")
            return;
        }
        setSubscribing(true);
        await subscribeUsers(session?.user?.id as string, userId);
        setSubscribing(false);
        setIsSubscribed(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <div className="min-h-screen w-[100vw] flex flex-col">
            <div className="flex justify-between px-2 border-b p-2">
                <button className="bg-none text-2xl font-extrabold my-auto" onClick={() => router.push("/dashboard")}>Blog.io</button>
                <div className="flex">
                    <ModeToggle/>
                    <button className="bg-none rounded-md hover:bg-secondary p-2" onClick={() => router.push("/dashboard")}>
                        <LucideArrowRightToLine className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="grow flex">
                <div className="flex flex-col items-center justify-center px-2 py-4 md:min-w-[25%]">
                    <div className="h-fit w-fit bg-secondary rounded-xl flex flex-col items-center justify-center p-4">
                        <Image src={user?.image as string} width={70} height={70} alt="user profile pic" className="rounded-full aspect-square"></Image>
                        <h3 className="text-2xl font-bold">{user?.name}</h3>
                        <p className="text-secondary-foreground text-xs">{user?.email}</p>
                        {(session?.user?.id !== userId && isSubscribed) && <Button className="my-2" variant="outline" onClick={handleUnsubscribe}>{subscribing ? "Unsubscribing..." : "Unsubscribe"}</Button>}
                        {(session?.user?.id !== userId && !isSubscribed) && <Button className="my-2" onClick={handleSubscribe}>{subscribing ? "Subscribing..." : 'Subscribe'}</Button>}

                        <h3 className="text-sm text-secondary-foreground">Subscribers</h3>
                        <div className="grid grid-cols-auto grid-flow-col relative">
                            {subscribers?.slice(0, 4).map((subs, index) => {
                                return (
                                    <div className="w-fit h-fit rounded-full -translate-x-2 first:translate-x-0">
                                        <Image key={index} src={subs.image!} width={30} height={30} alt="subscriber pic" className="peer rounded-full aspect-square border-white border-2" />
                                        <p className="p-2 opacity-0 peer-hover:opacity-100 invisible peer-hover:visible transition-opacity duration-200 absolute top-0 -translate-y-16 text-xs bg-background text-foreground border rounded-md w-fit p-1">{subs.name}</p>
                                    </div>
                                )
                            })}
                        </div>
                        {subscribers?.slice(4).length !== 0 && <h4 className="text-xs">+{subscribers?.slice(4).length}</h4>}
                    </div>
                </div>
                <div className="grow flex justify-center items-center p-2 ">
                    <div className="w-[80%] max-h-[80vh] bg-secondary rounded-xl relative">
                        <h1 className="text-2xl text-extrabold w-full bg-opacity-70 backdrop-blur-sm p-2 sticky top-0">Published Work</h1>
                        <div className="flex p-4 flex-wrap gap-2 max-h-[70vh] overflow-auto mod-scroll">
                            {blogs?.map((blog) => {
                                return <FeedBlogCard title={blog.title} slug={blog.slug} author={{ id: userId, name: user?.name!, profile: user?.image! }} like={blog.Like.length}></FeedBlogCard>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicProfile