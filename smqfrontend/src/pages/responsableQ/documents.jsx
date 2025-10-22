import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, AlertTriangle, Calendar, Shield, X, File, Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import styles from "@/styles/document.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import {MyButton, MyDocButton} from "@/components/myButtonComponent";
import { CardNC, CardProcessus, DocCard } from "@/components/MycardComponent";

const responsableOptions = [
    { value: "Marie Dubois", label: "Marie Dubois" },
    { value: "Jean Martin", label: "Jean Martin" },
];
export const documentsData = [
    { id: 1, code: "001", titre: "Document 1", type: "FP", description: "Description du document 1", author: "Marie Dubois", date: "2023-06-01" },
    { id: 2, code: "002", titre: "Document 2", type: "FP", description: "Description du document 2", author: "Jean Martin", date: "2023-06-02" },
    { id: 3, code: "003", titre: "Document 3", type: "FP", description: "Description du document 3", author: "Marie Dubois", date: "2023-06-03" },
    { id: 4, code: "004", titre: "Document 4", type: "FP", description: "Description du document 4", author: "Jean Martin", date: "2023-06-04" },
    { id: 5, code: "005", titre: "Document 5", type: "FP", description: "Description du document 5", author: "Marie Dubois", date: "2023-06-05" },
];

export default function Documents() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        responsable: ""
    });

    // États pour la recherche et les filtres
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("tous");
    const [authorFilter, setAuthorFilter] = useState("tous");

    // États pour la pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filtrage et recherche
    const filteredDocuments = useMemo(() => {
        return documentsData.filter(doc => {
            const matchesSearch = doc.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "tous" || doc.severite.toLowerCase() === statusFilter.toLowerCase();
            const matchesAuthor = authorFilter === "tous" || doc.author === authorFilter;

            return matchesSearch && matchesStatus && matchesAuthor;
        });
    }, [searchQuery, statusFilter, authorFilter]);

    // Calcul de la pagination
    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentDocuments = filteredDocuments.slice(startIndex, endIndex);

    // Réinitialiser la page lors du changement de filtres
    const handleFilterChange = (filterSetter) => (value) => {
        filterSetter(value);
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Nouveau utilisateur:", formData);
        setFormData({ name: "", responsable: "" });
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({ name: "", responsable: "" });
    };

    const handleEditProcessus = (processusId) => {
        console.log("Modifier processus:", processusId);
    };

    const handleDeleteProcessus = (processusId) => {
        console.log("Supprimer processus:", processusId);
    };

    const resetFilters = () => {
        setSearchQuery("");
        setStatusFilter("tous");
        setAuthorFilter("tous");
        setCurrentPage(1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <LayoutRQ>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div>
                            <h1 className={styles.title}> <File className={styles.titleIcon} />Documents</h1>
                            <p className={styles.subtitle}>Gestion documentaire du système qualité</p>
                        </div>
                        <div>
                            <MyDocButton text="Créer un Document" onClick={() => setIsModalOpen(true)} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className={styles.statsGrid}>
                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Total des Documents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={styles.statsValue}>12</div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Documents en Cours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.activeStats}`}>7</div>
                            </CardContent>
                        </Card>

                        <Card className={styles.statsCard}>
                            <CardHeader className={styles.statsCardHeader}>
                                <CardTitle className={styles.statsCardTitle}>Non Conformités Terminées</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`${styles.statsValue} ${styles.adminStats}`}>5</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Section Recherche et Filtres */}
                    <div className={styles.searchFilterContainer}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchInputWrapper}>
                                <Search size={18} className={styles.searchIcon} />
                                <input type="text" placeholder="Rechercher une non conformité..." value={searchQuery} onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)} className={styles.searchInput} />
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <span className={styles.filterLabel}>
                                <Filter size={16} />
                                Filtres:
                            </span>

                            <select value={statusFilter} onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)} className={styles.filterSelect}>
                                <option value="tous">Tous les statuts</option>
                                <option value="actif">Actif</option>
                                <option value="en cours">En cours</option>
                            </select>

                            <select value={authorFilter} onChange={(e) => handleFilterChange(setAuthorFilter)(e.target.value)} className={styles.filterSelect}>
                                <option value="tous">Tous les auteurs</option>
                                {responsableOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button onClick={resetFilters} className={styles.resetButton}>Réinitialiser</button>
                        </div>
                    </div>

                    {/* Liste des processus */}
                    <div className={styles.usersList}>
                        <h1 className={styles.usersListTitle}>Bibliotheque de Documents ({filteredDocuments.length})</h1>
                        <div className={styles.usersGrid}>
                            {currentDocuments.length > 0 ? (
                                currentDocuments.map((doc) => {
                                    return (
                                        <DocCard key={doc.id} codeDoc={doc.code} type={doc.type} titre={doc.titre} description={doc.description} author={doc.author} date={doc.date} />
                                    );
                                })
                            ) : (
                                <div className={styles.noResults}>
                                    Aucun processus trouvé
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredDocuments.length > itemsPerPage && (
                            <div className={styles.pagination}>
                                <div className={styles.paginationInfo}>
                                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredDocuments.length)} sur {filteredDocuments.length} processus
                                </div>

                                <div className={styles.paginationControls}>
                                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className={`${styles.paginationButton} ${currentPage === 1 ? styles.paginationButtonDisabled : ''}`}>
                                        <ChevronLeft size={16} />Précédent
                                    </button>

                                    <div className={styles.pageNumbers}>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button key={index + 1} onClick={() => goToPage(index + 1)} className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.pageNumberActive : ''}`}>
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className={`${styles.paginationButton} ${currentPage === totalPages ? styles.paginationButtonDisabled : ''}`}>
                                        Suivant
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal pour ajouter un processus */}
                {/* {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <Card className={styles.modalCard}>
                                <CardHeader className={styles.modalHeader}>
                                    <div className={styles.modalTitleSection}>
                                        <CardTitle className={styles.modalTitle}>Déclarer une non conformité</CardTitle>
                                        <button onClick={closeModal} className={styles.closeButton}>
                                            <X size={20} />
                                        </button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.topData}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="name" className={styles.label}>Code </label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} placeholder="Entrer un code" required />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="name" className={styles.label}>Titre de la non conformité</label>
                                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} placeholder="Entrez le titre de la non conformité" required />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="processus" className={styles.label}>Processus affecté</label>
                                            <div className={styles.selectContainer}>
                                                <select id="processus" name="processus" value={formData.processus} onChange={handleInputChange} className={styles.select} required>
                                                    <option value="">Sélectionner un processus</option>
                                                    {processusOptions.map((option) => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="description" className={styles.label}>Description de la non conformité</label>
                                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={styles.textarea} required></textarea>
                                        </div>

                                        <div className={styles.formActions}>
                                            <button type="button" onClick={closeModal} className={styles.cancelButton}>Annuler</button>
                                            <button type="submit" className={styles.submitButton}>Ajouter le non conformité</button>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )} */}
            </div>
        </LayoutRQ>
    );
}
