import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import Label from "../Components/Label";
import Button from "../Components/Button";
import styles from "../../css/secondStep.module.css";
import { toast } from "react-toastify";
import RegisterLayout from "../Layouts/RegisterLayout";
import { usePage } from "@inertiajs/inertia-react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const schema = Yup.object().shape({
    confirmEmail: Yup.string().required("Пожалуйста, введите код"),
});
type VerifyEmailProps = {
    title: string;
    page: any;
};
const VerifyEmail: React.FC<VerifyEmailProps> = ({ title, page }) => {
    const [error, setError] = useState(false);
    if (page.error) {
        const err = page.error.toString();
        toast.error(err);
    }
    type authType = {
        user: any;
    };
    const auth: authType = Object(page?.auth);
    if (auth.user) {
        // setUser(auth.user);
        // console.log(auth.user);
    }
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitForm = (values: any) => {
        if (
            page.verification_code &&
            page.verification_code === values.confirmEmail
        ) {
            router.post("/verify-email", {
                verification_code: values.confirmEmail,
            });

            // toast.success("Email был подтвержден!");
        } else {
            setError(true);
            toast.error("Код написан неправильно");
        }
    };

    // Условие, если пользователь не загружен, можно обработать отдельно
    return (
        <>
            <Head title={title} />
            <form
                className={styles.secondStep}
                onSubmit={handleSubmit(submitForm)}
            >
                <div className="form_title">
                    <div className="standard_back">
                        <div className="back">
                            <IoIosArrowBack />
                        </div>
                        <h4>Вернуться назад</h4>
                    </div>
                    <h2>Подтверждение почтового ящика</h2>
                </div>
                <Label
                    title="Введите код отправленный на email@wallone.ru"
                    placeholder="007JDy"
                    type="text"
                    name="confirmEmail"
                    register={register("confirmEmail")}
                    errorMsg={errors.confirmEmail?.message}
                />
                <span>{page.verification_code}</span>
                {error && (
                    <span className={styles.error}>
                        Код написан неправильно
                    </span>
                )}
                <div className={styles.actions}>
                    <Button text="Подтвердить" />
                </div>
            </form>
        </>
    );
};

export default RegisterLayout(VerifyEmail);
