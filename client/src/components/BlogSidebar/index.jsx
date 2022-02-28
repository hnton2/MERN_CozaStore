import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { toastMessage } from "helpers/toastMessage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import productServices from "services/product";
import styled from "styled-components";
import "./BlogSidebar.scss";

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
    let [searchParams, setSearchParams] = useSearchParams();
    const categoryBlog = useSelector((state) => state.category.categoryBlog);

    const [search, setSearch] = useState("");
    const [products, setProducts] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await productServices.getItemsByTask("newest", { category: "shoes" });
                if (res.data.success) setProducts(res.data.items);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
        if (value !== "") {
            searchParams.delete("page");
            setSearchParams({ ...Object.fromEntries([...searchParams]), search: value });
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="blog__menu">
            <form className="search">
                <SearchIcon fontSize="small" />
                <input
                    type="text"
                    value={search}
                    placeholder="Search"
                    onChange={(event) => handleSearch(event.target.value)}
                />
                <CloseIcon
                    className="search-icon delete"
                    onClick={() => handleSearch("")}
                    style={{
                        visibility: search ? "visible" : "hidden",
                    }}
                />
            </form>
            <h3 className="title">Categories</h3>
            <ul className="blog-category">
                <li>
                    <Link to="/blog-category/all" className="category__link">
                        All
                    </Link>
                </li>
                {categoryBlog.map((item) => (
                    <li key={item._id}>
                        <Link to={`/blog-category/${item.slug}`} className="category__link">
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {products && (
                <>
                    <h3 className="title">Featured Products</h3>
                    {products.map((item) => (
                        <SidebarCard
                            path={`/product/${item.slug}`}
                            image={IMAGE_CLOUDINARY + item.images[0]}
                            name={item.name}
                            price={item.price}
                            key={item._id}
                        />
                    ))}
                </>
            )}
        </div>
    );
}

export default BlogSidebar;
