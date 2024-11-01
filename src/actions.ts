"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export const handleDelete = async (formData: FormData, origin: string) => {
    "use server";
    try {
        await prisma.blog.delete({
            where: {
                slug: formData.get('slug') as string,
                isPublished: origin === "publish"
            },
            include: {
                tags: true
            }
        });
        await prisma.tag.deleteMany({
            where: {
                blogs: { none: {} }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const handleServerRedirect = async (route: string) => {
    "use server";
    redirect(route);
}

export const publishBlog = async (slug: string) => {
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
                    contains: name,
                    mode: 'insensitive'
                }
            }
        })
        return tags;
    } catch (error) {
        console.log(error);
    }
}

export const getSearchedResults = async (query: string, type: string) => {
    "use server";
    try {
        if (type === "tags") {
            return await getTags(query);
        }
        if (type === "blogs") {
            const blogs = await prisma.blog.findMany({
                where: {
                    OR: [
                        {
                            isPublished: true
                        },
                        {
                            title: {
                                contains: query,
                                mode: "insensitive"
                            },
                        },
                        {
                            description: {
                                contains: query,
                                mode: "insensitive"
                            }
                        },
                        {
                            slug: {
                                contains: query,
                                mode:"insensitive"
                            }
                        }
                    ]
                },
                include: {
                    author: true
                }
            })
            return blogs;
        }
        if (type === "author") {
            const author = await prisma.user.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: "insensitive"
                            }
                        },
                        {
                            description: {
                                contains: query,
                                mode: "insensitive"
                            }
                        }
                    ]
                },
                include: {
                    subscribers: true
                }
            })
            return author;
        }
    } catch (error) {
        console.log(error);
    }

}

export const getDesc = async (userId: string) => {
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
        return users;
    } catch (error) {
        console.log(error);
    }
}

export const getBlogWithTag = async (tag: string) => {
    "use server";
    try {
        const blogs = await prisma.tag.findMany({
            select: {
                blogs: {
                    where: {
                        isPublished: true
                    },
                    include: {
                        author: true
                    }
                }
            },
            where: {
                name: tag
            }
        })
        const res = blogs[0].blogs;
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const subscribeUsers = async (subscriber: string, author: string) => {
    try {
        await prisma.subscriber.create({
            data: {
                userId: author,
                subscriberId: subscriber
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const checkSubscription = async (subscriber: string, author: string) => {
    try {
        const subscription = await prisma.subscriber.findUnique({
            where: {
                userId_subscriberId: { userId: author, subscriberId: subscriber }
            }
        })
        if (subscription) return true;
        return false;
    } catch (error) {
        console.log(error);
    }
}