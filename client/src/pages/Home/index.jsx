import { Container, Grid } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import Carousel from "../../components/Carousel";
import Header from "../../components/Header";
import ProductsSlider from "../../components/ProductsSlider";
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
            <section>
                <Container>
                    <h3 className="section__title">Store Overview</h3>
                    <ProductsSlider />
                </Container>
            </section>
            <section>
                <Container>
                    <h3 className="section__title">Our Blog</h3>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            hello world1
                        </Grid>
                        <Grid item xs={4}>
                            hello world2
                        </Grid>
                        <Grid item xs={4}>
                            hello world3
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </>
    );
}

export default Home;
