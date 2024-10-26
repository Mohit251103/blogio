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
    setPublished: React.Dispatch<React.SetStateAction<IDraftPublished[]>>,

    isDraftChange: boolean,
    setIsDraftChange: React.Dispatch<React.SetStateAction<boolean>>,
    isPublishedChange: boolean,
    setIsPublishedChange: React.Dispatch<React.SetStateAction<boolean>>
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => { },
    drafts: [],
    setDrafts: () => { },
    published: [],
    setPublished: () => { },
    isDraftChange: false,
    setIsDraftChange: ()=>{},
    isPublishedChange: false,
    setIsPublishedChange: () => { }
});

const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogs] = useState<blog[]>([])
    const [drafts, setDrafts] = useState<IDraftPublished[]>([])
    const [published, setPublished] = useState<IDraftPublished[]>([])
    const [isDraftChange, setIsDraftChange] = useState<boolean>(false);
    const [isPublishedChange, setIsPublishedChange] = useState<boolean>(false);
    const [deleting, setDeleting] = useState<boolean>(false);
    return (
        <BlogContext.Provider value={{ blogs, setBlogs, drafts, setDrafts, published, setPublished, isDraftChange, setIsDraftChange, isPublishedChange, setIsPublishedChange }}>
            {children}
        </BlogContext.Provider>
    )
}

export { BlogContext, BlogProvider };