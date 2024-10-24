import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import ContentArea from "@/components/draft/ContentArea";

const Draft = async () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen overflow-hidden">
            <Nav origin={"draft"} />
            <div className="flex w-full grow overflow-hidden">
                <SideNav />
                <ContentArea origin="draft"/>
            </div>
        </div>
    )
}

export default Draft;