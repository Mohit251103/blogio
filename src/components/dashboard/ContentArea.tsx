"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Button } from "../ui/button";
import { BookCheck, BookOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { BlogContext } from "@/context/blog-context";
import FeedBlogCard from "../ui/feedBlogCard";
import axiosInstance from "@/lib/axiosInstance";


const ContentArea = () => {
    const { data: session } = useSession();
    const { blogs, setBlogs } = useContext(BlogContext);
    
    const getBlogs = async () => {
        try {
            const res = await axiosInstance.get("/api/blog/get?type=feed");
            setBlogs(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBlogs(); 
    },[])
    return (
        <>
            <div className="w-full lg:w-[45vw] flex flex-wrap gap-4 overflow-y-auto grow lg:mx-2 max-lg:px-2">
                <Card className="w-full flex">
                    <div>
                        <CardHeader>
                            <CardTitle>Welcome, {session?.user?.name}</CardTitle>
                            <CardDescription>Instructions for using this app !!!</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-start">
                            <Button variant="default"><BookOpen className="mr-1" />Read</Button>
                            <Button variant="outline"><BookCheck className="mr-1" />Done</Button>
                        </CardFooter>
                    </div>
                    <CardContent className="my-auto mx-auto">
                        <Image src="/profile.png" alt="Card Image" width={100} height={100} />
                    </CardContent>
                </Card>
                {blogs.length !== 0 && blogs.map((blog, index) => {
                    return (
                        <FeedBlogCard key={index} title={blog.title} slug={blog.slug} author={{ id: blog.author.id, name: blog.author.name, profile: blog.author.image }} />
                    )
                })
                }
            </div>
            {!blogs.length && <div className=""><p className="text-sm text-bold text-secondary-foreground text-center my-3">No Blogs Found</p></div>}
        </>
    )
}

export default ContentArea;