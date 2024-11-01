import { BookOpen } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Image from "next/image"; 
import { handleServerRedirect } from "@/actions";
import { Button } from "./button";

const NormalRouteButton = (
    { children, slug }: { children: React.ReactNode, slug: string }
) => {
    const handleSubmit = handleServerRedirect.bind(null, `/editor/preview/${slug}`)
    return (
        <form action={handleSubmit}>
            <Button variant="default" type="submit">
                {children}
            </Button>
        </form>
    )
}

const FeedBlogCard = ({ title, slug, author }: {
    title: string, 
    slug: string, 
    author: {
        id: string,
        name: string,
        profile: string
    }
}) => {
    return (
        <Card className="flex w-full h-fit">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    <CardDescription className="flex items-center">
                        <p className="lg:text-sm text-xs text-secondary-foreground italic">by</p>
                        <Image src={author.profile} alt="Author Profile" width={25} height={25} className="rounded-full mx-1 aspect-square"/>
                        <p className="lg:text-sm text-xs text-secondary-foreground">{author.name}</p>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start">
                    <NormalRouteButton slug={slug}><BookOpen className="mr-1 w-4 h-4" />Open</NormalRouteButton>
                </CardFooter>
            </div>
        </Card>
    )
}

export default FeedBlogCard;