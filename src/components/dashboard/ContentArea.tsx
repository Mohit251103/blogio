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
import { useContext } from "react";
import { BlogContext } from "@/context/blog-context";
import FeedBlogCard from "../ui/feedBlogCard";


const ContentArea =  () => {
    const { data: session } = useSession();
    const { blogs } = useContext(BlogContext);
    console.log(blogs);
    return (
        <div className="w-full flex flex-wrap mx-auto gap-4">
            <Card className="w-fit flex">
                <div>
                    <CardHeader>
                        <CardTitle>Welcome, {session?.user?.name}</CardTitle>
                        <CardDescription>Instructions for using this app !!!</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-start">
                        <Button variant="default"><BookOpen className="mr-1" />Read</Button>
                        <Button variant="outline"><BookCheck className="mr-1"/>Done</Button>
                    </CardFooter>
                </div>
                <CardContent className="my-auto mx-auto">
                    <Image src="/profile.png" alt="Card Image" width={100} height={100}/>
                </CardContent>
            </Card>
            {blogs? blogs.map((blog, index)=>{
                return (
                    <FeedBlogCard key={index} title={blog.title} slug={blog.slug} author={{id:blog.author.id, name:blog.author.name, profile:blog.author.image}} />
                )
            }) :
                <div className="text-xl text-zinc-900 text-center">No Blogs</div>
            }
        </div>
    )
}

export default ContentArea;