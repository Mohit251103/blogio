"use client"
import { getAllTags } from "@/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const TagNav = () => {
    const [tags, setTags] = useState<string[] | undefined>([]);
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const checkScroll = () => {
        const scrollWidth = scrollRef.current?.scrollWidth! - scrollRef.current?.clientWidth!;
        const scrollLeft = Math.ceil(scrollRef.current?.scrollLeft!);
        if (scrollLeft > 0) {
            scrollRef.current?.classList.add("h-grad-transparent-left");
        }
        else {
            scrollRef.current?.classList.remove("h-grad-transparent-left");
        }

        if (scrollWidth - scrollLeft > 0) {
            scrollRef.current?.classList.add("h-grad-transparent-right");
        }
        else {
            scrollRef.current?.classList.remove("h-grad-transparent-right");
        }
        console.log(scrollLeft, scrollWidth);
    }

    useEffect(() => {
        const getTag = async () => {
            const res = await getAllTags();
            const tags = res?.map((tag) => {
                return tag.name;
            })
            setTags(tags);
        }
        getTag();
    }, [])

    return (
        <div className="sm:flex items-center w-full">
            <Button variant="outline" className="ml-2 mr-4 max-sm:hidden" onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" className="ml-2 mr-4 sm:hidden mt-2 w-fit h-fit p-1" onClick={() => router.push("/dashboard")}><ChevronLeft className="w-2.5 h-2.5"/></Button>
            <div className="flex items-center my-4 grow">
                <div ref={scrollRef} onScroll={checkScroll} className="w-[75%] mx-auto overflow-x-auto flex items-center no-scrollbar select-none relative">
                    {tags?.map((tag, index) => {
                        return <button className="p-2 max-sm:text-xs text-sm rounded-xl bg-secondary text-secondary-foreground mx-2 h-fit" key={index} onClick={() => {
                            router.push(`/tag/${tag}`)
                        }}>{tag}</button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default TagNav;