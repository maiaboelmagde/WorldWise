import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}

export function ButtonBack({ onClick }) {
    const navigate = useNavigate();
    return (
        <Button type="back" onClick={() => navigate(-1)}>{'<= Back'}</Button>
    );
}

export default Button;
