// LayoutWithHeader.js
import React from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Loading from "../Components/Loading";

const LayoutWithHeader = (PageComponent: any) => (props: any) =>
    (
        <div className="app_container">
            <Header />
            <div className="main_container">
                <Navbar />
                <div className="container">
                    <React.Suspense fallback={<Loading />}>
                        <PageComponent {...props} />
                    </React.Suspense>
                </div>
            </div>
        </div>
    );

export default LayoutWithHeader;
