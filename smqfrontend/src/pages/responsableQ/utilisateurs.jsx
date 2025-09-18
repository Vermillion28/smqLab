import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Shield, X } from "lucide-react";
import { useState } from "react";
import styles from "@/styles/utilisateurs.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import MyButton from "@/components/myButtonComponent";
import { CardUsers } from "@/components/MycardComponent";

const users = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@company.com",
    role: "Responsable Qualité",
    department: "Qualité",
    status: "Actif",
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@company.com",
    role: "Technicien Qualité",
    department: "Production",
    status: "Actif",
  },
  {
    id: 3,
    name: "Pierre Durand",
    email: "pierre.durand@company.com",
    role: "Auditeur Interne",
    department: "Qualité",
    status: "En attente",
  }
];

const roleOptions = [
  { value: "responsable_processus", label: "Responsable processus" },
  { value: "collaborateur", label: "Collaborateur" },
];

const getStatusColor = (status) => {
  return status === "Actif" ? styles.activeStatus : styles.inactiveStatus;
};

export default function Utilisateurs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    role: ""
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
    setFormData({ email: "", role: "" });
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ email: "", role: "" });
  };

  // Fonctions pour gérer les actions des cartes
  const handleEditUser = (userName) => {
    console.log("Modifier utilisateur:", userName);
    // Ajoutez ici la logique pour modifier l'utilisateur
  };

  const handleViewUser = (userName) => {
    console.log("Voir détails utilisateur:", userName);
    // Ajoutez ici la logique pour voir les détails de l'utilisateur
  };

  return (
    <LayoutRQ>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>
                <Users className={styles.titleIcon} />
                Utilisateurs
              </h1>
              <p className={styles.subtitle}>Gestion des comptes utilisateurs et des permissions</p>
            </div>
            <div>
              <MyButton text="Ajouter un utilisateur" onClick={() => setIsModalOpen(true)} />
            </div>
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

          {/* Liste des utilisateurs */}
          <div className={styles.usersList}>
            <h1 className={styles.usersListTitle}>Liste des Utilisateurs</h1>
            <div className={styles.usersGrid}>
              {users.map((user) => {
                const statusColor = user.status === "Actif"
                  ? styles.activeStatus
                  : styles.inactiveStatus;

                return (
                  <CardUsers key={user.id} userName={user.name} userEmail={user.email} userRole={user.role} userDepartment={user.department} userStatus={user.status} userStatusColor={statusColor} />
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
                    <CardTitle className={styles.modalTitle}>Ajouter un utilisateur</CardTitle>
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
                      <label htmlFor="email" className={styles.label}>
                        Email de l'utilisateur
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="example@company.com"
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="role" className={styles.label}>
                        Rôle
                      </label>
                      <div className={styles.selectContainer}>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className={styles.select}
                          required
                        >
                          <option value="">Sélectionner un rôle</option>
                          {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={closeModal}
                        className={styles.cancelButton}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className={styles.submitButton}
                      >
                        Ajouter l'utilisateur
                      </button>
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