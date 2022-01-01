import { Container, Grid, Pagination, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import "./Products.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useLocation } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import queryString from "query-string";
import Footer from "components/Footer";
import Header from "components/Header";
import TabPanel from "components/TabPanel";
import { PRICE, COLOR, SORT, TAGS } from "constants/Filter";
import ProductList from "components/ProductList";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import { useForm } from "react-hook-form";
import WarningIcon from "@mui/icons-material/Warning";

//@query: /products/men?category=shoes&sort=newest&color=black&price=200+&tags=sports

function Products() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const location = useLocation();
    const userObject = location.pathname.split("/")[2];

    const [category, setCategory] = useState("all");

    const handleChangeTab = (event, value) => {
        setCategory(value);
        setFilters({
            ...filters,
            category: value,
        });
    };

    const [filters, setFilters] = useState({});
    const [showFilter, setShowFilter] = useState(false);
    const handleSToggleSFilter = () => {
        setShowFilter(!showFilter);
        setShowSearch(false);
    };
    const handleFilter = (e) => {
        const queryName = e.target.getAttribute("name");
        const queryValue = e.target.getAttribute("slug");
        setFilters({
            ...filters,
            [queryName]: queryValue,
        });
    };

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
        setShowFilter(false);
    };
    const handleSearch = (val) => {
        setSearch(val);
    };

    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Men" />
                <Container fixed>
                    <div className="category">
                        <div className="category__header">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <div className="tabs">
                                        <Tabs value={category} onChange={handleChangeTab}>
                                            <Tab label="All" value="all" />
                                            <Tab label="Shoes" value="shoes" />
                                            <Tab label="Clothing" value="clothing" />
                                            <Tab label="Accessory and Equipment" value="accessory" />
                                        </Tabs>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="category__options">
                                        <button
                                            className={`category__options-btn ${showFilter ? "show-filter" : ""}`}
                                            onClick={handleSToggleSFilter}
                                        >
                                            {showFilter ? <ClearIcon /> : <FilterListIcon />}
                                            <span>Filter</span>
                                        </button>
                                        <button
                                            className={`category__options-btn ${showSearch ? "show-filter" : ""}`}
                                            onClick={handleToggleSearch}
                                        >
                                            {showSearch ? <ClearIcon /> : <SearchIcon />}
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={`category__search ${showSearch ? "active" : ""}`}>
                            <form onSubmit={handleSubmit(handleSearch)}>
                                <button type="submit">
                                    <SearchIcon sx={{ fontSize: 24 }} />
                                </button>
                                {errors.search && (
                                    <span className="validation">
                                        <WarningIcon />
                                    </span>
                                )}
                                <input type="text" placeholder="Search" {...register("search", { required: true })} />
                            </form>
                        </div>
                        <div className={`category__filter ${showFilter ? "active" : ""}`}>
                            <div className="category__filter-wrapper">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Sort By</h4>
                                        <ul className="filter-list">
                                            {SORT.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <span name="sort" slug={item.slug}>
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Price</h4>
                                        <ul className="filter-list">
                                            {PRICE.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <span name="price" slug={item.slug}>
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Color</h4>
                                        <ul className="filter-list">
                                            {COLOR.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <CircleIcon fontSize="small" sx={{ color: `${item.slug}` }} />
                                                    <span name="color" slug={item.slug}>
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Tags</h4>
                                        <ul className="tags">
                                            {TAGS.map((item, index) => (
                                                <li key={index} onClick={handleFilter} className="tag">
                                                    <span name="tags" slug={item.slug}>
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className="category__content">
                            <div className="tab-content">
                                <TabPanel value={category} index="all">
                                    <h1>all</h1>
                                    <ProductList
                                        user={userObject}
                                        category={category}
                                        filters={filters}
                                        search={search}
                                    />
                                </TabPanel>
                                <TabPanel value={category} index="shoes">
                                    <h1>shoes</h1>
                                    <ProductList user={userObject} filters={filters} search={search} />
                                </TabPanel>
                                <TabPanel value={category} index="clothing">
                                    <h1>clothing</h1>
                                    <ProductList user={userObject} filters={filters} search={search} />
                                </TabPanel>
                                <TabPanel value={category} index="accessory">
                                    <h1>accessory and equipment</h1>
                                    <ProductList user={userObject} filters={filters} search={search} />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Products;
