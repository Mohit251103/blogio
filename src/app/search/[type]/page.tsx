"use client";
import { getSearchedResults, subscribeUsers, unsubscribeUser } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FeedBlogCard from "@/components/ui/feedBlogCard";
import { ModeToggle } from "@/components/ui/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import React, { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const IForm = z.object({
    query: z.string().optional()
});

type ITag = { name: string; id: string; }[];
type IBlog = {
    id: string;
    userId: string;
    title: string;
    slug: string;
    description: string;
    isPublished: boolean;
    author: {
        id: string,
        name: string,
        image: string
    },
    likes: number
}[];
type IAuthor = {
    id: string,
    name: string | null,
    desc: string,
    image: string | null,
    subscribers?: [],
    isSubscribed?: boolean
}[] | undefined;


const UnsubscribeButton = ({ id, setUsers, subscriber }: {
    id: string,
    setUsers: React.Dispatch<SetStateAction<IAuthor>>,
    subscriber: string
}) => {
    const router = useRouter();
    const [unsubscribing, setUnsubscribing] = useState<boolean>(false);
    const handleUnsubscribe = async () => {
        setUnsubscribing(true);
        await unsubscribeUser(subscriber, id);
        setUsers((prev) => prev?.map((user) => {
            if (user.id === id) {
                return { ...user, isSubscribed: false }
            }
            return user
        }))
        setUnsubscribing(false);
        router.refresh()
    }
    return (
        <Button variant="outline" className="text-xs p-2 h-fit" onClick={handleUnsubscribe} disabled={unsubscribing}>{unsubscribing ? "Unsubscribing..." : "Unsubscribe"}</Button>
    )
}

const SubscribeButton = ({ id, setUsers, subscriber }: {
    id: string,
    setUsers: React.Dispatch<SetStateAction<IAuthor>>,
    subscriber: string
}) => {
    const router = useRouter();
    const [subscribing, setSubscribing] = useState<boolean>(false);
    const handleUnsubscribe = async () => {
        setSubscribing(true);
        await subscribeUsers(subscriber, id);
        setUsers((prev) => prev?.map((user) => {
            if (user.id === id) {
                return { ...user, isSubscribed: true }
            }
            return user
        }))
        setSubscribing(false);
        router.refresh()
    }
    return (
        <Button className="text-xs p-2 h-fit" onClick={handleUnsubscribe} disabled={subscribing}>{subscribing ? "Subscribing..." : "Subscribe"}</Button>
    )
}

const SearchPage = () => {
    const { data: session } = useSession();
    const [query, setQuery] = useState<string>("");
    const [tags, setTags] = useState<ITag>([]);
    const [blogs, setBlogs] = useState<IBlog>([]);
    const [authors, setAuthors] = useState<IAuthor>([]);
    const { type }: { type: string } = useParams();
    const router = useRouter();

    const { handleSubmit, register } = useForm<z.infer<typeof IForm>>({
        resolver: zodResolver(IForm)
    })

    const handleSearch = async () => {
        try {
            const res = await getSearchedResults(query, type.toLowerCase(), session?.user?.id);
            const ltype = type.toLowerCase();
            if (ltype === "tags") {
                setTags(res as ITag);
            }
            else if (ltype === "blogs") {
                const updatedRes = res?.map((blog: any) => {
                    return { ...blog, likes: blog.Like.length };
                })
                setBlogs(updatedRes as IBlog);
            }
            else {
                setAuthors(res as IAuthor);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center w-full">
            {/* nav */}
            <div className="flex justify-between items-center my-3 w-full px-3">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
                <ModeToggle />
            </div>
            <div className="flex w-fit justify-between items-center border rounded-xl">
                <button className={`${type === "blogs" ? "bg-muted" : "hover:bg-secondary hover:text-secondary-foreground"}  p-3 rounded-l-xl`} onClick={() => { router.push("/search/blogs") }}>Blogs</button>
                <button className={`${type === "author" ? "bg-muted" : "hover:bg-secondary hover:text-secondary-foreground"} p-3 rounded-r-xl`} onClick={() => router.push("/search/author")}>Authors</button>
            </div>
            <h1 className="text-3xl font-extrabold mt-12">Search <span>{type.toUpperCase()}</span></h1>
            {/* search bar */}
            <form onSubmit={handleSubmit(handleSearch)} className="my-12 px-2">
                <div className="rounded-2xl flex justify-center items-center h-fit w-fit pr-2 md:w-[50vw] w-[75vw] border">
                    <input type="text" className="bg-none px-4 text-xl font-md rounded-l-2xl w-[90%] p-2 mr-2 focus:outline outline-zinc-300 bg-secondary" {...register('query')} id="query" onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="px-1 grow h-full flex justify-center">
                        <Search />
                    </button>
                </div>
            </form>
            {/* content */}
            <div className="grow max-sm:max-w-[95vw] sm:max-w-[70vw] min-w-[70vw] p-2">
                {tags && <div className=""></div>}
                {blogs && <div className="grow flex flex-wrap gap-2 px-2 w-full">
                    {blogs.map((blog, index) => {
                        return <div key={index} className="w-[45%] max-md:w-full min-h-[20vh] max-h-fit">
                            <FeedBlogCard title={blog.title} slug={blog.slug} author={{ id: blog.author.id, name: blog.author.name as string, profile: blog.author.image as string }} like={blog.likes} />
                        </div>
                    })}
                </div>}
                {authors && <div className="grow flex flex-wrap gap-2 px-2">
                    {authors.map((a, index) => {
                        return <Card key={index} className="hover:cursor-pointer" onClick={() => { }}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold flex justify-start items-center">
                                    <Image src={a.image as string} alt="Author Profile" width={50} height={50} className="rounded-full mx-1 aspect-square mr-2" />
                                    <p className="text-xl">{a.name}</p>
                                </CardTitle>
                                <CardDescription className="flex items-center">
                                    {a.desc ? <p className="lg:text-sm text-sm text-secondary-foreground">{a.desc}</p> : <p className="lg:text-sm text-sm text-secondary-foreground">...</p>}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-start">
                                {!a.isSubscribed && <SubscribeButton id={a.id} setUsers={setAuthors} subscriber={session?.user?.id as string} />}
                                {a.isSubscribed && <UnsubscribeButton id={a.id} setUsers={setAuthors} subscriber={session?.user?.id as string} />}
                            </CardFooter>
                        </Card>
                    })}
                </div>}
            </div>
        </div>
    )
}

export default SearchPage