import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import ProductCard from "components/ProductCard";
import { PRICE, SORT } from "constants/Filter";
import { COLOR_OPTIONS, SIZE_OPTIONS, TAG_OPTIONS } from "constants/Option";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import productServices from "services/product";
import "./Products.scss";

function Products() {
    let [searchParams, setSearchParams] = useSearchParams();
    const categoryProduct = useSelector((state) => state.category.categoryProduct);

    const { category: currentCategory } = useParams();
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState(Object.fromEntries([...searchParams]));

    const [colorOptions, setColorOptions] = useState(COLOR_OPTIONS);
    const [sizeOptions, setSizeOptions] = useState(SIZE_OPTIONS);
    const [tagOptions, setTagOptions] = useState(TAG_OPTIONS);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await productServices.getProducstInCategory({
                    category: currentCategory,
                    ...Object.fromEntries([...searchParams]),
                });
                if (response.data.success) {
                    setProducts(response.data.products);
                    setTotalPages(response.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
        if (currentCategory !== "all") {
            categoryProduct.forEach((item) => {
                if (item.slug === currentCategory) {
                    setColorOptions(item.color);
                    setTagOptions(item.tag);
                    setSizeOptions(item.size);
                }
            });
        } else {
            setColorOptions(COLOR_OPTIONS);
            setTagOptions(TAG_OPTIONS);
            setSizeOptions(SIZE_OPTIONS);
        }
    }, [currentCategory, categoryProduct, searchParams]);

    const handleToggleFilter = () => {
        if (showFilter) {
            setSearchParams({});
            setFilters({});
        }
        setShowFilter(!showFilter);
        setShowSearch(false);
    };
    const handleFilter = (e) => {
        const queryName = e.target.getAttribute("name");
        const queryValue = e.target.getAttribute("slug");
        if (queryName || queryValue) {
            const query = { ...Object.fromEntries([...searchParams]), [queryName]: queryValue };
            setSearchParams(query);
            setFilters(query);
        }
    };

    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
        setShowFilter(false);
    };
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
            <Preloader isHidden={products} />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                            <NavLink
                                                to={`/product-category/${item.slug}`}
                                                key={item._id}
                                                className="category-link"
                                            >
                                                {item.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <div className="category__options">
                                        <button
                                            className={`category__options-btn ${showFilter ? "show-filter" : ""}`}
                                            onClick={handleToggleFilter}
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
                            <input
                                value={search}
                                type="text"
                                placeholder="Search"
                                onChange={(event) => handleSearch(event.target.value)}
                            />
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
                                            {colorOptions.map((item, index) => (
                                                <li key={index} onClick={handleFilter}>
                                                    <CircleIcon fontSize="small" sx={{ color: `${item.value}` }} />
                                                    <span
                                                        name="color"
                                                        className={filters.color === item.value ? "active" : ""}
                                                        slug={item.value}
                                                    >
                                                        {item.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4}>
                                        {currentCategory !== "all" && (
                                            <>
                                                <h4 className="category__filter-title">Size</h4>
                                                <ul className="tags">
                                                    {sizeOptions.map((item, index) => (
                                                        <li
                                                            key={index}
                                                            onClick={handleFilter}
                                                            className={`tag ${
                                                                filters.tag === item.value ? "active" : ""
                                                            }`}
                                                        >
                                                            <span name="tag" slug={item.value}>
                                                                {item.label}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                        <h4 className="category__filter-title">Tags</h4>
                                        <ul className="tags">
                                            {tagOptions.map((item, index) => (
                                                <li
                                                    key={index}
                                                    onClick={handleFilter}
                                                    className={`tag ${filters.tag === item.value ? "active" : ""}`}
                                                >
                                                    <span name="tag" slug={item.value}>
                                                        {item.label}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className="category__content">
                            {products && products.length > 0 ? (
                                <>
                                    <Grid container spacing={1}>
                                        {products.map((product) => (
                                            <Grid item xs={12} sm={6} md={3} key={product._id}>
                                                <ProductCard product={product} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {totalPages > 1 && (
                                        <div className="category__pagination">
                                            <Pagination
                                                page={Number(searchParams.get("page") || 1)}
                                                count={totalPages}
                                                onChange={handleChangePage}
                                                variant="outlined"
                                                size="large"
                                                color="secondary"
                                            />
                                        </div>
                                    )}
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
