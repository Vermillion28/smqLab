import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Toastify from 'toastify-js';
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Plus, Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import styles from "@/styles/processus.module.css";
import LayoutRQ from "@/Layout/layoutResponsableQ";
import { MyButton } from "@/components/myButtonComponent";
import { CardProcessus } from "@/components/MycardComponent";

export default function Processus() {
  const [processus, setProcessus] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Dans votre état initial du formData, modifiez pour utiliser des tableaux :
  // Dans votre état initial du formData, modifiez pour utiliser des tableaux :
const [formData, setFormData] = useState({
  name: '',
  type: '',
  responsable: '',
  copilote: '',
  finalite: '',
  champApplication: '',
  description: '',
  objectifs: [],
  exigences: [],
  ressources: [],
  elementsEntree: [],
  elementsSortie: [],
  beneficiaires: [],
  processusAmont: [],
  processusAval: [],
  risks: [],
  indicators: []
});

// Fonction générique pour gérer les listes dynamiques
const addListItem = (fieldName) => {
  setFormData(prev => ({
    ...prev,
    [fieldName]: [...prev[fieldName], '']
  }));
};

const removeListItem = (fieldName, index) => {
  setFormData(prev => ({
    ...prev,
    [fieldName]: prev[fieldName].filter((_, i) => i !== index)
  }));
};

const handleListChange = (fieldName, index, value) => {
  setFormData(prev => ({
    ...prev,
    [fieldName]: prev[fieldName].map((item, i) => 
      i === index ? value : item
    )
  }));
};

// Fonctions pour gérer les risques (gardées telles quelles)
const addRisk = () => {
  setFormData(prev => ({
    ...prev,
    risks: [...prev.risks, { risque: '', action: '' }]
  }));
};

const removeRisk = (index) => {
  setFormData(prev => ({
    ...prev,
    risks: prev.risks.filter((_, i) => i !== index)
  }));
};

const handleRiskChange = (index, field, value) => {
  setFormData(prev => ({
    ...prev,
    risks: prev.risks.map((risk, i) => 
      i === index ? { ...risk, [field]: value } : risk
    )
  }));
};

// Fonctions pour gérer les indicateurs (gardées telles quelles)
const addIndicator = () => {
  setFormData(prev => ({
    ...prev,
    indicators: [...prev.indicators, { indicateur: '', frequence: '', valeurCible: '' }]
  }));
};

const removeIndicator = (index) => {
  setFormData(prev => ({
    ...prev,
    indicators: prev.indicators.filter((_, i) => i !== index)
  }));
};

const handleIndicatorChange = (index, field, value) => {
  setFormData(prev => ({
    ...prev,
    indicators: prev.indicators.map((indicator, i) => 
      i === index ? { ...indicator, [field]: value } : indicator
    )
  }));
};

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
        Toastify({
            text: "Processus créé avec succès !",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4ade80",
        }).showToast();
        fetchProcessus();
        setIsModalOpen(false);
        setFormData({ name: "", responsable: "", description: "" });
      } else if (data.errors) {
        const messages = Object.values(data.errors).flat().join("\n");
        Toastify({
            text: messages,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#ef4444",
        }).showToast();
      } else {
        Toastify({
            text: data.message || "Erreur création processus",
            duration: 5000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#ef4444",
        }).showToast();
      }
    } catch (error) {
      console.error("Erreur création processus:", error);
      Toastify({
        text: "Erreur serveur",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#ef4444",
    }).showToast();
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
            <div className={`${styles.modal} ${styles.modalLarge}`}>
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
                    {/* Section Informations de base */}
                    <div className={styles.formSection}>
                      <h3 className={styles.sectionTitle}>Informations de base</h3>
                      <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                          Nom du processus
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={styles.input} required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="type" className={styles.label}> Type de processus
                        </label>
                        <select id="type" name="type" value={formData.type} onChange={handleInputChange} className={styles.select} required
                        >
                          <option value="">Sélectionner un type</option>
                          <option value="management">Management</option>
                          <option value="support">Support</option>
                          <option value="réalisation">Réalisation</option>
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="responsable" className={styles.label}>
                          Responsable
                        </label>
                        <select id="responsable" name="responsable" value={formData.responsable} onChange={handleInputChange} className={styles.select} required
                        >
                          <option value="">Sélectionner un responsable</option>
                          {responsables.map((r) => (
                            <option key={r.id} value={r.name}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="copilote" className={styles.label}>
                          Co-Pilote
                        </label>
                        <input type="text" id="copilote" name="copilote" value={formData.copilote} onChange={handleInputChange} className={styles.input}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="finalite" className={styles.label}>
                          Finalité du processus
                        </label>
                        <textarea id="finalite" name="finalite" value={formData.finalite} onChange={handleInputChange} className={styles.textarea} rows={3} required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="champApplication" className={styles.label}>
                          Champ d'application
                        </label>
                        <textarea id="champApplication" name="champApplication" value={formData.champApplication} onChange={handleInputChange} className={styles.textarea} rows={3} required
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label htmlFor="description" className={styles.label}>
                          Description
                        </label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={styles.textareaLarge} rows={4} required
                        />
                      </div>
                    </div>

                    {/* Section Listes dynamiques */}
                    <div className={styles.formSection}>
                      <h3 className={styles.sectionTitle}>Éléments du processus</h3>

                      {/* Objectifs - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Objectifs
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.objectifs?.map((objectif, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={objectif} onChange={(e) => handleListChange('objectifs', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un objectif"
                              />
                              <button type="button" onClick={() => removeListItem('objectifs', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('objectifs')}
                            className={styles.addListButton}
                          >
                            + Ajouter un objectif
                          </button>
                        </div>
                      </div>

                      {/* Exigences - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Exigences
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.exigences?.map((exigence, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={exigence} onChange={(e) => handleListChange('exigences', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir une exigence"
                              />
                              <button type="button" onClick={() => removeListItem('exigences', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('exigences')}
                            className={styles.addListButton}
                          >
                            + Ajouter une exigence
                          </button>
                        </div>
                      </div>

                      {/* Ressources - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Ressources Associées
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.ressources?.map((ressource, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={ressource} onChange={(e) => handleListChange('ressources', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir une ressource"
                              />
                              <button type="button" onClick={() => removeListItem('ressources', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('ressources')}
                            className={styles.addListButton}
                          >
                            + Ajouter une ressource
                          </button>
                        </div>
                      </div>

                      {/* Éléments d'entrée - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Éléments d'entrée
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.elementsEntree?.map((element, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={element} onChange={(e) => handleListChange('elementsEntree', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un élément d'entrée"
                              />
                              <button type="button" onClick={() => removeListItem('elementsEntree', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('elementsEntree')}
                            className={styles.addListButton}
                          >
                            + Ajouter un élément d'entrée
                          </button>
                        </div>
                      </div>

                      {/* Éléments de sortie - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Éléments de sortie
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.elementsSortie?.map((element, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={element} onChange={(e) => handleListChange('elementsSortie', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un élément de sortie"
                              />
                              <button type="button" onClick={() => removeListItem('elementsSortie', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('elementsSortie')}
                            className={styles.addListButton}
                          >
                            + Ajouter un élément de sortie
                          </button>
                        </div>
                      </div>

                      {/* Bénéficiaires - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Bénéficiaires
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.beneficiaires?.map((beneficiaire, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={beneficiaire} onChange={(e) => handleListChange('beneficiaires', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un bénéficiaire"
                              />
                              <button type="button" onClick={() => removeListItem('beneficiaires', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addListItem('beneficiaires')}
                            className={styles.addListButton}
                          >
                            + Ajouter un bénéficiaire
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Section Relations et risques */}
                    <div className={styles.formSection}>
                      <h3 className={styles.sectionTitle}>Relations et risques</h3>

                      {/* Processus en Amont - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Processus en Amont
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.processusAmont?.map((processus, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={processus} onChange={(e) => handleListChange('processusAmont', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un processus en amont"
                              />
                              <button type="button" onClick={() => removeListItem('processusAmont', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={() => addListItem('processusAmont')} className={styles.addListButton}>
                            + Ajouter un processus en amont
                          </button>
                        </div>
                      </div>

                      {/* Processus en Aval - Liste dynamique */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Processus en Aval
                        </label>
                        <div className={styles.dynamicListContainer}>
                          {formData.processusAval?.map((processus, index) => (
                            <div key={index} className={styles.dynamicListItem}>
                              <input type="text" value={processus} onChange={(e) => handleListChange('processusAval', index, e.target.value)} className={styles.dynamicListInput} placeholder="Saisir un processus en aval"
                              />
                              <button type="button" onClick={() => removeListItem('processusAval', index)} className={styles.removeListButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={() => addListItem('processusAval')} className={styles.addListButton}>
                            + Ajouter un processus en aval
                          </button>
                        </div>
                      </div>

                      {/* Risques clés et actions */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Risques clés et actions
                        </label>
                        <div className={styles.risksContainer}>
                          {formData.risks?.map((risk, index) => (
                            <div key={index} className={styles.riskItem}>
                              <input type="text" placeholder="Risque clé" value={risk.risque} onChange={(e) => handleRiskChange(index, 'risque', e.target.value)} className={styles.riskInput}
                              />
                              <input type="text" placeholder="Action associée" value={risk.action} onChange={(e) => handleRiskChange(index, 'action', e.target.value)} className={styles.riskInput}
                              />
                              <button type="button" onClick={() => removeRisk(index)} className={styles.removeRiskButton}
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={addRisk} className={styles.addRiskButton}
                          >
                            + Ajouter un risque
                          </button>
                        </div>
                      </div>

                      {/* Indicateurs de performance */}
                      <div className={styles.formGroup}>
                        <label className={styles.label}>
                          Indicateurs de performance
                        </label>
                        <div className={styles.indicatorsContainer}>
                          {formData.indicators?.map((indicator, index) => (
                            <div key={index} className={styles.indicatorItem}>
                              <input
                                type="text"
                                placeholder="Indicateur"
                                value={indicator.indicateur}
                                onChange={(e) => handleIndicatorChange(index, 'indicateur', e.target.value)}
                                className={styles.indicatorInput}
                              />
                              <select
                                value={indicator.frequence}
                                onChange={(e) => handleIndicatorChange(index, 'frequence', e.target.value)}
                                className={styles.frequencySelect}
                              >
                                <option value="">Fréquence</option>
                                <option value="quotidien">Quotidien</option>
                                <option value="hebdomadaire">Hebdomadaire</option>
                                <option value="mensuel">Mensuel</option>
                                <option value="trimestriel">Trimestriel</option>
                                <option value="annuel">Annuel</option>
                              </select>
                              <input type="text" placeholder="Valeur cible" value={indicator.valeurCible} onChange={(e) => handleIndicatorChange(index, 'valeurCible', e.target.value)} className={styles.targetInput}
                              />
                              <button type="button" onClick={() => removeIndicator(index)} className={styles.removeIndicatorButton}>
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={addIndicator} className={styles.addIndicatorButton}>
                            + Ajouter un indicateur
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button type="button" onClick={closeModal} className={styles.cancelButton}>
                        Annuler
                      </button>
                      <button type="submit" className={styles.submitButton}>
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
