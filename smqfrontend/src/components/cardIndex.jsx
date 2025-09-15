import styles from "@/styles/cardComponent.module.css";

const CardIndex = ({Icone, title, description}) => {
    return (
        <div className={styles.cardIndex}>
            <Icone size={30} color="#3F2B96" />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};
export default CardIndex;