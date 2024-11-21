"use client";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { BookCheck, BookOpen } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "@/context/blog-context";
import FeedBlogCard from "../ui/feedBlogCard";
import axiosInstance from "@/lib/axiosInstance";
import Loader from "../ui/loader";
import { LoaderCircle } from "lucide-react";


const ContentArea = () => {
    const { blogs, setBlogs } = useContext(BlogContext);
    const [loading, setLoading] = useState<boolean>(true);
    
    const getBlogs = async () => {
        try {
            const res = await axiosInstance.get("/api/blog/get?type=feed");
            const updatedRes = res.data.data.map((blog:any) => {
                return { ...blog, likes: blog.Like.length };
            })
            // console.log(updatedRes);
            setBlogs(updatedRes);
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("From content area ... ");
        getBlogs(); 
    }, [])
    
    if (loading) {
        return <div className="w-[100vw] lg:w-[45vw] flex justify-center items-center h-[80vh]">
            <LoaderCircle className="animate-spin"></LoaderCircle>
        </div>
    }

    return (
        <>
            <div className="w-full lg:w-[45vw] flex flex-wrap gap-4 overflow-y-auto grow lg:mx-2 max-lg:px-2">
                {/* <Card className="w-full flex">
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
                </Card> */}
                {blogs.length !== 0 && blogs.map((blog, index) => {
                    return (
                        <FeedBlogCard key={index} title={blog.title} slug={blog.slug} author={{ id: blog.author.id, name: blog.author.name, profile: blog.author.image }} like={blog.likes}/>
                    )
                })
                }
            </div>
            {(!blogs.length && !loading) && <div className=""><p className="text-sm text-bold text-secondary-foreground text-center my-3">No Blogs Found</p></div>}
        </>
    )
}

export default ContentArea;