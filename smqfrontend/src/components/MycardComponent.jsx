import { useState, useEffect } from "react";
import styles from "@/styles/cardComponent.module.css";
import { Mail, User, Building2, Shield, Ellipsis, SquarePen, Trash2 } from "lucide-react";
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

function CardUsers({ userName, userEmail, userRole, userDepartment, userStatus, userStatusColor, onEdit, onDelete }) {
    return (
        <div className={styles.userCard}>
            <div>
                <h2>
                    <span>
                        <User size={20} strokeWidth={3} />{userName}
                        <span className={`${styles.statusBadge} ${userStatusColor}`}>{userStatus}</span>
                    </span>
                </h2>
                <p><span><Mail size={16} strokeWidth={1} />{userEmail}</span></p>
            </div>
            <div>
                <h3><span><Building2 size={20} strokeWidth={1} />{userDepartment}</span></h3>
                <p><span><Shield size={20} strokeWidth={1} />{userRole}</span></p>
            </div>
            <div className={styles.userCardButtons}>
                <Button size="lg" variant="outline" color="primary" onClick={onEdit}>Modifier</Button>
                <Button size="lg" variant="destructive" onClick={onDelete}>Supprimer</Button>
            </div>
        </div>
    );
}


function CardProcessus({processusName, processusDescription, processusStatus, processusAuthor, lastUpdate, documents, tasks, progressValue, onEdit, onDelete, processusId}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleEdit = () => {
        setIsMenuOpen(false);
        onEdit(processusId);
    };

    const handleDelete = () => {
        setIsMenuOpen(false);
        onDelete(processusId);
    };

    // Fermer le menu si on clique ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('menuContainer')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);


    return (
        <div className={styles.processusCard}>
            <div className={styles.processusCardHeader}>
                <div>
                    <div className={styles.processusCardTitle}>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '400', color: '#000000', paddingBottom: '5px', margin: 0 }}>
                            {processusName}
                        </h2>
                        <span className={styles.statusBadge + ' ' + (processusStatus === "Actif" ? styles.activeStatus : styles.inactiveStatus)}>
                            {processusStatus}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#616060', lineHeight: '1.2', fontWeight: '300', margin: 0 }}>
                        {processusDescription}
                    </p>
                </div>
                <div className={styles.menuContainer}>
                    <button className={styles.menuButton} onClick={handleMenuClick} onMouseEnter={(e) => {
                            if (!isMenuOpen) e.target.style.backgroundColor = '#f5f5f5';
                        }} onMouseLeave={(e) => {
                            if (!isMenuOpen) e.target.style.backgroundColor = 'transparent';
                        }}>
                        <Ellipsis size={20} />
                    </button>

                    {isMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <button className={styles.menuItem} onClick={handleEdit} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <SquarePen size={16} />Modifier
                            </button>
                            <button className={styles.menuItem + ' ' + styles.deleteMenuItem} onClick={handleDelete} onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                <Trash2 size={16} />Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.processusCardContent}>
                <div>
                    Responsable : <br />
                    <span className={styles.processusValue}>{processusAuthor}</span>
                </div>
                <div>Dernière mise à jour : <br />
                    <span className={styles.processusValue}>{lastUpdate}</span>
                </div>
                <div>
                    Documents : <br />
                    <span className={styles.processusValue}>{documents}</span>
                </div>
                <div>
                    Tâches : <br />
                    <span className={styles.processusValue}>{tasks}</span>
                </div>
            </div>

            <p className={styles.processusProgressLabel}>Progression</p>
            <Progress className={styles.processusProgress} value={progressValue} />
        </div>
    );
}



export { CardIndex, CardFeatures, CardUsers, CardProcessus };