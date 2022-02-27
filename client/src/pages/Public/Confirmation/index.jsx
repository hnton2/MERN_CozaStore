import React, { useEffect } from "react";
import "./Confirmation.scss";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container, Grid } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "constants/Image";
import { Link, useSearchParams } from "react-router-dom";
import orderServices from "services/order";
import { useState } from "react";
import Preloader from "components/Preloader";
import moment from "moment";
import { Helmet } from "react-helmet";
import { toastMessage } from "helpers/toastMessage";

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
    let [searchParams] = useSearchParams();
    const invoiceCode = searchParams.get("invoice-code");

    const [invoice, setInvoice] = useState();
    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await orderServices.getOneOrder(invoiceCode);
                res.data.success && setInvoice(res.data.order);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchInvoice();
    }, [invoiceCode]);

    return (
        <>
            <Helmet>
                <title>Confirmation</title>
            </Helmet>
            <Header />
            <Preloader isHidden={invoice} />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Order Confirmation" />
                    <div className="confirmation">
                        <div className="confirmation__header">
                            <img src={Image.CART_SUCCESS} alt="Cart Success" />
                            <h1>Thank you for your order!</h1>
                        </div>
                        {invoice && (
                            <>
                                <div className="confirmation__body">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4} lg={4}>
                                            <div className="confirmation__card">
                                                <h3>Order Info</h3>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Order Number</td>
                                                            <td>: #{invoice.code}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Date</td>
                                                            <td>: {moment(invoice.createdAt).format("MMM Do YY")}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Total</td>
                                                            <td>: ${invoice.total}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
                                                                <td>: 622/10 Cong Hoa</td>
                                                            </tr>
                                                            <tr>
                                                                <td>City</td>
                                                                <td>: Ho Chi Minh</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Country</td>
                                                                <td>: Viet Nam</td>
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
                                                                <td>: {invoice.user.address.street}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>City</td>
                                                                <td>: {invoice.user.address.province}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Country</td>
                                                                <td>: {invoice.user.address.country}</td>
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
                                                {invoice.products.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>
                                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                        </td>
                                                        <td>X {item.quantity}</td>
                                                        <td>${item.price}</td>
                                                    </tr>
                                                ))}
                                                {invoice.coupon && (
                                                    <tr>
                                                        <td>
                                                            <h4>DISCOUNT</h4>
                                                        </td>
                                                        <td></td>
                                                        <td>${invoice.coupon.discount}</td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td>
                                                        <h4>TOTAL</h4>
                                                    </td>
                                                    <td></td>
                                                    <td>
                                                        <h4>${invoice.total}</h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="confirmation__footer">
                                    <Link to="/" className="btn btn-warning">
                                        Continue Shopping
                                    </Link>
                                    <Link
                                        to={`/order-tracking?invoice-code=${invoice.code}`}
                                        className="btn btn-primary"
                                    >
                                        Tracking your order
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Confirmation;
