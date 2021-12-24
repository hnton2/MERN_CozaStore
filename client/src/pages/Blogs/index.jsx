import { Container, Grid, Pagination } from "@mui/material";
import React from "react";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TitlePage from "../../components/TitlePage";
import Image from "../../constants/Image";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

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

function Blogs() {
    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Blog" />
                <div className="blogs">
                    <Container>
                        <Grid container spacing={2}>
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
                                <div className="sidebar">
                                    <form className="sidebar__search">
                                        <input type="text" placeholder="Search" />
                                        <button>
                                            <SearchIcon />
                                        </button>
                                    </form>
                                    <h3 className="sidebar__title">Categories</h3>
                                    <ul className="category">
                                        <li>
                                            <Link to="#" className="category__link">
                                                Fashion
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="category__link">
                                                Beauty
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="category__link">
                                                Street Style
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="category__link">
                                                Life Style
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="#" className="category__link">
                                                DIY & Crafts
                                            </Link>
                                        </li>
                                    </ul>
                                    <h3 className="sidebar__title">Featured Products</h3>
                                    <div className="sidebar-product">
                                        <Link to="#">
                                            <img src={Image.PRODUCT1} alt="" />
                                        </Link>
                                        <div className="sidebar-product__desc">
                                            <h4 className="title">White Shirt With Pleat Detail Back</h4>
                                            <span className="price"> $19.00</span>
                                        </div>
                                    </div>
                                    <div className="sidebar-product">
                                        <Link to="#">
                                            <img src={Image.PRODUCT2} alt="" />
                                        </Link>
                                        <div className="sidebar-product__desc">
                                            <h4 className="title">White Shirt With Pleat Detail Back</h4>
                                            <span className="price"> $19.00</span>
                                        </div>
                                    </div>
                                    <div className="sidebar-product">
                                        <Link to="#">
                                            <img src={Image.PRODUCT3} alt="" />
                                        </Link>
                                        <div className="sidebar-product__desc">
                                            <h4 className="title">White Shirt With Pleat Detail Back</h4>
                                            <span className="price"> $19.00</span>
                                        </div>
                                    </div>
                                    <h3 className="sidebar__title">Tags</h3>
                                    <div className="category__filter-tags">
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
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Blogs;
