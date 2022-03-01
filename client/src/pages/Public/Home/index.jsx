import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Banner from "components/Banner";
import BlogCard from "components/BlogCard";
import Carousel from "components/Carousel";
import CustomTabs from "components/CustomTabs";
import Footer from "components/Footer";
import Header from "components/Header";
import ProductsSlider from "components/ProductsSlider";
import Image from "constants/Image";
import Preloader from "components/Preloader";
import { Helmet } from "react-helmet";
import blogServices from "services/blog";
import sliderServices from "services/slider";
import { toastMessage } from "helpers/toastMessage";

const overviewData = [
    {
        label: "Shoes",
        content: <ProductsSlider task="newest" params={{ category: "shoes" }} />,
    },
    {
        label: "Clothing",
        content: <ProductsSlider task="newest" params={{ category: "clothing" }} />,
    },
    {
        label: "Caps",
        content: <ProductsSlider task="newest" params={{ category: "caps" }} />,
    },
    {
        label: "Socks",
        content: <ProductsSlider task="newest" params={{ category: "socks" }} />,
    },
    {
        label: "Bags",
        content: <ProductsSlider task="newest" params={{ category: "bags" }} />,
    },
];

function Home() {
    const [blogs, setBlogs] = useState();
    const [sliders, setSliders] = useState();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await blogServices.getPublicNewItems();
                if (res.data.success) setBlogs(res.data.items);
                else {
                    toastMessage({ type: "error", message: res.data.message });
                    window.location.reload();
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };

        const fetchSliders = async () => {
            try {
                const res = await sliderServices.getPublicItems();
                if (res.data.success) setSliders(res.data.items);
                else {
                    toastMessage({ type: "error", message: res.data.message });
                    window.location.reload();
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchBlogs();
        fetchSliders();
    }, []);

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Header />
            <Preloader isHidden={sliders} />
            <div className="main">
                {sliders && <Carousel data={sliders} />}
                <div className="home-banner">
                    <Banner
                        title="Women"
                        subtitle="Spring 2020"
                        image={Image.BANNER4}
                        path="/product-category/all?tag=women"
                    />
                    <Banner
                        title="Men"
                        subtitle="Spring 2020"
                        image={Image.BANNER5}
                        path="/product-category/all?tag=men"
                    />
                    <Banner title="Caps" subtitle="New Trend" image={Image.BANNER6} path="/product-category/caps" />
                </div>
                <section className="overview">
                    <Container>
                        <h3 className="section__title">Store Overview</h3>
                        <CustomTabs data={overviewData} />
                    </Container>
                </section>
                <section className="blogs">
                    <Container>
                        <h3 className="section__title">Our Blogs</h3>
                        {blogs && blogs.length > 0 && (
                            <Grid container spacing={1}>
                                {blogs.map((item) => (
                                    <Grid item sm={6} md={4} key={item._id}>
                                        <BlogCard blog={item} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Container>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Home;
