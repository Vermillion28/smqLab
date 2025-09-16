import { useRouter } from "next/router";
import Link from "next/link";
import {
  BarChart3, AlertTriangle, Users, FileText, Search, User, Bell, HelpCircle, LogOut
} from "lucide-react";
import styles from "@/styles/sidebar.module.css";

const menuItems = [
  {
    title: "Tableau de Bord",
    url: "/",
    icon: BarChart3
  },
  {
    title: "Non-Conformité",
    url: "/non-conformite",
    icon: AlertTriangle
  },
  {
    title: "Utilisateurs",
    url: "/utilisateurs",
    icon: Users
  },
  {
    title: "Documents",
    url: "/documents",
    icon: FileText
  },
  {
    title: "Audits",
    url: "/audits",
    icon: Search
  },
];

const profileItems = [
  {
    title: "Profil",
    url: "/profil",
    icon: User
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell
  },
  {
    title: "Aide",
    url: "/aide",
    icon: HelpCircle
  },
];

export default function RQSidebar() {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (path) => {
    const baseClasses = `${styles.navLink} ${styles.flexItems}`;

    if (isActive(path)) {
      return `${baseClasses} ${styles.active}`;
    }

    return baseClasses;
  };

  return (
    <div className={styles.sidebar}>
      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={getNavClasses(item.url)}
            >
              <item.icon className={styles.icon} />
              <span className={styles.text}>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Profile Section */}
        <div className={styles.profileSection}>
          {profileItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={getNavClasses(item.url)}
            >
              <item.icon className={styles.icon} />
              <span className={styles.text}>{item.title}</span>
            </Link>
          ))}
        </div>
        {/* Logout Button */}
        <div className={styles.logoutContainer}>
          <button className={`${styles.logoutButton} ${styles.flexItems}`}>
            <LogOut className={styles.logoutIcon} />
            DÉCONNEXION
          </button>
        </div>
      </div>

    </div>
  );
}