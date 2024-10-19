import { auth } from "@/auth";
import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import BlogCard from "@/components/ui/blogcard";
import { prisma } from "@/prisma";
// import { useEffect } from "react";

const Draft = async () => {
    // console.log("draft")
    const session = await auth();
    // console.log(session);
    let blogs:any[] | undefined = [];

    const getDrafts = async () => {
        "use server";
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

    blogs = await getDrafts();

    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <Nav />
            <div className="flex h-full w-full grow">
                <SideNav />
                <div className="grow py-2 px-2">
                    <div className="w-full flex flex-wrap mx-auto gap-4">
                        {blogs?.map((blog) => {
                            return <BlogCard key={blog.slug} slug={blog.slug} title={blog.title} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Draft;