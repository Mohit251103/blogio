
import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import ContentArea from "./ContentArea";

const BookmarkedBlogs = () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <Nav origin="feed" />
            <div className="flex w-[100vw] grow overflow-hidden">
                <SideNav />
                <div className="grow">
                    <ContentArea/>
                </div>
            </div>
        </div>
    )
}

export default BookmarkedBlogs;