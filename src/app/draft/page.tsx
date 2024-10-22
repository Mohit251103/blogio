import { auth } from "@/auth";
import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import ContentArea from "@/components/draft/ContentArea";

const Draft = async () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <Nav origin={"draft"} />
            <div className="flex h-full w-full grow">
                <SideNav />
                <ContentArea/>
            </div>
        </div>
    )
}

export default Draft;