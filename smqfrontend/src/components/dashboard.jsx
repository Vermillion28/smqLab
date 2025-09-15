import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, FileText, AlertTriangle } from "lucide-react";
import styles from "@/styles/dashboard.module.css";

const statsCards = [
  {
    title: "Documents",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "Non-Conformités",
    value: "23",
    change: "-8%",
    changeType: "positive",
    icon: AlertTriangle,
    color: "text-orange-600"
  },
  {
    title: "Utilisateurs Actifs",
    value: "84",
    change: "+5%",
    changeType: "positive",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Audits en Cours",
    value: "7",
    change: "+2",
    changeType: "neutral",
    icon: BarChart3,
    color: "text-purple-600"
  }
];

const recentActivities = [
  {
    title: "Nouveau document ajouté",
    description: "Procédure QMS-001 créée par Marie Dubois",
    time: "Il y a 2 heures",
    type: "document"
  },
  {
    title: "Non-conformité signalée",
    description: "NC-2024-015 dans le département Production",
    time: "Il y a 4 heures",
    type: "nonconformity"
  },
  {
    title: "Audit planifié",
    description: "Audit interne prévu pour le 15 janvier",
    time: "Il y a 1 jour",
    type: "audit"
  },
  {
    title: "Utilisateur ajouté",
    description: "Nouveau membre dans l'équipe Qualité",
    time: "Il y a 2 jours",
    type: "user"
  }
];

export function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        {/* Header */}
        <div className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Tableau de Bord SMQ</h1>
          <p className={styles.dashboardSubtitle}>Vue d'ensemble de votre système de management de la qualité</p>
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <Card key={index} className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle className={styles.statsCardTitle}>
                  {stat.title}
                </CardTitle>
                <stat.icon className={`${styles.statsIcon} ${styles[stat.color]}`} />
              </CardHeader>
              <CardContent className={styles.statsCardContent}>
                <div className={styles.statsValue}>{stat.value}</div>
                <p className={`${styles.statsChange} ${
                  stat.changeType === 'positive' 
                    ? styles.positiveChange 
                    : styles.neutralChange
                }`}>
                  {stat.change} par rapport au mois dernier
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Recent Activities */}
          <Card className={styles.sectionCard}>
            <CardHeader>
              <CardTitle className={styles.sectionTitle}>
                <TrendingUp className={styles.sectionIcon} />
                Activités Récentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.activitiesList}>
                {recentActivities.map((activity, index) => (
                  <div key={index} className={styles.activityItem}>
                    <div className={`${styles.activityIndicator} ${
                      activity.type === 'document' ? styles.documentIndicator :
                      activity.type === 'nonconformity' ? styles.nonconformityIndicator :
                      activity.type === 'audit' ? styles.auditIndicator :
                      styles.userIndicator
                    }`} />
                    <div className={styles.activityContent}>
                      <h4 className={styles.activityTitle}>{activity.title}</h4>
                      <p className={styles.activityDescription}>{activity.description}</p>
                      <p className={styles.activityTime}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className={styles.sectionCard}>
            <CardHeader>
              <CardTitle className={styles.sectionTitle}>
                <BarChart3 className={styles.sectionIcon} />
                Actions Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.actionsGrid}>
                <button className={`${styles.actionButton} ${styles.documentAction}`}>
                  <FileText className={styles.actionIcon} />
                  <div className={styles.actionContent}>
                    <div className={styles.actionTitle}>Créer un Document</div>
                    <div className={styles.actionDescription}>Ajouter une nouvelle procédure</div>
                  </div>
                </button>
                
                <button className={`${styles.actionButton} ${styles.nonconformityAction}`}>
                  <AlertTriangle className={styles.actionIcon} />
                  <div className={styles.actionContent}>
                    <div className={styles.actionTitle}>Signaler Non-Conformité</div>
                    <div className={styles.actionDescription}>Nouveau rapport d'incident</div>
                  </div>
                </button>
                
                <button className={`${styles.actionButton} ${styles.userAction}`}>
                  <Users className={styles.actionIcon} />
                  <div className={styles.actionContent}>
                    <div className={styles.actionTitle}>Gérer Utilisateurs</div>
                    <div className={styles.actionDescription}>Ajouter ou modifier des comptes</div>
                  </div>
                </button>
                
                <button className={`${styles.actionButton} ${styles.auditAction}`}>
                  <BarChart3 className={styles.actionIcon} />
                  <div className={styles.actionContent}>
                    <div className={styles.actionTitle}>Planifier Audit</div>
                    <div className={styles.actionDescription}>Nouveau calendrier d'audit</div>
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}