import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Shield, X } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "@/styles/utilisateurs.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import MyButton from "@/components/myButtonComponent";
import { CardUsers } from "@/components/MycardComponent";

const roleOptions = [
  { value: "RESPONSABLE", label: "Responsable processus" },
  { value: "COLLABORATEUR", label: "Collaborateur" },
];

const getStatusColor = (status) => (status === "Actif" ? styles.activeStatus : styles.inactiveStatus);

export default function Utilisateurs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Récupération des utilisateurs depuis l'API
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setUsers(data.users.data || data.users); // si pagination
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:8000/api/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (data.success) {
      alert("Utilisateur créé avec succès !");
      fetchUsers();
      setIsModalOpen(false);
      setFormData({ name: "", email: "", role: "" });
    } else if (data.status_code === 422) {
      // erreurs de validation
      const messages = Object.values(data.errors).flat().join("\n");
      alert(messages);
    } else {
      alert(data.message || "Erreur lors de la création");
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    alert("Erreur serveur");
  }
};


  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <LayoutRQ>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>
                <Users className={styles.titleIcon} /> Utilisateurs
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
                <div className={styles.statsValue}>{users.length}</div>
              </CardContent>
            </Card>

            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle className={styles.statsCardTitle}>Actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`${styles.statsValue} ${styles.activeStats}`}
                >
                  {users.filter((u) => u.password_set).length}
                </div>
              </CardContent>
            </Card>

            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle className={styles.statsCardTitle}>Administrateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`${styles.statsValue} ${styles.adminStats}`}
                >
                  {users.filter((u) => u.role === "ADMIN").length}
                </div>
              </CardContent>
            </Card>

            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle className={styles.statsCardTitle}>Nouveaux ce mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`${styles.statsValue} ${styles.newStats}`}
                >
                  {users.filter((u) => {
                    const date = new Date(u.created_at);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des utilisateurs */}
          <div className={styles.usersList}>
            <h1 className={styles.usersListTitle}>Liste des Utilisateurs</h1>
            <div className={styles.usersGrid}>
              {users.map((user) => (
                <CardUsers
                  key={user.id}
                  userName={user.name}
                  userEmail={user.email}
                  userRole={user.role}
                  userDepartment={user.department || "-"}
                  userStatus={user.password_set ? "Actif" : "En attente"}
                  userStatusColor={getStatusColor(user.password_set ? "Actif" : "En attente")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal Ajouter utilisateur */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <Card className={styles.modalCard}>
                <CardHeader className={styles.modalHeader}>
                  <div className={styles.modalTitleSection}>
                    <CardTitle className={styles.modalTitle}>Ajouter un utilisateur</CardTitle>
                    <button onClick={closeModal} className={styles.closeButton}>
                      <X size={20} />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>Nom de l'utilisateur</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Nom de l'utilisateur"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>Email de l'utilisateur</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="role" className={styles.label}>Rôle</label>
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
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button type="button" onClick={closeModal} className={styles.cancelButton}>Annuler</button>
                      <button type="submit" className={styles.submitButton}>Ajouter l'utilisateur</button>
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
