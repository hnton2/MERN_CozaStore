import React from "react";
import "./Confirmation.scss";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container, Grid } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "constants/Image";

toast.configure();

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Shopping Cart",
        path: "/cart",
    },
    {
        name: "Checkout",
        path: "/checkout",
    },
];

function Confirmation() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Order Confirmation" />
                    <div className="confirmation">
                        <div className="confirmation__header">
                            <img src={Image.CART_SUCCESS} alt="Cart Success" />
                            <h1>Thank you for your order!</h1>
                        </div>
                        <div className="confirmation__body">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div className="confirmation__card">
                                        <h3 className="confirmation__card-header">Order Info</h3>
                                        <div className="confirmation__card-body">
                                            <table className="cart-table">
                                                <tbody>
                                                    <tr>
                                                        <td>Order Number</td>
                                                        <td>: 60235</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Date</td>
                                                        <td>: Oct 03, 2017</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total</td>
                                                        <td>: USD 2210</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Payment method</td>
                                                        <td>: Check payments</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div className="confirmation__card">
                                        <h3 className="confirmation__card-header">Billing Address</h3>
                                        <div className="confirmation__card-body">
                                            <table className="cart-table">
                                                <tbody>
                                                    <tr>
                                                        <td>Street</td>
                                                        <td>: 56/8 panthapath</td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>: Oct 03, 2017</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td>: USD 2210</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Postcode</td>
                                                        <td>: Check payments</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div className="confirmation__card">
                                        <h3 className="confirmation__card-header">Shipping Address</h3>
                                        <div className="confirmation__card-body">
                                            <table className="cart-table">
                                                <tbody>
                                                    <tr>
                                                        <td>Street</td>
                                                        <td>: 60235</td>
                                                    </tr>
                                                    <tr>
                                                        <td>City</td>
                                                        <td>: Oct 03, 2017</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Country</td>
                                                        <td>: USD 2210</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Postcode</td>
                                                        <td>: Check payments</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="confirmation-detail">
                                <h1>Order Details</h1>
                                <table className="table-detail">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Pixelstore fresh Blackberry</td>
                                            <td>X 02</td>
                                            <td>$720.00</td>
                                        </tr>
                                        <tr>
                                            <td>Pixelstore fresh Blackberry</td>
                                            <td>X 02</td>
                                            <td>$720.00</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>SUBTOTAL</h4>
                                            </td>
                                            <td></td>
                                            <td>$2160.00</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>DISCOUNT</h4>
                                            </td>
                                            <td></td>
                                            <td>$50.00</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>TOTAL</h4>
                                            </td>
                                            <td></td>
                                            <td>
                                                <h4>$2210.00</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="confirmation__footer">
                            <button className="btn btn-warning">Continue Shopping</button>
                            <button className="btn btn-primary">Tracking your order</button>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Confirmation;
