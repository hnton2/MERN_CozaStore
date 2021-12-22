import React from "react";
import { Container, Grid, IconButton, Tooltip } from "@mui/material";
import Image from "../../constants/Image";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Breadcrumbs from "../../components/Breadcumbs";
import "./Cart.scss";
import QuantityButton from "../../components/QuantityButton";
import InfoIcon from "@mui/icons-material/Info";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Men",
        path: "/category",
    },
];
function Cart() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Shopping Cart" />
                    <div className="cart">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <div className="horizontal-scroll">
                                    <table className="table">
                                        <thead className="table__head">
                                            <tr>
                                                <th>Product</th>
                                                <th></th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="table__row">
                                                <td>
                                                    <img src={Image.PRODUCT5} alt="" />
                                                </td>
                                                <td className="product-name">Fresh Strawberries</td>
                                                <td className="text-center">$36.00</td>
                                                <td>
                                                    <QuantityButton />
                                                </td>
                                                <td className="text-center">$36.00</td>
                                                <td>
                                                    <button className="table-btn btn btn-circle btn-hover-black">
                                                        <CloseIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="table__row">
                                                <td>
                                                    <img src={Image.PRODUCT8} alt="" />
                                                </td>
                                                <td className="product-name">Lightweight Jacket</td>
                                                <td className="text-center">$16.00</td>
                                                <td>
                                                    <QuantityButton />
                                                </td>
                                                <td className="text-center">$16.00</td>
                                                <td>
                                                    <button className="table-btn btn btn-circle btn-hover-black">
                                                        <CloseIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="table__row">
                                                <td>
                                                    <img src={Image.PRODUCT7} alt="" />
                                                </td>
                                                <td className="product-name">Lightweight Jacket</td>
                                                <td className="text-center">$16.00</td>
                                                <td>
                                                    <QuantityButton />
                                                </td>
                                                <td className="text-center">$16.00</td>
                                                <td>
                                                    <button className="table-btn btn btn-circle btn-hover-black">
                                                        <CloseIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4}>
                                <div className="cart__actions">
                                    <h3>Cart Total</h3>
                                    <div className="cart-prices border-bot">
                                        <h5 className="title">Subtotal</h5>
                                        <span className="price">$79.65</span>
                                    </div>
                                    <div className="coupon border-bot">
                                        <div className="coupon__content">
                                            <span className="coupon-title">Coupon</span>
                                            <div className="coupon-desc">
                                                <span>2 coupons available</span>
                                                <Tooltip title="Only 1 coupon can be used">
                                                    <IconButton>
                                                        <InfoIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <button className="coupon__button">
                                            <LocalActivityIcon fontSize="small" />
                                            <span>Select coupons</span>
                                        </button>
                                        {/* <div className="cart-prices">
                                            <h5 className="title">Discount</h5>
                                            <span className="price">$7.05</span>
                                        </div> */}
                                    </div>
                                    <div className="totals">
                                        <div className="cart-prices">
                                            <h5 className="title">Totals</h5>
                                            <span className="price">$72.60</span>
                                        </div>
                                    </div>
                                    <button className="btn btn-lg btn-bg__dark text-uppercase">
                                        Proceed to checkout
                                    </button>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
