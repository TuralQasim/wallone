import React from "react";
import styles from "../../css/button.module.css";
type buttonProps = {
    text: string;
    onClick?: any;
};
const Button: React.FC<buttonProps> = ({ text, onClick }) => {
    return (
        <button
            type="submit"
            onClick={onClick ? onClick : ""}
            className={styles.button}
        >
            {text}
        </button>
    );
};

export default Button;
