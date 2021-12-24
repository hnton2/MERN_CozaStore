import { Container, Grid, Pagination, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import TabPanel from "../../components/TabPanel";
import "./Category.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../../components/ProductCard";
import Image from "../../constants/Image";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";

const dataTab1 = [
    {
        name: "Esprit Ruffle Shirt",
        price: 16.64,
        image: Image.PRODUCT1,
    },
    {
        name: "Herschel Supply",
        price: 16.64,
        image: Image.PRODUCT2,
    },
    {
        name: "Only Check Trouser",
        price: 16.64,
        image: Image.PRODUCT3,
    },
    {
        name: "Classic Trench Coat",
        price: 16.64,
        image: Image.PRODUCT4,
    },
    {
        name: "Front Pocket Jumper",
        price: 16.64,
        image: Image.PRODUCT5,
    },
    {
        name: "Vintage Inspired Classic",
        price: 16.64,
        image: Image.PRODUCT6,
    },
    {
        name: "Shirt in Stretch Cotton",
        price: 16.64,
        image: Image.PRODUCT7,
    },
    {
        name: "Pieces Metallic Printed",
        price: 16.64,
        image: Image.PRODUCT8,
    },
];

function Category() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [filter, setFilter] = useState(false);
    const handleSToggleSFilter = () => {
        setFilter(!filter);
        setSearch(false);
    };

    const [search, setSearch] = useState(false);
    const handleToggleSearch = () => {
        setSearch(!search);
        setFilter(false);
    };

    return (
        <>
            <Header />
            <div className="main">
                <Container fixed>
                    <div className="category">
                        <div className="category__header">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <div className="tabs">
                                        <Tabs value={value} onChange={handleChange}>
                                            <Tab label="Best Seller" />
                                            <Tab label="Featured" />
                                            <Tab label="Sale" />
                                            <Tab label="Top Rate" />
                                        </Tabs>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="category__options">
                                        <button
                                            className={`category__options-btn ${filter ? "show-filter" : ""}`}
                                            onClick={handleSToggleSFilter}
                                        >
                                            {filter ? <ClearIcon /> : <FilterListIcon />}
                                            <span>Filter</span>
                                        </button>
                                        <button
                                            className={`category__options-btn ${search ? "show-filter" : ""}`}
                                            onClick={handleToggleSearch}
                                        >
                                            {search ? <ClearIcon /> : <SearchIcon />}
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={`category__search ${search ? "active" : ""}`}>
                            <form>
                                <button>
                                    <SearchIcon sx={{ fontSize: 24 }} />
                                </button>
                                <input type="text" placeholder="Search" />
                            </form>
                        </div>
                        <div className={`category__filter ${filter ? "active" : ""}`}>
                            <div className="category__filter-wrapper">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Sort By</h4>
                                        <ul>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    Default
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link active" to="#">
                                                    Popularity
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    Average rating
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    Newness
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    Price: Low to High
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    Price: High to Low
                                                </Link>
                                            </li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Price</h4>
                                        <ul>
                                            <li>
                                                <Link className="category__filter-link active" to="#">
                                                    All
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    $0.00 - $50.00
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    $50.00 - $100.00
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    $100.00 - $150.00
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    $150.00 - $200.00
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="category__filter-link" to="#">
                                                    $200.00+
                                                </Link>
                                            </li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Color</h4>
                                        <ul>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "black" }} />
                                                <Link className="category__filter-link" to="#">
                                                    Black
                                                </Link>
                                            </li>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "blue" }} />
                                                <Link className="category__filter-link" to="#">
                                                    Blue
                                                </Link>
                                            </li>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "grey" }} />
                                                <Link className="category__filter-link" to="#">
                                                    Grey
                                                </Link>
                                            </li>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "green" }} />
                                                <Link className="category__filter-link" to="#">
                                                    Green
                                                </Link>
                                            </li>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "white" }} />
                                                <Link className="category__filter-link active" to="#">
                                                    White
                                                </Link>
                                            </li>
                                            <li>
                                                <CircleIcon fontSize="small" sx={{ color: "red" }} />
                                                <Link className="category__filter-link" to="#">
                                                    Red
                                                </Link>
                                            </li>
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Tags</h4>
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
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className="category__content">
                            <div className="tab-content">
                                <TabPanel value={value} index={0}>
                                    <Grid container spacing={1}>
                                        {dataTab1.map((item, index) => (
                                            <Grid item xs={12} sm={6} md={3} key={index + 1}>
                                                <ProductCard name={item.name} price={item.price} image={item.image} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    2
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    3
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    4
                                </TabPanel>
                            </div>
                        </div>
                        <div className="category__pagination">
                            <Pagination count={10} variant="outlined" size="large" color="secondary" />
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Category;
