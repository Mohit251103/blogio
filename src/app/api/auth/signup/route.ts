import { prisma } from "@/prisma";
import bcrypt from "bcrypt";

export const POST = async (req:Request) => {
    try {
        const body = await req.json();
        const emailExist = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })

        if (!!emailExist) {
            return Response.json({ message: "User with given email already exist", status: 409 });
        }
        
        const hashedPassword = await bcrypt.hash(body.password, 10);
        await prisma.user.create(
            {...body, password:hashedPassword}
        )
        
        return Response.json({ message: "User created successfully", status: 200 });
    } catch (error) {
        return Response.json({ message: "Internal server error", status: 500 });
    }
}