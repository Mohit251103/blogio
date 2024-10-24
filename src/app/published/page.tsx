import Nav from "@/components/dashboard/Nav";
import SideNav from "@/components/dashboard/SideNav";
import ContentArea from "@/components/draft/ContentArea";

const Published: React.FC = () => {
    return (
        <div className="flex justify-center items-center flex-col min-h-screen">
            <Nav origin={"publish"} />
            <div className="flex w-full grow">
                <SideNav />
                <ContentArea origin="publish"/>
            </div>
        </div>
    )
} 

export default Published;