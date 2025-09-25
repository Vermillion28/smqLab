import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "@/styles/validationAuth.module.css";
import { useRouter } from 'next/router'; // <-- pour accéder aux query params

export default function ValidationAuth() {
  const router = useRouter();

  // 🔹 On récupère email et token depuis l'URL
  const { email: queryEmail, token } = router.query;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const confirmPasswordRef = useRef(null);

  // 🔹 Pré-remplir l'email automatiquement depuis l'URL si présent
  useEffect(() => {
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [queryEmail]);

  // Validation en temps réel pour la confirmation du mot de passe
  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Les mots de passe ne correspondent pas' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.confirmPassword;
        return newErrors;
      });
    }
  }, [password, confirmPassword]);

  // 🔹 handleSubmit mis à jour pour appeler l'API Laravel
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation avant soumission
    const newErrors = {};

    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Veuillez entrer une adresse email valide';
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);

      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    try {
      // 🔹 Requête vers ton backend Laravel
      const res = await fetch("http://127.0.0.1:8000/api/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          password,
          password_confirmation: confirmPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Mot de passe défini avec succès ! Redirection...');
        setTimeout(() => router.push("/connexion"), 2000); // 🔹 Redirection vers la page de connexion
      } else {
        toast.error(data.message || "Erreur lors de la création du mot de passe");
      }
    } catch (err) {
      toast.error("Erreur serveur, réessayez plus tard");
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles.body}>
      <div className={styles.card}>
        <ToastContainer />

        <h1>Inscription</h1>
        <p>Valider votre inscription</p>

        <form
          id="signupForm"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? styles.error : ''}
              disabled // 🔹 On désactive le champ email car il vient de l'URL
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              minLength="6"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? styles.error : ''}
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={confirmPasswordRef}
              className={errors.confirmPassword ? styles.error : ''}
            />
            {errors.confirmPassword && <div className={styles.errorMessage}>{errors.confirmPassword}</div>}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>
      </div>
    </div>
  );
}
