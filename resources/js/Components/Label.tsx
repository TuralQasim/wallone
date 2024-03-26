import React, { useState } from "react";
import styles from "../../css/label.module.css";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
type LabelProps = {
    title: string;
    placeholder?: string;
    type: string;
    name: string;
    register: any;
    errorMsg: string | undefined;
};
const Label: React.FC<LabelProps> = ({
    title,
    placeholder,
    type,
    name,
    register,
    errorMsg,
}) => {
    const [pass, setPass] = useState(true);
    return (
        <label htmlFor={name} className={styles.label}>
            <h2>{title}</h2>
            <input
                placeholder={placeholder}
                id={name}
                type={type === "password" ? (pass ? "password" : "text") : type}
                {...register}
            />
            <div className={`${styles.eye} ${errorMsg ? styles.eyeTop : ""}`}>
                {type === "password" &&
                    (!pass ? (
                        <IoMdEyeOff onClick={() => setPass(true)} />
                    ) : (
                        <IoEye onClick={() => setPass(false)} />
                    ))}
            </div>
            {errorMsg && <span className="error_message">{errorMsg}</span>}
        </label>
    );
};

export default Label;
