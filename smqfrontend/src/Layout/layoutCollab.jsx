import { useRouter } from "next/router";
// import { Toaster } from "../components/ui/toaster";
import CollabSidebar from "@/components/collabsidebar";
import styles from "@/styles/Layout.module.css";

const LayoutCollab = ({ children }) => {
    const router = useRouter();

    const handleNavigation = (route) => {
        router.push(route);
    };

    return(
        <div className={styles.layout}>
            <CollabSidebar />
            <div className={styles.layoutContent}>
                {children}
            </div>
        </div>
    )
}
export default LayoutCollab;