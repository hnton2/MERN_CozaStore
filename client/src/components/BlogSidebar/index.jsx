import React from "react";
import "./BlogSidebar.scss";
import Image from "constants/Image";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

function BlogSidebar() {
    return (
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
                <SidebarCard path={item.path} image={item.image} name={item.name} price={item.price} key={index + 1} />
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
    );
}

export default BlogSidebar;
