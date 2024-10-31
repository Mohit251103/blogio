import ContentArea from "@/components/dashboard/ContentArea";
import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import SubContent from "@/components/dashboard/SubContent";

const Dashboard = async () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <Nav origin="feed" />
            <div className="flex w-full grow overflow-hidden">
                <SideNav />
                <div className="grow max-w-fit">
                    <div className="w-fit border-r h-[92vh] mod-scroll overflow-y-auto relative">
                        <div className="bg-opacity-70 backdrop-blur-sm sticky top-0 text-xl flex items-center justify-center font-extrabold h-[8vh] py-2 mb-2">Blogs for You</div>
                        <ContentArea />
                    </div>
                </div>
                <SubContent />
            </div>
        </div>
    )
}

export default Dashboard;