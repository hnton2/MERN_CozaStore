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
import productServices from "services/product";
import Preloader from "components/Preloader";
import { Helmet } from "react-helmet";
import blogServices from "services/blog";

function Home() {
    const [products, setProducts] = useState([]);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await productServices.getAllProduct();
                setProducts(response.data.product);
                const response2 = await blogServices.getAllBlog();
                setBlogs(response2.data.blog);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const overviewData = [
        {
            label: "Best Seller",
            content: <ProductsSlider products={products} />,
        },
        {
            label: "Featured",
            content: <ProductsSlider products={products} />,
        },
        {
            label: "New Product",
            content: <ProductsSlider products={products} />,
        },
        {
            label: "Top Rate",
            content: <ProductsSlider products={products} />,
        },
    ];

    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Header />
            <Preloader isHidden={products} />
            <div className="main">
                <Carousel />
                <div className="home-banner">
                    <Banner title="Women" subtitle="Spring 2020" image={Image.BANNER4} slug="women" />
                    <Banner title="Men" subtitle="Spring 2020" image={Image.BANNER5} slug="men" />
                    <Banner title="Bags" subtitle="New Trend" image={Image.BANNER6} slug="bags" />
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
                        <Grid container spacing={1}>
                            {blogs.map((item) => (
                                <Grid item sm={6} md={4} key={item._id}>
                                    <BlogCard blog={item} />
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
