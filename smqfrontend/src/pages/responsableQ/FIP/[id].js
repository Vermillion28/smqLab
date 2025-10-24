import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useProcessus } from '@/Context/ProcessusContext';
import LayoutRQ from "@/Layout/layoutResponsableQ";
import { ArrowLeft, Download, FileText, Users, Target, Shield, BarChart3, Settings, Workflow } from "lucide-react";
import styles from "@/styles/processus.module.css";
import domtoimage from 'dom-to-image';

export default function ProcessusDetails() {
    const router = useRouter();
    const printRef = React.useRef(null);
    const { id } = router.query;
    const { getProcessusById } = useProcessus();

    const handleDownloadWithDomToImage = async () => {
        const element = printRef.current;
        if (!element) return;

        try {
            const dataUrl = await domtoimage.toPng(element, {
                bgcolor: '#ffffff',
                style: {
                    transform: 'none',
                    background: '#ffffff',
                },
                quality: 1,
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const img = new Image();
            img.src = dataUrl;

            await new Promise((resolve) => {
                img.onload = resolve;
            });

            const imgWidth = pageWidth;
            const imgHeight = (img.height * imgWidth) / img.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`processus-${processus.name}.pdf`);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
            alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
        }
    };

    if (!id) return <div className={styles.loading}>Chargement...</div>;

    const processus = getProcessusById(Number(id));

    if (!processus) {
        return (
            <LayoutRQ>
                <div className={styles.errorContainer}>
                    <div className={styles.errorContent}>
                        <h2>Processus non trouvé</h2>
                        <p>Le processus que vous recherchez n'existe pas ou a été supprimé.</p>
                        <button 
                            onClick={() => router.push('/responsableQ/processus')}
                            className={styles.primaryButton}
                        >
                            Retour à la liste des processus
                        </button>
                    </div>
                </div>
            </LayoutRQ>
        );
    }

    // Fonctions pour afficher les données structurées
    const renderSimpleList = (data, emptyMessage = "Aucune donnée") => {
        if (Array.isArray(data) && data.length > 0) {
            return data.map((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    return <li key={index}>{item.name || item.libelle || JSON.stringify(item)}</li>;
                }
                return <li key={index}>{item}</li>;
            });
        } else if (typeof data === 'object' && data !== null && Object.keys(data).length > 0) {
            return Object.values(data).map((item, index) => (
                <li key={index}>{item}</li>
            ));
        }
        return <li className={styles.emptyItem}>{emptyMessage}</li>;
    };

    const renderProcessusRelations = (data) => {
        if (Array.isArray(data) && data.length > 0) {
            return data.map((item, index) => {
                if (item && typeof item === 'object' && item.name) {
                    return <li key={index}>{item.name} {item.id && `(ID: ${item.id})`}</li>;
                }
                if (typeof item === 'object') {
                    return <li key={index}>{JSON.stringify(item)}</li>;
                }
                return <li key={index}>{item}</li>;
            });
        }
        return <li className={styles.emptyItem}>Aucun processus défini</li>;
    };

    const renderRisques = (risques) => {
        if (Array.isArray(risques) && risques.length > 0) {
            return risques.map((risque, index) => (
                <li key={index} className={styles.riskItem}>
                    <div className={styles.riskContent}>
                        <span className={styles.riskLabel}>Risque :</span>
                        <span className={styles.riskValue}>{risque.risque_cle}</span>
                    </div>
                    <div className={styles.riskContent}>
                        <span className={styles.riskLabel}>Action :</span>
                        <span className={styles.actionValue}>{risque.action_corrective}</span>
                    </div>
                </li>
            ));
        }
        return <li className={styles.emptyItem}>Aucun risque défini</li>;
    };

    const renderIndicateurs = (indicateurs) => {
        if (Array.isArray(indicateurs) && indicateurs.length > 0) {
            return indicateurs.map((ind, index) => (
                <li key={index} className={styles.indicatorItem}>
                    <div className={styles.indicatorHeader}>
                        <span className={styles.indicatorName}>{ind.indicateur}</span>
                        <span className={styles.indicatorFrequency}>{ind.frequence}</span>
                    </div>
                    <div className={styles.indicatorTarget}>
                        Valeur cible : <strong>{ind.valeur_cible}</strong>
                    </div>
                </li>
            ));
        }
        return <li className={styles.emptyItem}>Aucun indicateur défini</li>;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'actif': return '#10b981';
            case 'inactif': return '#ef4444';
            case 'en cours': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    const getTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'management': return '#3b82f6';
            case 'support': return '#8b5cf6';
            case 'réalisation': return '#06b6d4';
            default: return '#6b7280';
        }
    };

    return (
        <LayoutRQ>
            <div className={styles.container}>
                {/* Header avec navigation */}
                <div className={styles.header}>
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <ArrowLeft size={20} />
                        Retour
                    </button>
                    <div className={styles.headerActions}>
                        <button 
                            onClick={handleDownloadWithDomToImage} 
                            className={styles.downloadButton}
                        >
                            <Download size={18} />
                            Télécharger PDF
                        </button>
                    </div>
                </div>

                {/* Contenu principal */}
                <div className={styles.content}>
                    {/* Carte d'identité du processus */}
                    <div className={styles.identityCard}>
                        <div className={styles.identityHeader}>
                            <div className={styles.processusTitle}>
                                <h1>{processus.name}</h1>
                                <div className={styles.statusBadges}>
                                    <span 
                                        className={styles.statusBadge}
                                        style={{ backgroundColor: getStatusColor(processus.status) }}
                                    >
                                        {processus.status}
                                    </span>
                                    <span 
                                        className={styles.typeBadge}
                                        style={{ backgroundColor: getTypeColor(processus.type) }}
                                    >
                                        {processus.type}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.progressSection}>
                                <div className={styles.progressHeader}>
                                    <span>Progression</span>
                                    <span className={styles.progressValue}>{processus.progressValue}%</span>
                                </div>
                                <div className={styles.progressBar}>
                                    <div 
                                        className={styles.progressFill}
                                        style={{ width: `${processus.progressValue}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.identityMeta}>
                            <div className={styles.metaItem}>
                                <Users size={16} />
                                <span><strong>Pilote :</strong> {processus.author}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Users size={16} />
                                <span><strong>Co-pilote :</strong> {processus.copilote || 'Non défini'}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <FileText size={16} />
                                <span><strong>Dernière mise à jour :</strong> {processus.lastUpdate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Grille des sections */}
                    <div ref={printRef} className={styles.printableArea}>
                        <div className={styles.gridLayout}>
                            {/* Colonne de gauche */}
                            <div className={styles.column}>
                                {/* Informations générales */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Settings size={20} />
                                        <h2>Informations générales</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <p className={styles.description}>{processus.description}</p>
                                        <div className={styles.statsGrid}>
                                            <div className={styles.statItem}>
                                                <span className={styles.statLabel}>Documents</span>
                                                <span className={styles.statValue}>{processus.documents}</span>
                                            </div>
                                            <div className={styles.statItem}>
                                                <span className={styles.statLabel}>Tâches</span>
                                                <span className={styles.statValue}>{processus.tasks}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Cadrage */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Target size={20} />
                                        <h2>Cadrage</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <div className={styles.infoItem}>
                                            <strong>Finalité :</strong>
                                            <p>{processus.finalité || 'Non définie'}</p>
                                        </div>
                                        <div className={styles.infoItem}>
                                            <strong>Champs d'application :</strong>
                                            <p>{processus.champs_application || 'Non définis'}</p>
                                        </div>
                                    </div>
                                </section>

                                {/* Objectifs */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Target size={20} />
                                        <h2>Objectifs</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <ul className={styles.styledList}>
                                            {renderSimpleList(processus.objectifs, "Aucun objectif défini")}
                                        </ul>
                                    </div>
                                </section>

                                {/* Exigences */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Shield size={20} />
                                        <h2>Exigences</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <ul className={styles.styledList}>
                                            {renderSimpleList(processus.exigences, "Aucune exigence définie")}
                                        </ul>
                                    </div>
                                </section>
                            </div>

                            {/* Colonne de droite */}
                            <div className={styles.column}>
                                {/* Ressources associées */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Settings size={20} />
                                        <h2>Ressources associées</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <ul className={styles.styledList}>
                                            {renderSimpleList(processus.ressources_associees, "Aucune ressource définie")}
                                        </ul>
                                    </div>
                                </section>

                                {/* Flux */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Workflow size={20} />
                                        <h2>Flux</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <div className={styles.fluxSection}>
                                            <h3>Éléments entrants</h3>
                                            <ul className={styles.styledList}>
                                                {renderSimpleList(processus.element_entres, "Aucun élément entrant")}
                                            </ul>
                                        </div>
                                        <div className={styles.fluxSection}>
                                            <h3>Éléments sortants</h3>
                                            <ul className={styles.styledList}>
                                                {renderSimpleList(processus.element_sortis, "Aucun élément sortant")}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                {/* Parties prenantes */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Users size={20} />
                                        <h2>Parties prenantes</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <div className={styles.stakeholderSection}>
                                            <h3>Bénéficiaires</h3>
                                            <ul className={styles.styledList}>
                                                {renderSimpleList(processus.beneficiare, "Aucun bénéficiaire défini")}
                                            </ul>
                                        </div>
                                        <div className={styles.stakeholderSection}>
                                            <h3>Processus amont</h3>
                                            <ul className={styles.styledList}>
                                                {renderProcessusRelations(processus.processus_amont)}
                                            </ul>
                                        </div>
                                        <div className={styles.stakeholderSection}>
                                            <h3>Processus aval</h3>
                                            <ul className={styles.styledList}>
                                                {renderProcessusRelations(processus.processus_aval)}
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Colonne pleine largeur pour risques et indicateurs */}
                            <div className={styles.fullWidth}>
                                {/* Risques et actions */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <Shield size={20} />
                                        <h2>Risques et actions correctives</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <ul className={styles.risksList}>
                                            {renderRisques(processus.risque_actions)}
                                        </ul>
                                    </div>
                                </section>

                                {/* Indicateurs de performance */}
                                <section className={styles.sectionCard}>
                                    <div className={styles.sectionHeader}>
                                        <BarChart3 size={20} />
                                        <h2>Indicateurs de performance</h2>
                                    </div>
                                    <div className={styles.sectionContent}>
                                        <ul className={styles.indicatorsList}>
                                            {renderIndicateurs(processus.indicateur_performance)}
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutRQ>
    );
}