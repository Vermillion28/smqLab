import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Shield } from "lucide-react";
import styles from "@/styles/utilisateurs.module.css";

const users = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@company.com",
    role: "Responsable Qualité",
    department: "Qualité",
    status: "Actif",
    lastLogin: "2024-01-10",
    permissions: ["Admin", "Documents", "Audits"]
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@company.com",
    role: "Technicien Qualité",
    department: "Production",
    status: "Actif",
    lastLogin: "2024-01-09",
    permissions: ["Documents", "Non-Conformités"]
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@company.com",
    role: "Auditeur Interne",
    department: "Qualité",
    status: "Inactif",
    lastLogin: "2024-01-05",
    permissions: ["Audits", "Documents"]
  }
];

const getStatusColor = (status) => {
  return status === "Actif" ? styles.activeStatus : styles.inactiveStatus;
};

export default function Utilisateurs() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <Users className={styles.titleIcon} />
            Utilisateurs
          </h1>
          <p className={styles.subtitle}>Gestion des comptes utilisateurs et des permissions</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <Card className={styles.statsCard}>
            <CardHeader className={styles.statsCardHeader}>
              <CardTitle className={styles.statsCardTitle}>Total Utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.statsValue}>84</div>
            </CardContent>
          </Card>
          
          <Card className={styles.statsCard}>
            <CardHeader className={styles.statsCardHeader}>
              <CardTitle className={styles.statsCardTitle}>Actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${styles.statsValue} ${styles.activeStats}`}>76</div>
            </CardContent>
          </Card>
          
          <Card className={styles.statsCard}>
            <CardHeader className={styles.statsCardHeader}>
              <CardTitle className={styles.statsCardTitle}>Administrateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${styles.statsValue} ${styles.adminStats}`}>5</div>
            </CardContent>
          </Card>
          
          <Card className={styles.statsCard}>
            <CardHeader className={styles.statsCardHeader}>
              <CardTitle className={styles.statsCardTitle}>Nouveaux ce mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`${styles.statsValue} ${styles.newStats}`}>12</div>
            </CardContent>
          </Card>
        </div>

        {/* Users List */}
        <Card className={styles.usersCard}>
          <CardHeader>
            <CardTitle>Liste des Utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.usersList}>
              {users.map((user) => (
                <div key={user.id} className={styles.userCard}>
                  <div className={styles.userHeader}>
                    <div className={styles.userNameSection}>
                      <h3 className={styles.userName}>{user.name}</h3>
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </div>
                    <div className={styles.userDepartment}>{user.department}</div>
                  </div>
                  
                  <div className={styles.userDetails}>
                    <div className={styles.userDetail}>
                      <Mail className={styles.detailIcon} />
                      <span className={styles.detailText}>{user.email}</span>
                    </div>
                    <div className={styles.userDetail}>
                      <Calendar className={styles.detailIcon} />
                      <span className={styles.detailText}>Dernière connexion: {user.lastLogin}</span>
                    </div>
                  </div>
                  
                  <div className={styles.userRole}>
                    <Shield className={styles.roleIcon} />
                    <span className={styles.roleText}>{user.role}</span>
                  </div>
                  
                  <div className={styles.permissions}>
                    {user.permissions.map((permission, index) => (
                      <Badge key={index} variant="secondary" className={styles.permissionBadge}>
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}