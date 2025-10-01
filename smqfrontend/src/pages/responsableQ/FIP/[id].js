import { useRouter } from 'next/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import { useProcessus } from '@/Context/ProcessusContext';
import LayoutRQ from "@/Layout/layoutResponsableQ";
import { ArrowLeft } from "lucide-react";
import styles from "@/styles/processus.module.css";

export default function ProcessusDetails() {
    const router = useRouter();
    const printRef = React.useRef(null)

    // const handleDownload = async () => {
    //     const element = printRef.current;
    //     if (!element) return;
    
    //     // Créer un iframe pour isoler complètement le rendu
    //     const iframe = document.createElement('iframe');
    //     iframe.style.visibility = 'hidden';
    //     iframe.style.position = 'fixed';
    //     iframe.style.right = '0';
    //     iframe.style.bottom = '0';
    //     document.body.appendChild(iframe);
    
    //     try {
    //         const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            
    //         // Cloner le contenu avec les styles forcés
    //         const clone = element.cloneNode(true);
            
    //         // Injecter des styles qui forcent les couleurs en hex
    //         const forceStyles = document.createElement('style');
    //         forceStyles.textContent = `
    //             * {
    //                 color: #000000 !important;
    //                 background-color: #ffffff !important;
    //                 border-color: #000000 !important;
    //                 box-shadow: none !important;
    //             }
    //             .${styles.detailsCard} {
    //                 border: 1px solid #000000 !important;
    //             }
    //             .${styles.backButton} {
    //                 color: #000000 !important;
    //                 background-color: #f0f0f0 !important;
    //             }
    //         `;
            
    //         iframeDoc.head.appendChild(forceStyles);
    //         iframeDoc.body.appendChild(clone);
    
    //         // Attendre le rendu
    //         await new Promise(resolve => setTimeout(resolve, 500));
    
    //         const canvas = await html2canvas(iframeDoc.body, {
    //             backgroundColor: "#ffffff",
    //             scale: 2,
    //             useCORS: true,
    //             allowTaint: true,
    //             logging: true
    //         });
    
    //         const data = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF({
    //             orientation: 'landscape',
    //         });
    
    //         const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
    //         pdf.addImage(data, 'PNG', 10, 10, imgWidth, imgHeight);
    //         pdf.save('processus.pdf');
    
    //     } catch (error) {
    //         console.error('Erreur:', error);
    //     } finally {
    //         document.body.removeChild(iframe);
    //     }
    // };
    
    const handleDownload = async () => {
        const element = printRef.current;
        if (!element) {
            return
        }
        const canvas = await html2canvas(element)
        const data = canvas.toDataURL('image/png')

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: 'a4'
        })

        const imgProperties = pdf.getImageProperties(data)
        const pdfwidth = pdf.internal.pageSize.getWidth()
        const pdfheight = (imgProperties.height * pdfwidth) / imgProperties.width
        pdf.addImage(data, 'PNG', 10, 10, pdfwidth, pdfheight)
        pdf.save('exmaple.pdf')
    }

        const { id } = router.query;
        const { getProcessusById } = useProcessus();

        // Attendre que l'ID soit disponible
        if (!id) return <div>Chargement...</div>;

        const processus = getProcessusById(id);

        // Si le processus n'existe pas
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

        return (
            <LayoutRQ>
                <div className={styles.fileContainer} ref={printRef}>
                    <button onClick={() => router.back()} className={styles.backButton}>
                        <ArrowLeft size={20} />Retour
                    </button>

                    <div className={styles.header}>
                        <h1 className={styles.title}>{processus.name}</h1>
                        <span className={processus.status === "Actif" ? styles.activeStatus : styles.inactiveStatus}>
                            {processus.status}
                        </span>
                    </div>

                    <div className={styles.detailsCard}>
                        <div>
                            <h2>Informations du processus</h2>
                        </div>
                        <div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <label>Description</label>
                                    <p>{processus.description}</p>
                                </div>

                                <div className={styles.infoItem}>
                                    <label>Responsable</label>
                                    <p>{processus.author}</p>
                                </div>

                                <div className={styles.infoItem}>
                                    <label>Dernière mise à jour</label>
                                    <p>{processus.lastUpdate}</p>
                                </div>

                                <div className={styles.infoItem}>
                                    <label>Documents</label>
                                    <p>{processus.documents}</p>
                                </div>

                                <div className={styles.infoItem}>
                                    <label>Tâches</label>
                                    <p>{processus.tasks}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => handleDownload()}>Télécharger</button>
                </div>
            </LayoutRQ>
        );
    }