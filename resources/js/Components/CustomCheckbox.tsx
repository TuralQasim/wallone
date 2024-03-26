import React from "react";
import styles from "../../css/customCheckbox.module.css";
import { FaCheck } from "react-icons/fa";

type CustomCheckboxType = {
    checked: boolean;
    onChange: (arg: boolean) => void;
    text: string;
};
const CustomCheckbox: React.FC<CustomCheckboxType> = ({
    checked,
    onChange,
    text,
}) => {
    return (
        <div
            className={styles.checkboxContainer}
            onClick={() => onChange(!checked)}
        >
            <div className={styles.customCheckbox}>
                {checked && <FaCheck />}
            </div>
            <p>{text}</p>
        </div>
    );
};

export default CustomCheckbox;
