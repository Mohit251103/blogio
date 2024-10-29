"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const handleDelete = async (formData:FormData, origin: string) => {
    "use server";
    console.log(formData.get('slug'));
    try {
        await prisma.blog.delete({
            where: {
                slug: formData.get('slug') as string,
                isPublished: origin==="publish"
             }
        });
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

export const getDesc = async (userId:string) => {
    "use server";
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user?.description;
    } catch (error) {
        console.log(error);
    }
}

export const getAllTags = async () => {
    "use server";
    try {
        const tags = await prisma.tag.groupBy({
            by: 'name',
            orderBy: {
                _count: {
                    name: 'desc'
                }
            }
        });
        return tags;
    } catch (error) {
        console.log(error);
    }
}

export const getTopUsers = async () => {
    "use server";
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                subscribers: {
                    _count: 'desc'
                }
            }
        })
        console.log(users);
        return users;
    } catch (error) {
        console.log(error);
    }
}