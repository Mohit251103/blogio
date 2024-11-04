import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import Image from "next/image"; 
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { dislikeBlog, getLikes, isLikedByUser, isSavedByUser, likeBlog, saveBlogs, unsaveBlogs } from "@/actions";
import { useSession } from "next-auth/react";
import { PusherContext } from "@/context/pusher-context";

const FeedBlogCard = ({ title, slug, author, like }: {
    title: string, 
    slug: string, 
    author: {
        id: string,
        name: string,
        profile: string
    },
    like?:number
}) => {

    const { data: session } = useSession();
    const [likes, setLikes] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [saved, setIsSaved] = useState<boolean>(false);
    const { channel } = useContext(PusherContext);
    const router = useRouter();
    const handleClick = () => {
        console.log("link clicked")
        router.push(`/editor/preview/${slug}`);
    }
    

    const handleLikeBlog = async () => {
        try {
            await likeBlog(slug, session?.user?.id as string);
            setIsLiked(true);
            router.refresh();
        } catch (error) {
            console.log(error)
        }   
    }

    const handleDisLikeBlog = async () => {
        try {
            await dislikeBlog(slug, session?.user?.id as string)
            setIsLiked(false)
            router.refresh()
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveBlogs = async () => {
        await saveBlogs(slug, session?.user?.id as string);
        setIsSaved(true);
        router.refresh();
    }

    const handleUnSaveBlogs = async () => {
        await unsaveBlogs(slug, session?.user?.id as string);
        setIsSaved(false);
        router.refresh();
    }

    const is_liked = async () => {
        const res = await isLikedByUser(slug, session?.user?.id as string)
        setIsLiked(res ?? false)
    }

    const is_saved = async () => {
        const res = await isSavedByUser(slug, session?.user?.id as string)
        setIsSaved(res ?? false)
    }

    useEffect(() => {
        setLikes(like ?? 0);

        const handleLikeEvent = (slug_server: string) => {
            if (slug === slug_server) {
                setLikes(prevLike => prevLike + 1);
            }
        }

        const handleDisLikeEvent = (slug_server: string) => {
            if (slug === slug_server) {
                setLikes(prevLike => prevLike - 1);
            }
        }

        channel?.bind("like_blog", handleLikeEvent);
        channel?.bind("dislike_blog", handleDisLikeEvent);

        return () => {
            channel?.unbind("like_blog", handleLikeEvent);
            channel?.unbind("dislike_blog", handleDisLikeEvent);
        }
    },[])

    useEffect(() => {
        if (session) {
            is_liked();
            is_saved();
        }
    },[session])

    return (
        <Card className="flex w-full h-full">
            <div>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold hover:underline hover:cursor-pointer" onClick={handleClick}>
                        {title}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                        <p className="lg:text-sm text-xs text-secondary-foreground italic">by</p>
                        <Image src={author.profile} alt="Author Profile" width={25} height={25} className="rounded-full mx-1 aspect-square"/>
                        <p className="lg:text-sm text-xs text-secondary-foreground">{author.name}</p>
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-start gap-2">
                    {/* <NormalRouteButton slug={slug}><BookOpen className="mr-1 w-5 h-5" />Open</NormalRouteButton> */}
                    <div className="flex justify-center items-center">
                        {!isLiked && <button onClick={handleLikeBlog}><ThumbUpOffAltIcon className="w-5 h-5" /></button>}
                        {isLiked && <button onClick={handleDisLikeBlog}><ThumbUpAltIcon className="w-5 h-5" /></button>}
                        {likes>0 && <p className="text-sm text-secondary-foreground ml-2 w-5 h-5">{likes}</p>}
                    </div>
                    {!saved && <button onClick={handleSaveBlogs}><BookmarkAddIcon className="w-5 h-5"/></button>}
                    {saved && <button onClick={handleUnSaveBlogs}><BookmarkAddedIcon className="w-5 h-5"/></button>}
                </CardFooter>
            </div>
        </Card>
    )
}

export default FeedBlogCard;