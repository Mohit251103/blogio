"use client";
import React, { createContext, useState } from "react";

interface blog {
    id: string,
    userId: string,
    title: string,
    slug: string
    author: any
}

interface BlogContextType {
    blogs: blog[],

    setBlogs: React.Dispatch<React.SetStateAction<any[]>>
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => { }
});

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogs] = useState<any[]>([])
    return (
        <BlogContext.Provider value={{blogs, setBlogs}}>
            {children}
        </BlogContext.Provider>
    )
}

export { BlogContext, BlogProvider };