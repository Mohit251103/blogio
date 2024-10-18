import { prisma } from "@/prisma";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest) => {
    try {
        const slug = req.nextUrl.searchParams.get('slug');
        const blog = await prisma.blog.findUnique({
            where: {slug : slug as string}
        })

        // console.log(blog);

        if (!blog) {
            return NextResponse.json({ message: "Blog not found", status: 404 });
        }
        else {
            return NextResponse.json({ data: blog.description, message: "Blog found", status: 200 });
        }
    } catch (error) {
        // console.log(error);
        return Response.json({ message: error, status: 500 });
    }
}