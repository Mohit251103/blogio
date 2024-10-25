"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSession } from "next-auth/react";
import { PopupContext } from "@/context/popup-provider";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { getTags } from "@/actions";

const formSchema = z.object({
    title: z.string().min(1, "Cannot be blank").max(50, "Cannot be more than 50 characters"),
    slug: z.string().optional()
})

type ITag = {
    id: string | null,
    name: string
};

type IBlog = {
    userId: string,
    title: string,
    slug: string,
    tag: ITag[]
}

const NewBlogStarter = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [tagInput, setTagInput] = useState<string>("");
    const [searchTag, setSearchTag] = useState<ITag[]>([]);
    const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
    const [blog, setBlog] = useState<IBlog>({
        userId: "",
        title: "",
        slug: "",
        tag: []
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [innerhtml, setInnerhtml] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const { blogStarter, setBlogStarter } = useContext(PopupContext);
    const generateSlug = (title: string) => {
        const div_title = title.split(" ");
        const slug = div_title.map((word) => word.toLowerCase()).join("-");
        return slug;
    }

    const handleChange = (e: any) => {
        const slug = generateSlug(e.target.value);
        setBlog({ ...blog, [e.target.name]: e.target.value, slug: slug });
    }

    const handleTagChange = (e: any) => {
        setTagInput(e.target.value);
    }

    const debouncedSearch = useCallback((tagInput: string) => {
        const timeout = setTimeout(async (tagInput: string) => {
            const tags = await getTags(tagInput);
            if (tags) {
                setSearchTag([...tags]);
                setShowSearchResult(true);
            }
        }, 200);

        return () => {
            clearTimeout(timeout);
        }
    }, [tagInput]);

    const handleKeyUp = async (e: any) => {
        debouncedSearch(e.target.value);
        if (e.key === "Enter") {
            console.log("enter");
            setBlog({
                ...blog,
                tag: [...blog.tag, {
                    id: null,
                    name: e.target.value
                }]
            })
        }
    }


    const createBlog = async () => {
        try {
            setLoading(true);
            const updatedBlog = { ...blog, userId: session?.user?.id, slug: blog.slug + session?.user?.id };
            await axiosInstance.post('/api/blog/c', updatedBlog);
            toast({
                title: "Blog Created"
            })
            router.push(`/editor/new?slug=${updatedBlog.slug}`);
            setLoading(false);
            setBlogStarter(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className={`absolute top-0 w-[100vw] h-[100vh] bg-black backdrop-blur-sm bg-opacity-80 flex justify-center items-center ${!blogStarter ? "hidden" : ""} z-50`}>
            <div className="w-fit h-fit p-3 bg-background text-foreground relative rounded-md ">
                <div className="absolute top-1 right-1" onClick={() => setBlogStarter(false)}>
                    <X />
                </div>
                <form onSubmit={handleSubmit(createBlog)}>
                    <Label htmlFor="title">Title*</Label>
                    <Input {...register("title")} type="text" id="title" placeholder="Blog title" name="title" value={blog.title} onChange={handleChange} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                    <Label htmlFor="slug">Slug</Label>
                    <Input {...register("slug")} type="text" id="slug" placeholder="Slug" name="slug" value={blog.slug} disabled />

                    <Label htmlFor="tags">Tags</Label>
                    <Input type="text" placeholder="Write a tag and press enter" value={tagInput} id="tags" name="tags" onChange={handleTagChange} onKeyUp={handleKeyUp} />
                    {showSearchResult && <div className="">

                    </div>
                    }
                    {blog.tag && <div className="p-2 w-full flex flex-wrap">
                        {blog.tag.map((tag, index) => {
                            return <p key={index} className="text-xs p-2 rounded-md bg-secondary text-secondary-foreground">
                                {tag.name}
                            </p>
                        })}
                    </div>}

                    <Button type="submit" className="my-2" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>

                </form>
            </div>
        </div>
    )
}

export default NewBlogStarter;