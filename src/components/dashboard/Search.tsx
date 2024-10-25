"use client";
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Search } from "lucide-react"
import { FormEvent, useContext, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { BlogContext } from "@/context/blog-context";
import { useSession } from "next-auth/react";

const SearchComponent = ({origin}:{origin:string}) => {
    const { data: session } = useSession();
    const [search, setSearch] = useState("");
    const { setBlogs, setDrafts, setPublished } = useContext(BlogContext);
    const searchSubmit = async (e:FormEvent) => {
        e.preventDefault();
        try {
            const encodedSearchQuery = encodeURI(search);
            const res = await axiosInstance.get(`/api/blog/get?q=${encodedSearchQuery}&type=searched&from=${origin}&user=${session?.user?.id}`);
            origin==="feed"?setBlogs(res.data.data): origin==="draft"?setDrafts(res.data.data): origin==="publish"? setPublished(res.data.data): undefined;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form onSubmit={searchSubmit}>
            <div className="flex items-center max-sm:mx-1 mx-2 border rounded-md max-sm:h-[30px] max-sm:w-[190px]">
                <Input placeholder="Search.." className="border-0 mr-1 rounded-e-none mx-0" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <Button className="rounded-s-none rounded-r-md mx-0 h-full max-sm:w-[50px]" type="submit" variant="outline" ><Search /></Button>
            </div>
        </form>

    )
}

export default SearchComponent;