import { Backdrop, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import Error404 from "components/404";
import BlogCard from "components/BlogCard";
import BlogSidebar from "components/BlogSidebar";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import { toastMessage } from "helpers/toastMessage";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams, useSearchParams } from "react-router-dom";
import blogServices from "services/blog";
import styled from "styled-components";

const BlogContainer = styled.div`
    padding: 62px 0 60px;
`;

function Blog() {
    let [searchParams, setSearchParams] = useSearchParams();
    const { category: currentCategory } = useParams();
    const [blogs, setBlogs] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setIsLoading(true);
                const response = await blogServices.getBlogsInCategory({
                    category: currentCategory,
                    ...Object.fromEntries([...searchParams]),
                });
                if (response.data.success) {
                    setBlogs(response.data.blogs);
                    setTotalPages(response.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchBlogs();
    }, [currentCategory, searchParams]);

    const handleChangePage = (event, value) => {
        if (value !== 1) setSearchParams({ ...Object.fromEntries([...searchParams]), page: value });
        else {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
    };

    return (
        <>
            <Helmet>
                <title>{currentCategory[0].toUpperCase() + currentCategory.slice(1)}</title>
            </Helmet>
            <Header />
            <Preloader isHidden={blogs} />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                                    page={Number(searchParams.get("page") || 1)}
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
