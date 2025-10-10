import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "@/styles/nonConformite.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import MyButton from "@/components/myButtonComponent";
import { CardNC } from "@/components/MycardComponent";

export default function NonConformite() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nonConformites, setNonConformites] = useState([]);
    const [processus, setProcessus] = useState([]);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        code: "",
        title: "",
        process_name: "",
        description: ""
    });

    // États pour recherche et filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("tous");
    const [authorFilter, setAuthorFilter] = useState("tous");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // 🔹 Charger les non-conformités
    useEffect(() => {
        const fetchNonConformites = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/non-conformities", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                if (data.success) {
                    setNonConformites(data.data);
                }
            } catch (err) {
                console.error("Erreur de chargement des non-conformités:", err);
            } finally {
                setLoading(false);
            }
        };

        const fetchProcessus = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/processes", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                const data = await res.json();
                if (data.success) {
                    setProcessus(data.data || []);
                } else {
                    setProcessus(data || []);
                }
            } catch (err) {
                console.error("Erreur de chargement des processus:", err);
            }
        };

        fetchNonConformites();
        fetchProcessus();
    }, []);

    // 🔹 Gestion du formulaire
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://127.0.0.1:8000/api/non-conformities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success) {
                alert("✅ Non-conformité créée avec succès !");
                setIsModalOpen(false);
                setFormData({ code: "", title: "", process_name: "", description: "" });
                setNonConformites((prev) => [data.data, ...prev]);
            } else {
                alert("❌ Erreur : " + (data.message || "Impossible de créer la non-conformité"));
                console.error(data.errors);
            }
        } catch (err) {
            console.error("Erreur lors de la création:", err);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ code: "", title: "", process_name: "", description: "" });
    };

    // 🔹 Recherche et filtres
    const filteredNC = useMemo(() => {
        return nonConformites.filter((nc) => {
            const searchMatch =
                nc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                nc.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const statusMatch =
                statusFilter === "tous" ||
                (nc.status && nc.status.toLowerCase() === statusFilter.toLowerCase());
            const authorMatch =
                authorFilter === "tous" ||
                (nc.creator?.name && nc.creator.name === authorFilter);
            return searchMatch && statusMatch && authorMatch;
        });
    }, [searchQuery, statusFilter, authorFilter, nonConformites]);

    // Pagination
    const totalPages = Math.ceil(filteredNC.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentNC = filteredNC.slice(startIndex, startIndex + itemsPerPage);

    const goToPage = (page) => setCurrentPage(page);
    const resetFilters = () => {
        setSearchQuery("");
        setStatusFilter("tous");
        setAuthorFilter("tous");
        setCurrentPage(1);
    };

    return (
        <LayoutRQ>
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* HEADER */}
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}>
                                <AlertTriangle className={styles.titleIcon} />
                                Non Conformités
                            </h1>
                            <p className={styles.subtitle}>
                                Gérer et suivez toutes les non-conformités déclarées
                            </p>
                        </div>
                        <MyButton
                            text="Déclarer une Non Conformité"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>

                    {/* STATS */}
                    <div className={styles.statsGrid}>
                        <Card className={styles.statsCard}>
                            <CardHeader>
                                <CardTitle className={styles.statsCardTitle}>
                                    Non Conformités
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.statsValue}>
                                    {nonConformites.length}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader>
                                <CardTitle className={styles.statsCardTitle}>
                                    En cours
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.activeStats}`}>
                                    {Math.floor(nonConformites.length / 2)}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader>
                                <CardTitle className={styles.statsCardTitle}>
                                    Terminées
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.adminStats}`}>
                                    {Math.floor(nonConformites.length / 2)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RECHERCHE */}
                    <div className={styles.searchFilterContainer}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchInputWrapper}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Rechercher une non-conformité..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={styles.searchInput}
                                />
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <span className={styles.filterLabel}>
                                <Filter size={16} /> Filtres:
                            </span>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="tous">Tous les statuts</option>
                                <option value="actif">Actif</option>
                                <option value="en cours">En cours</option>
                            </select>
                            <select
                                value={authorFilter}
                                onChange={(e) => setAuthorFilter(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="tous">Tous les auteurs</option>
                                {[...new Set(nonConformites.map((nc) => nc.creator?.name))].map(
                                    (name, i) =>
                                        name && (
                                            <option key={i} value={name}>
                                                {name}
                                            </option>
                                        )
                                )}
                            </select>
                            <button onClick={resetFilters} className={styles.resetButton}>
                                Réinitialiser
                            </button>
                        </div>
                    </div>

                    {/* LISTE */}
                    <div className={styles.usersList}>
                        <h1 className={styles.usersListTitle}>
                            Liste des Non-Conformités ({filteredNC.length})
                        </h1>
                        <div className={styles.usersGrid}>
                            {loading ? (
                                <p>Chargement...</p>
                            ) : currentNC.length > 0 ? (
                                currentNC.map((nc) => (
                                    <CardNC
                                        key={nc.id}
                                        codeNC={nc.code}
                                        titre={nc.title}
                                        processus={nc.process?.name}
                                        description={nc.description}
                                        author={nc.creator?.name || "Inconnu"}
                                        date={new Date(nc.created_at).toLocaleDateString()}
                                        NCstatus="Actif"
                                    />
                                ))
                            ) : (
                                <div className={styles.noResults}>
                                    Aucune non-conformité trouvée
                                </div>
                            )}
                        </div>

                        {/* PAGINATION */}
                        {filteredNC.length > itemsPerPage && (
                            <div className={styles.pagination}>
                                <div className={styles.paginationInfo}>
                                    Affichage de {startIndex + 1} à{" "}
                                    {Math.min(startIndex + itemsPerPage, filteredNC.length)} sur{" "}
                                    {filteredNC.length}
                                </div>
                                <div className={styles.paginationControls}>
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`${styles.paginationButton} ${
                                            currentPage === 1
                                                ? styles.paginationButtonDisabled
                                                : ""
                                        }`}
                                    >
                                        <ChevronLeft size={16} /> Précédent
                                    </button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => goToPage(i + 1)}
                                            className={`${styles.pageNumber} ${
                                                currentPage === i + 1
                                                    ? styles.pageNumberActive
                                                    : ""
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`${styles.paginationButton} ${
                                            currentPage === totalPages
                                                ? styles.paginationButtonDisabled
                                                : ""
                                        }`}
                                    >
                                        Suivant <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* MODAL */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <Card className={styles.modalCard}>
                                <CardHeader className={styles.modalHeader}>
                                    <div className={styles.modalTitleSection}>
                                        <CardTitle className={styles.modalTitle}>
                                            Déclarer une Non Conformité
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
                                            <label className={styles.label}>Code</label>
                                            <input
                                                type="text"
                                                name="code"
                                                value={formData.code}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Titre</label>
                                            <input
                                                type="text"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>
                                                Processus concerné
                                            </label>
                                            <select
                                                name="process_name"
                                                value={formData.process_name}
                                                onChange={handleInputChange}
                                                className={styles.select}
                                                required
                                            >
                                                <option value="">
                                                    Sélectionnez un processus
                                                </option>
                                                {processus.map((p) => (
                                                    <option key={p.id} value={p.name}>
                                                        {p.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                className={styles.textarea}
                                            ></textarea>
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
                                                Ajouter
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
