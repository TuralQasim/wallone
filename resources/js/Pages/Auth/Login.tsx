import React, { ReactNode, useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import styles from "../../../css/login.module.css";
import Label from "../../Components/Label";
import logo from "../../../../public/icons/logo.svg";
import vk from "../../../../public/icons/vk.svg";
import anime from "../../../../public/images/anime.jpg";
import { FaTelegramPlane } from "react-icons/fa";
import CustomCheckbox from "../../Components/CustomCheckbox";
import Button from "../../Components/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm as useReactHookForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useDispatch, useSelector } from "react-redux";
const schema = Yup.object().shape({
    email: Yup.string()
        .email("Пожалуйста, введите корректный Email")
        .required("Пожалуйста, введите Email"),
    password: Yup.string().required("Пожалуйста, введите пароль"),
});

type DataType = {
    email: string;
    password: string;
};
type LoginProps = {
    title: string;
};
const Login: React.FC<LoginProps> = ({ title }) => {
    const [check, setCheck] = useState(false);
    const dispatch = useDispatch();
    const page = usePage().props;
    useEffect(() => {
        if (page.email) {
            toast.success("Успешная регистрация!");
        }
    }, []);
    // const { user } = useSelector((state: any) => state?.user);
    // if (page.error) {
    //     const err = page.error.toString();
    //     toast.error(err);
    // }
    // type authType = {
    //     user: any;
    // };
    // const auth: authType = Object(page?.auth);
    // if (auth.user) {
    //     // setUser(auth.user);
    //     // console.log(auth.user);
    // }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useReactHookForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: any) => {
        router.post("/login", {
            ...data,
            remember_me: 0,
        });
    };
    return (
        <>
            <Head title={title} />
            <div className={styles.login}>
                <div className={styles.loginLeft}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <div className={styles.popular}>
                            <Link href="/">Wallone</Link>
                            <h4>#Визуальная новелла</h4>
                        </div>
                    </div>
                    <div className={styles.socials}>
                        <Link href="#">
                            <img src={vk} alt="vk" />
                        </Link>
                        <Link href="#">
                            <FaTelegramPlane />
                        </Link>
                    </div>
                    <img src={anime} alt="anime" />
                </div>
                <div className={styles.loginRight}>
                    <div className={styles.loginForm}>
                        <div className={styles.navigation}>
                            <Link
                                href="/login"
                                className={styles.activeNavigation}
                            >
                                Авторизация
                            </Link>
                            <Link href="/register">Регистрация</Link>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                placeholder="Введите ваш пароль..."
                                type="password"
                                name="password"
                                register={register("password")}
                                errorMsg={errors.password?.message}
                            />
                            <CustomCheckbox
                                checked={check}
                                onChange={() => setCheck(!check)}
                                text="Запомнить меня"
                            />
                            <div className={styles.actions}>
                                <Button text="Войти" />
                                <Link href="/reset">Забыли пароль?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
