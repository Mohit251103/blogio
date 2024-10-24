"use client";
import React, { createContext, SetStateAction, useState } from "react";

interface blog {
    id: string,
    userId: string,
    title: string,
    slug: string
    author: any
}

interface IDraftPublished {
    id: string,
    title: string,
    slug: string
}

interface BlogContextType {
    blogs: blog[],

    setBlogs: React.Dispatch<React.SetStateAction<any[]>>,

    drafts: IDraftPublished[],
    setDrafts: React.Dispatch<React.SetStateAction<IDraftPublished[]>>

    published: IDraftPublished[],
    setPublished: React.Dispatch<React.SetStateAction<IDraftPublished[]>>
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => { },
    drafts: [],
    setDrafts: () => { },
    published: [],
    setPublished: () => { }
});

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogs] = useState<blog[]>([])
    const [drafts, setDrafts] = useState<IDraftPublished[]>([])
    const [published, setPublished] = useState<IDraftPublished[]>([])
    return (
        <BlogContext.Provider value={{blogs, setBlogs, drafts, setDrafts, published, setPublished}}>
            {children}
        </BlogContext.Provider>
    )
}

export { BlogContext, BlogProvider };