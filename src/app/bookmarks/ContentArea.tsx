"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getBookmarkedBlogs } from "@/actions";
import FeedBlogCard from "@/components/ui/feedBlogCard";
import axiosInstance from "@/lib/axiosInstance";

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
    likes: number
}[] | undefined

const ContentArea = () => {
    const [blogs, setBlogs] = useState<IBlogs>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const { data: session } = useSession();
    const getData = async () => {
        const res = await getBookmarkedBlogs(session?.user?.id as string);
        const updatedRes = res?.map((blog: any) => {
            return { ...blog, likes: blog.Like.length };
        })
        setBlogs(updatedRes);
    }

    useEffect(() => {
        if (session) {
            getData();
        }
    }, [session]);

    return (
        <div className="flex flex-wrap gap-2 w-full p-2">
            {blogs?.map((blog, index) => {
                return (
                    <div key={index} className="w-[45%] max-md:w-full min-h-[25vh] max-h-fit">
                        <FeedBlogCard title={blog.title} slug={blog.slug} author={{ id: blog.author.id as string, name: blog.author.name as string, profile: blog.author.image as string }} like={blog.likes}></FeedBlogCard>
                    </div>
                )
            })}
            {!blogs && <div className="w-full h-full flex justify-center p-2">Nothing Bookmarked</div>}
        </div>
    )
}

export default ContentArea;