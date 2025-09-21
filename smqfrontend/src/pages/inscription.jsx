import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/inscription.module.css";
import { FaRegUser, FaEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useRouter } from "next/router"; //ajout pour l'nvoi vers la page login

export default function Inscription() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  //Amélioration
  const togglePassword = (field) => {
    if (field === "password") setShowPassword(!showPassword);
    if (field === "confirmPassword")
      setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }

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

  //Consommation de l'Api
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Utilisateur enregistré !");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        // Redirection vers connexion après quelques seconde (le temps que l'alerte s’affiche)
        setTimeout(() => {
          router.push("/connexion");
        }, 5000);
      } else {
        // Gestion des erreurs de validation
        // Cas 1 : erreurs de validation Laravel (J’ai ajouté .flat() pour gérer quand Laravel renvoie des tableaux d’erreurs (ce qu’il fait souvent).)
        if (data.errorsList) {
          Object.values(data.errorsList)
            .flat()
            .forEach((msg) => toast.error(msg));
        }
        // Cas 2 : autre type d’erreur (ex: backend renvoie juste message)
        else if (data.message) {
          toast.error(data.message);
        } else {
          toast.error(data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (error) {
      toast.error("Impossible de contacter le serveur");
    }
  };

  return (
    <div className={styles.inscription}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.illustrationContent}>
            <div className={styles.illustration}>SMQ Platform</div>
            <h1 className={styles.illustrationTitle}>
              Système de Management de{" "}
              <span className={styles.gradientText}>Qualité</span>
            </h1>
            <p className={styles.illustrationSubtitle}>
              Optimisez vos processus qualité, assurez la conformité ISO et
              améliorez l'efficacité de votre organisation avec notre plateforme
              innovante de gestion SMQ.
            </p>
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

        <div className={styles.rightSide}>
          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>
                  Créer votre compte Responsable Qualité
                </h2>
                <p className={styles.formSubtitle}>
                  Rejoignez notre plateforme de gestion de la qualité
                </p>
              </div>

              <form
                id="signupForm"
                className={styles.signupForm}
                onSubmit={handleSubmit}
              >
                <div className={styles.formGroup}>
                  <div className={styles.formRow}>
                    <div>
                      <label className={styles.formLabel} htmlFor="name">
                        Nom
                      </label>
                      <div className={styles.inputContainer}>
                        <FaRegUser className={styles.inputIcon} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className={styles.formInput}
                          placeholder="Nom d'utilisateur"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">
                    Email
                  </label>
                  <div className={styles.inputContainer}>
                    <AiOutlineMail className={styles.inputIcon} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={styles.formInput}
                      placeholder="username@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="password">
                    Mot de passe
                  </label>
                  <div className={styles.inputContainer}>
                    <AiOutlineLock className={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className={styles.formInput}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => togglePassword("password")}
                    >
                      <FaRegEyeSlash />
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </label>
                  <div className={styles.inputContainer}>
                    <AiOutlineLock className={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className={styles.formInput}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className={styles.passwordToggle}
                      onClick={() => togglePassword("confirmPassword")}
                    >
                      <FaRegEyeSlash />
                    </button>
                  </div>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Créer mon compte QMS
                </button>

                <div className={styles.loginLink}>
                  Déjà un compte ? <a href="/connexion">Se connecter</a>
                </div>
              </form>

              <div className={styles.footerText}>
                En créant un compte, vous acceptez nos
                <a href="#"> Conditions d'utilisation</a> et notre
                <a href="#"> Politique de confidentialité</a>
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
