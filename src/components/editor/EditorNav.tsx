import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { EditorContext } from "@/context/editor-context";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { publishBlog } from "@/actions";
import { toast } from "@/hooks/use-toast";

const EditorNav = ({slug}:{slug:string|null}) => {
    const user = useSession().data?.user;
    const { drafting } = useContext(EditorContext);
    const router = useRouter();
    const [publishing, setPublishing] = useState(false);

    const handlePublish = async () => {
        setPublishing(true);
        try {
            await publishBlog(slug?? "");
            toast({
                title:"Published successfully"
            })
        } catch (error) {
            toast({
                title: "Some problem occured"
            })
            console.log(error);
        }
        finally {
            setPublishing(false);
        }
    }

    return (
        <div className="w-full flex items-center justify-between mb-5 p-1 h-fit">
            <div className="flex flex-col items-start justify-center max-sm:hidden  ">
                <Image src={user?.image as string} alt="profile" width={40} height={40} className="rounded-full"/>
                <p className="text-sm text-foreground">{user?.email}</p>
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
                <Button variant={"outline"} onClick={() => router.push(`/editor/preview/${slug}`)}>Preview</Button>
                {/* <form action={handlePublish}> */}
                <Button onClick={handlePublish} disabled={publishing}>{publishing?'Publishing...':'Publish'}</Button>
                {/* </form> */}
            </div>
        </div>
    )
}

export default EditorNav;