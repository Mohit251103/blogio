"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getBookmarkedBlogs } from "@/actions";
import FeedBlogCard from "@/components/ui/feedBlogCard";

type IBlogs = {
    id: string;
    description: string;
    userId: string;
    title: string;
    slug: string;
    isPublished: boolean;
    publishedOn: Date | null;
    createdOn: Date;
    author: {
        name: string | null;
        id: string;
        image: string | null;
        description: string | null;
        email: string;
        emailVerified: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
}[] | undefined

const ContentArea = () => {
    const [blogs, setBlogs] = useState<IBlogs>([]);
    const { data: session } = useSession();
    const getData = async () => {
        const res = await getBookmarkedBlogs(session?.user?.id as string);
        setBlogs(res);
        console.log(res);
    }
    useEffect(() => {
        if (session) {
            getData();
        }
    }, [session]);

    return (
        <div className="flex flex-wrap gap-2 w-full m-2">
            {blogs?.map((blog, index) => {
                return (
                    <div key={index} className="w-[45%]">
                        <FeedBlogCard title={blog.title} slug={blog.slug} author={{ id: blog.author.id as string, name: blog.author.name as string, profile: blog.author.image as string }}></FeedBlogCard>
                    </div>
                )
            })}
        </div>
    )
}

export default ContentArea;