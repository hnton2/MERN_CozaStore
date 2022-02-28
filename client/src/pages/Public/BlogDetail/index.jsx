import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import BlogSidebar from "components/BlogSidebar";
import { Avatar, Container, Grid } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import "./BlogDetail.scss";
import blogServices from "services/blog";
import Preloader from "components/Preloader";
import { Helmet } from "react-helmet";
import parse from "html-react-parser";
import { IMAGE_CLOUDINARY } from "constants/Config";
import moment from "moment";
import { Form, InputField } from "components/CustomForm";
import { reviewValidation } from "helpers/validation";
import { stringAvatar } from "helpers/string";
import { toastMessage } from "helpers/toastMessage";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Blog",
        path: "/blog-category/all",
    },
];

function BlogDetail() {
    const { slug: currentSlug } = useParams();
    const [blog, setBlog] = useState();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogServices.getPublicItem(currentSlug);
                if (response.data.success) setBlog(response.data.item);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [currentSlug]);

    const onSubmit = async (data) => {
        try {
            const res = await blogServices.addComment(blog.slug, data);
            if (res.data.success) setBlog(res.data.item);
        } catch (error) {
            toastMessage({ type: "error", message: error.message });
        }
    };
    return (
        <>
            <Header />
            <Preloader isHidden={blog} />
            {blog && (
                <div className="main">
                    <Helmet>
                        <title>{blog.name}</title>
                    </Helmet>
                    <Container>
                        <Breadcrumbs links={linkData} current={blog.name} />
                        <Grid container spacing={4}>
                            <Grid item md={8} lg={9}>
                                <div className="blog-detail">
                                    <div className="thumb">
                                        <img src={IMAGE_CLOUDINARY + blog.images[0]} alt={blog.name} />
                                        <div className="time">
                                            <span className="day">{moment(blog.updateAt).get("date")}</span>
                                            <span className="month-year">
                                                {moment(blog.updateAt).format("MMM YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="description">
                                        <div className="created">
                                            By <span className="content">Admin</span>
                                            <span className="border">|</span>
                                            <span className="content">
                                                <Link to={`/blog-category/${blog.category.slug}`}>
                                                    {blog.category.name}
                                                </Link>
                                            </span>
                                            <span className="border">|</span>
                                            <span className="content">{blog.reviews.length} comments</span>
                                        </div>
                                    </div>
                                    <h1 className="title">{blog.name}</h1>
                                    <p className="content">{parse(blog.description)}</p>
                                    <div className="comment">
                                        <h2>Leave a comment</h2>
                                        <p>Your email address will not be published. Required fields are marked *</p>
                                        <Form onSubmit={onSubmit} validation={reviewValidation} hiddenLabel>
                                            <InputField name="name" placeholder="Name*" />
                                            <InputField name="email" placeholder="Email*" />
                                            <InputField name="content" placeholder="Comment..." />
                                            <button type="submit" className="submit-btn btn btn-dark text-uppercase">
                                                Post Comment
                                            </button>
                                        </Form>
                                        {blog.comment.length > 0 &&
                                            blog.comment.map((item) => (
                                                <div className="comment__item">
                                                    <Avatar {...stringAvatar(item.name, { width: 60, height: 60 })} />
                                                    <div className="container">
                                                        <p className="title">{item.name}</p>
                                                        <p className="message">{parse(item.content)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={4} lg={3}>
                                <BlogSidebar />
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            )}
            <Footer />
        </>
    );
}

export default BlogDetail;
