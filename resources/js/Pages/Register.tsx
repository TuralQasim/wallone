import { useDispatch } from "react-redux";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Label from "../Components/Label";
import Button from "../Components/Button";
import React from "react";
import styles from "../../css/firstStep.module.css";
import { router } from "@inertiajs/react";
import RegisterLayout from "../Layouts/RegisterLayout";

const schema = Yup.object({
    username: Yup.string().required("Пожалуйста, введите имя пользователя"),
    email: Yup.string()
        .email("Некорректный Email")
        .required("Пожалуйста, введите Email"),
    password: Yup.string().required("Пожалуйста, введите пароль"),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Пароли должны совпадать")
        .required("Пожалуйста, подтвердите пароль"),
});

type registerProps = {
    page: any;
};
const Register: React.FC<registerProps> = ({ page }) => {
    console.log(page);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit (data: any) {
        router.post("/register", {
            username: data.username,
            email: data.email,
            password: data.password,
            repeated_password: data.passwordConfirm,
        });
    };

    return (
        <form className={styles.firstStep} onSubmit={handleSubmit(onSubmit)}>
            <Label
                title="Имя пользователя"
                placeholder="Введите имя пользователя..."
                type="text"
                name="username"
                register={register("username")}
                errorMsg={errors.username?.message}
            />
            <Label
                title="Email"
                placeholder="Введите ваш Email..."
                type="email"
                name="email"
                register={register("email")}
                errorMsg={errors.email?.message}
            />
            <Label
                title="Пароль"
                placeholder="Введите пароль..."
                type="password"
                name="password"
                register={register("password")}
                errorMsg={errors.password?.message}
            />
            <Label
                title="Повторите пароль"
                placeholder="Повторите пароль..."
                type="password"
                name="passwordConfirm"
                register={register("passwordConfirm")}
                errorMsg={errors.passwordConfirm?.message}
            />
            <div className={styles.actions}>
                <Button text="Продолжить" />
            </div>
        </form>
    );
};

export default RegisterLayout(Register);
