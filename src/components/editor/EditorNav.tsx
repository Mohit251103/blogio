import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { EditorContext } from "@/context/editor-context";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const EditorNav = () => {
    const user = useSession().data?.user;
    const { drafting, blogData } = useContext(EditorContext);
    console.log(blogData);
    const router = useRouter();

    if (!blogData) {
        return null;
    }

    return (
        <div className="w-full flex items-center justify-between mb-5 p-1 h-fit">
            <div className="flex flex-col items-start justify-center">
                <Image src={user?.image as string} alt="profile" width={40} height={40} className="rounded-full"/>
                <p className="text-sm text-foreground max-sm:hidden">{user?.email}</p>
            </div>
            <div className="flex items-center">
                {drafting && <div className="text-sm text-secondary-foreground flex items-center mr-3">
                    <span><LoaderCircle className="mr-2 h-4 w-4 animate-spin" />{" "}</span>
                    <p>Drafting</p>
                </div>}
                {!drafting && <div className="text-sm text-secondary-foreground flex items-center mr-3">
                    <span><Check className="mr-2 h-4 w-4" />{" "}</span>
                    <p>Drafted</p>
                </div>}
                <ModeToggle />
                <Button variant={"outline"} onClick={()=> router.push(`/editor/preview/${blogData.slug}`)}>Preview</Button>
                <Button>Publish</Button>
            </div>
        </div>
    )
}

export default EditorNav;