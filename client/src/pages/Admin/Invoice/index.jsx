import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Grid } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { IMAGE_CLOUDINARY } from "constants/Config";
import Image from "constants/Image";
import { toastMessage } from "helpers/toastMessage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import orderServices from "services/order";
import "./Invoice.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Order",
        path: "/admin/order",
    },
];

const TITLE_PAGE = "Invoice";

function Invoice() {
    const { id: invoiceCode } = useParams();
    const [invoice, setInvoice] = useState();
    useEffect(() => {
        const fetchInvoice = async () => {
            if (invoiceCode)
                try {
                    const res = await orderServices.getItem(invoiceCode);
                    res.data.success && setInvoice(res.data.item);
                } catch (error) {
                    toastMessage({ type: "error", message: error.message });
                }
        };
        fetchInvoice();
    }, [invoiceCode]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            <Helmet>
                <title>{TITLE_PAGE}</title>
            </Helmet>
            <Preloader isHidden={invoice} />
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current={TITLE_PAGE} />
                    <div className="card">
                        <h3 className="card-header">{TITLE_PAGE}</h3>
                        <div className="card-body">
                            {invoice && (
                                <div className="invoice">
                                    <div className="invoice__header">
                                        <h4>Coza Store, Inc</h4>
                                        <span>Date: {moment(invoice.expiredTime).format("MMM Do YY")}</span>
                                    </div>
                                    <div className="invoice__info">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                                From
                                                <address>
                                                    <strong>Coza Store, Inc</strong>
                                                    <br />
                                                    622/10 Cong Hoa, Ward 13
                                                    <br />
                                                    Tan Binh District, Ho Chi Minh City, VN
                                                    <br />
                                                    Phone: +84 379 479 861
                                                    <br />
                                                    Email: hongocton0406@gmail.com
                                                </address>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                                To
                                                <address>
                                                    <strong>{invoice.user.name}</strong>
                                                    <br />
                                                    {invoice.user.address.street}, {invoice.user.address.ward}
                                                    <br />
                                                    {invoice.user.address.district}, {invoice.user.address.province},
                                                    {invoice.user.address.country}
                                                    <br />
                                                    Phone: {invoice.user.phone}
                                                    <br />
                                                    Email: {invoice.user.email}
                                                </address>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                                <b>Invoice #{invoice.code}</b>
                                                <br />
                                                <br />
                                                <b>Order ID: </b>
                                                {invoice._id}
                                                <br />
                                                <b>Payment Method: </b>Visa
                                                <br />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="invoice__table">
                                        <table className="table table-border">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Product</th>
                                                    <th>Feature</th>
                                                    <th>Price</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice.products.map((item, index) => (
                                                    <tr key={item._id}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <img
                                                                src={IMAGE_CLOUDINARY + item.images[0]}
                                                                alt={item.name}
                                                                className="product-image"
                                                            />
                                                            <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                                        </td>
                                                        <td className="text-center">
                                                            Size: {item.size} - Color: {item.color}
                                                        </td>
                                                        <td className="text-center">
                                                            {item.quantity} x ${item.price}
                                                        </td>
                                                        <td className="text-center">$ {item.quantity * item.price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="invoice__footer">
                                        <Grid container spacing={4}>
                                            <Grid item xs={12} sm={12} md={7} lg={7}>
                                                <p className="payment-title">Payment Method</p>
                                                <img src={Image.ICONPAY1} className="payment-image" alt="Paypal" />
                                                <img src={Image.ICONPAY2} className="payment-image" alt="Visa" />
                                                <img src={Image.ICONPAY4} className="payment-image" alt="Master Card" />
                                                <img
                                                    src={Image.ICONPAY4}
                                                    className="payment-image"
                                                    alt="American Express"
                                                />
                                                <img
                                                    src={Image.ICONPAY5}
                                                    className="payment-image"
                                                    alt="Discover Network"
                                                />
                                                <p className="payment-message">
                                                    Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                                    weebly ning heekya handango imeem plugg dopplr jibjab, movity jajah
                                                    plickers sifteo edmodo ifttt zimbra.
                                                </p>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                                <p className="payment-title">
                                                    Amount Due {moment(invoice.expiredTime).format("MMM Do YY")}
                                                </p>
                                                <ul>
                                                    <li className="payment-item">
                                                        <p>Subtotal: </p>
                                                        <span>${invoice.total}</span>
                                                    </li>
                                                    <li className="payment-item">
                                                        <p>Discount: </p>
                                                        <span>${invoice.coupon ? invoice.coupon.discount : 0}</span>
                                                    </li>
                                                    <li className="payment-item">
                                                        <p>Total: </p>
                                                        <span>
                                                            $
                                                            {invoice.coupon
                                                                ? invoice.total - invoice.coupon.discount
                                                                : invoice.total}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </Grid>
                                        </Grid>
                                        <button className="btn btn-dark" onClick={handlePrint}>
                                            <FontAwesomeIcon icon={faPrint} /> Print
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Invoice;
