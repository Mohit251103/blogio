import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button";
import Image from "next/image"

const Dashboard = async () => {
    const session = await auth();
    const handleLogOut = async () => {
        "use server"
        await signOut({ redirect: true, redirectTo: "/sign-in" });
    }
    return (
        <div className="flex justify-center items-center flex-col">
            <Image src={session?.user?.image as string} className="rounded-full" width={50} height={50} alt="profile"></Image>
            <h2 className="text-2xl text-bold ">{ session?.user?.name }</h2>
            <p className="text-sm text-slate-500">{session?.user?.email}</p>
            <form action={handleLogOut}>
                <Button type="submit">Log Out</Button>
            </form>
        </div>
    )
}

export default Dashboard;