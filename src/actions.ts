"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export const handleDelete = async (slug:string) => {
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

export const handleServerRedirect = async (route: string) => {
    "use server";
    console.log(route);
    redirect(route);
}