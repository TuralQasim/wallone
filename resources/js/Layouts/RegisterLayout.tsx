import React, { ReactNode, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import styles from "../../css/register.module.css";
import logo from "../../../public/icons/logo.svg";
import vk from "../../../public/icons/vk.svg";
import anime from "../../../public/images/anime.jpg";
import { FaTelegramPlane } from "react-icons/fa";

const RegisterLayout = (PageComponent: any) => (props: any) => {
    const page = usePage().props;
    return (
        <>
            <div className={styles.register}>
                <div className={styles.registerLeft}>
                    <div className={styles.logo}>
                        <Link href="/">
                            <img src={logo} alt="" />
                        </Link>
                        <div className={styles.popular}>
                            <h3>Wallone</h3>
                            <h4>#Визуальная новелла</h4>
                        </div>
                    </div>
                    <div className={styles.socials}>
                        <Link href="#">
                            <img src={vk} alt="" />
                        </Link>
                        <Link href="#">
                            <FaTelegramPlane />
                        </Link>
                    </div>
                    <img src={anime} alt="" />
                </div>
                <div className={styles.registerRight}>
                    <div className={styles.registerForm}>
                        <div className={styles.navigation}>
                            <Link
                                href="/login"
                                className={styles.activeNavigation}
                            >
                                Авторизация
                            </Link>
                            <Link href="/register">Регистрация</Link>
                        </div>
                        <PageComponent {...props} page={page} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterLayout;
