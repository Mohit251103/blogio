import Image from "next/image";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { BookOpen, Trash2 } from "lucide-react";
import { auth } from "@/auth";
import { Description } from "@radix-ui/react-toast";

const BlogCard = async ({ slug, title, description }: { slug: string, title: string, description: string }) => {
    const session = await auth();
    return (

        <Card className="w-fit flex">
            <div>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription dangerouslySetInnerHTML={{ __html: description.split(">")[0] }}></CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start ">
                    <Button variant="default"><BookOpen className="mr-1 w-4 h-4" />Open</Button>
                    <Button variant="outline"><Trash2 className="mr-1 w-4 h-4" />Delete</Button>
                </CardFooter>
            </div>
            <CardContent className="my-auto mx-auto">
                <Image src="/profile.png" alt="Card Image" width={100} height={100} />
            </CardContent>
        </Card>
    )
}

export default BlogCard;