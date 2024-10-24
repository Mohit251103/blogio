"use client"
import { useContext, useEffect } from "react"
import BlogCard from "../ui/blogcard"
import { getDrafts, getPublished } from "@/actions";
import { BlogContext } from "@/context/blog-context";

const ContentArea = ({ origin }: { origin: string }) => {
    const { drafts, setDrafts, published, setPublished } = useContext(BlogContext);
    const getAllDraft = async () => {
        const b_ = await getDrafts();
        setDrafts(b_ ?? []);
    }

    const getAllPublished = async () => {
        const b_ = await getPublished();
        setPublished(b_ ?? []);
    }

    useEffect(() => {
        if (origin === "draft") getAllDraft();
        if (origin === "publish") getAllPublished();
    }, [])
    return (
        <div className="grow">
            <div className="h-[92vh] py-2 px-2">
                <div className="flex flex-wrap gap-4 max-lg:flex max-lg:justify-center overflow-y-auto">
                    {origin === "draft" && drafts?.map((blog, index) => {
                        return <BlogCard key={index} slug={blog.slug} title={blog.title} />
                    })}
                    {origin === "publish" && published?.map((blog, index) => {
                        return <BlogCard key={index} slug={blog.slug} title={blog.title} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ContentArea;