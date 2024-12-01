"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { pusher } from "./lib/pusher";

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

export const getSearchedResults = async (query: string, type: string, id?: string) => {
    "use server";
    try {
        if (type === "tags") {
            return await getTags(query);
        }
        if (type === "blogs") {
            const blogs = await prisma.blog.findMany({
                where: {
                    isPublished: true,
                    OR: [
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
                                mode: "insensitive"
                            }
                        }
                    ]
                },
                include: {
                    author: true,
                    Like: true
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

            const res = await checkSubscription(id!, author.map((a) => a.id));
            return res;
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
            _count: {
                name: true
            },
            orderBy: {
                _count: {
                    name: 'desc'
                }
            },
            take: 10
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
            select: {
                id: true,
                name: true,
                image: true,
                description: true,
                _count: {
                  select: { subscribers: true}
              }
            },
            orderBy: {
                subscribers: {
                    _count: 'desc'
                }
            },
            take: 10
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

export const unsubscribeUser = async (subscriber: string, author: string) => {
    try {
        await prisma.subscriber.delete({
            where: {
                userId_subscriberId: {
                    userId: author,
                    subscriberId: subscriber
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const checkSubscription = async (subscriber: string, authors: string[]) => {
    try {
        const subscription = await prisma.subscriber.findMany({
            where: {
                subscriberId: subscriber,
                userId: {
                    in: authors
                }
            }
        })
        const subscribed_users = subscription.map((user) => user.userId);
        const res = await prisma.user.findMany({
            where: {
                id: {
                    in: subscribed_users
                },
            },
            select: {
                id: true,
                name: true,
                image: true,
                description: true
            }
        })
        return res
    } catch (error) {
        console.log(error);
    }
}

export const getLikes = async (slug: string) => {
    try {
        const likes = await prisma.blog.findUnique({
            where: {
                slug: slug
            },
            include: {
                Like: true
            }
        })
        return likes?.Like.length;
    } catch (error) {
        console.log(error);
    }
}

export const likeBlog = async (slug: string, user: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        });
        await prisma.like.create({
            data: {
                blogId: blog!.id,
                userId: user
            }
        })
        pusher.trigger("blog_io", "like_blog", slug);
    } catch (error) {
        console.log(error)
    }
}

export const dislikeBlog = async (slug: string, user: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        });
        await prisma.like.delete({
            where: {
                userId_blogId: { userId: user, blogId: blog?.id as string }
            }
        })
        pusher.trigger("blog_io", "dislike_blog", slug);
    } catch (error) {
        console.log(error)
    }
}

export const saveBlogs = async (slug: string, userId: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                saved: {
                    connect: {
                        id: blog?.id
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const unsaveBlogs = async (slug: string, userId: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                saved: {
                    disconnect: {
                        id: blog?.id
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const isLikedByUser = async (slug: string, user: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })
        const like = await prisma.like.findUnique({
            where: {
                userId_blogId: { userId: user, blogId: blog?.id as string }
            }
        })

        if (like) return true
        return false
    } catch (error) {
        console.log(error)
    }
}

export const isSavedByUser = async (slug: string, user: string) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })
        const isSaved = await prisma.user.count({
            where: {
                id: user,
                saved: {
                    some: {
                        id: blog?.id
                    }
                }
            },
        })

        return isSaved > 0;
    } catch (error) {
        console.log(error)
    }
}

export const getBookmarkedBlogs = async (userId: string) => {
    try {
        const blogs = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                saved: {
                    include: {
                        author: true,
                        Like: true
                    }
                }
            }
        })

        return blogs[0].saved;
    } catch (error) {
        console.log(error);
    }
}

export const getUserDetails = async (userId: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                subscribers: true
            }
        })
        return user
    } catch (error) {
        console.log(error);
    }
}

export const getSubscribers = async (subscriber : any) => {
    try {
        const arr = subscriber.map((s:any)=>{ return s.subscriberId })
        const subscribers = await prisma.user.findMany({
            where: {
                id: {
                    in: arr
                }
            }
        })

        return subscribers
    } catch (error) {
        console.log(error)
    }
}

export const getBlogsOfUser = async (userId: string) => {
    try {
        const res = await prisma.blog.findMany({
            where: {
                userId: userId
            },
            include: {
                Like: true
            }
        })

        return res;
    } catch (error) {
        console.log(error)
    }
}

export const isPublished = async (slug: string) => {
    try {
        const res = await prisma.blog.findUnique({
            where: {
                slug: slug
            }
        })

        return res?.isPublished;
    } catch (error) {
        console.log(error);
    }
}

export const unpublishBlog = async (slug: string) => {
    try {
        await prisma.blog.update({
            where: {
                slug: slug
            },
            data: {
                isPublished: false
            }
        })
    } catch (error) {
        console.log(error);
    }
}