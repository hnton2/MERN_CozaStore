import { Container, Grid } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import BlogCard from "../../components/BlogCard";
import Carousel from "../../components/Carousel";
import CustomTabs from "../../components/CustomTabs";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductsSlider from "../../components/ProductsSlider";
import Image from "../../constants/Image";

const dataTab1 = [
    {
        name: "Esprit Ruffle Shirt",
        price: 16.64,
        image: Image.PRODUCT1,
    },
    {
        name: "Herschel Supply",
        price: 16.64,
        image: Image.PRODUCT2,
    },
    {
        name: "Only Check Trouser",
        price: 16.64,
        image: Image.PRODUCT3,
    },
    {
        name: "Classic Trench Coat",
        price: 16.64,
        image: Image.PRODUCT4,
    },
    {
        name: "Front Pocket Jumper",
        price: 16.64,
        image: Image.PRODUCT5,
    },
    {
        name: "Vintage Inspired Classic",
        price: 16.64,
        image: Image.PRODUCT6,
    },
    {
        name: "Shirt in Stretch Cotton",
        price: 16.64,
        image: Image.PRODUCT7,
    },
    {
        name: "Pieces Metallic Printed",
        price: 16.64,
        image: Image.PRODUCT8,
    },
];

const dataBlog = [
    {
        title: "8 Inspiring Ways to Wear Dresses in the Winter",
        image: Image.BLOG1,
        author: "Nancy Ward",
        created: "July 22, 2017",
        summary:
            "Duis ut velit gravida nibh bibendum commodo. Suspendisse pellentesque mattis augue id euismod. Interdum et male-suada fames",
    },
    {
        title: "The Great Big List of Men’s Gifts for the Holidays",
        image: Image.BLOG2,
        author: "Nancy Ward",
        created: "July 18, 2017",
        summary:
            "Nullam scelerisque, lacus sed consequat laoreet, dui enim iaculis leo, eu viverra ex nulla in tellus. Nullam nec ornare tellus, ac fringilla lacus. Ut sit ame",
    },
    {
        title: "5 Winter-to-Spring Fashion Trends to Try Now",
        image: Image.BLOG3,
        author: "Nancy Ward",
        created: "July 2, 2017",
        summary:
            "Proin nec vehicula lorem, a efficitur ex. Nam vehicula nulla vel erat tincidunt, sed hendrerit ligula porttitor. Fusce sit amet maximus nunc",
    },
];

const overviewData = [
    {
        label: "Best Seller",
        content: <ProductsSlider products={dataTab1} />,
    },
    {
        label: "Featured",
        content: <ProductsSlider products={dataTab1} />,
    },
    {
        label: "Sale",
        content: <ProductsSlider products={dataTab1} />,
    },
    {
        label: "Top Rate",
        content: <ProductsSlider products={dataTab1} />,
    },
];

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
                <section className="overview">
                    <Container>
                        <h3 className="section__title">Store Overview</h3>
                        <CustomTabs panels={overviewData} />
                    </Container>
                </section>
                <section className="blogs">
                    <Container>
                        <h3 className="section__title">Our Blogs</h3>
                        <Grid container spacing={1}>
                            {dataBlog.map((item, index) => (
                                <Grid item sm={6} md={4} key={index}>
                                    <BlogCard
                                        title={item.title}
                                        image={item.image}
                                        author={item.author}
                                        created={item.created}
                                        summary={item.summary}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default Home;
