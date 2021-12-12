import React from "react";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
function Home() {
    return (
        <>
            <Header />
            <div className="main">
                <Carousel />
            </div>
        </>
    );
}

export default Home;
