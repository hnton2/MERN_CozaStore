import React, { useState } from "react";
import "./Checkout.scss";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container, Grid } from "@mui/material";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_VALUE_CHECKOUT } from "constants/Data";
import { checkoutValidation } from "helpers/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import makeAnimated from "react-select/animated";
import countryList from "react-select-country-list";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { publicRequest } from "helpers/requestMethod";
import { toast } from "react-toastify";
import orderServices from "services/order";
import { useDispatch } from "react-redux";
import { clearCart } from "redux/cartSlice";
import { Helmet } from "react-helmet";
import userServices from "services/user";

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
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const countryOptions = useMemo(() => countryList().getData(), []);
    const user = useSelector((state) => state.auth.currentUser);
    const { products, total, coupon } = useSelector((state) => state.cart);
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: DEFAULT_VALUE_CHECKOUT, resolver: yupResolver(checkoutValidation) });

    const onSubmit = async (data) => {
        if (!stripe || !elements) return;

        const billingDetails = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: {
                country: data.country.value,
                city: data.province,
                state: `${data.district} district,  ${data.ward} ward`,
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
            toast.error(result.error.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (result.paymentIntent.status === "succeeded") {
                try {
                    const res = await orderServices.createOrder({
                        user: {
                            name: `${data.firstname} ${data.lastname}`,
                            email: data.email,
                            phone: data.phone,
                            address: {
                                country: data.country.value,
                                province: data.province,
                                district: data.district,
                                ward: data.ward,
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
                        toast.success("The payment has been processed!", {
                            position: "top-center",
                        });
                        navigate(`/confirmation?invoice-code=${res.data.order.code}`);
                        dispatch(clearCart());
                    }
                } catch (error) {
                    toast.error(error.message, {
                        position: "top-center",
                        autoClose: 5000,
                    });
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
                                                            name="country"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    {...field}
                                                                    placeholder="Country..."
                                                                    options={countryOptions}
                                                                    components={animatedComponents}
                                                                    styles={customStyles}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                {errors.country && (
                                                    <p className="error-message">*{errors.country.message}</p>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("province")}
                                                        placeholder="Province - City"
                                                    />
                                                </div>
                                                {errors.province && (
                                                    <p className="error-message">*{errors.province.message}</p>
                                                )}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("district")}
                                                        placeholder="District"
                                                    />
                                                </div>
                                                {errors.district && (
                                                    <p className="error-message">*{errors.district.message}</p>
                                                )}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                <div className="form-group">
                                                    <input type="text" {...register("ward")} placeholder="Ward" />
                                                </div>
                                                {errors.ward && <p className="error-message">*{errors.ward.message}</p>}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div className="form-group">
                                                <input type="text" {...register("street")} placeholder="Street" />
                                            </div>
                                            {errors.street && <p className="error-message">*{errors.street.message}</p>}
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
                                            <input type="radio" checked="checked" name="radio" />
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
