import React, { useState, useRef, useEffect } from "react";
import styles from "../../css/header.module.css";
import logo from "../../../public/icons/logo.svg";
import user from "../../../public/icons/user.svg";
import Search from "../Components/Search";
import { IoIosArrowDown } from "react-icons/io";
import { HiLogin } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { Link, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
const Header: React.FC = () => {
    const page = usePage().props;
    const auth: any = page.auth;
    const [img, setImg] = useState(null);
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        if (auth.user && auth.user.image) {
            setImg(auth.user.image);
            setUserName(auth.user.username);
        }
    }, []);
    const [drop, setDrop] = useState(false);
    const dropRef = useRef(null);
    useClickOutSide(dropRef, () => {
        setDrop(false);
    });
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src={logo} alt="" />
                </Link>
                <div className={styles.morePopular}>
                    <h2>Wallone</h2>
                    <h4>#Бесконечн...</h4>
                </div>
            </div>
            <Search />
            <div className={styles.language}>
                <h3>RU</h3>
                <span>|</span>
                <h3>EN</h3>
            </div>
            <div
                className={styles.account}
                data-value="account"
                onClick={() => setDrop((drop) => !drop)}
            >
                {img ? <img src={img} alt="" /> : <FaUserCircle />}
                <h4>{userName ? userName : "Account"}</h4>
                <IoIosArrowDown />
                {drop && (
                    <AnimatePresence>
                        <motion.ul
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                            exit={{ y: -100 }}
                            ref={dropRef}
                            data-value="accDropdown"
                            className={`${styles.accDropdown} ${
                                auth.user ? styles.accDropdownEntered : ""
                            }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {!auth.user && (
                                <>
                                    <Link
                                        href="/register"
                                        onClick={(e) => {
                                            // setDrop(false);
                                        }}
                                    >
                                        <HiLogin />
                                        <h3>Регистрация</h3>
                                    </Link>
                                    <Link
                                        href="/login"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDrop(false);
                                        }}
                                    >
                                        <HiLogin />
                                        <h3>Авторизация</h3>
                                    </Link>
                                </>
                            )}
                            {img && userName && (
                                <>
                                    <div className={styles.accDropdownUser}>
                                        <img src={img} alt="" />
                                        <div
                                            className={
                                                styles.accDropdownUserName
                                            }
                                        >
                                            <Link href="/">{userName}</Link>
                                            <h5>100.08 ₽</h5>
                                        </div>
                                    </div>
                                    <Link
                                        href="/"
                                        className={styles.userNotification}
                                    >
                                        <IoMdNotificationsOff />
                                        <h5>Уведомления</h5>
                                    </Link>
                                    <Link
                                        href="/"
                                        className={styles.userParams}
                                    >
                                        <IoMdSettings />
                                        <h5>Настройки</h5>
                                    </Link>
                                    <div
                                        onClick={() => {
                                            router.post("/logout");
                                        }}
                                        className={styles.logout}
                                    >
                                        <HiOutlineLogout />
                                        <h5>Выйти</h5>
                                    </div>
                                </>
                            )}
                        </motion.ul>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};

export default Header;
