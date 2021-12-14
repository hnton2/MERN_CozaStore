import { Container, Grid } from "@mui/material";
import React from "react";
import Banner from "../../components/Banner";
import BlogCard from "../../components/BlogCard";
import Carousel from "../../components/Carousel";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductsSlider from "../../components/ProductsSlider";
import Image from "../../constants/Image";

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
            <section className="overview">
                <Container>
                    <h3 className="section__title">Store Overview</h3>
                    <ProductsSlider />
                </Container>
            </section>
            <section className="blogs">
                <Container>
                    <h3 className="section__title">Our Blogs</h3>
                    <Grid container spacing={1}>
                        {dataBlog.map((item, index) => (
                            <Grid item sm={6} md={4}>
                                <BlogCard
                                    key={index}
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
            <Footer />
        </>
    );
}

export default Home;
