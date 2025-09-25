import styles from "@/styles/cardComponent.module.css";
import { Mail, User, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function CardIndex({ Icone, title, description }) {
    return (
        <div className={styles.cardIndex}>
            <Icone size={30} color="#3F2B96" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

function CardFeatures({ chiffre, chiffreH2, title, description }) {
    return (
        <div className={styles.cardFeatures}>
            <h1>{chiffre}</h1>
            <h3>{chiffreH2}</h3>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

function CardUsers({ userName, userEmail, userRole, userDepartment, userStatus, userStatusColor }) {
    return (
        <div className={styles.userCard}>
            <div>
                <h2><span><User size={20} strokeWidth={3} />{userName} <span className={`${styles.statusBadge} ${userStatusColor}`}>{userStatus}</span></span></h2>
                <p><span><Mail size={16} strokeWidth={1} />{userEmail}</span></p>
            </div>
            <div>
                <h3><span><Building2 size={20} strokeWidth={1} />{userDepartment}</span></h3>
                <p><span> <Shield size={20} strokeWidth={1} />{userRole}</span></p>
            </div>
            <div className={styles.userCardButtons}>
                <Button size="lg" variant="outline" color="primary">Modifier</Button>
                <Button size="lg" variant="destructive">Supprimer</Button>
            </div>
        </div>
    );
}

function CardProcessus({ processusName, processusDescription, processusStatus, processusAuthor, lastUpdate, documents, tasks, progressValue }) {
    return (
        <div className={styles.processusCard}>
            <div className={styles.processusCardHeader}>
                <div>
                    <div className={styles.processusCardTitle}>
                        <h2>{processusName}</h2><span className={`${styles.statusBadge} ${processusStatus === "Actif" ? styles.activeStatus : styles.inactiveStatus}`}>{processusStatus}</span>
                    </div>
                    <p>{processusDescription}</p>
                </div>
                <div>
                    <Button size="lg" variant="outline" color="primary">Modifier</Button>
                </div>
            </div>
            <div className={styles.processusCardContent}>
                <div>Responsable : <br /><span className={styles.processusValue}>{processusAuthor}</span></div>
                <div>Dernière mise à jour : <br /><span className={styles.processusValue}>{lastUpdate}</span></div>
                <div>Documents : <br /><span className={styles.processusValue}>{documents}</span></div>
                <div>Tâches : <br /><span className={styles.processusValue}>{tasks}</span></div>
            </div>
            <p style={{ marginTop: "1rem" }}>Progression</p>
            <Progress className={styles.processusProgress} value={progressValue} />
        </div>
    );
}

export { CardIndex, CardFeatures, CardUsers, CardProcessus };