import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req:Request) => {
    try {
        const body = await req.json();
        let tags;
        if (body.tag !== undefined) {
            tags = body.tag.length ? body.tag.map((tag: any) => { return { name: tag.name } }) : null;
        }

        const blog = await prisma.blog.findUnique({
            where: {
                slug: body.slug
            }
        })

        const data = {
            slug: body.slug,
            userId: body.userId,
            description: body.editorState ? body.editorState : ""
        }

        let blogData;
        if (!!blog) {
            blogData = await prisma.blog.update({
                where: { slug: data.slug },
                data: {
                    description: data.description
                }
            })
        }
        else {
            blogData = tags!==null ? await prisma.blog.create({
                data: {
                    ...data,
                    title: body.title,
                    tags: {
                        create: tags
                    }
                }
            }) : 
                await prisma.blog.create({
                    data: {
                        ...data,
                        title: body.title
                    }
                })
                
        }

        return NextResponse.json({ data: blogData, message: "successfully reached", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error, status: 500 });
    }
}