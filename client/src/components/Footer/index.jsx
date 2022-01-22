import { Container, Grid } from "@mui/material";
import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Image from "constants/Image";

function Footer() {
    return (
        <footer>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={6} sm={6} md={3}>
                        <h4 className="footer__title">CATEGORIES</h4>
                        <ul>
                            <li>
                                <Link to="#" className="footer__link">
                                    Women
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    Shoes
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    Watches
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3}>
                        <h4 className="footer__title">HELP</h4>
                        <ul>
                            <li>
                                <Link to="#" className="footer__link">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    Shipping
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="footer__link">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <h4 className="footer__title">GET IN TOUCH</h4>
                        <p className="footer__paragraph">
                            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York, NY 10018 or call
                            us on (+1) 96 716 6879 or email to sunday146@gmail.com
                        </p>
                        <div className="footer__social">
                            <Link to="#" className="footer__social-link">
                                <FacebookIcon />
                            </Link>
                            <Link to="#" className="footer__social-link">
                                <InstagramIcon />
                            </Link>
                            <Link to="#" className="footer__social-link">
                                <PinterestIcon />
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <h4 className="footer__title">NEWSLETTER</h4>
                        <form className="footer__form">
                            <div className="footer__input">
                                <input type="text" placeholder="email@example.com" />
                                <div className="focus-input"></div>
                            </div>
                            <button className="btn btn-lg btn-light text-uppercase footer-btn">Subscribe</button>
                        </form>
                    </Grid>
                </Grid>
                <div className="footer__payment">
                    <img src={Image.ICONPAY1} alt="Paypal" />
                    <img src={Image.ICONPAY2} alt="Visa" />
                    <img src={Image.ICONPAY3} alt="Master Card" />
                    <img src={Image.ICONPAY4} alt="Payment 4" />
                    <img src={Image.ICONPAY5} alt="Payment 5" />
                </div>
                <div className="footer__copyright">
                    <p>Copyright ©2021 All rights reserved</p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
