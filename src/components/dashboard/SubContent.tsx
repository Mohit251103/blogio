import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const SubContent: React.FC = () => {
    const tags = ["dsa", "web development", "literature", "history", "entertainment", "sports"];
    const users = [
        {
            id: "cm1lop1lx000010nmn3mr4lau",
            name: "Mohit Negi",
            image: "https://lh3.googleusercontent.com/a/ACg8ocK8z891ZN2DLRYFE9KtJEV9YRgrZLUo-1KgtSA5-yLZD49h1rDU=s96-c",
            desc: "I am a web developer who is growing everyday by learning new stuff"
        },
        {
            id: "cm1lop1lx000010nmn3mr4lau",
            name: "Mohit Negi",
            image: "https://lh3.googleusercontent.com/a/ACg8ocK8z891ZN2DLRYFE9KtJEV9YRgrZLUo-1KgtSA5-yLZD49h1rDU=s96-c",
            desc: "I am a web developer who is growing everyday by learning new stuff"
        },
        {
            id: "cm1lop1lx000010nmn3mr4lau",
            name: "Mohit Negi",
            image: "https://lh3.googleusercontent.com/a/ACg8ocK8z891ZN2DLRYFE9KtJEV9YRgrZLUo-1KgtSA5-yLZD49h1rDU=s96-c",
            desc: "I am a web developer who is growing everyday by learning new stuff"
        },
        {
            id: "cm1lop1lx000010nmn3mr4lau",
            name: "Mohit Negi",
            image: "https://lh3.googleusercontent.com/a/ACg8ocK8z891ZN2DLRYFE9KtJEV9YRgrZLUo-1KgtSA5-yLZD49h1rDU=s96-c",
            desc: "I am a web developer who is growing everyday by learning new stuff"
        }
    ]
    return (
        <div className="grow flex flex-col max-md:hidden">
            <div className="flex flex-col justify-center items-center w-full ms-3">
                {/* tag area */}
                <div className="flex flex-col p-2 items-start w-full">
                    <p className="font-extrabold text-lg my-3">Topics for you</p>
                    <div className="flex flex-wrap w-4/5 gap-2">
                        {tags.map((tag, index) => {
                            return <button className="rounded-md p-1 text-sm text-secondary-foreground bg-secondary" key={index}>
                                {tag}
                            </button>
                        })}
                        <button className="text-blue-500 text-sm ms-3 mt-3">See more topics</button>
                    </div>
                </div>
                {/* trending accounts */}
                <div className="flex flex-col p-2 items-start w-full ms-3">
                    <p className="font-extrabold text-lg my-3">People to follow</p>
                    <div className="flex flex-wrap gap-2">
                        {users.filter((user, index) => index < 5).map((user, index) => {
                            return <div key={index} className="h-fit p-2 rounded-md bg-secondary text-secondary-foreground">
                                <button className="flex">
                                    <Image src={user.image} width={25} height={25} alt="profile" className="mr-2 rounded-full" />
                                    <p className="text-sm font-bold">{user.name}</p>
                                </button>
                                <p className="text-muted-foreground text-sm my-1">{user.desc.substring(0, 30) + (user.desc.length > 30 ? "..." : "")}</p>
                                <Button className="text-xs p-2 h-fit">Subscribe</Button>
                            </div>
                        })}
                    </div>
                    <button className="text-blue-500 text-sm ms-3 mt-3">See more to follow</button>
                </div>
                <div className="w-[95%] bg-secondary h-[0.5px]"></div>
            </div>
            {/* footer */}
            <div className="flex flex-col items-center justify-center grow">
                <p className="text-sm text-bold">Build with &#9829; by <Link href={"https://github.com/mohit251103"} className="italic" target="_blank">Mohit Negi</Link></p>
            </div>
        </div>
    )
}

export default SubContent;