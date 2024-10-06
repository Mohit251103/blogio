import { auth } from "@/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import { Button } from "../ui/button";
import { BookCheck, BookOpen } from "lucide-react";


const ContentArea = async () => {
    const session = await auth();
    return (
        <div className="w-full flex flex-wrap mx-auto gap-4">
            <Card className="w-fit flex">
                <div>
                    <CardHeader>
                        <CardTitle>Welcome, {session?.user?.name}</CardTitle>
                        <CardDescription>Instructions for using this app !!!</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-start">
                        <Button variant="default"><BookOpen className="mr-1" />Read</Button>
                        <Button variant="outline"><BookCheck className="mr-1"/>Done</Button>
                    </CardFooter>
                </div>
                <CardContent className="my-auto mx-auto">
                    <Image src="/profile.png" alt="Card Image" width={100} height={100}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default ContentArea;