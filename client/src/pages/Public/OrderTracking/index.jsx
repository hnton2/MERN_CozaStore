import React from "react";
import "./OrderTracking.scss";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Image from "constants/Image";
import { Form } from "components/CustomForm";
import { InputField } from "components/CustomForm";
import { DEFAULT_VALUE_TRACKING } from "constants/Data";
import { orderTrackingValidation } from "helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faCheck,
    faCoffee,
    faFileInvoice,
    faHouseChimney,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
];

function OrderTracking() {
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Order Tracking" />
                    <div className="card">
                        <div className="order-tracking">
                            <div>
                                <p className="note">
                                    To track your order please enter your Order ID in the box below and press the
                                    "Track" button. This was given to you on your receipt and in the confirmation email
                                    you should have received.
                                </p>
                                <Form
                                    onSubmit={onSubmit}
                                    defaultValues={DEFAULT_VALUE_TRACKING}
                                    validation={orderTrackingValidation}
                                    hiddenLabel
                                >
                                    <InputField name="orderId" placeholder="Order Id" />
                                    <InputField name="email" placeholder="Billing Email Address" />
                                    <button className="btn btn-primary">Track Order</button>
                                </Form>
                            </div>
                            <div>
                                <div className="card-header">My Orders</div>
                                <div className="card-body">
                                    <h4 className="tracking-title">Order ID : OD45345345435</h4>
                                    <ul className="tracking-detail">
                                        <li>
                                            <h4>Estimated Delivery time:</h4>
                                            <span>29 nov 2019</span>
                                        </li>
                                        <li>
                                            <h4>Shipping BY:</h4>
                                            <span>29 nov 2019</span>
                                        </li>
                                        <li>
                                            <h4>Status:</h4>
                                            <span>29 nov 2019</span>
                                        </li>
                                        <li>
                                            <h4>Tracking #:</h4>
                                            <span>29 nov 2019</span>
                                        </li>
                                    </ul>
                                    <div className="tracking-progress">
                                        <div class="progress">
                                            <div
                                                class="progress-bar"
                                                style={{
                                                    width: `20%`,
                                                }}
                                            ></div>
                                        </div>
                                        <ul>
                                            <li>
                                                <div className={`step active`}>
                                                    <span class="step-icon">
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </span>
                                                    <span class="step-title">Accepted</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={`step`}>
                                                    <span class="step-icon">
                                                        <FontAwesomeIcon icon={faFileInvoice} />
                                                    </span>
                                                    <span class="step-title">In process</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={`step`}>
                                                    <span class="step-icon">
                                                        <FontAwesomeIcon icon={faTruckFast} />
                                                    </span>
                                                    <span class="step-title">Shipped</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={`step`}>
                                                    <span class="step-icon">
                                                        <FontAwesomeIcon icon={faBox} />
                                                    </span>
                                                    <span class="step-title">Delivered</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className={`step`}>
                                                    <span class="step-icon">
                                                        <FontAwesomeIcon icon={faHouseChimney} />
                                                    </span>
                                                    <span class="step-title">Completed</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tracking-products">
                                        <div className="product">
                                            <img src={Image.PRODUCT1} alt="product1" />
                                            <div className="product__desc">
                                                <Link to="#" className="product-title">
                                                    Dell Laptop with 500GB HDD 8GB RAM
                                                </Link>
                                                <p>$950</p>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <img src={Image.PRODUCT1} alt="product1" />
                                            <div className="product__desc">
                                                <Link to="#" className="product-title">
                                                    Dell Laptop with 500GB HDD 8GB RAM
                                                </Link>
                                                <p>$950</p>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <img src={Image.PRODUCT1} alt="product1" />
                                            <div className="product__desc">
                                                <Link to="#" className="product-title">
                                                    Dell Laptop with 500GB HDD 8GB RAM
                                                </Link>
                                                <p>$950</p>
                                            </div>
                                        </div>
                                        <div className="product">
                                            <img src={Image.PRODUCT1} alt="product1" />
                                            <div className="product__desc">
                                                <Link to="#" className="product-title">
                                                    Dell Laptop with 500GB HDD 8GB RAM
                                                </Link>
                                                <p>$950</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default OrderTracking;
