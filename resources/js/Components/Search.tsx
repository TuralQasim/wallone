import React, { useRef, useState } from "react";
import styles from "../../css/search.module.css";
import microphone from "../../../public/icons/microphone.svg";
import { IoSearch } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutSide } from "../../hooks/useClickOutSide";
import { Link } from "@inertiajs/react";

const Search: React.FC = () => {
    const [drop, setDrop] = useState(false);
    const dropRef = useRef(null);
    useClickOutSide(dropRef, () => {
        setDrop(false);
    });
    return (
        <div className={styles.search}>
            <label htmlFor="search" data-value="search">
                <input
                    type="text"
                    onChange={() => {
                        setDrop(true);
                    }}
                    id="search"
                    placeholder="Поиск..."
                />
                <IoSearch />
                {drop && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ y: -100 }}
                            animate={{ y: 0 }}
                            exit={{ y: -100 }}
                            ref={dropRef}
                            data-value="searchDropdown"
                            className={styles.searchDropdown}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link href="">
                                <IoSearch />
                                <p>Привет</p>
                            </Link>
                            <Link href="">
                                <IoSearch />
                                <p>Новый Прив</p>
                            </Link>
                            <Link href="">
                                <IoSearch />
                                <p>Hello World</p>
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                )}
            </label>
            <button>
                <img src={microphone} alt="" />
            </button>
        </div>
    );
};

export default Search;
