import React from "react";
import Banner from "../../components/Banner";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import Image from "../../constants/Image";
function Home() {
    return (
        <>
            <Header />
            <div className="main">
                <Carousel />
                <div className="home-banner">
                    <Banner title="Women" subtitle="Spring 2020" image={Image.BANNER4} />
                    <Banner title="Men" subtitle="Spring 2020" image={Image.BANNER5} />
                    <Banner title="Bags" subtitle="New Trend" image={Image.BANNER6} />
                </div>
            </div>
        </>
    );
}

export default Home;
