import React from "react";
import "./Checkout.scss";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcumbs";
import { Container, Grid } from "@mui/material";
import Select from "react-select";
import { Link } from "react-router-dom";

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

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];

const customStyles = {
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: "#333",
            fontSize: "14px",
        };
    },
};

function Checkout() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Checkout" />
                    <div className="checkout">
                        <Grid container spacing={2}>
                            <Grid container item xs={12} sm={12} md={8} lg={8}>
                                <form className="checkout__form">
                                    <h4 className="checkout__title">Billing Details</h4>
                                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <input type="text" placeholder="First Name" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <input type="text" placeholder="Last Name" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <input type="text" placeholder="Apartment, suite, etc. (Optional)" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <input type="text" placeholder="Email Address" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <input type="text" placeholder="Phone" />
                                        </div>
                                    </Grid>
                                    <h4 className="checkout__title">Shipping Details</h4>
                                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <Select
                                                    options={options}
                                                    placeholder="Country/Region"
                                                    styles={customStyles}
                                                />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <input type="text" placeholder="City" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <input type="text" placeholder="Province" />
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} lg={6}>
                                            <div className="form-group">
                                                <input type="text" placeholder="District" />
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <input type="text" placeholder="Detail Address" />
                                        </div>
                                    </Grid>
                                    <h4 className="checkout__title">Addition Information</h4>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <textarea type="text" placeholder="Order Notes" rows={10} />
                                        </div>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={4} lg={4}>
                                <div className="checkout__box">
                                    <h4 className="checkout__title bd">Your Order</h4>
                                    <ul className="product-list">
                                        <li>
                                            <h4 className="product-list__header">Product</h4>
                                            <span className="product-list__header">Total</span>
                                        </li>
                                        <li>
                                            <Link className="product-link" to="#">
                                                Fresh Strawberries
                                            </Link>
                                            <span className="product-quantity">x 02</span>
                                            <span>$720.00</span>
                                        </li>
                                        <li>
                                            <Link className="product-link" to="#">
                                                Fresh Strawberries
                                            </Link>
                                            <span className="product-quantity">x 02</span>
                                            <span>$720.00</span>
                                        </li>
                                        <li>
                                            <Link className="product-link" to="#">
                                                Fresh Strawberries
                                            </Link>
                                            <span className="product-quantity">x 02</span>
                                            <span>$720.00</span>
                                        </li>
                                    </ul>
                                    <ul className="price-list">
                                        <li>
                                            <h4 className="price-title">Subtotal</h4>
                                            <span>$2160.00</span>
                                        </li>
                                        <li>
                                            <h4 className="price-title">Shipping</h4>
                                            <span>$50.00</span>
                                        </li>
                                        <li>
                                            <h4 className="price-title">Coupon</h4>
                                            <span>$50.00</span>
                                        </li>
                                        <li>
                                            <h4 className="price-title">Total</h4>
                                            <span className="totals">$2110.00</span>
                                        </li>
                                    </ul>
                                    <div className="payment">
                                        <label class="radio">
                                            <div className="payment__title">Check Payments</div>
                                            <input type="radio" checked="checked" name="radio" />
                                            <span class="radio-checkmark"></span>
                                        </label>
                                        <div className="payment__note">
                                            Please send a check to Store Name, Store Street, Store Town, Store State /
                                            County, Store Postcode.
                                        </div>
                                    </div>
                                    <div className="payment">
                                        <label class="radio">
                                            <div className="payment__title">Paypal</div>
                                            <input type="radio" name="radio" />
                                            <span class="radio-checkmark"></span>
                                        </label>
                                        <div className="payment__note">
                                            Pay via PayPal; you can pay with your credit card if you don’t have a PayPal
                                            account.
                                        </div>
                                    </div>
                                    <div className="checkout__button">
                                        <button className="btn btn-lg bg-dark text-uppercase">Place Order</button>
                                    </div>
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

export default Checkout;
