import React from "react";
import { Head, usePage } from "@inertiajs/react";
import styles from "../../css/home.module.css";
import LayoutWithHeader from "../Layouts/LayoutWithHeader";

type homeProps = {
    title: string;
    layout: boolean;
    page: any;
};
const Home: React.FC<homeProps> = ({ title, layout, page }) => {
    return (
        <>
            <Head title={title} />
            <div className={styles.home}>Home</div>
        </>
    );
};

export default LayoutWithHeader(Home);
