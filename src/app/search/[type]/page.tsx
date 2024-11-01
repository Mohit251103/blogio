"use client";
import { getSearchedResults } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FeedBlogCard from "@/components/ui/feedBlogCard";
import { ModeToggle } from "@/components/ui/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const IForm = z.object({
    query: z.string().optional()
});

type ITag = { name: string; id: string; }[];
type IBlog = {
    id: string;
    userId: string;
    title: string;
    slug: string;
    description: string;
    isPublished: boolean;
    author: {
        id: string,
        name: string,
        image: string
    }
}[];
type IAuthor = {
    id: string,
    name: string,
    description: string,
    image: string,
    subscribers: []
}[];

const SearchPage = () => {
    const [query, setQuery] = useState<string>("");
    const [tags, setTags] = useState<ITag>([]);
    const [blogs, setBlogs] = useState<IBlog>([]);
    const [authors, setAuthors] = useState<IAuthor>([]);
    const { type }: { type: string } = useParams();

    const { handleSubmit, register } = useForm<z.infer<typeof IForm>>({
        resolver: zodResolver(IForm)
    })

    const handleSearch = async () => {
        try {
            const res = await getSearchedResults(query, type.toLowerCase());
            console.log(res);
            const ltype = type.toLowerCase();
            if (ltype === "tags") {
                setTags(res as ITag);
            }
            else if (ltype === "blogs") {
                setBlogs(res as IBlog);
            }
            else {
                setAuthors(res as IAuthor);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="absolute top-5 right-5">
                <ModeToggle />
            </div>
            {/* nav */}
            <h1 className="text-3xl font-extrabold mt-12">Search <span>{type.toUpperCase()}</span></h1>
            {/* search bar */}
            <form onSubmit={handleSubmit(handleSearch)} className="my-12">
                <div className="rounded-2xl flex justify-center items-center h-fit w-fit pr-2 md:w-[50vw] w-[75vw] border">
                    <input type="text" className="bg-none px-4 text-xl font-md rounded-l-2xl w-[90%] p-2 mr-2 focus:outline outline-zinc-300 bg-secondary" {...register('query')} id="query" onChange={(e) => setQuery(e.target.value)} />
                    <button type="submit" className="px-1 grow h-full flex justify-center">
                        <Search />
                    </button>
                </div>
            </form>
            {/* content */}
            <div className="grow max-sm:max-w-[95vw] max-w-[70vw]">
                {tags && <div className=""></div>}
                {blogs && <div className="grow flex flex-wrap gap-2 px-2">
                    {blogs.map((blog) => {
                        return <div className="">
                            <FeedBlogCard title={blog.title} slug={blog.slug} author={{ id: blog.author.id, name: blog.author.name as string, profile: blog.author.image as string }} />
                        </div>
                    })}
                </div>}
                {authors && <div className="grow flex flex-wrap gap-2 px-2">
                    {authors.map((a, index)=>{
                        return <Card key={index} className="hover:cursor-pointer" onClick={()=>{}}>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold flex justify-start items-center">
                                    <Image src={a.image} alt="Author Profile" width={50} height={50} className="rounded-full mx-1 aspect-square mr-2" />
                                    <p className="text-xl">{a.name}</p>
                                </CardTitle>
                                <CardDescription className="flex items-center">
                                    {a.description ? <p className="lg:text-sm text-sm text-secondary-foreground">{a.description}</p> : <p className="lg:text-sm text-sm text-secondary-foreground">...</p>}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-start">
                                <Button className="text-xs w-fit h-fit">Subscribe</Button>
                            </CardFooter>
                        </Card>
                    })}
                </div>}
            </div>
        </div>
    )
}

export default SearchPage