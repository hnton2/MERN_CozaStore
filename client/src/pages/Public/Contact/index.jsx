import { Container, Grid } from "@mui/material";
import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import "./Contact.scss";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

function Contact() {
    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND2} title="Contact" />
                <div className="contact">
                    <Container>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <form className="contact__container form">
                                    <h4>Send Us A Message</h4>
                                    <div className="form-group">
                                        <img src={Image.ICON_EMAIL} alt="" />
                                        <input type="text" placeholder="Your Email Address" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            cols="30"
                                            rows="10"
                                            placeholder="How Can We Help?"
                                            className="form-control"
                                        ></textarea>
                                    </div>
                                    <button className="btn btn-lg btn-dark text-uppercase contact-btn">Submit</button>
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
                    src="https://maps.google.com/maps?q=University%20of%20information%20technology&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    className="maps"
                ></iframe>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
