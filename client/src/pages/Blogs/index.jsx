import { Container, Grid, Pagination } from "@mui/material";
import React from "react";
import BlogCard from "../../components/BlogCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TitlePage from "../../components/TitlePage";
import Image from "../../constants/Image";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Blogs.scss";

const dataProduct = [
    {
        path: "#",
        name: "White Shirt With Pleat Detail Back",
        image: Image.PRODUCT1,
        price: "19.00",
    },
    {
        path: "#",
        name: "White Shirt With Pleat Detail Back",
        image: Image.PRODUCT2,
        price: "19.00",
    },
    {
        path: "#",
        name: "White Shirt With Pleat Detail Back",
        image: Image.PRODUCT3,
        price: "19.00",
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

const CardContainer = styled.div`
    display: flex;
    margin-bottom: 30px;
`;

const ImageLink = styled(Link)`
    display: block;
    overflow: hidden;
    margin-right: 20px;
    min-width: 90px;
    &:hover > img {
        transform: scale(1.1);
    }
`;

const ImageCard = styled.img`
    width: 90px;
    object-fit: contain;
    transition: 0.8s ease;
`;

const DescriptionCard = styled.div`
    padding-top: 8px;
    display: flex;
    flex-direction: column;
`;

const TitleCard = styled(Link)`
    font-size: 15px;
    line-height: 1.4;
    color: #555;
    transition: 0.3s;

    &:hover {
        color: #6c7ae0;
    }
`;

const PriceCard = styled.span`
    font-size: 15px;
    color: #888;
    padding-top: 20px;
`;

const SidebarCard = ({ path, image, name, price }) => (
    <CardContainer>
        <ImageLink to={path}>
            <ImageCard src={image} alt={name} />
        </ImageLink>
        <DescriptionCard>
            <TitleCard to={path}>{name}</TitleCard>
            <PriceCard>${price}</PriceCard>
        </DescriptionCard>
    </CardContainer>
);

function Blogs() {
    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Blog" />
                <div className="blog">
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
                                <div className="blog__menu">
                                    <form className="search">
                                        <input type="text" placeholder="Search" />
                                        <button>
                                            <SearchIcon fontSize="small" />
                                        </button>
                                    </form>
                                    <h3 className="title">Categories</h3>
                                    <ul className="blog-category">
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
                                    <h3 className="title">Featured Products</h3>
                                    {dataProduct.map((item, index) => (
                                        <SidebarCard
                                            path={item.path}
                                            image={item.image}
                                            name={item.name}
                                            price={item.price}
                                            key={index + 1}
                                        />
                                    ))}
                                    <h3 className="title">Tags</h3>
                                    <div className="tags">
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
