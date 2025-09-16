import { useRouter } from "next/router";
// import { Toaster } from "../components/ui/toaster";
import RQSidebar from "@/components/RQsidebar";
import styles from "@/styles/Layout.module.css";

const LayoutRQ = ({ children }) => {
    const router = useRouter();

    const handleNavigation = (route) => {
        router.push(route);
    };

    return(
        <div className={styles.layout}>
            <RQSidebar />
            <div>
                {children}
            </div>
        </div>
    )
}
export default LayoutRQ;
