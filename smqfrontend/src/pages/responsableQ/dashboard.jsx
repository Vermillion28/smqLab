import React from 'react';
import styles from '@/styles/dashboard.module.css';
import LayoutRQ from '@/Layout/layoutResponsableQ';
import {BarChart3, AlertTriangle, Users, FileText, Search, TrendingUp} from "lucide-react";

//Composant Card
const Card = ({ children, className = '', ...props }) => (
    <div className={`${styles.card} ${className}`} {...props}>
        {children}
    </div>
);

const CardHeader = ({ children, className = '', ...props }) => (
    <div className={`${styles.cardHeader} ${className}`} {...props}>
        {children}
    </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
    <h3 className={`${styles.cardTitle} ${className}`} {...props}>
        {children}
    </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
    <div className={`${styles.cardContent} ${className}`} {...props}>
        {children}
    </div>
);

//Icônes simplifiées
// const FileText = ({ className }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//     </svg>
// );

// const AlertTriangle = ({ className }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//     </svg>
// );

// const Users = ({ className }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
//     </svg>
// );

// const BarChart3 = ({ className }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//     </svg>
// );

// const TrendingUp = ({ className }) => (
//     <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//     </svg>
// );

const statsCards = [
    {
        title: "Documents",
        value: "1,247",
        change: "+12%",
        changeType: "positive",
        icon: FileText,
        color: "blue"
    },
    {
        title: "Non-Conformités",
        value: "23",
        change: "-8%",
        changeType: "positive",
        icon: AlertTriangle,
        color: "orange"
    },
    {
        title: "Utilisateurs Actifs",
        value: "84",
        change: "+5%",
        changeType: "positive",
        icon: Users,
        color: "green"
    },
    {
        title: "Audits en Cours",
        value: "7",
        change: "+2",
        changeType: "neutral",
        icon: BarChart3,
        color: "purple"
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
        title: "Activité planifiée",
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

export default function Dashboard() {
    return (
        <LayoutRQ>
            <div className={styles.dashboard}>
                <div className={styles.dashboardContainer}>
                    {/* Header */}
                    <div className={styles.header}>
                        <h1>Tableau de Bord SMQ</h1>
                        <p>Vue d'ensemble de votre système de management de la qualité</p>
                    </div>

                    {/* Stats Cards */}
                    <div className={styles.statsGrid}>
                        {statsCards.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{stat.title}</CardTitle>
                                    <stat.icon className={`${styles.icon} ${styles[stat.color]}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className={styles.statValue}>{stat.value}</div>
                                    <p className={`${styles.statChange} ${styles[stat.changeType]}`}>
                                        {stat.change} par rapport au mois dernier
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className={styles.mainGrid}>
                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle className={styles.sectionTitle}>
                                    <TrendingUp className={`${styles.icon} ${styles.primaryIcon}`} />
                                    Activités Récentes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.activitiesList}>
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className={styles.activityItem}>
                                            <div className={`${styles.activityDot} ${styles[activity.type]}`} />
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
                        <Card>
                            <CardHeader>
                                <CardTitle className={styles.sectionTitle}>
                                    <BarChart3 className={`${styles.icon} ${styles.primaryIcon}`} />
                                    Actions Rapides
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.quickActions}>
                                    <button className={`${styles.actionButton} ${styles.primary}`}>
                                        <FileText className={`${styles.icon} ${styles.primaryIcon}`} />
                                        <div className={styles.actionContent}>
                                            <h4>Créer un Document</h4>
                                            <p>Ajouter une nouvelle procédure</p>
                                        </div>
                                    </button>

                                    <button className={`${styles.actionButton} ${styles.orange}`}>
                                        <AlertTriangle className={`${styles.icon} ${styles.orange}`} />
                                        <div className={styles.actionContent}>
                                            <h4>Signaler Non-Conformité</h4>
                                            <p>Nouveau rapport d'incident</p>
                                        </div>
                                    </button>

                                    <button className={`${styles.actionButton} ${styles.green}`}>
                                        <Users className={`${styles.icon} ${styles.green}`} />
                                        <div className={styles.actionContent}>
                                            <h4>Gérer Utilisateurs</h4>
                                            <p>Ajouter ou modifier des comptes</p>
                                        </div>
                                    </button>

                                    <button className={`${styles.actionButton} ${styles.purple}`}>
                                        <BarChart3 className={`${styles.icon} ${styles.purple}`} />
                                        <div className={styles.actionContent}>
                                            <h4>Planifier une Activité</h4>
                                            <p>Nouveau calendrier d'audit</p>
                                        </div>
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </LayoutRQ>
    );
}