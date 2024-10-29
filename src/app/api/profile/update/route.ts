import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        
        const user = await prisma.user.findUnique({
            where: {
                id: body.userId
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User Does Not Exist", status: 404 });
        }

        await prisma.user.update({
            where: {
              id: body.userId  
            },
            data: {
                name: body.name,
                image: body.image
            }
        })
        return NextResponse.json({ message: "Updated Successfully", status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Internal server error", status: 500 });
    }
}