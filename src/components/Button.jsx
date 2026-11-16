import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function Button({ children, onClick, type, floated }) {
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]} ${floated && styles.floatedButton}`}>
            {children}
        </button>
    );
}

export function ButtonBack() {

    const navigate = useNavigate();
    return (
        <Button type="back" onClick={(e) => {
            e.preventDefault();
            navigate(-1)
        }}>{'<= Back'}</Button>
    );
}

export default Button;
