import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useProcessus } from '@/Context/ProcessusContext';
import LayoutRQ from "@/Layout/layoutResponsableQ";
import { ArrowLeft } from "lucide-react";
import styles from "@/styles/processus.module.css";
import domtoimage from 'dom-to-image';

export default function ProcessusDetails() {
    const router = useRouter();
    const printRef = React.useRef(null);
    const { id } = router.query;
    const { getProcessusById } = useProcessus();

    // const handleDownload = async () => {
    //     const element = printRef.current;
    //     if (!element) return;

    //     // Créer l'iframe pour l'isolation
    //     const iframe = document.createElement('iframe');
    //     iframe.style.visibility = 'hidden';
    //     iframe.style.position = 'fixed';
    //     iframe.style.right = '0';
    //     iframe.style.bottom = '0';
    //     iframe.style.width = '794px'; // A4 width in pixels (210mm)
    //     iframe.style.height = '1123px'; // A4 height in pixels (297mm)
    //     document.body.appendChild(iframe);

    //     try {
    //         const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
    //         // Cloner le contenu AVEC les styles calculés
    //         const clone = element.cloneNode(true);
            
    //         // Récupérer tous les styles CSS de la page
    //         const allStyles = Array.from(document.styleSheets)
    //             .map(sheet => {
    //                 try {
    //                     return Array.from(sheet.cssRules)
    //                         .map(rule => rule.cssText)
    //                         .join('\n');
    //                 } catch (e) {
    //                     return '';
    //                 }
    //             })
    //             .join('\n');

    //         // Styles spécifiques pour l'impression PDF
    //         const printStyles = `
    //             /* Styles globaux */
    //             body {
    //                 margin: 0;
    //                 padding: 20px;
    //                 font-family: 'Arial', sans-serif;
    //                 background: white;
    //                 color: black;
    //                 line-height: 1.4;
    //             }
                
    //             /* Reproduire le style de votre page */
    //             .printableArea {
    //                 width: 100%;
    //                 max-width: none;
    //                 margin: 0;
    //                 padding: 0;
    //                 border: none;
    //                 background: white;
    //             }
                
    //             h1 {
    //                 color: none;
    //                 font-size: 24px;
    //                 margin-bottom: 20px;
    //                 padding-bottom: 10px;
    //                 border-bottom: 2px solid none;
    //                 text-align: center;
    //             }
                
    //             .detailsSection {
    //                 margin-bottom: 20px;
    //                 padding: 15px;
    //                 border: 1px solid #ddd;
    //                 border-radius: 8px;
    //                 background: none;
    //                 break-inside: avoid;
    //                 page-break-inside: avoid;
    //             }
                
    //             .detailsSection h2 {
    //                 color: none;
    //                 font-size: 18px;
    //                 margin: 0 0 15px 0;
    //                 padding-bottom: 8px;
    //                 border-bottom: 1px solid none;
    //             }
                
    //             .detailsSection p {
    //                 margin: 8px 0;
    //                 font-size: 14px;
    //             }
                
    //             .detailsSection strong {
    //                 color: none;
    //             }
                
    //             .detailsSection ul {
    //                 margin: 10px 0;
    //                 padding-left: 20px;
    //             }
                
    //             .detailsSection li {
    //                 margin-bottom: 6px;
    //                 font-size: 13px;
    //                 line-height: 1.4;
    //             }
                
    //             /* Grid layout pour PDF */
    //             .dataGrid {
    //                 display: block;
    //             }
                
    //             .compactSection {
    //                 margin-bottom: 15px;
    //                 padding: 12px;
    //                 border: 1px none none;
    //                 border-radius: 6px;
    //                 background: none;
    //             }
                
    //             .compactSection h3 {
    //                 font-size: 16px;
    //                 margin: 0 0 10px 0;
    //             }
                
    //             /* Couleurs forcées pour impression */
    //             * {
    //                 -webkit-print-color-adjust: exact !important;
    //                 color-adjust: exact !important;
    //                 print-color-adjust: exact !important;
    //             }
                
    //             ${allStyles}
    //         `;

    //         // Créer la structure HTML complète
    //         const htmlContent = `
    //             <!DOCTYPE html>
    //             <html>
    //             <head>
    //                 <meta charset="utf-8">
    //                 <title>Processus PDF</title>
    //                 <style>${printStyles}</style>
    //             </head>
    //             <body>
    //                 ${clone.outerHTML}
    //             </body>
    //             </html>
    //         `;

    //         iframeDoc.open();
    //         iframeDoc.write(htmlContent);
    //         iframeDoc.close();

    //         // Attendre le chargement des styles
    //         await new Promise(resolve => {
    //             iframe.onload = resolve;
    //             setTimeout(resolve, 1000);
    //         });

    //         const canvas = await html2canvas(iframeDoc.body, {
    //             backgroundColor: "#ffffff",
    //             scale: 2,
    //             useCORS: true,
    //             allowTaint: false,
    //             logging: false,
    //             width: iframeDoc.body.scrollWidth,
    //             height: iframeDoc.body.scrollHeight,
    //             onclone: (clonedDoc) => {
    //                 // Forcer les couleurs sur le clone
    //                 const elements = clonedDoc.querySelectorAll('*');
    //                 elements.forEach(el => {
    //                     el.style.color = '#000000';
    //                     el.style.backgroundColor = '#ffffff';
    //                 });
    //             }
    //         });

    //         const imgData = canvas.toDataURL('image/png', 1.0);
            
    //         const pdf = new jsPDF({
    //             orientation: 'portrait',
    //             unit: 'mm',
    //             format: 'a4'
    //         });

    //         const pageWidth = pdf.internal.pageSize.getWidth();
    //         const pageHeight = pdf.internal.pageSize.getHeight();
            
    //         const margin = 10;
    //         const contentWidth = pageWidth - (2 * margin);
    //         const contentHeight = (canvas.height * contentWidth) / canvas.width;

    //         let position = margin;
    //         let remainingHeight = contentHeight;

    //         // Première page
    //         pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    //         remainingHeight -= (pageHeight - (2 * margin));

    //         // Pages supplémentaires si nécessaire
    //         while (remainingHeight > 0) {
    //             position = -remainingHeight;
    //             pdf.addPage();
    //             pdf.addImage(imgData, 'PNG', margin, position, contentWidth, contentHeight);
    //             remainingHeight -= pageHeight;
    //         }

    //         pdf.save(`processus-${processus.name}.pdf`);

    //     } catch (error) {
    //         console.error('Erreur génération PDF:', error);
    //         alert('Erreur lors de la génération du PDF');
    //     } finally {
    //         document.body.removeChild(iframe);
    //     }
    // };

    const handleDownloadWithDomToImage = async () => {
        const element = printRef.current;
        if (!element) return;
    
        try {
            // Créer une copie nettoyée
            const clone = element.cloneNode(true);
            
            // Nettoyer les styles
            clone.querySelectorAll('*').forEach(el => {
                el.style.backgroundImage = 'none';
                el.style.background = '#ffffff';
            });
    
            document.body.appendChild(clone);
    
            const dataUrl = await domtoimage.toPng(clone, {
                bgcolor: '#ffffff',
                style: {
                    'transform': 'none',
                    'background': '#ffffff'
                }
            });
    
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            
            const img = new Image();
            img.src = dataUrl;
            
            await new Promise((resolve) => {
                img.onload = resolve;
            });
    
            const imgWidth = pageWidth - 20;
            const imgHeight = (img.height * imgWidth) / img.width;
    
            pdf.addImage(img, 'PNG', 10, 10, imgWidth, imgHeight);
            pdf.save('processus.pdf');
            
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            const clone = document.querySelector('[cloned-element]');
            if (clone) clone.remove();
        }
    };

    // Attendre que l'ID soit disponible
    if (!id) return <div>Chargement...</div>;

    const processus = getProcessusById(Number(id));

    if (!processus) {
        return (
            <LayoutRQ>
                <div className={styles.fileContainer}>
                    <p>Processus non trouvé</p>
                    <button onClick={() => router.push('/responsableQ/processus')}>
                        Retour à la liste
                    </button>
                </div>
            </LayoutRQ>
        );
    }

    // Fonctions pour afficher les données structurées
    const renderSimpleList = (data) => {
        if (Array.isArray(data)) {
            return data.map((item, index) => {
                // Si c'est un objet avec une propriété 'name' ou 'libelle'
                if (typeof item === 'object' && item !== null) {
                    return <li key={index}>{item.name || item.libelle || JSON.stringify(item)}</li>;
                }
                // Si c'est une chaîne simple
                return <li key={index}>{item}</li>;
            });
        } else if (typeof data === 'object' && data !== null) {
            return Object.values(data).map((item, index) => (
                <li key={index}>{item}</li>
            ));
        }
        return <li>Aucune donnée</li>;
    };

    const renderProcessusRelations = (data) => {
        if (Array.isArray(data)) {
            return data.map((item, index) => {
                // Pour les objets processus avec id et name
                if (item && typeof item === 'object' && item.name) {
                    return <li key={index}>{item.name} (ID: {item.id})</li>;
                }
                // Pour les autres types d'objets
                if (typeof item === 'object') {
                    return <li key={index}>{JSON.stringify(item)}</li>;
                }
                return <li key={index}>{item}</li>;
            });
        } else if (typeof data === 'object' && data !== null) {
            return Object.values(data).map((item, index) => (
                <li key={index}>{item}</li>
            ));
        }
        return <li>Aucun processus défini</li>;
    };

    const renderRisques = (risques) => {
        if (!Array.isArray(risques)) return <li>Aucun risque défini</li>;
        
        return risques.map((risque, index) => (
            <li key={index}>
                <strong>Risque :</strong> {risque.risque_cle} - 
                <strong> Action :</strong> {risque.action_corrective}
            </li>
        ));
    };

    const renderIndicateurs = (indicateurs) => {
        if (!Array.isArray(indicateurs)) return <li>Aucun indicateur défini</li>;
        
        return indicateurs.map((ind, index) => (
            <li key={index}>
                <strong>{ind.indicateur} :</strong> {ind.valeur_cible} ({ind.frequence})
            </li>
        ));
    };

    return (
        <LayoutRQ>
            <div className={styles.fileContainer}>
                <button onClick={() => router.back()} className={styles.backButton}>
                    <ArrowLeft size={20} />Retour
                </button>

                <div ref={printRef} className={styles.printableArea}>
                    <h1>Fiche d'identité processus</h1>
                    
                    <div className={styles.detailsSection}>
                        <h2>Informations générales</h2>
                        <p><strong>Nom :</strong> {processus.name}</p>
                        <p><strong>Description :</strong> {processus.description}</p>
                        <p><strong>Statut :</strong> {processus.status}</p>
                        <p><strong>Pilote :</strong> {processus.author}</p>
                        <p><strong>Copilote :</strong> {processus.copilote}</p>
                        <p><strong>Dernière mise à jour :</strong> {processus.lastUpdate}</p>
                        <p><strong>Documents :</strong> {processus.documents}</p>
                        <p><strong>Tâches :</strong> {processus.tasks}</p>
                        <p><strong>Progression :</strong> {processus.progressValue}%</p>
                        <p><strong>Type :</strong> {processus.type}</p>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Cadrage</h2>
                        <p><strong>Finalité :</strong> {processus.finalité}</p>
                        <p><strong>Champs d'application :</strong> {processus.champs_application}</p>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Objectifs</h2>
                        <ul>{renderSimpleList(processus.objectifs)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Exigences</h2>
                        <ul>{renderSimpleList(processus.exigences)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Ressources associées</h2>
                        <ul>{renderSimpleList(processus.ressources_associees)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Flux</h2>
                        <p><strong>Éléments entrants :</strong></p>
                        <ul>{renderSimpleList(processus.element_entres)}</ul>
                        
                        <p><strong>Éléments sortants :</strong></p>
                        <ul>{renderSimpleList(processus.element_sortis)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Parties prenantes</h2>
                        <p><strong>Bénéficiaires :</strong></p>
                        <ul>{renderSimpleList(processus.beneficiare)}</ul>
                        
                        <p><strong>Processus amont :</strong></p>
                        <ul>{renderProcessusRelations(processus.processus_amont)}</ul>
                        
                        <p><strong>Processus aval :</strong></p>
                        <ul>{renderProcessusRelations(processus.processus_aval)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Risques et actions correctives</h2>
                        <ul>{renderRisques(processus.risque_actions)}</ul>
                    </div>

                    <div className={styles.detailsSection}>
                        <h2>Indicateurs de performance</h2>
                        <ul>{renderIndicateurs(processus.indicateur_performance)}</ul>
                    </div>
                </div>

                <button onClick={handleDownloadWithDomToImage} className={styles.downloadButton}>
                    Télécharger en PDF
                </button>
            </div>
        </LayoutRQ>
    );
}