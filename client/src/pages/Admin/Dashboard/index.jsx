import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcumbs";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";
import "./Dashboard.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 700, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 600, pv: 2400, amt: 2400 },
];

const DashboardCard = ({ name, amount, icon }) => {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card__wrapper">
                <div className="dashboard-card__content">
                    <div>
                        <h3>{amount}</h3>
                        <span>{name}</span>
                    </div>
                    {icon}
                </div>
                <Link to="#" className="dashboard-card__footer">
                    More info &nbsp;
                    <ArrowCircleRightIcon fontSize="small" />
                </Link>
            </div>
        </div>
    );
};

function Dashboard() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Dashboard" />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardCard
                                name="David Green"
                                amount="10,865"
                                icon={<ShoppingCartIcon sx={{ fontSize: 60 }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardCard
                                name="David Green"
                                amount="10,865"
                                icon={<ShoppingCartIcon sx={{ fontSize: 60 }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardCard
                                name="David Green"
                                amount="10,865"
                                icon={<ShoppingCartIcon sx={{ fontSize: 60 }} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <DashboardCard
                                name="David Green"
                                amount="10,865"
                                icon={<ShoppingCartIcon sx={{ fontSize: 60 }} />}
                            />
                        </Grid>
                    </Grid>
                    <div className="statistic">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={8} lg={9}>
                                <div className="chart">
                                    <div className="chart__header">
                                        <StackedLineChartIcon />
                                        <h3>Sales</h3>
                                    </div>
                                    <div className="chart__body">
                                        <ResponsiveContainer width="100%" height={350}>
                                            <AreaChart data={data}>
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={3}>
                                <div className="statistic-box">
                                    <LocalOfferIcon sx={{ fontSize: 40 }} />
                                    <div className="content">
                                        <span className="title">Product</span>
                                        <span className="subtitle">543</span>
                                    </div>
                                </div>
                                <div className="statistic-box">
                                    <ContactMailIcon sx={{ fontSize: 40 }} />
                                    <div className="content">
                                        <span className="title">Contact</span>
                                        <span className="subtitle">230</span>
                                    </div>
                                </div>
                                <div className="statistic-box">
                                    <MonetizationOnIcon sx={{ fontSize: 40 }} />
                                    <div className="content">
                                        <span className="title">Sales</span>
                                        <span className="subtitle">$2.000.000</span>
                                    </div>
                                </div>
                                <div className="statistic-box">
                                    <PersonIcon sx={{ fontSize: 40 }} />
                                    <div className="content">
                                        <span className="title">User</span>
                                        <span className="subtitle">1000</span>
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

export default Dashboard;
