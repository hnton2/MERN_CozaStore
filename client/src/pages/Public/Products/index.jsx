import { Container, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Products.scss";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import CircleIcon from "@mui/icons-material/Circle";
import Footer from "components/Footer";
import Header from "components/Header";
import { PRICE, SORT } from "constants/Filter";
import productServices from "services/product";
import Skeleton from "@mui/material/Skeleton";
import ProductCard from "components/ProductCard";
import Preloader from "components/Preloader";
import { useSelector } from "react-redux";
import { COLOR_OPTIONS, SIZE_OPTIONS, TAG_OPTIONS } from "constants/Data";

function Products() {
    const categoryProduct = useSelector((state) => state.category.categoryProduct);
    let [searchParams, setSearchParams] = useSearchParams();

    const { category: currentCategory } = useParams();
    const [products, setProducts] = useState([]);
    const [render, setRender] = useState([]);
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [filters, setFilters] = useState(Object.fromEntries([...searchParams]));
    const [showFilter, setShowFilter] = useState(false);
    const [colorOptions, setColorOptions] = useState(COLOR_OPTIONS);
    const [sizeOptions, setSizeOptions] = useState(SIZE_OPTIONS);
    const [tagOptions, setTagOptions] = useState(TAG_OPTIONS);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response =
                    currentCategory === "all"
                        ? await productServices.getAllProduct()
                        : await productServices.getProductByCategory(currentCategory);
                if (response.data.success) {
                    setProducts(response.data.product);
                    setRender(response.data.product);
                }
                setFilters(Object.fromEntries([...searchParams]));
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
        if (currentCategory !== "all") {
            categoryProduct.map((item) => {
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
    }, [currentCategory]);

    const handleToggleFilter = () => {
        if (showFilter) {
            setSearchParams({});
            setFilters({});
            setRender(products);
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

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            let filteredProducts = products.filter((product) => {
                if (filters.price) {
                    const prices = filters.price.split("-");
                    if (prices.length > 1)
                        if (Number(prices[0]) > product.price || product.price > Number(prices[1])) return false;
                        else if (product.price < Number(prices[0])) return false;
                }
                if (filters.color) if (!product.color.some((item) => item.value === filters.color)) return false;
                if (filters.tag) if (!product.tag.some((item) => item.value === filters.tag)) return false;

                return true;
            });
            if (filters.sort) {
                const sort = filters.sort.split("-");
                if (sort[0] === "price") {
                    filteredProducts =
                        sort[1] === "asc"
                            ? filteredProducts.sort((a, b) => a.price - b.price)
                            : filteredProducts.sort((a, b) => b.price - a.price);
                } else {
                    filteredProducts =
                        sort[1] === "asc"
                            ? filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
                            : filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                }
            }
            setRender(filteredProducts);
        }
    }, [filters]);

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
                            {render.length > 0 ? (
                                <>
                                    <Grid container spacing={1}>
                                        {render.map((product) => (
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
