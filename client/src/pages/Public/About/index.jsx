import { Container, Grid } from "@mui/material";
import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import TitlePage from "components/TitlePage";
import Image from "constants/Image";
import "./About.scss";

function About() {
    return (
        <>
            <Header />
            <div className="main">
                <TitlePage background={Image.BACKGROUND1} title="About Us" />
                <div className="about">
                    <Container>
                        <div className="about__story">
                            <Grid container spacing={2}>
                                <Grid item md={7} lg={8}>
                                    <div className="about__content p-right">
                                        <h3>Our Story</h3>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat
                                            consequat enim, non auctor massa ultrices non. Morbi sed odio massa. Quisque
                                            at vehicula tellus, sed tincidunt augue. Orci varius natoque penatibus et
                                            magnis dis parturient montes, nascetur ridiculus mus. Maecenas varius
                                            egestas diam, eu sodales metus scelerisque congue. Pellentesque habitant
                                            morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                                            Maecenas gravida justo eu arcu egestas convallis. Nullam eu erat bibendum,
                                            tempus ipsum eget, dictum enim. Donec non neque ut enim dapibus tincidunt
                                            vitae nec augue. Suspendisse potenti. Proin ut est diam. Donec condimentum
                                            euismod tortor, eget facilisis diam faucibus et. Morbi a tempor elit.
                                        </p>
                                        <p>
                                            Donec gravida lorem elit, quis condimentum ex semper sit amet. Fusce eget
                                            ligula magna. Aliquam aliquam imperdiet sodales. Ut fringilla turpis in
                                            vehicula vehicula. Pellentesque congue ac orci ut gravida. Aliquam erat
                                            volutpat. Donec iaculis lectus a arcu facilisis, eu sodales lectus sagittis.
                                            Etiam pellentesque, magna vel dictum rutrum, neque justo eleifend elit, vel
                                            tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo efficitur, quam
                                            velit convallis ipsum, et maximus enim ligula ac ligula.
                                        </p>
                                        <p>
                                            Any questions? Let us know in store at 8th floor, 379 Hudson St, New York,
                                            NY 10018 or call us on (+1) 96 716 6879
                                        </p>
                                    </div>
                                </Grid>
                                <Grid item md={5} lg={4}>
                                    <div className="about__pic">
                                        <div className="pic-hover">
                                            <img src={Image.ABOUT1} alt="" />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className="about__misto">
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={5} lg={4} order={{ xs: 2, sm: 2, md: 1, lg: 1 }}>
                                    <div className="about__pic">
                                        <div className="pic-hover">
                                            <img src={Image.ABOUT2} alt="" />
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={7} lg={8} order={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
                                    <div className="about__content p-left">
                                        <h3>Our Mission</h3>
                                        <p>
                                            Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus
                                            dignissim risus, sed consectetur erat. Pellentesque habitant morbi tristique
                                            senectus et netus et malesuada fames ac turpis egestas. Nullam maximus
                                            mauris sit amet odio convallis, in pharetra magna gravida. Praesent sed nunc
                                            fermentum mi molestie tempor. Morbi vitae viverra odio. Pellentesque ac
                                            velit egestas, luctus arcu non, laoreet mauris. Sed in ipsum tempor,
                                            consequat odio in, porttitor ante. Ut mauris ligula, volutpat in sodales in,
                                            porta non odio. Pellentesque tempor urna vitae mi vestibulum, nec venenatis
                                            nulla lobortis. Proin at gravida ante. Mauris auctor purus at lacus maximus
                                            euismod. Pellentesque vulputate massa ut nisl hendrerit, eget elementum
                                            libero iaculis.
                                        </p>
                                        <div className="quote">
                                            <p>
                                                Creativity is just connecting things. When you ask creative people how
                                                they did something, they feel a little guilty because they didn't really
                                                do it, they just saw something. It seemed obvious to them after a while.
                                            </p>
                                            <span>- Steve Job’s</span>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default About;
