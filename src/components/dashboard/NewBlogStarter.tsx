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

    const debouncedSearch = useCallback((callback: (value: any) => void, delay: number) => {
        let timeout: NodeJS.Timeout;
        return (value: any) => {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => {
                callback(value)
            }, delay);
        }

    }, []); // this one is for preventing unncessary creation

    const debounceCallback = useCallback(
        debouncedSearch(async (tagInput: string) => {
            console.log("debounced...")
            const tags = await getTags(tagInput);
            if (tags) {
                setSearchTag([...tags]);
                setShowSearchResult(true);
            }
        }, 200)
        , [debouncedSearch]) // this one is to debounce api calls

    const handleKeyUp = async (e: any) => {
        debounceCallback(e.target.value);
        console.log(e.key);
        if (e.key === "Enter" && e.target.value) {
            console.log("enter");
            setBlog({
                ...blog,
                tag: [...blog.tag, {
                    id: null,
                    name: e.target.value
                }]
            })
            setTagInput("");
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
            setBlog({
                ...blog,
                title: "",
                slug: "",
                tag: []
            })
            setSearchTag([])
            setTagInput("")
            setLoading(false);
            setBlogStarter(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const addTag = (tag: ITag) => {
        setBlog({ ...blog, tag: [...blog.tag, { id: tag.id, name: tag.name }] })
        setTagInput("");
    }

    return (
        <div className={`absolute top-0 w-[100vw] h-[100vh] bg-black backdrop-blur-sm bg-opacity-80 flex justify-center items-center ${!blogStarter ? "hidden" : ""} z-50`}>
            <div className="w-fit h-fit p-3 bg-background text-foreground relative rounded-md ">
                <div className="absolute top-1 right-1" onClick={() => setBlogStarter(false)}>
                    <X />
                </div>
                <form className="max-sm:w-[80vw] max-md:w-[55vw] max-lg:w-[55vw] xl:w-[30vw]" onSubmit={handleSubmit(createBlog)}>
                    <Label htmlFor="title">Title*</Label>
                    <Input {...register("title")} type="text" id="title" placeholder="Blog title" name="title" value={blog.title} onChange={handleChange} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                    <Label htmlFor="slug">Slug</Label>
                    <Input {...register("slug")} type="text" id="slug" placeholder="Slug" name="slug" value={blog.slug} disabled />

                    <Label htmlFor="tags">Tags</Label>
                    <Input type="text" placeholder="Write/Search a tag and press CTRL+Enter" value={tagInput} id="tags" name="tags" onChange={handleTagChange} onKeyUp={(e) => handleKeyUp(e)} />
                    {(showSearchResult && searchTag.length > 0) && <div className="rounded-md p-2 h-fit flex flex-wrap gap-2 bg-secondary mt-2">
                        {searchTag.map((tag, index) => {
                            return <button key={index} className="w-fit bg-background p-1 rounded-sm" onClick={(e) => {
                                e.preventDefault();
                                addTag(tag)
                            }}>{tag.name}</button>
                        })}
                    </div>
                    }
                    {blog.tag && <div className="p-2 w-full flex flex-wrap">
                        {blog.tag.map((tag, index) => {
                            return <p key={index} className="text-xs p-2 rounded-md bg-secondary text-secondary-foreground relative mx-1 group">
                                <button className="absolute top-0 left-0 rounded-full opacity-0 transition-opacity duration-100 group-hover:opacity-100 bg-secondary" onClick={(e) => {
                                    e.preventDefault();
                                    setBlog({
                                        ...blog, tag: [...blog.tag.filter((tag, idx) => idx != index)] 
                                    })}
                                }>
                                <X className="w-2 h-2 rounded-full" /></button>
                            { tag.name }
                            </p>
                    })}
            </div>}

            <Button type="submit" className="my-2" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
            </Button>

        </form>
            </div >
        </div >
    )
}

export default NewBlogStarter;