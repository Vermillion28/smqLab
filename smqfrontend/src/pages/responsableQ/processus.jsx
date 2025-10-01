import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, Calendar, Shield, X, RefreshCcw, Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import styles from "@/styles/processus.module.css";
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
        copilote: "Jean Martin",
        lastUpdate: "2025-06-15",
        documents: "5",
        tasks: "3",
        progressValue: 30,
        type: "Management",
        fianlité: "Assurer la gestion efficace des projets en télécoms, génie civil, énergie et logistique, depuis la préparation jusqu’à la livraison finale, en garantissant la qualité, les délais et la satisfaction des clients.",
        champs_application: "Tous les projets menés dans les domaines Télécoms, Génie Civil, Énergie et Logistique, depuis la planification jusqu’à la livraison et le suivi post-projet",
        objectifs: {
            objectif1: "Préparer et planifier les projets en fonction des exigences techniques et contractuelles",
            objectif2: "Réaliser les études techniques et valider les plans.",
            objectif3: "Coordonner et mobiliser les ressources humaines, matérielles et financières nécessaires.",
        },
        exigences: {
            exigence1: "Conformité aux normes ISO 9001",
            exigence2: "Respect des exigences contractuelles et normatives applicables.",
            exigence3: "Conformité aux réglementations en vigueur (BTP, Télécoms, Sécurité, Environnement).",
        },
        ressources_associees: {
            ressource1: "Conformité aux normes ISO 9001",
            ressource2: "Respect des exigences contractuelles et normatives applicables.",
            ressource3: "Conformité aux réglementations en vigueur (BTP, Télécoms, Sécurité, Environnement).",
        },
        element_entres: {
            element1: "Conformité aux normes ISO 9001",
            element2: "Respect des exigences contractuelles et normatives applicables.",
            element3: "Conformité aux réglementations en vigueur (BTP, Télécoms, Sécurité, Environnement).",
        },
        element_sortis: {
            element1: "Conformité aux normes ISO 9001",
            element2: "Respect des exigences contractuelles et normatives applicables.",
            element3: "Conformité aux réglementations en vigueur (BTP, Télécoms, Sécurité, Environnement).",
        },
        beneficiare: {
            beneficiare_1: "Clients",
            beneficiare_2: "Equipe projets",
            beneficiare_3: "Direction et partie prenante",
        },
        processus_amont: {
            processus_amont_1: "Clients",
            processus_amont_2: "Equipe projets",
            processus_amont_3: "Direction et partie prenante",
        },
        processus_aval: {
            processus_aval_1: "Clients",
            processus_aval_2: "Equipe projets",
            processus_aval_3: "Direction et partie prenante",
        },
        risque_actions: [
            {
                risque_cle: "Retards dans l’exécution des projets",
                action_corrective: "Planification rigoureuse et suivi des délais"
            },
            {
                risque_cle: "Insatisfaction client",
                action_corrective: "Suivi qualité et gestion proactive des réclamations",
            }
        ],
        indicateur_performance: [
            {
                indicateur: "Taux de respect des délais projets",
                frequence: "Hebdomadaire",
                valeur_cible: "100%",
            },
            {
                indicateur: "Taux de respect du budget projet",
                frequence: "Mensuelle",
                valeur_cible: "100%",
            },
        ],
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

const responsableOptions = [
    { value: "Marie Dubois", label: "Marie Dubois" },
    { value: "Jean Martin", label: "Jean Martin" },
];

export default function Utilisateurs() {
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
    const filteredProcessus = useMemo(() => {
        return processus.filter(proc => {
            const matchesSearch = proc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                proc.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "tous" || proc.status.toLowerCase() === statusFilter.toLowerCase();
            const matchesAuthor = authorFilter === "tous" || proc.author === authorFilter;

            return matchesSearch && matchesStatus && matchesAuthor;
        });
    }, [searchQuery, statusFilter, authorFilter]);

    // Calcul de la pagination
    const totalPages = Math.ceil(filteredProcessus.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProcessus = filteredProcessus.slice(startIndex, endIndex);

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

                    {/* Section Recherche et Filtres */}
                    <div className={styles.searchFilterContainer}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchInputWrapper}>
                                <Search size={18} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un processus..."
                                    value={searchQuery}
                                    onChange={(e) => handleFilterChange(setSearchQuery)(e.target.value)}
                                    className={styles.searchInput}
                                />
                            </div>
                        </div>

                        <div className={styles.filterSection}>
                            <span className={styles.filterLabel}>
                                <Filter size={16} />
                                Filtres:
                            </span>

                            <select
                                value={statusFilter}
                                onChange={(e) => handleFilterChange(setStatusFilter)(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="tous">Tous les statuts</option>
                                <option value="actif">Actif</option>
                                <option value="en cours">En cours</option>
                            </select>

                            <select
                                value={authorFilter}
                                onChange={(e) => handleFilterChange(setAuthorFilter)(e.target.value)}
                                className={styles.filterSelect}
                            >
                                <option value="tous">Tous les auteurs</option>
                                {responsableOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={resetFilters}
                                className={styles.resetButton}
                            >
                                Réinitialiser
                            </button>
                        </div>
                    </div>

                    {/* Liste des processus */}
                    <div className={styles.usersList}>
                        <h1 className={styles.usersListTitle}>
                            Liste des Processus ({filteredProcessus.length})
                        </h1>
                        <div className={styles.usersGrid}>
                            {currentProcessus.length > 0 ? (
                                currentProcessus.map((processus) => {
                                    return (
                                        <CardProcessus key={processus.id} processusName={processus.name} processusDescription={processus.description} processusStatus={processus.status} processusAuthor={processus.author} lastUpdate={processus.lastUpdate} documents={processus.documents} tasks={processus.tasks} progressValue={processus.progressValue} processusId={processus.id} onEdit={handleEditProcessus} onDelete={handleDeleteProcessus} />
                                    );
                                })
                            ) : (
                                <div className={styles.noResults}>
                                    Aucun processus trouvé
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredProcessus.length > itemsPerPage && (
                            <div className={styles.pagination}>
                                <div className={styles.paginationInfo}>
                                    Affichage de {startIndex + 1} à {Math.min(endIndex, filteredProcessus.length)} sur {filteredProcessus.length} processus
                                </div>

                                <div className={styles.paginationControls}>
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`${styles.paginationButton} ${currentPage === 1 ? styles.paginationButtonDisabled : ''}`}
                                    >
                                        <ChevronLeft size={16} />
                                        Précédent
                                    </button>

                                    <div className={styles.pageNumbers}>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index + 1}
                                                onClick={() => goToPage(index + 1)}
                                                className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.pageNumberActive : ''}`}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`${styles.paginationButton} ${currentPage === totalPages ? styles.paginationButtonDisabled : ''}`}
                                    >
                                        Suivant
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal pour ajouter un processus */}
                {isModalOpen && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modal}>
                            <Card className={styles.modalCard}>
                                <CardHeader className={styles.modalHeader}>
                                    <div className={styles.modalTitleSection}>
                                        <CardTitle className={styles.modalTitle}>Ajouter un processus</CardTitle>
                                        <button onClick={closeModal} className={styles.closeButton}>
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
                                        <div className={styles.formGroup}>
                                            <label htmlFor="description" className={styles.label}>Description du processus</label>
                                            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={styles.textarea} required></textarea>
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