import { useRouter } from "next/router";
import { Toaster } from "../components/ui/toaster";
import RQSidebar from "@/components/RQsidebar";

const LayoutRQ = ({ children }) => {
    const router = useRouter();

    const handleNavigation = (route) => {
        router.push(route);
    };

    return(
        <div className="flex">
            <RQSidebar />
            <Toaster />
            <div>
                {children}
            </div>
        </div>
    )
}