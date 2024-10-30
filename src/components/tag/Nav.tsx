"use client"
import { getAllTags } from "@/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Nav = () => {
    const [tags, setTags] = useState<string[] | undefined>([]);
    const router = useRouter()
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
        <div className="flex flex-row overflow-x-auto my-4">
            {tags?.map((tag, index) => {
                return <button className="p-2 text-sm rounded-xl bg-secondary text-secondary-foreground mx-2" key={index} onClick={() => {
                    router.push(`/tag/${tag}`)
                }}>{tag}</button>
            })}
        </div>
    )
}

export default Nav;