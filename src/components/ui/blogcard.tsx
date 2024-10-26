import { Button } from "./button";
import { Card, CardFooter, CardHeader, CardTitle } from "./card";
import { BookOpen, Trash2 } from "lucide-react";
import React, { FormEvent, SetStateAction, useContext, useState } from "react";
import { handleDelete, handleServerRedirect } from "@/actions";
import { BlogContext } from "@/context/blog-context";

const NormalRouteButton = (
    {children, slug}:{children:React.ReactNode, slug:string}
) => {
    const handleSubmit = handleServerRedirect.bind(null,`/editor/new?slug=${slug}`)
    return (
        <form action={handleSubmit}>
            <Button variant="default" type="submit">
                {children}
            </Button>
        </form>
    )
}

const DeleteButton = (
    { children, slug, origin, state }: {
        children: React.ReactNode, slug: string, origin: string, state: {
            deleting: boolean,
            setDeleting: React.Dispatch<SetStateAction<boolean>>
    } }
) => {
    const { setIsDraftChange, setIsPublishedChange } = useContext(BlogContext);
    const handleDeleteClient = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        state.setDeleting(true);
        await handleDelete(new FormData(e.currentTarget), origin);
        origin==="draft"?setIsDraftChange(true) : setIsPublishedChange(true);
        state.setDeleting(false);
    }
    return (
        <form onSubmit={handleDeleteClient}>
            <input type="hidden" name="slug" value={slug} />
            <Button type="submit" disabled={state.deleting}>
                {children}
            </Button>
        </form>
    )
}

const BlogCard = ({ key, slug, title, origin }: { key:number ,slug: string, title: string, origin:string }) => {
    const [ deleting, setDeleting ] = useState<boolean>(false);
    return (

        <Card className="flex w-2/5 max-lg:w-4/5">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-start">
                    <NormalRouteButton slug={slug}><BookOpen className="mr-1 w-4 h-4" />Open</NormalRouteButton>
                    <DeleteButton key={key} slug={slug} origin={origin} state={{deleting, setDeleting}}><Trash2 className="mr-1 w-4 h-4" />{deleting? "Deleting..." : "Delete"}</DeleteButton>
                </CardFooter>
            </div>
            {/* <CardContent className="my-auto mx-auto min-w-[100px]">
                <Image src="/profile.png" alt="Card Image" width={100} height={100} />
            </CardContent> */}
        </Card>
    )
}

export { NormalRouteButton };
export default BlogCard;