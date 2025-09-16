import React from "react";
import Link from "next/link";
import styles from "@/styles/index.module.css";
import Image from "next/image";
import CardIndex from "@/components/cardIndex";
import CardFeatures from "@/components/cardFeatures";
import { FaFileAlt, FaChartLine, FaList, FaClipboardList, FaExclamationTriangle } from 'react-icons/fa';


export default function Home() {
    return (
        <div className={styles.body}>
            <div className={styles.navbar}>
                <div className={styles.logo}>SMQLab</div>
                <div className={styles.sectionsFocntionalites}>
                    <Link href="#fonctionnalites"><div>Fonctionnalités</div></Link>
                    <Link href="#avantages"><div>Avantages</div></Link>
                    <Link href="#contact"><div>Contact</div></Link>
                </div>
                <div className={styles.authLinks}>
                    <Link href="/connexion"> <button className={styles.btn}>Connexion</button></Link>
                    <Link href="/inscription"> <button className={styles.btnInscription}>Inscription</button></Link>
                </div>
            </div>

            <div className={styles.titleContainer}>
                <div>
                    <h1 className={styles.title}>Gérer votre <span className={styles.gradientText}>Système Qualité</span> en toute simplicité</h1>
                    <p>SMQLab vous accompagne dans la gestion complète de votre SMQ. Documentez, suivez et optimisez vos processus qualité avec notre solution intuitive.</p>
                    <div className={styles.btnContainer}>
                        <Link href="/inscription"><button className={styles.btnStart}>Commencer Maintenant</button></Link>
                        <Link href="/a-propos"><button className={styles.btnPlus}>En savoir plus</button></Link>
                    </div>
                    <div className={styles.dataContainer}>
                        <div><span>1000+</span> Entreprises</div>
                        <div><span>99,9%</span> Disponibilité</div>
                        <div><span>24/7</span> Support</div>
                    </div>
                </div>
                <div className={styles.isoContainer}>
                    <Image src="/iso2.jpeg" alt="" width={500} height={500} className={styles.isoImage} />
                </div>
            </div>

            <div className={`${styles.section} ${styles.fonctionnalites}`} id="fonctionnalites">
                <h1>Toutes les Fonctionnalités pour votre <span className={styles.gradientText}>SMQ</span></h1>
                <h2>Une suite complète d'outils conçus pour simplifier et optimiser la gestion de votre système de management de la qualité.</h2>
                <div className={styles.featuresGrid}>
                    <div><CardIndex Icone={FaFileAlt} title="Gestion documentaire" description="Centralisez tous vos documents qualité avec un système de versioning automatique et des workflows d'approbation." /></div>
                    <div><CardIndex Icone={FaList} title="Audits et Contrôle qualité" description="Planifiez et suivez vos audits internes avec des modèles personnalisables et des rapports automatisés." /></div>
                    <div><CardIndex Icone={FaExclamationTriangle} title="Non-conformités" description="Enregistrez, analysez et suivez le traitement des non-conformités avec des actions correctives et préventives." /></div>
                    <div><CardIndex Icone={FaChartLine} title="Indicateurs de performance" description="Tableaux de bord en temps réel avec KPIs personnalisés pour piloter efficacement votre système qualité." /></div>
                </div>
            </div>

            <div className={`${styles.section} ${styles.avantages}`} id="avantages">
                <h1>Pourquoi choisir SMQLab ?</h1>
                <h2>Rejoignez plus de 500 entreprises qui ont transformé leur gestion qualité avec notre solution innovante.</h2>
                <div className={styles.featuresGrid}>
                    <CardFeatures chiffre="70%" chiffreH2="De temps économisés" title="Gain de Temps" description="Automatisez vos processus qualité et réduisez de 70% le temps consacré aux tâches administratives." />

                    <CardFeatures chiffre="100%" chiffreH2="De conformité" title="Conformité garantie" description="Restez toujours conforme aux exigences réglementaires avec nos mises à jour automatiques." />

                    <CardFeatures chiffre="+45%" chiffreH2="D'engagement d'équipe" title="Collaboration Renforcée" description="Fédérez vos équipes autour de la qualité avec des outils collaboratifs intuitifs." />
                </div>
            </div>

            <div className={styles.footer} id="contact">
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>SMQ</div>
                            <span className={styles.logoText}>SMQLab</span>
                        </div>
                        <p className={styles.brandDescription}>
                            La solution complète pour la gestion de votre système de management de la qualité. Simplifiez vos processus et garantissez votre conformité.
                        </p>
                        <div className={styles.socialLinks}>
                            <a href="#" aria-label="LinkedIn">LinkedIn</a>
                            <a href="#" aria-label="Twitter">Twitter</a>
                            <a href="#" aria-label="YouTube">YouTube</a>
                        </div>
                    </div>

                    <div className={styles.footerColumn}>
                        <h3>Produit</h3>
                        <ul>
                            <li><a href="#">Fonctionnalités</a></li>
                            <li><a href="#">Tarifs</a></li>
                            <li><a href="#">Sécurité</a></li>
                            <li><a href="#">Intégrations</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerColumn}>
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Centre d'aide</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#">Formation</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <div className={styles.copyright}>
                        © 2024 QualityPro. Tous droits réservés.
                    </div>
                    <div className={styles.footerLegal}>
                        <a href="#">Conditions d'utilisation</a>
                        <a href="#">Politique de confidentialité</a>
                    </div>
                </div>
            </div>
        </div>
    );
}