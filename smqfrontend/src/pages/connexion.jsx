import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/styles/connexion.module.css";
import { FaRegUser, FaEye, FaRegEyeSlash } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

export default function Inscription() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const togglePassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        if (formData.password.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Veuillez entrer une adresse email valide");
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Simulation d'un appel API
        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simuler un succès 80% du temps
                    if (Math.random() > 0.2) {
                        resolve();
                    } else {
                        reject(new Error("Erreur de serveur. Veuillez réessayer."));
                    }
                }, 2000);
            }),
            {
                pending: 'Création de votre compte en cours...',
                success: 'Compte créé avec succès! Redirection...',
                error: 'Erreur lors de la création du compte'
            }
        );
    };

    return (
        <div className={styles.inscription}>
            <div className={styles.container}>

                <div className={styles.rightSide}>
                    <div className={styles.formContainer}>
                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Connectez-vous à votre compte SMQ</h2>
                            </div>

                            <form id="signupForm" className={styles.signupForm} onSubmit={handleSubmit}>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="email">Email</label>
                                    <div className={styles.inputContainer}>
                                        <AiOutlineMail className={styles.inputIcon} />
                                        <input type="email" id="email" name="email" className={styles.formInput} placeholder="user@email.com" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel} htmlFor="password">Mot de passe</label>
                                    <div className={styles.inputContainer}>
                                        <AiOutlineLock className={styles.inputIcon} />
                                        <input type={showPassword ? "text" : "password"} id="password" name="password" className={styles.formInput} placeholder="••••••••" value={formData.password} onChange={handleInputChange} required />
                                        <button type="button" className={styles.passwordToggle} onClick={() => togglePassword('password')}>
                                            <FaRegEyeSlash />
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" className={styles.submitBtn}>Se connecter</button>

                                <div className={styles.loginLink}>Vous n'avez pas de compte ? <a href="/inscription">S'inscrire</a></div>
                            </form>

                            <div className={styles.footerText}>En créant un compte, vous acceptez nos<a href="#"> Conditions d'utilisation</a> et notre<a href="#"> Politique de confidentialité</a></div>
                        </div>
                    </div>
                </div>

                <div className={styles.leftSide}>
                    <div className={styles.illustrationContent}>
                        <div className={styles.illustration}>SMQ Platform</div>
                        <h1 className={styles.illustrationTitle}>Système de Management de <span className={styles.gradientText}>Qualité</span></h1>
                        <p className={styles.illustrationSubtitle}>Optimisez vos processus qualité, assurez la conformité ISO et améliorez l'efficacité de votre organisation avec notre plateforme innovante de gestion SMQ.</p>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <div className={styles.featureDot}></div>
                                <span>Conformité ISO 9001</span>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureDot}></div>
                                <span>Audit automatisé</span>
                            </div>
                            <div className={styles.feature}>
                                <div className={styles.featureDot}></div>
                                <span>Rapports en temps réel</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container pour les notifications Toastify */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}