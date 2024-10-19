import { auth } from "@/auth"
import ContentArea from "@/components/dashboard/ContentArea";
import Nav from "@/components/dashboard/Nav";
import NewBlogStarter from "@/components/dashboard/NewBlogStarter";
import SideNav from "@/components/dashboard/SideNav";

const Dashboard = async () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <NewBlogStarter/>
            <Nav />
            <div className="flex h-full w-full grow">
                <SideNav />
                <div className="grow py-2 px-2">
                    <ContentArea/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;