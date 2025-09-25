import styles from "@/styles/cardComponent.module.css";
import { Mail, User, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export { CardIndex, CardFeatures, CardUsers };