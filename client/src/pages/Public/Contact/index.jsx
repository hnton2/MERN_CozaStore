import { yupResolver } from "@hookform/resolvers/yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Backdrop, CircularProgress, Container, Grid } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import { toastMessage } from "helpers/toastMessage";
import { contactValidation } from "helpers/validation";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import contactServices from "services/contact";
import "./Contact.scss";

function Contact() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(contactValidation) });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const res = await contactServices.createItem(data);
            if (res.data.success) toastMessage({ type: "success", message: res.data.message });
            else toastMessage({ type: "error", message: res.data.message });
            setIsLoading(false);
        } catch (error) {
            toastMessage({ type: "error", message: error.data.message });
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact</title>
            </Helmet>
            <Header />
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Contact" />
                <div className="contact">
                    <Container>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <form onSubmit={handleSubmit(onSubmit)} className="contact__container form">
                                    <h4>Send Us A Message</h4>
                                    {errors["email"] && <p className="error-message">*{errors["email"].message}</p>}
                                    <div className="form-group">
                                        <img src={Image.ICON_EMAIL} alt="" />
                                        <input
                                            {...register("email")}
                                            type="text"
                                            placeholder="Your Email Address"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            {...register("message")}
                                            cols="30"
                                            rows="10"
                                            placeholder="How Can We Help?"
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-lg btn-dark text-uppercase contact-btn">
                                        Submit
                                    </button>
                                </form>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <div className="contact__container information">
                                    <div className="contact-desc">
                                        <div className="contact-desc__icon">
                                            <LocationOnOutlinedIcon sx={{ fontSize: 28 }} />
                                        </div>
                                        <div className="contact-desc__content">
                                            <h4 className="contact-title">Address</h4>
                                            <p className="contact-subtitle">
                                                Address Coza Store Center 8th floor, 379 Hudson St, New York, NY 10018
                                                US
                                            </p>
                                        </div>
                                    </div>
                                    <div className="contact-desc">
                                        <div className="contact-desc__icon">
                                            <LocalPhoneOutlinedIcon sx={{ fontSize: 28 }} />
                                        </div>
                                        <div className="contact-desc__content">
                                            <h4 className="contact-title">Lets Talk</h4>
                                            <p className="contact-subtitle text-primary">Lets Talk +1 800 1236879</p>
                                        </div>
                                    </div>
                                    <div className="contact-desc">
                                        <div className="contact-desc__icon">
                                            <EmailOutlinedIcon sx={{ fontSize: 28 }} />
                                        </div>
                                        <div className="contact-desc__content">
                                            <h4 className="contact-title">Sale Support</h4>
                                            <p className="contact-subtitle text-primary">contact@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>

                <iframe
                    title="map"
                    src="https://maps.google.com/maps?q=University%20of%20information%20technology&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    className="maps"
                ></iframe>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
