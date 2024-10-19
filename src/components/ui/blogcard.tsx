import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { BookOpen, Trash2 } from "lucide-react";
import { auth } from "@/auth";
import { Description } from "@radix-ui/react-toast";
import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

const NormalRouteButton = (
    {children, slug}:{children:React.ReactNode, slug:string}
) => {
    const handleSubmit = async () => {
        "use server";
        redirect(`/editor/new?slug=${slug}`);
    }
    return (
        <form action={handleSubmit}>
            <Button variant="default" type="submit">
                {children}
            </Button>
        </form>
    )
}

const DeleteButton = (
    { children, slug }: { children: React.ReactNode, slug: string }
) => {
    const handleDelete = async () => {
        "use server";
        try {
            await prisma.blog.delete({
                where: { slug: slug }
            })
            revalidatePath('/draft');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <form action={handleDelete}>
            <Button type="submit">
                {children}
            </Button>
        </form>
    )
}

const BlogCard = async ({ slug, title, description }: { slug: string, title: string, description: string }) => {
    const session = await auth();
    return (

        <Card className="w-fit flex">
            <div>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription dangerouslySetInnerHTML={{ __html: description.split(">")[0] + "<span>...</span>" }}></CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start ">
                    <NormalRouteButton slug={slug}><BookOpen className="mr-1 w-4 h-4" />Open</NormalRouteButton>
                    <DeleteButton slug={slug} ><Trash2 className="mr-1 w-4 h-4" />Delete</DeleteButton>
                </CardFooter>
            </div>
            <CardContent className="my-auto mx-auto">
                <Image src="/profile.png" alt="Card Image" width={100} height={100} />
            </CardContent>
        </Card>
    )
}

export default BlogCard;