import styles from "../styles/MybtnComponent.module.css";

function MyButton({text, onClick }) {
    return (
        <button onClick={onClick} type="button" className={styles.myButton}>{text}</button>
    );
}

export default MyButton;