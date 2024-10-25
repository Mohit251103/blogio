"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const handleDelete = async (formData:FormData) => {
    "use server";
    console.log(formData.get('slug'));
    try {
        await prisma.blog.delete({
            where: { slug: formData.get('slug') as string }
        })
        console.log("reached");
        revalidatePath('/draft/page');
    } catch (error) {
        console.log(error);
    }
}

export const handleServerRedirect = async (route: string) => {
    "use server";
    redirect(route);
}

export const publishBlog = async (slug:string) => {
    try {
        if (slug === "") {
            console.log("slug:", slug);
            throw new Error("Slug is not provided");
        }
        await prisma.blog.update({
            where: { slug: slug },
            data: {
                isPublished: true
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const getDrafts = async () => {
    "use server";
    const session = await auth();
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                userId: session?.user?.id,
                isPublished: false
            }
        })
        return blogs;
    } catch (error) {
        console.log(error);
    }
}

export const getPublished = async () => {
    "use server";
    const session = await auth();
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                userId: session?.user?.id,
                isPublished: true
            }
        })
        return blogs;
    } catch (error) {
        console.log(error);
    }
}

export const getTags = async (name: string) => {
    "use server";
    try {
        const tags = await prisma.tag.findMany({
            where: {
                name: {
                    contains: name
                }
            }
        })
        return tags;
    } catch (error) {
        console.log(error);
    }
}