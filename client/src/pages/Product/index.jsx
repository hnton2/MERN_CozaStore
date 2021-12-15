import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";
import { Container, Grid, Rating, Tab, Tabs } from "@mui/material";
import ProductDetail from "../../components/ProductDetail";
import ProductsSlider from "../../components/ProductsSlider";
import "./Product.scss";
import TabPanel from "../../components/TabPanel";
import Image from "../../constants/Image";

function Product() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <div className="breadcrumbs">
                        <Link to="#" className="breadcrumbs__link">
                            Home
                            <NavigateNextIcon fontSize="small" className="breadcrumbs__link-icon" />
                        </Link>
                        <Link to="#" className="breadcrumbs__link">
                            Men
                            <NavigateNextIcon fontSize="small" className="breadcrumbs__link-icon" />
                        </Link>
                        <span>Lightweight Jacket</span>
                    </div>
                    <ProductDetail />
                    <div className="product-tabs">
                        <div className="tabs">
                            <Tabs value={value} onChange={handleChange}>
                                <Tab label="Description" />
                                <Tab label="Additional Information" />
                                <Tab label="Review (1)" />
                            </Tabs>
                        </div>
                        <div className="tab-content">
                            <TabPanel value={value} index={0}>
                                <p className="product-tabs__desc">
                                    Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla
                                    sit amet. Ut in blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit
                                    lectus interdum. Morbi elementum sapien rhoncus pretium maximus. Nulla lectus enim,
                                    cursus et elementum sed, sodales vitae eros. Ut ex quam, porta consequat interdum
                                    in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean tempor
                                    sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec
                                    laoreet consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras
                                    in arcu sed metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
                                </p>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Container maxWidth="sm">
                                    <div className="product-tabs__info">
                                        <ul>
                                            <li>
                                                <span className="info-name">Weight</span>
                                                <span className="info-detail">0.79kg</span>
                                            </li>
                                            <li>
                                                <span className="info-name">Dimensions</span>
                                                <span className="info-detail">110 x 33 x 100 cm</span>
                                            </li>
                                            <li>
                                                <span className="info-name">Materials</span>
                                                <span className="info-detail">60% cotton</span>
                                            </li>
                                            <li>
                                                <span className="info-name">Color</span>
                                                <span className="info-detail">
                                                    Black, Blue, Grey, Green, Red, White
                                                </span>
                                            </li>
                                            <li>
                                                <span className="info-name">Size</span>
                                                <span className="info-detail">XL, L, M, S</span>
                                            </li>
                                        </ul>
                                    </div>
                                </Container>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Container maxWidth="sm">
                                    <div className="review-list">
                                        <div className="review">
                                            <img src={Image.AVATAR1} alt="avatar" className="review__avatar" />
                                            <div>
                                                <div className="review__header">
                                                    <span className="review__name">Ariana Grande</span>
                                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                                </div>
                                                <p className="review__message">
                                                    Quod autem in homine praestantissimum atque optimum est, id
                                                    deseruit. Apud ceteros autem philosophos
                                                </p>
                                            </div>
                                        </div>
                                        <div className="review">
                                            <img src={Image.AVATAR1} alt="avatar" className="review__avatar" />
                                            <div>
                                                <div className="review__header">
                                                    <span className="review__name">Ariana Grande</span>
                                                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                                                </div>
                                                <p className="review__message">
                                                    Quod autem in homine praestantissimum atque optimum est, id
                                                    deseruit. Apud ceteros autem philosophos
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <form className="review-form">
                                        <h5>Add a review</h5>
                                        <p>Your email address will not be published. Required fields are marked *</p>
                                        <Grid container rowSpacing={2}>
                                            <Grid item lg={12}>
                                                <div className="form-group">
                                                    <label>Your Rating</label>
                                                    <Rating name="half-rating" defaultValue={0} precision={0.5} />
                                                </div>
                                            </Grid>
                                            <Grid item lg={12}>
                                                <div className="form-group fxd-col">
                                                    <label>Your Review</label>
                                                    <textarea name="" id="" cols="30" rows="5"></textarea>
                                                </div>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item lg={6}>
                                                    <div className="form-group fxd-col">
                                                        <label>Name</label>
                                                        <input type="text" />
                                                    </div>
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <div className="form-group fxd-col">
                                                        <label>Email</label>
                                                        <input type="text" />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <button className="submit-btn">Submit</button>
                                    </form>
                                </Container>
                            </TabPanel>
                        </div>
                    </div>
                </Container>
                <div className="product-tags">
                    <span>Categories: Jacket, Men</span>
                </div>
                <Container>
                    <div className="product-related">
                        <h3>Related Products</h3>
                        <ProductsSlider />
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Product;
