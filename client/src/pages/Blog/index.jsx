import { Container, Grid, Pagination } from "@mui/material";
import React from "react";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TitlePage from "../../components/TitlePage";
import Image from "../../constants/Image";
import styled from "styled-components";
import BlogSidebar from "../../components/BlogSidebar";

const BlogContainer = styled.div`
    padding: 62px 0 60px;
`;

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

function Blog() {
    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Blog" />
                <BlogContainer>
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item md={8} lg={9}>
                                {dataBlog.map((item, index) => (
                                    <BlogCard
                                        key={index}
                                        title={item.title}
                                        image={item.image}
                                        author={item.author}
                                        created={item.created}
                                        summary={item.summary}
                                        primary
                                    />
                                ))}
                                <div>
                                    <Pagination count={10} variant="outlined" size="large" color="secondary" />
                                </div>
                            </Grid>
                            <Grid item md={4} lg={3}>
                                <BlogSidebar />
                            </Grid>
                        </Grid>
                    </Container>
                </BlogContainer>
            </div>
            <Footer />
        </>
    );
}

export default Blog;
