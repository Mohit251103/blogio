import Image from "next/image";
import { Button } from "../ui/button";

const EditorNav = ({ user }: {
    user: {
        name: string | null | undefined ,
        email: string | null | undefined ,
        image: string | null | undefined
    }
 }) => {
    return (
        <div className="w-full flex items-center justify-between mb-5 p-1 h-fit">
            <div className="flex flex-col items-start justify-center">
                <Image src={user.image as string} alt="profile" width={40} height={40} className="rounded-full"/>
                <p className="text-sm text-foreground">{user.email}</p>
            </div>
            <div className="flex items-center">
                <Button variant={"outline"}>Preview</Button>
                <Button>Publish</Button>
            </div>
        </div>
    )
}

export default EditorNav;