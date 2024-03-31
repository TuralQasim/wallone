import React, { ChangeEvent, useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import styles from "../../../css/fifthStep.module.css";
import Button from "../../Components/Button";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "@inertiajs/react";
import avatar from "../../../../public/images/avatar2.png";
import { MdOutlineFileUpload } from "react-icons/md";
import { useSelector } from "react-redux"; // Используйте useSelector вместо useAppSelector для доступа к Redux store
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import RegisterLayout from "../../Layouts/RegisterLayout";
import { router } from "@inertiajs/react";

type AddImageProps = {
    title: string;
    page: any;
};
const AddImage: React.FC<AddImageProps> = ({ title, page }) => {
    const [file, setFile] = useState("");
    const [sendFile, setSendFile] = useState<any>(null);
    const [error, setError] = useState(false);

    const checkItems = () => {
        if (!sendFile) {
            setError(true);
        } else {
            const formData = new FormData();
            formData.append("image", sendFile);
            formData.append("id", page.id);
            router.post("/steps/3", formData);
        }
    };
    useEffect(() => {
        if (page.skills.length) {
            toast.success("Выберите фото профиля");
        }
    }, []);
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
                <IoIosArrowBack className="standard_back" />
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
                    {/* <h2>{user.name || "Sergey Egorov"}</h2>{" "} */}
                    {/* Исправлено для демонстрации использования данных пользователя из состояния */}
                    {/* <h5>@{user.username || "sergey_egorov"}</h5> */}
                    <p>
                        Привет, необходимо загрузить аватарку для дальнейшего
                        пользования сайтом <Link href="/">wallone.ru</Link>
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

export default RegisterLayout(AddImage);
