"use client";

import { useContext, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSession } from "next-auth/react";
import { PopupContext } from "@/context/popup-provider";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import {  z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1,"Cannot be blank").max(50, "Cannot be more than 50 characters"),
    slug: z.string().optional()
})

const NewBlogStarter = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [blog, setBlog] = useState({
        userId: session?.user?.id,
        title: "",
        slug: ""
    })

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const { blogStarter, setBlogStarter } = useContext(PopupContext);
    const generateSlug = (title : string) => {
        let div_title = title.split(" ");
        let slug = div_title.map((word) => word.toLowerCase()).join("-");
        return slug;
    }

    const handleChange = (e: any) => {
        const slug = generateSlug(e.target.value);
        setBlog({ ...blog, [e.target.name]: e.target.value, slug:slug });
    }

    const createBlog = async () => {
        console.log("create blog");
        try {
            const updatedBlog = {...blog, slug: blog.slug + session?.user?.id};
            const res = await axiosInstance.post('/api/blog/c', updatedBlog);
            toast({
                title: "Blog Created"
            })
            router.push(`/editor/new?slug=${updatedBlog.slug}`);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={`absolute top-0 w-[100vw] h-[100vh] bg-black backdrop-blur-sm bg-opacity-80 flex justify-center items-center ${!blogStarter ? "hidden" : ""} z-50`}>
            <div className="w-fit h-fit p-3 bg-background text-foreground relative rounded-md ">
                <div className="absolute top-1 right-1" onClick={() => setBlogStarter(false)}>
                    <X />
                </div>
                <form onSubmit={handleSubmit(createBlog)}>  
                    <Label htmlFor="title">Title</Label>
                    <Input {...register("title")} type="text" id="title" placeholder="Blog title" name="title" value={blog.title} onChange={handleChange} />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                    <Label htmlFor="slug">Slug</Label>
                    <Input {...register("slug")} type="text" id="slug" placeholder="Slug" name="slug" value={blog.slug} disabled />

                    <Button type="submit" className="my-2">Create</Button>
                </form>
            </div>
        </div>
    )
}

export default NewBlogStarter;