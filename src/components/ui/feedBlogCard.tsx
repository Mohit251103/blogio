import { BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Image from "next/image"; 
import { handleServerRedirect } from "@/actions";
import { Button } from "./button";

const NormalRouteButton = (
    { children, slug }: { children: React.ReactNode, slug: string }
) => {
    const handleSubmit = handleServerRedirect.bind(null, `/preview/${slug}`)
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
        <Card className="w-fit flex lg:max-w-[40vw] max-w-[80vw]">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    <CardDescription className="flex items-center">
                        <p className="lg:text-sm text-xs text-secondary-foreground italic">by</p>
                        <Image src={author.profile} alt="Author Profile" width={25} height={25} className="rounded-full mx-1"/>
                        <p className="lg:text-sm text-xs text-secondary-foreground">{author.name}</p>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start">
                    <NormalRouteButton slug={slug}><BookOpen className="mr-1 w-4 h-4" />Open</NormalRouteButton>
                </CardFooter>
            </div>
            {/* <CardContent className="my-auto mx-auto min-w-[100px]">
                <Image src="/profile.png" alt="Card Image" width={100} height={100} />
            </CardContent> */}
        </Card>
    )
}

export default FeedBlogCard;