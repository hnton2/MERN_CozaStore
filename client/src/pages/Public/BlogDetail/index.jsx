import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Image from "constants/Image";
import BlogSidebar from "components/BlogSidebar";
import { Container, Grid } from "@mui/material";
import Breadcrumbs from "components/Breadcumbs";
import { Link } from "react-router-dom";
import "./BlogDetail.scss";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Men",
        path: "/category",
    },
];

function BlogDetail() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Lightweight Jacket" />
                    <Grid container spacing={4}>
                        <Grid item md={8} lg={9}>
                            <div className="blog-detail">
                                <div className="thumb">
                                    <img src={Image.BLOG1} alt="" />
                                    <div className="time">
                                        <span className="day">18</span>
                                        <span className="month-year">Jan 2020</span>
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="created">
                                        By <span className="content">Admin</span>
                                        <span className="border">|</span>
                                        <span className="content">StreetStyle, Fashion, Couple</span>
                                        <span className="border">|</span>
                                        <span className="content">8 comments</span>
                                    </div>
                                </div>
                                <h1 className="title">8 Inspiring Ways to Wear Dresses in the Winter</h1>
                                <p className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet est vel orci
                                    luctus sollicitudin. Duis eleifend vestibulum justo, varius semper lacus condimentum
                                    dictum. Donec pulvinar a magna ut malesuada. In posuere felis diam, vel sodales
                                    metus accumsan in. Duis viverra dui eu pharetra pellentesque. Donec a eros leo.
                                    Quisque sed ligula vitae lorem efficitur faucibus. Praesent sit amet imperdiet ante.
                                    Nulla id tellus auctor, dictum libero a, malesuada nisi. Nulla in porta nibh, id
                                    vestibulum ipsum. Praesent dapibus tempus erat quis aliquet. Donec ac purus id
                                    sapien condimentum feugiat. Praesent vel mi bibendum, finibus leo ac, condimentum
                                    arcu. Pellentesque sem ex, tristique sit amet suscipit in, mattis imperdiet enim.
                                    Integer tempus justo nec velit fringilla, eget eleifend neque blandit. Sed tempor
                                    magna sed congue auctor. Mauris eu turpis eget tortor ultricies elementum. Phasellus
                                    vel placerat orci, a venenatis justo. Phasellus faucibus venenatis nisl vitae
                                    vestibulum. Praesent id nibh arcu. Vivamus sagittis accumsan felis, quis vulputate
                                </p>
                                <div className="tags">
                                    <span>Tags</span>
                                    <Link to="#" className="tag">
                                        Fashion
                                    </Link>
                                    <Link to="#" className="tag">
                                        Lifestyle
                                    </Link>
                                    <Link to="#" className="tag">
                                        Sports
                                    </Link>
                                    <Link to="#" className="tag">
                                        Street style
                                    </Link>
                                    <Link to="#" className="tag">
                                        Crafts
                                    </Link>
                                </div>
                                <form className="comment">
                                    <h2>Leave a comment</h2>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                    <input type="text" placeholder="Name*" />
                                    <input type="text" placeholder="Email*" />
                                    <textarea cols="30" rows="10" placeholder="Comment..."></textarea>
                                    <button className="btn bg-dark btn-lg text-uppercase">Post Comment</button>
                                </form>
                            </div>
                        </Grid>
                        <Grid item md={4} lg={3}>
                            <BlogSidebar />
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default BlogDetail;
