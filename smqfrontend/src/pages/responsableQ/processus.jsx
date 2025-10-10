import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Plus, Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import styles from "@/styles/processus.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import MyButton from "@/components/myButtonComponent";
import { CardProcessus } from "@/components/MycardComponent";

export default function Processus() {
  const [processus, setProcessus] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", responsable: "", description: "" });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [processusFilter, setProcessusFilter] = useState("tous");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ----------------------------
  // Récupération des processus
  // ----------------------------
  const fetchProcessus = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/processes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setProcessus(data.data);
    } catch (error) {
      console.error("Erreur récupération processus:", error);
    }
  };

  // ----------------------------
  // Récupération des responsables
  // ----------------------------
  const fetchResponsables = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/responsables", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data) setResponsables(data);
    } catch (error) {
      console.error("Erreur récupération responsables:", error);
    }
  };

  useEffect(() => {
    fetchProcessus();
    fetchResponsables();
  }, []);

  // ----------------------------
  // Gestion formulaire
  // ----------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        responsable_name: formData.responsable,
      };

      const res = await fetch("http://localhost:8000/api/processes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert("Processus créé avec succès !");
        fetchProcessus();
        setIsModalOpen(false);
        setFormData({ name: "", responsable: "", description: "" });
      } else if (data.errors) {
        const messages = Object.values(data.errors).flat().join("\n");
        alert(messages);
      } else {
        alert(data.message || "Erreur création processus");
      }
    } catch (error) {
      console.error("Erreur création processus:", error);
      alert("Erreur serveur");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ name: "", responsable: "", description: "" });
  };

  // ----------------------------
  // Filtres et recherche
  // ----------------------------
  const filteredProcessus = useMemo(() => {
    return processus.filter((proc) => {
      const matchesSearch =
        proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (proc.description && proc.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus =
        statusFilter === "tous" ||
        (proc.status && proc.status.toLowerCase() === statusFilter.toLowerCase());
      const matchesProcessus =
        processusFilter === "tous" || proc.name === processusFilter;
      return matchesSearch && matchesStatus && matchesProcessus;
    });
  }, [searchQuery, statusFilter, processusFilter, processus]);

  const totalPages = Math.ceil(filteredProcessus.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProcessus = filteredProcessus.slice(startIndex, endIndex);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStatusFilter("tous");
    setProcessusFilter("tous");
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const handleEditProcessus = (id) => console.log("Modifier", id);
  const handleDeleteProcessus = (id) => console.log("Supprimer", id);

  // ----------------------------
  // Statistiques
  // ----------------------------
  const total = processus.length;
  const enCours = processus.filter((p) => p.status === "en cours").length;
  const termines = processus.filter((p) => p.status === "terminé").length;

  return (
    <LayoutRQ>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>
                <RefreshCcw className={styles.titleIcon} />
                Gestion des Processus
              </h1>
              <p className={styles.subtitle}>
                Gérer et suivre tous vos processus métiers
              </p>
            </div>
            <MyButton
              text="Créer un Nouveau processus"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Statistiques */}
          <div className={styles.statsGrid}>
            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle>Total Processus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.statsValue}>{total}</div>
              </CardContent>
            </Card>
            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle>En cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${styles.statsValue} ${styles.activeStats}`}>
                  {enCours}
                </div>
              </CardContent>
            </Card>
            <Card className={styles.statsCard}>
              <CardHeader className={styles.statsCardHeader}>
                <CardTitle>Terminés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`${styles.statsValue} ${styles.completedStats}`}>
                  {termines}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recherche et filtres */}
          <div className={styles.searchFilterContainer}>
            <div className={styles.searchBar}>
              <div className={styles.searchInputWrapper}>
                <Search size={18} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Rechercher un processus..."
                  value={searchQuery}
                  onChange={(e) =>
                    handleFilterChange(setSearchQuery)(e.target.value)
                  }
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.filterSection}>
              <span className={styles.filterLabel}>
                <Filter size={16} />Filtres:
              </span>
              <select
                value={statusFilter}
                onChange={(e) =>
                  handleFilterChange(setStatusFilter)(e.target.value)
                }
                className={styles.filterSelect}
              >
                <option value="tous">Tous les statuts</option>
                <option value="actif">Actif</option>
                <option value="en cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
              <select
                value={processusFilter}
                onChange={(e) =>
                  handleFilterChange(setProcessusFilter)(e.target.value)
                }
                className={styles.filterSelect}
              >
                <option value="tous">Tous les processus</option>
                {processus.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <button onClick={resetFilters} className={styles.resetButton}>
                Réinitialiser
              </button>
            </div>
          </div>

          {/* Liste processus */}
          <div className={styles.usersList}>
            <h1 className={styles.usersListTitle}>
              Liste des Processus ({filteredProcessus.length})
            </h1>
            <div className={styles.usersGrid}>
              {currentProcessus.length > 0 ? (
                currentProcessus.map((proc) => (
                  <CardProcessus
                    key={proc.id}
                    processusName={proc.name}
                    processusDescription={proc.description}
                    processusStatus={proc.status}
                    processusAuthor={proc.responsable?.name}
                    lastUpdate={proc.updated_at}
                    processusId={proc.id}
                    onEdit={handleEditProcessus}
                    onDelete={handleDeleteProcessus}
                  />
                ))
              ) : (
                <div className={styles.noResults}>Aucun processus trouvé</div>
              )}
            </div>

            {/* Pagination */}
            {filteredProcessus.length > itemsPerPage && (
              <div className={styles.pagination}>
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} /> Précédent
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => goToPage(i + 1)}
                    className={
                      currentPage === i + 1 ? styles.pageNumberActive : ""
                    }
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Suivant <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal création */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={`${styles.modal} ${styles.modalMedium}`}>
              <Card className={styles.modalCard}>
                <CardHeader className={styles.modalHeader}>
                  <div className={styles.modalTitleSection}>
                    <CardTitle className={styles.modalTitle}>
                      Ajouter un processus
                    </CardTitle>
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
                      <label htmlFor="name" className={styles.label}>
                        Nom du processus
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="responsable" className={styles.label}>
                        Responsable
                      </label>
                      <select
                        id="responsable"
                        name="responsable"
                        value={formData.responsable}
                        onChange={handleInputChange}
                        className={styles.select}
                        required
                      >
                        <option value="">
                          Sélectionner un responsable
                        </option>
                        {responsables.map((r) => (
                          <option key={r.id} value={r.name}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="description" className={styles.label}>
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className={styles.textareaLarge}
                        rows={4}
                        required
                      />
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
                        Ajouter le processus
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
