import { useState } from 'react';
import styles from '../styles/FichePosteForm.module.css';

function FichePosteForm({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        // Informations générales
        intitulePoste: '',
        descriptionPoste: '',
        direction: '',
        hierarchique: '',
        encadrement: '',

        // Responsabilités
        responsabilites: [
            // 'Élaborer et mettre en œuvre la stratégie en alignement avec les objectifs globaux',
            // 'Piloter la croissance et le développement de l\'entreprise',
            // 'Superviser l\'ensemble des départements et s\'assurer de l\'atteinte des objectifs'
        ],

        // Compétences
        competencesTechniques: [
            // 'Solide connaissance du secteur des télécoms',
            // 'Maîtrise des aspects financiers et de gestion d\'entreprise'
        ],
        competencesComportementales: [
            // 'Leadership et capacité à fédérer les équipes',
            // 'Excellentes compétences en communication'
        ],

        // Indicateurs
        kpis: [
            // 'Taux de réalisation des objectifs stratégiques',
            // 'Taux de conformité aux exigences réglementaires'
        ],

        // Ressources
        ressourcesMaterielles: 'Bureau équipé, Connexion internet, Véhicule de fonction',
        ressourcesHumaines: 'Assistante administrative, Responsable de département',

        // Conditions
        lieu: '',
        horaires: 'Temps plein (07h30-17h30)',
        typeContrat: 'CDI',

        // Informations personnelles
        nom: '',
        prenoms: '',
        situationMatrimoniale: '',
        nombreEnfants: '',
        contact: '',
        email: '',
        quartier: '',
        personnePrevenir: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>Créer une Fiche de Poste</h2>
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Section Informations Générales */}
                    <div className={styles.formSection}>
                        <h3>Informations Générales</h3>
                        <div className={styles.formGroup}>
                            <label>Intitulé du poste *</label>
                            <input type="text" value={formData.intitulePoste} onChange={(e) => handleInputChange('intitulePoste', e.target.value)} required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label>Description du poste *</label>
                            <textarea value={formData.descriptionPoste} onChange={(e) => handleInputChange('descriptionPoste', e.target.value)} rows="4" required/>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Direction / Département</label>
                                <input type="text" value={formData.direction} onChange={(e) => handleInputChange('direction', e.target.value)}/>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Hiérarchique</label>
                                <input type="text" value={formData.hierarchique} onChange={(e) => handleInputChange('hierarchique', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Encadrement</label>
                            <input type="text" value={formData.encadrement} onChange={(e) => handleInputChange('encadrement', e.target.value)} placeholder="Départements supervisés"/>
                        </div>
                    </div>

                    {/* Section Responsabilités */}
                    <div className={styles.formSection}>
                        <h3>Responsabilités & Activités</h3>
                        {formData.responsabilites.map((responsabilite, index) => (
                            <div key={index} className={styles.arrayItem}>
                                <input type="text" value={responsabilite} onChange={(e) => handleArrayChange('responsabilites', index, e.target.value)} placeholder="Responsabilité" />
                                <button type="button" className={styles.removeButton} onClick={() => removeArrayItem('responsabilites', index)}>
                                    ×
                                </button>
                            </div>
                        ))}
                        <button type="button" className={styles.addButton}onClick={() => addArrayItem('responsabilites')}
                        >+ Ajouter une responsabilité
                        </button>
                    </div>

                    {/* Section Compétences */}
                    <div className={styles.formRow}>
                        <div className={styles.formSection}>
                            <h3>Compétences Techniques</h3>
                            {formData.competencesTechniques.map((competence, index) => (
                                <div key={index} className={styles.arrayItem}>
                                    <input type="text" value={competence} onChange={(e) => handleArrayChange('competencesTechniques', index, e.target.value)}
                                    />
                                    <button  type="button" onClick={() => removeArrayItem('competencesTechniques', index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className={styles.addButton}
                                onClick={() => addArrayItem('competencesTechniques')}
                            >
                                + Ajouter une compétence
                            </button>
                        </div>

                        <div className={styles.formSection}>
                            <h3>Compétences Comportementales</h3>
                            {formData.competencesComportementales.map((competence, index) => (
                                <div key={index} className={styles.arrayItem}>
                                    <input
                                        type="text"
                                        value={competence}
                                        onChange={(e) => handleArrayChange('competencesComportementales', index, e.target.value)}
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => removeArrayItem('competencesComportementales', index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className={styles.addButton}
                                onClick={() => addArrayItem('competencesComportementales')}
                            >
                                + Ajouter une compétence
                            </button>
                        </div>
                    </div>

                    {/* Section conditions de travail */}
                    <div className={styles.formSection}>
                        <h3>Conditions de travail</h3>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Lieu de travail</label>
                                <input type="text" value={formData.lieuTravail} onChange={(e) => handleInputChange('lieuTravail', e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Horaires</label>
                                <input type="text" value={formData.heuresSupp} onChange={(e) => handleInputChange('heuresSupp', e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Types de Contrat</label>
                                <select value={formData.typeContrat} onChange={(e) => handleInputChange('typeContrat', e.target.value)}>
                                    <option value="selectionnez un type de contrat">Sélectionnez un type de contrat</option>
                                    <option value="CDI">CDI</option>
                                    <option value="CDD">CDD</option>
                                    <option value="Stage">Stage</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section Informations Personnelles */}
                    <div className={styles.formSection}>
                        <h3>Informations Personnelles</h3>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Nom</label>
                                <input type="text" value={formData.nom} onChange={(e) => handleInputChange('nom', e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Prénoms</label>
                                <input type="text" value={formData.prenoms} onChange={(e) => handleInputChange('prenoms', e.target.value)}/>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Contact</label>
                                <input type="text" value={formData.contact} onChange={(e) => handleInputChange('contact', e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email</label>
                                <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)}/>
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Situation Matrimoniale</label>
                                <select name="situationMatrimoniale" id="" value={formData.situationMatrimoniale} onChange={(e) => handleInputChange('situationMatrimoniale', e.target.value)}>
                                    <option value="Célibataire">Célibataire</option>
                                    <option value="Marié(e)">Marié(e)</option>
                                    <option value="Veuf(e)">Fiancé(e)</option>
                                    <option value="Divorcé(e)">Divorcé(e)</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Nombres d'Enfants</label>
                                <input type="number" value={formData.enfants} onChange={(e) => handleInputChange('enfants', e.target.value)}/>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label>Quartier de résidence</label>
                                <input type="text" value={formData.quartier} onChange={(e) => handleInputChange('quartier', e.target.value)}/>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Personne à contacter en cas d'urgence</label>
                                <input type="text" value={formData.personneUrgence} onChange={(e) => handleInputChange('personneUrgence', e.target.value)}/>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Générer la Fiche de Poste
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FichePosteForm;