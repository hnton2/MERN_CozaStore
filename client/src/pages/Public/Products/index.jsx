import { Container, Grid, Pagination, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Products.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import queryString from "query-string";
import Footer from "components/Footer";
import Header from "components/Header";
import { PRICE, COLOR, SORT, TAGS } from "constants/Filter";
import productServices from "services/product";
import Skeleton from "@mui/material/Skeleton";
import ProductCard from "components/ProductCard";
import Preloader from "components/Preloader";
import { useSelector } from "react-redux";
import { COLOR_OPTIONS } from "constants/Data";

//@query: /product-category/men?category=shoes&sort=newest&color=black&price=200+&tags=sports

function Products() {
    const categoryProduct = useSelector((state) => state.category.categoryProduct);
    let [searchParams, setSearchParams] = useSearchParams();

    const { category: currentCategory } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response =
                    currentCategory === "all"
                        ? await productServices.getAllProduct()
                        : await productServices.getProductByCategory(currentCategory);
                if (response.data.success) setProducts(response.data.product);
                setFilters({});
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [currentCategory]);

    const [filters, setFilters] = useState(Object.fromEntries([...searchParams]));
    const [showFilter, setShowFilter] = useState(false);
    const handleSToggleSFilter = () => {
        setShowFilter(!showFilter);
        setShowSearch(false);
    };
    const handleFilter = (e) => {
        const queryName = e.target.getAttribute("name");
        const queryValue = e.target.getAttribute("slug");
        if (queryName !== null) {
            setSearchParams({ ...Object.fromEntries([...searchParams]), [queryName]: queryValue });
            const filteredRows = products.filter((row) => {
                Object.keys(row).filter((field) => console.log(field));
                // return Object.keys(row).some((field) => searchRegex.test(row[field].toString()));
            });
        }
    };

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
        setShowFilter(false);
    };
    const handleSearch = (val) => setSearch(val);

    return (
        <>
            <Header />
            <Preloader isHidden={products.length > 0} />
            <div className="main">
                <Container fixed>
                    <div className="category">
                        <div className="category__header">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <div className="category__list">
                                        <NavLink to="/product-category/all" className="category-link">
                                            All
                                        </NavLink>
                                        {categoryProduct.map((item) => (
                                            <NavLink to={`/product-category/${item.slug}`} className="category-link">
                                                {item.name}
                                            </NavLink>
                                        ))}
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
                            <button type="submit">
                                <SearchIcon sx={{ fontSize: 24 }} />
                            </button>
                            <input type="text" placeholder="Search" />
                        </div>
                        <div className={`category__filter ${showFilter ? "active" : ""}`}>
                            <div className="category__filter-wrapper">
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6} md={3}>
                                        <h4 className="category__filter-title">Sort By</h4>
                                        <ul className="filter-list">
                                            {SORT.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <span
                                                        name="sort"
                                                        className={filters.sort === item.slug ? "active" : ""}
                                                        slug={item.slug}
                                                    >
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
                                                    <span
                                                        name="price"
                                                        className={filters.price === item.slug ? "active" : ""}
                                                        slug={item.slug}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={2}>
                                        <h4 className="category__filter-title">Color</h4>
                                        <ul className="filter-list">
                                            {COLOR_OPTIONS.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <CircleIcon fontSize="small" sx={{ color: `${item.value}` }} />
                                                    <span
                                                        name="color"
                                                        className={filters.color === item.value ? "active" : ""}
                                                        value={item.value}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4}>
                                        <h4 className="category__filter-title">Gender</h4>
                                        <ul className="tags">
                                            <li onClick={handleFilter} className="tag">
                                                <span name="gender" slug="men">
                                                    Men
                                                </span>
                                            </li>
                                            <li onClick={handleFilter} className="tag">
                                                <span name="gender" slug="women">
                                                    Women
                                                </span>
                                            </li>
                                            <li onClick={handleFilter} className="tag">
                                                <span name="gender" slug="Kids">
                                                    Kids
                                                </span>
                                            </li>
                                        </ul>
                                        <h4 className="category__filter-title">Tags</h4>
                                        <ul className="tags">
                                            {TAGS.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={handleFilter}
                                                    className={`tag ${filters.tag === item.slug ? "active" : ""}`}
                                                >
                                                    <span name="tag" slug={item.slug}>
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
                            {products.length > 0 ? (
                                <>
                                    <Grid container spacing={1}>
                                        {products.map((product) => (
                                            <Grid item xs={12} sm={6} md={3} key={product._id}>
                                                <ProductCard product={product} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <div className="category__pagination">
                                        <Pagination count={10} variant="outlined" size="large" color="secondary" />
                                    </div>
                                </>
                            ) : (
                                <Skeleton variant="rectangular" width={1200} height={400} />
                            )}
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Products;
