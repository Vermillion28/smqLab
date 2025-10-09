import { useRouter } from "next/router";
import Link from "next/link";
import { BarChart3, AlertTriangle, FileText, Search, User, Bell, HelpCircle, LogOut 
} from "lucide-react";
import styles from "@/styles/Layout.module.css";

const menuItems = [
  {
    title: "Tableau de Bord",
    url: "/collaborateurs/dashboard",
    icon: BarChart3
  },
  {
    title: "Non-Conformité",
    url: "/collaborateurs/nonConformite",
    icon: AlertTriangle
  },
  {
    title: "Documents",
    url: "/collaborateurs/documents",
    icon: FileText
  },
];

const profileItems = [
  {
    title: "Profil",
    url: "/responsableQ/profil",
    icon: User
  },
  {
    title: "Notifications",
    url: "/responsableQ/notifications",
    icon: Bell
  },
  {
    title: "Aide",
    url: "/responsableQ/aide",
    icon: HelpCircle
  },
];

export default function CollabSidebar() {
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
    return isActive(path) ? `${baseClasses} ${styles.active}` : baseClasses;
  };

  // 👉 Fonction de déconnexion
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch("http://127.0.0.1:8000/api/logout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      // Suppression du token du localStorage
      localStorage.removeItem("token");

      // Redirection vers la page de connexion
      router.push("/connexion");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div className={styles.CollabSidebar}>
      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link key={item.title} href={item.url} className={getNavClasses(item.url)}>
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
          <button onClick={handleLogout} className={`${styles.logoutButton} ${styles.flexItems}`}
          >
            <LogOut className={styles.logoutIcon} />DÉCONNEXION
          </button>
        </div>
      </div>
    </div>
  );
};
