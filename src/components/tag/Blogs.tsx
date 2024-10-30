import { getBlogWithTag } from "@/actions";
import { useEffect, useState } from "react";
import FeedBlogCard from "../ui/feedBlogCard";

const BlogArea = ({ tag }: { tag: string }) => {
    const [blogs, setBlogs] = useState<{
        id: string;
        userId: string;
        title: string;
        slug: string;
        description: string;
        isPublished: boolean;
        author: {
            image: string | null;
            id: string;
            name: string | null;
            description: string | null;
            email: string;
            emailVerified: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }[] | undefined>([]);

    useEffect(() => {
        const getBlogs = async () => {
            const res = await getBlogWithTag(tag);
            setBlogs(res);
        }
        getBlogs();
    }, [])

    return (
        <div className="grow flex flex-wrap gap-4">
            {blogs?.map((blog, index) => {
                return <FeedBlogCard title={blog.title} slug={blog.slug} author={{id: blog.author.id, name: blog.author.name as string, profile:blog.author.image as string}}/>
            })}
        </div>
    )
}

export default BlogArea;