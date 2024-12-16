"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../../globals.css"
import Summary from "./Summary";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { LoaderCircle, X } from "lucide-react";

type IContent = {
    title: "",
    description: "",
    text_description: "",
    author: {
        description: string | null
        image: string | null
        name: string | null
        id: string
        email: string
        emailVerified: Date | null
        createdAt: Date
        updatedAt: Date
    }
}

const Preview = () => {
    const { slug } = useParams();
    const [content, setContent] = useState<IContent | null>();
    const [summary, setSummary] = useState<string>("");
    const [generating, setGenerating] = useState<boolean>(false);
    const [showSummary, setShowSummary] = useState<boolean>(false);
    const router = useRouter()
    const getBlog = async () => {
        try {
            const res = await axiosInstance.get(`/api/blog/get/?slug=${slug}`)
            setContent({ ...res.data.data });
        } catch (error) {
            console.log(error);
        }
    }

    const handleGenerateSummary = async () => {
        setGenerating(true)
        setShowSummary(true)
        try {
            const res = await axiosInstance.post(`http://localhost:8000/summarize?text=${content?.text_description}&max_length=250&min_length=150`);
            console.log(res)
            setSummary(res.data.summary)
        } catch (error) {
            console.log(error)
        } finally {
            setGenerating(false);
        }
    }

    useEffect(() => {
        if (!slug) return;
        getBlog();
    }, [slug])

    if (!content) return null;
    // console.log(content.description)

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between items-center w-[80%] mx-4 p-4">
                <div className="flex items-center justify-center max-sm:hidden hover:cursor-pointer" onClick={() => {
                    router.push(`/public_profile/${content.author.id}`)
                }}>
                    <Image src={content.author?.image as string} alt="profile" width={30} height={30} className="rounded-full aspect-square mr-2" />
                    <p className="text-sm font-bold text-foreground">{content.author?.name}</p>
                </div>
                <Button onClick={handleGenerateSummary}>Summary</Button>
            </div>
            <div className="flex items-center justify-center w-full">
                <div className="flex-grow">
                    <p className="text-4xl font-extrabold text-center mt-4">{content.title}</p>
                    <div className="ProseMirror" dangerouslySetInnerHTML={{ __html: content.description }}></div>
                </div>
                <Summary className={`invisible opacity-0 h-[70vh] p-2 mx-4 overflow-y-auto sticky top-12 bottom-12 transition-all ease-in-out duration-300`} style={{
                    width: `${showSummary ? '35%' : '0vw'}`,
                    opacity: `${showSummary ? '100%' : '0%'}`,
                    visibility: `${showSummary ? 'visible' : 'hidden'}`,
                    flexShrink: 0
                }}>
                    {generating && <div className={`absolute top-0 left-0 bg-black bg-opacity-50 backdrop-blur-sm w-full h-full flex flex-col justify-center items-center`}>
                        <LoaderCircle className="animate-spin"></LoaderCircle>
                        <p className="text-sm mt-1">Generating Summary</p>
                    </div>}
                    <div className="w-full flex justify-between px-2">
                        <h3 className="text-xl font-bold">Summary</h3>
                        <button className="bg-none" onClick={() => {
                            setShowSummary(false);
                        }}><X /></button>
                    </div>
                    {!generating && <p className="text-sm font-semibold">
                        {summary}
                    </p>}
                </Summary>
            </div>
        </div >
    )
}

export default Preview;