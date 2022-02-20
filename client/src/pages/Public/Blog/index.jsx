import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import BlogCard from "components/BlogCard";
import Footer from "components/Footer";
import Header from "components/Header";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import BlogSidebar from "components/BlogSidebar";
import styled from "styled-components";
import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import blogServices from "services/blog";
import Preloader from "components/Preloader";
import { Helmet } from "react-helmet";
import Error404 from "components/404";

const BlogContainer = styled.div`
    padding: 62px 0 60px;
`;

function Blog() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { category: currentCategory } = useParams();
    const [blogs, setBlogs] = useState();
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogServices.getBlogList(currentCategory, currentPage);
                if (response.data.success) {
                    setBlogs(response.data.blogs);
                    setTotalPages(response.data.pages);
                    setCurrentPage(response.data.current);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchBlogs();
    }, [currentCategory, currentPage]);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
        setSearchParams({ page: value });
    };

    return (
        <>
            <Helmet>
                <title>{currentCategory[0].toUpperCase() + currentCategory.slice(1)}</title>
            </Helmet>
            <Header />
            <Preloader isHidden={blogs} />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Blog" />
                <BlogContainer>
                    <Container>
                        <Grid container spacing={4}>
                            <Grid item md={8} lg={9}>
                                {blogs && blogs.length > 0 ? (
                                    <>
                                        {blogs.map((item) => (
                                            <BlogCard key={item._id} primary blog={item} />
                                        ))}
                                        <div>
                                            {totalPages > 1 && (
                                                <Pagination
                                                    page={Number(currentPage)}
                                                    count={totalPages}
                                                    onChange={handleChangePage}
                                                    variant="outlined"
                                                    shape="rounded"
                                                    color="primary"
                                                />
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <Error404 />
                                )}
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
