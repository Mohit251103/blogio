"use client";
import BlogArea from "@/components/tag/Blogs";
import TagNav from "@/components/tag/Nav";
import { useParams } from "next/navigation";

const TagExplorePage = () => {
    const { tname } = useParams();
    const tag = decodeURIComponent(tname as string);
    return (
        <div className="flex flex-col justify-center items-center">
            {/* explore tag nav */}
            <TagNav />

            <p className="text-5xl font-bold mt-3 mb-12">
                {tag}
            </p>

            {/* blogs */}
            <BlogArea tag={tag as string} />
        </div>
    )
}

export default TagExplorePage;