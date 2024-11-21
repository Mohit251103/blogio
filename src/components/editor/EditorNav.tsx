import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "@/context/editor-context";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { isPublished, publishBlog, unpublishBlog } from "@/actions";
import { toast } from "@/hooks/use-toast";

const EditorNav = ({ slug }: { slug: string | null }) => {
    const user = useSession().data?.user;
    const { drafting } = useContext(EditorContext);
    const router = useRouter();
    const [processing, setProcessing] = useState(false);
    const [published, setPublished] = useState<boolean>(false);

    const handlePublish = async () => {
        setProcessing(true);
        try {
            await publishBlog(slug ?? "");
            toast({
                title: "Published successfully"
            })
        } catch (error) {
            toast({
                title: "Some problem occured"
            })
            console.log(error);
        }
        finally {
            setProcessing(false);
            setPublished(true);
        }
    }

    const handleUnPublish = async () => {
        setProcessing(true);
        try {
            await unpublishBlog(slug!);
            toast({
                title: "Unpublished!!"
            })
        } catch (error) {
            toast({
                title: "Some problem occured"
            })
            console.log(error);
        }
        finally {
            setProcessing(false);
            setPublished(false);
        }
    }

    useEffect(() => {
        const check = async () => {
            const res = await isPublished(slug!);
            setPublished(res!);
        }
        check();
    }, [])

    return (
        <div className="w-full flex items-center justify-between mb-5 p-1 h-fit">
            <div className="flex items-center justify-center max-sm:hidden  ">
                <Image src={user?.image as string} alt="profile" width={30} height={30} className="rounded-full aspect-square mr-2" />
                <p className="text-sm font-bold text-foreground">{user?.name}</p>
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

                {!published &&
                    <>
                        <Button variant={"outline"} onClick={() => router.push(`/editor/preview/${slug}`)}>Preview</Button>
                        <Button onClick={handlePublish} disabled={processing}>{processing ? 'Publishing...' : 'Publish'}</Button>
                    </>
                }

                {published && <Button onClick={handleUnPublish} disabled={processing}>{processing ? 'Unpublishing...' : 'Unpublish'}</Button>}

            </div>
        </div>
    )
}

export default EditorNav;