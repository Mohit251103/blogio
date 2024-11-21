"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../globals.css"

const Preview = () => {
    const { slug } = useParams();
    const [content, setContent] = useState({
        title: "",
        description: ""
    });
    const getBlog = async () => {
        try {
            const res = await axiosInstance.get(`/api/blog/get/?slug=${slug}`)
            // console.log(res.data.data);
            setContent({...res.data.data});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!slug) return;
        getBlog();
    }, [slug])
    
    if (!content) return null;

    return (
        <div className="max-w-[70vw] min-w-[70vw] mx-auto">
            <p className="text-4xl font-extrabold text-center mt-4">{content.title}</p>
            <div className="ProseMirror" dangerouslySetInnerHTML={{__html:content.description}}></div>
        </div>
    )
}

export default Preview;