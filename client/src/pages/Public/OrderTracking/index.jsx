import { faBox, faCheck, faFileInvoice, faHouseChimney, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Form, InputField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { DEFAULT_TRACKING } from "constants/Form";
import { orderTrackingStatus } from "helpers/string";
import { orderTrackingValidation } from "helpers/validation";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import orderServices from "services/order";
import "./OrderTracking.scss";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
];

function OrderTracking() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [invoiceCode, setInvoiceCode] = useState(searchParams.get("invoice-code"));
    const [invoice, setInvoice] = useState();
    const statusNumber = invoice && orderTrackingStatus(invoice.status);
    useEffect(() => {
        const fetchInvoice = async () => {
            if (invoiceCode)
                try {
                    const res = await orderServices.getOneOrder(invoiceCode);
                    res.data.success && setInvoice(res.data.order);
                } catch (error) {
                    console.log(error);
                }
        };
        fetchInvoice();
    }, [invoiceCode]);

    const onSubmit = (data) => {
        setSearchParams({ "invoice-code": data.orderId });
        setInvoiceCode(data.orderId);
    };

    return (
        <>
            <Helmet>
                <title>Order Tracking</title>
            </Helmet>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Order Tracking" />
                    <div className="card">
                        <div className="order-tracking">
                            {invoice ? (
                                <div>
                                    <div className="card-header">My Orders</div>
                                    <div className="card-body">
                                        <h4 className="tracking-title">Order ID: {invoice.code}</h4>
                                        <ul className="tracking-detail">
                                            <li>
                                                <h4>Customer:</h4>
                                                <span>{invoice.user.name}</span>
                                            </li>
                                            <li>
                                                <h4>Shipping Address:</h4>
                                                <span>{`${invoice.user.address.district} - ${invoice.user.address.province}`}</span>
                                            </li>
                                            <li>
                                                <h4>Toal:</h4>
                                                <span>${invoice.total}</span>
                                            </li>
                                            <li>
                                                <h4>Payment Due:</h4>
                                                <span>{moment(invoice.createdAt).format("MMM Do YY")}</span>
                                            </li>
                                        </ul>
                                        <div className="tracking-progress">
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${statusNumber * 20}%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <ul>
                                                <li>
                                                    <div className={`step ${statusNumber >= 1 ? "active" : ""}`}>
                                                        <span className="step-icon">
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </span>
                                                        <span className="step-title">Accepted</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={`step ${statusNumber >= 1 ? "active" : ""}`}>
                                                        <span className="step-icon">
                                                            <FontAwesomeIcon icon={faFileInvoice} />
                                                        </span>
                                                        <span className="step-title">In process</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={`step ${statusNumber >= 1 ? "active" : ""}`}>
                                                        <span className="step-icon">
                                                            <FontAwesomeIcon icon={faTruckFast} />
                                                        </span>
                                                        <span className="step-title">Shipped</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={`step ${statusNumber >= 1 ? "active" : ""}`}>
                                                        <span className="step-icon">
                                                            <FontAwesomeIcon icon={faBox} />
                                                        </span>
                                                        <span className="step-title">Delivered</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className={`step ${statusNumber >= 1 ? "active" : ""}`}>
                                                        <span className="step-icon">
                                                            <FontAwesomeIcon icon={faHouseChimney} />
                                                        </span>
                                                        <span className="step-title">Completed</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tracking-products">
                                            {invoice.products.map((item) => (
                                                <div className="product" key={item._id}>
                                                    <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                                                    <div className="product__desc">
                                                        <Link to={`product/${item.slug}`} className="product-title">
                                                            {item.name}
                                                        </Link>
                                                        <p>${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="note">
                                        To track your order please enter your Order ID in the box below and press the
                                        "Track" button. This was given to you on your receipt and in the confirmation
                                        email you should have received.
                                    </p>
                                    <Form
                                        onSubmit={onSubmit}
                                        defaultValues={DEFAULT_TRACKING}
                                        validation={orderTrackingValidation}
                                        hiddenLabel
                                    >
                                        <InputField name="orderId" placeholder="Order Id" />
                                        <button type="submit" className="btn btn-primary">
                                            Track Order
                                        </button>
                                    </Form>
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

export default OrderTracking;
