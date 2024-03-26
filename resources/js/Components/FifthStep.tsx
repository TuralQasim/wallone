import React, { ChangeEvent, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import styles from "../../css/fifthStep.module.css";
import Button from "../Components/Button";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "@inertiajs/react";
import avatar from "../../../public/images/avatar2.png";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux"; // Используйте useSelector вместо useAppSelector для доступа к Redux store
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

type stepType = {
    setSteps: any;
};
const FifthStep: React.FC<stepType> = ({ setSteps }) => {
    const { user } = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [sendFile, setSendFile] = useState<any>(null);
    const [error, setError] = useState(false);
    const setLoading = (isLoading: boolean) => {
        dispatch({ type: "LOADING", payload: isLoading });
    };
    const checkItems = () => {
        if (!sendFile) {
            setError(true);
        } else {
            const formData = new FormData();
            formData.append("image", sendFile);
            formData.append("user_id", user.id); // Убедитесь, что идентификатор пользователя корректно извлекается из состояния

            Inertia.post("/register/add-image", formData, {
                onBefore: () => setError(false),
                onStart: () => {
                    setError(false);
                    setLoading(true);
                },
                onFinish: () => setError(false),
                onSuccess: () => {
                    setLoading(false);
                    toast.success("Спасибо за ответ");
                    setSteps(5); // Переход к следующему шагу или завершению
                },
                onError: (err) => {
                    setLoading(false);
                    toast.error("Что-то пошло не так");
                    console.log(err);
                },
            });
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSendFile(file);
            const reader = new FileReader();
            reader.onloadend = (e) => {
                const base64 = e.target?.result as string;
                setFile(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.fifthStep}>
            <div className="form_title">
                <IoIosArrowBack
                    onClick={() => setSteps(4)}
                    className="standard_back"
                />
                <h2>Профиль</h2>
            </div>
            <div className={styles.upload}>
                <div className={styles.uploadImg}>
                    <img src={file || avatar} alt="Аватар" />
                    <div className={styles.overlay}>
                        <MdOutlineFileUpload />
                    </div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className={styles.uploadText}>
                    <h2>{user.name || "Sergey Egorov"}</h2>{" "}
                    {/* Исправлено для демонстрации использования данных пользователя из состояния */}
                    <h5>@{user.username || "sergey_egorov"}</h5>
                    <p>
                        Привет, необходимо загрузить аватарку для дальнейшего
                        пользования сайтом{" "}
                        <Link href="/">wallone.ru</Link>
                    </p>
                </div>
            </div>
            {error && (
                <span className="error_message">Выберите фото профиля</span>
            )}
            <div className={styles.actions}>
                <Button onClick={checkItems} text="Завершить" />
            </div>
        </div>
    );
};

export default FifthStep;
