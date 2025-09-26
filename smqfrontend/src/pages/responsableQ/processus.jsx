import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Shield, X, RefreshCcw, Plus } from "lucide-react";
import { useState } from "react";
import styles from "@/styles/utilisateurs.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import MyButton from "@/components/myButtonComponent";
import { CardProcessus } from "@/components/MycardComponent";

const processus = [
    {
        id: 1,
        name: "Controle Qualité Produits",
        description: "Processus de vérification et validation des produits finis",
        status: "Actif",
        author: "Marie Dubois",
        lastUpdate: "2025-06-15",
        documents: "5",
        tasks: "3",
        progressValue: 30,
    },
    {
        id: 2,
        name: "Gestion des Commandes Clients",
        description: "Traitement des commandes depuis la réception jusqu'à la livraison",
        status: "en cours",
        author: "Jean Martin",
        lastUpdate: "2025-09-15",
        documents: "5",
        tasks: "3",
        progressValue: 50,
    },
];
//données statique pour le select
const responsableOptions = [
    { value: "Marie Dubois", label: "Marie Dubois" },
    { value: "Jean Martin", label: "Jean Martin" },
];

const getStatusColor = (status) => {
    return status === "Actif" ? styles.activeStatus : styles.inactiveStatus;
};

export default function Utilisateurs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        responsable: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique pour ajouter l'utilisateur
        console.log("Nouveau utilisateur:", formData);
        // Réinitialiser le formulaire et fermer le modal
        setFormData({ name: "", responsable: "" });
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: "", responsable: "" });
    };

    // Fonctions pour gérer les actions des cartes
    const handleEditUser = (userName) => {
        console.log("Modifier utilisateur:", userName);
        // Ajoutez ici la logique pour modifier l'utilisateur
    };

    return (
        <LayoutRQ>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}> <RefreshCcw className={styles.titleIcon} />Gestion des Processus</h1>
                            <p className={styles.subtitle}>Gérer et suivez tous vos processus métiers</p>
                        </div>
                        <div>
                            <MyButton text="Créer un Nouveau processus" onClick={() => setIsModalOpen(true)} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className={styles.statsGrid}>
                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Processus Trimestriel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.statsValue}>12</div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Processus en Cours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.activeStats}`}>7</div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Processus Terminés</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.adminStats}`}>5</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Liste des processus */}
                    <div className={styles.usersList}>
                        <h1 className={styles.usersListTitle}>Liste des Processus</h1>
                        <div className={styles.usersGrid}>
                            {processus.map((processus) => {
                                const statusColor = processus.status === "Actif"
                                    ? styles.activeStatus
                                    : styles.inactiveStatus;

                                return (
                                    <CardProcessus key={processus.id} processusName={processus.name} processusDescription={processus.description} processusStatus={processus.status} processusAuthor={processus.author} lastUpdate={processus.lastUpdate} documents={processus.documents} tasks={processus.tasks} progressValue={processus.progressValue} />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Modal pour ajouter un utilisateur */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <Card className={styles.modalCard}>
                                <CardHeader className={styles.modalHeader}>
                                    <div className={styles.modalTitleSection}>
                                        <CardTitle className={styles.modalTitle}>Ajouter un processus</CardTitle>
                                        <button
                                            onClick={closeModal}
                                            className={styles.closeButton}
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className={styles.form}>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="name" className={styles.label}>Nom du processus</label>
                                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} placeholder="Nom du processus" required />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="role" className={styles.label}>Responsable du processus</label>
                                            <div className={styles.selectContainer}>
                                                <select id="role" name="role" value={formData.role} onChange={handleInputChange} className={styles.select} required>
                                                    <option value="">Sélectionner un responsable</option>
                                                    {responsableOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={styles.formActions}>
                                            <button type="button" onClick={closeModal} className={styles.cancelButton}>Annuler</button>
                                            <button type="submit" className={styles.submitButton}>Ajouter le processus</button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </LayoutRQ>
    );
}