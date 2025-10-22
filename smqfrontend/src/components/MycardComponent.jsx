import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/cardComponent.module.css";
import { Mail, User, Building2, Shield, Ellipsis, SquarePen, Trash2, Eye, AlertTriangle, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

function CardUsers({ userId, userName, userEmail, userRole, userDepartment, userStatus, userStatusColor, onEdit, onDelete }) {
    return (
        <div className={styles.userCard}>


            {/* <div>
                <h2>
                    <span>
                        <User size={20} strokeWidth={3} /> {userName}
                        <span className={`${styles.statusBadge} ${userStatusColor}`}>{userStatus}</span>
                    </span>
                </h2>
                <p><span><Mail size={16} strokeWidth={1} /> {userEmail}</span></p>
            </div> */}

            <div>
                <div className={styles.processusCardTitle}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: '400', color: '#000000', paddingBottom: '5px', margin: 0 }}>
                        {userName}
                    </h2>
                    <span className={styles.statusBadge + ' ' + (userStatus === "Actif" ? styles.activeStatus : styles.inactiveStatus)}>
                        {userStatus}
                    </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#616060', lineHeight: '1.2', fontWeight: '300', margin: 0 }}>
                    <Mail size={16} strokeWidth={1} /> {userEmail}
                </p>
            </div>
            <div>
                <h3><span><Building2 size={20} strokeWidth={1} /> {userDepartment || "-"}</span></h3>
                <p><span><Shield size={20} strokeWidth={1} /> {userRole}</span></p>
            </div>
            <div className={styles.userCardButtons}>
                {/* On passe l'identifiant réel de l'utilisateur */}
                <Button size="lg" className={styles.editButtonUsers} onClick={() => onEdit({ id: userId, name: userName, email: userEmail, role: userRole, department: userDepartment })}>
                    <SquarePen size={16} strokeWidth={1} />Modifier
                </Button>

                <Button size="lg" className={styles.deleteButtonUsers} onClick={() => onDelete(userId)}>
                    Supprimer
                </Button>
            </div>
        </div>
    );
}


function CardProcessus({ processusName, processusDescription, processusStatus, processusAuthor, lastUpdate, documents, tasks, progressValue, onEdit, onDelete, processusId }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    /* Fonctions de gestion du menu */
    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen);
    };
    function handleEdit() {
        setIsMenuOpen(false);
        onEdit(processusId);
    };

    function handleDelete() {
        setIsMenuOpen(false);
        onDelete(processusId);
    };
    function handleSeeMore() {
        setIsMenuOpen(false);
        router.push(`/responsableQ/FIP/${processusId}`)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (isMenuOpen && !event.target.closest('[class*="menuContainer"]')) {
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
                            <button className={styles.menuItem} onClick={handleSeeMore} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Eye size={16} />Voir plus
                            </button>
                            <button className={styles.menuItem} onClick={handleEdit} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <SquarePen size={16} />Modifier
                            </button>
                            <button className={styles.menuItem + ' ' + styles.deleteMenuItem} onClick={handleDelete} onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Trash2 size={16} />Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.processusCardContent}>
                <div>Responsable : <br /> <span className={styles.processusValue}>{processusAuthor}</span></div>

                <div>Dernière mise à jour : <br /><span className={styles.processusValue}>{lastUpdate}</span></div>

                <div>Documents : <br /><span className={styles.processusValue}>{documents}</span></div>

                <div>Tâches : <br /><span className={styles.processusValue}>{tasks}</span></div>
            </div>

            <p className={styles.processusProgressLabel}>Progression</p>
            <Progress className={styles.processusProgress} value={progressValue} />
        </div>
    );
}

function CardNC({ nonConformiteId, codeNC, titre, processus, description, severite, author, date, NCstatus }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    /* Fonctions de gestion du menu */
    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen);
    };
    function handleEdit() {
        setIsMenuOpen(false);
        onEdit(nonConformiteId);
    };

    function handleDelete() {
        setIsMenuOpen(false);
        onDelete(nonConformiteId);
    };
    function handleSeeMore() {
        setIsMenuOpen(false);
        router.push(`/responsableQ/NC/${nonConformiteId}`)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (isMenuOpen && !event.target.closest('[class*="menuContainer"]')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);
    return (
        <div className={styles.cardNC}>
            <div className={styles.card_ncTop}>
                <div>
                    <div className={styles.h2}>
                        <h2>{codeNC}</h2>
                        <span className={styles.statusBadge + ' ' + (NCstatus === "Actif" ? styles.activeStatus : styles.inactiveStatus)}>
                            {NCstatus}
                        </span>
                    </div>
                </div>
                <div>
                    <Badge className={styles.badge}>{processus}</Badge>
                </div>
            </div>

            <div className={styles.card_ncBottom}>
                <div>
                    <h2>{titre}</h2>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.detailsContainer}>
                        <p className={styles.details}><User size={16} style={{ margin: '2px 5px 0 0' }} /> Auteur : {author}</p>
                        <p className={styles.details}><AlertTriangle size={16} style={{ margin: '2px 5px 0 0' }} /> Severité : {severite}</p>
                        <p className={styles.details}><Calendar size={16} style={{ margin: '2px 5px 0 0' }} /> Date de déclaration : {date}</p>
                    </div>
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
                        <div className={styles.dropdownMenuNC}>
                            <button className={styles.menuItem} onClick={handleSeeMore} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Eye size={16} />Voir plus
                            </button>
                            <button className={styles.menuItem} onClick={handleEdit} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <SquarePen size={16} />Modifier
                            </button>
                            <button className={styles.menuItem + ' ' + styles.deleteMenuItem} onClick={handleDelete} onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Trash2 size={16} />Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DocCard({ DocId, codeDoc, type, titre, description, author, date }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    /* Fonctions de gestion du menu */
    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen);
    };
    function handleEdit() {
        setIsMenuOpen(false);
        onEdit(DocId);
    };

    function handleDelete() {
        setIsMenuOpen(false);
        onDelete(nonConformiteId);
    };
    function handleSeeMore() {
        setIsMenuOpen(false);
        router.push(`/responsableQ/NC/${nonConformiteId}`)
    };

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (isMenuOpen && !event.target.closest('[class*="menuContainer"]')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <div className={styles.cardDoc}>
            <div className={styles.cardDocTop}>
                <div>
                    <h2>{type}-{codeDoc}</h2>
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
                        <div className={styles.dropdownMenuNC}>
                            <button className={styles.menuItem} onClick={handleSeeMore} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Eye size={16} />Voir plus
                            </button>
                            <button className={styles.menuItem} onClick={handleSeeMore} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Download size={16} />Télécharger
                            </button>
                            <button className={styles.menuItem} onClick={handleEdit} onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <SquarePen size={16} />Modifier
                            </button>
                            <button className={styles.menuItem + ' ' + styles.deleteMenuItem} onClick={handleDelete} onMouseEnter={(e) => e.target.style.backgroundColor = '#fff5f5'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                                <Trash2 size={16} />Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <h2>{titre}</h2>
            <p className={styles.description}>{description}</p>
            <div className={styles.cardDocBottom}>
                <p><User size={16} style={{ margin: '2px 5px 0 0' }} />{author}</p>
                <p><Calendar size={16} style={{ margin: '2px 5px 0 0' }} />Dernière modification : {date}</p>
            </div>
        </div>
    );
}



export { CardIndex, CardFeatures, CardUsers, CardProcessus, CardNC, DocCard };