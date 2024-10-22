"use client";
import React, { createContext, useState } from "react";

interface blog {
    id: string,
    userId: string,
    title: string,
    slug: string
    author: any
}

interface IDraft {
    id: string,
    title: string,
    slug: string
}

interface BlogContextType {
    blogs: blog[],

    setBlogs: React.Dispatch<React.SetStateAction<any[]>>,

    drafts: IDraft[],
    setDrafts: React.Dispatch<React.SetStateAction<IDraft[]>>
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => { },
    drafts: [],
    setDrafts: () => { }
});

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogs] = useState<blog[]>([])
    const [drafts, setDrafts] = useState<IDraft[]>([])
    return (
        <BlogContext.Provider value={{blogs, setBlogs, drafts, setDrafts}}>
            {children}
        </BlogContext.Provider>
    )
}

export { BlogContext, BlogProvider };