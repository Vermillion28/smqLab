import styles from "@/styles/cardComponent.module.css";

const CardFeatures = ({chiffre, chiffreH2, title, description}) => {
    return (
        <div className={styles.cardFeatures}>
            <h1>{chiffre}</h1>
            <h3>{chiffreH2}</h3>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};
export default CardFeatures;
