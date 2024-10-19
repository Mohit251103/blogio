import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const type = req.nextUrl.searchParams.get('type');
        if (!type) {
            const slug = req.nextUrl.searchParams.get('slug');

            const blog = await prisma.blog.findUnique({
                where: { slug: slug as string }
            })

            // console.log(blog);

            if (!blog) {
                return NextResponse.json({ message: "Blog not found", status: 404 });
            }
            else {
                return NextResponse.json({ data: { title: blog.title, description: blog.description }, message: "Blog found", status: 200 });
            }
        }

        if (type === "searched") {
            const q = req.nextUrl.searchParams.get('q');

            if (typeof q !== "string") {
                throw new Error("Invalid request");
            }

            const blogs = await prisma.blog.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: q,
                                mode: "insensitive"
                            },
                        },
                        {
                            description: {
                                contains: q,
                                mode: "insensitive"
                            }
                        },
                        {
                            author: {
                                name: {
                                    contains: q,
                                    mode: "insensitive"
                                }
                            }
                        }
                    ]
                },
                include: {
                    author: true
                }
            })
            return Response.json({ data: blogs, message: "Blogs fetched", status: 200 });
        }
    } catch (error) {
        // console.log(error);
        return Response.json({ message: error, status: 500 });
    }
}