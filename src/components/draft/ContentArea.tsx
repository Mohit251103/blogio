"use client"
import { useContext, useEffect } from "react"
import BlogCard from "../ui/blogcard"
import { getDrafts } from "@/actions";
import { BlogContext } from "@/context/blog-context";

const ContentArea = () => {
    const { drafts, setDrafts } = useContext(BlogContext);
    const getAllBlogs = async () => {
        const b_ = await getDrafts();
        setDrafts(b_ ?? []);
    }
    useEffect(() => {
        getAllBlogs(); 
    },[])
    return (
        <div className="grow py-2 px-2">
            <div className="w-full flex flex-wrap mx-auto gap-4">
                {drafts?.map((blog, index) => {
                    return <BlogCard key={index} slug={blog.slug} title={blog.title} />
                })}
            </div>
        </div>
    )
}

export default ContentArea;