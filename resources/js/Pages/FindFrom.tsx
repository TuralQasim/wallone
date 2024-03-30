import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../Components/Button";
import ChecksItem from "../Components/ChecksItem";
import styles from "../../css/thirdStep.module.css";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";
import RegisterLayout from "../Layouts/RegisterLayout";
import { router } from "@inertiajs/react";

// Обновление состояний Redux
const setLoading = (isLoading: boolean) => ({
    type: "LOADING",
    payload: isLoading,
});

const schema = Yup.object().shape({
    selectedOption: Yup.string().required("Выберите минимум один пункт"),
});

type FindFromProps = {
    title: string;
    page: any;
};
const FindFrom: React.FC<FindFromProps> = ({ title, page }) => {
    const itemArr = [
        {
            title: "Telegram",
            icon: "FaTelegramPlane",
        },
        {
            title: "Youtube",
            icon: "FaYoutube",
        },
        {
            title: "VK",
            icon: "SlSocialVkontakte",
        },
        {
            title: "Discord",
            icon: "IoLogoDiscord",
        },
        {
            title: "Twitter",
            icon: "FaTwitter",
        },
        {
            title: "Facebook",
            icon: "FaFacebook",
        },
        {
            title: "Instagram",
            icon: "FaInstagram",
        },
        {
            title: "Другие",
            icon: "HiOutlineSpeakerphone",
        },
    ];
    const [items, setItems] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const { handleSubmit } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (!items) {
            setError(true);
            return;
        } else {
            setError(false);
            const newData = {
                id: page.id,
                find_from: items,
            };
            router.post("/steps/1", newData);
        }
    };

    return (
        <form className={styles.thirdStep} onSubmit={onSubmit}>
            <div className="form_title">
                <IoIosArrowBack className="standard_back" />
                <h2>Как вы о нас узнали?</h2>
            </div>
            <div className={styles.socialsContainer}>
                <div className={styles.socials}>
                    {itemArr.map((item) => (
                        <ChecksItem
                            key={item.icon}
                            icon={item.icon}
                            title={item.title}
                            setItems={setItems}
                            items={items}
                        />
                    ))}
                </div>
                <div className={styles.stepNumbers}>
                    <div className={styles.stepNumbersActive}></div>
                    <div className={styles.stepNumbersItem}></div>
                    <div className={styles.stepNumbersItem}></div>
                </div>
            </div>
            {error && (
                <p className="error_message">Выбери минимум один пункт</p>
            )}
            <div className={styles.actions}>
                <Button text="Далее" />
            </div>
        </form>
    );
};

export default RegisterLayout(FindFrom);
