import { yupResolver } from "@hookform/resolvers/yup";
import { Container, Grid } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import { publicRequest } from "helpers/requestMethod";
import { checkoutValidation } from "helpers/validation";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { clearCart } from "redux/cartSlice";
import orderServices from "services/order";
import userServices from "services/user";
import VietNamProvinces from "constants/provinces.json";
import "./Checkout.scss";
import { useEffect } from "react";
import { toastMessage } from "helpers/toastMessage";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Shopping Cart",
        path: "/cart",
    },
];

const animatedComponents = makeAnimated();
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
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.currentUser);
    const { products, total, coupon } = useSelector((state) => state.cart);

    const [isLoading, setIsLoading] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const {
        control,
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ resolver: yupResolver(checkoutValidation) });

    const provinceField = watch("province");
    const districtField = watch("district");

    useEffect(() => {
        if (provinceField) setDistricts(provinceField.districts);
        if (districtField) setWards(districtField.wards);
    }, [provinceField, districtField]);

    const onSubmit = async (data) => {
        if (!stripe || !elements) return;

        const billingDetails = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {
                country: "VN",
                city: data.province.name,
                state: `${data.district.name},  ${data.ward.name}`,
                line1: data.address,
            },
        };

        setIsLoading(true);
        const { data: clientSecret } = await publicRequest.post("checkout/create-payment-intent", {
            amount: total * 100,
        });

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: billingDetails,
            },
        });
        setIsLoading(false);

        if (result.error) {
            toastMessage({ type: "error", message: result.error.message });
        } else {
            if (result.paymentIntent.status === "succeeded") {
                try {
                    const res = await orderServices.createItem({
                        user: {
                            name: `${data.firstname} ${data.lastname}`,
                            email: data.email,
                            phone: data.phone,
                            address: {
                                country: "Viet Nam",
                                province: data.province.name,
                                district: data.district.name,
                                ward: data.ward.name,
                                street: data.street,
                            },
                        },
                        message: data.message,
                        products,
                        total,
                        coupon,
                    });
                    if (res.data.success) {
                        await userServices.cleanCart(user._id);
                        toastMessage({ type: "success", message: "The payment has been processed!" });

                        navigate(`/confirmation?invoice-code=${res.data.item.code}`);
                        dispatch(clearCart());
                    }
                } catch (error) {
                    toastMessage({ type: "error", message: error });
                }
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Checkout" />
                    <div className="checkout">
                        <Grid container spacing={2}>
                            <Grid container item xs={12} sm={12} md={8} lg={8}>
                                <div className="checkout__form">
                                    <form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                                        <h4 className="checkout__title">Billing Details</h4>
                                        <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("firstname")}
                                                        placeholder="First Name"
                                                    />
                                                </div>
                                                {errors.firstname && (
                                                    <p className="error-message">*{errors.firstname.message}</p>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("lastname")}
                                                        placeholder="Last Name"
                                                    />
                                                </div>
                                                {errors.lastname && (
                                                    <p className="error-message">*{errors.lastname.message}</p>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    {...register("email")}
                                                    placeholder="Email Address"
                                                />
                                            </div>
                                            {errors.email && <p className="error-message">*{errors.email.message}</p>}
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className="form-group">
                                                <input type="text" {...register("phone")} placeholder="Phone" />
                                            </div>
                                            {errors.phone && <p className="error-message">*{errors.phone.message}</p>}
                                        </Grid>
                                        <h4 className="checkout__title">Shipping Details</h4>
                                        <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <div style={{ width: "100%" }}>
                                                        <Controller
                                                            name="province"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    placeholder="Province..."
                                                                    options={VietNamProvinces}
                                                                    components={animatedComponents}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => option.name}
                                                                    getOptionValue={(option) => option.codename}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.province && (
                                                    <p className="error-message">*{errors.province.message}</p>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <div style={{ width: "100%" }}>
                                                        <Controller
                                                            name="district"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    placeholder="District..."
                                                                    options={districts}
                                                                    components={animatedComponents}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => option.name}
                                                                    getOptionValue={(option) => option.codename}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.district && (
                                                    <p className="error-message">*{errors.district.message}</p>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <div style={{ width: "100%" }}>
                                                        <Controller
                                                            name="ward"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    placeholder="Ward..."
                                                                    options={wards}
                                                                    components={animatedComponents}
                                                                    styles={customStyles}
                                                                    getOptionLabel={(option) => option.name}
                                                                    getOptionValue={(option) => option.codename}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.ward && <p className="error-message">*{errors.ward.message}</p>}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input type="text" {...register("street")} placeholder="Street" />
                                                </div>
                                                {errors.street && (
                                                    <p className="error-message">*{errors.street.message}</p>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <h4 className="checkout__title">Addition Information</h4>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className="form-group">
                                                <textarea
                                                    type="text"
                                                    {...register("message")}
                                                    rows={10}
                                                    placeholder="Message"
                                                />
                                            </div>
                                            {errors.message && (
                                                <p className="error-message">*{errors.message.message}</p>
                                            )}
                                        </Grid>
                                    </form>
                                </div>
                            </Grid>
                            <Grid container item xs={12} sm={12} md={4} lg={4}>
                                <div className="checkout__box">
                                    <h4 className="checkout__title bd">Your Order</h4>
                                    <ul className="product-list">
                                        <li>
                                            <h4 className="product-list__header">Product</h4>
                                            <span className="product-list__header">Total</span>
                                        </li>
                                        {products.map((item) => (
                                            <li key={item._id}>
                                                <Link className="product-link" to={`/product/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                                <span className="product-quantity">
                                                    {item.quantity} x ${item.price}
                                                </span>
                                                <span>${item.price * item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <ul className="price-list">
                                        <li>
                                            <h4 className="price-title">Subtotal</h4>
                                            <span>${total}</span>
                                        </li>
                                        <li className="shipping">
                                            <h4 className="price-title">Shipping</h4>
                                            <div className="payment__note">
                                                There are no shipping methods available. Please double check your
                                                address, or contact us if you need any help.
                                            </div>
                                        </li>
                                        {coupon && Object.keys(coupon).length !== 0 && (
                                            <li>
                                                <h4 className="price-title">Coupon</h4>
                                                <span>${coupon.discount}</span>
                                            </li>
                                        )}
                                        <li>
                                            <h4 className="price-title">Total</h4>
                                            <span className="totals">
                                                $
                                                {coupon && Object.keys(coupon).length !== 0
                                                    ? total - coupon.discount
                                                    : total}
                                            </span>
                                        </li>
                                    </ul>

                                    <div className="payment">
                                        <label className="radio">
                                            <div className="radio-label">Check Payments</div>
                                            <input type="radio" checked="checked" readOnly name="radio" />
                                            <span className="radio-checkmark"></span>
                                        </label>
                                        <div className="payment__note">
                                            {/* Please send a check to Store Name, Store Street, Store Town, Store State /
                                            County, Store Postcode. */}
                                            <CardElement />
                                        </div>
                                    </div>

                                    <div className="checkout__button">
                                        <button
                                            type="submit"
                                            form="hook-form"
                                            className="btn btn-lg btn-dark text-uppercase"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Processing..." : `Pay $${total}`}
                                        </button>
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
