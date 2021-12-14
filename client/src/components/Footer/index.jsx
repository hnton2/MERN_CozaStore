import { Container, Grid } from "@mui/material";
import React from "react";
import "./Footer.scss";

function Footer() {
    return (
        <footer>
            <Container>
                <Grid container spacing={1}>
                    <Grid item sm={6} md={3}>
                        hello
                    </Grid>
                    <Grid item sm={6} md={3}>
                        hello
                    </Grid>
                    <Grid item sm={6} md={3}>
                        hello
                    </Grid>
                    <Grid item sm={6} md={3}>
                        hello
                    </Grid>
                </Grid>
                <div className="footer__icons"></div>
                <div className="footer__copyright"></div>
            </Container>
        </footer>
    );
}

export default Footer;
