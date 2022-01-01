import React from "react";
import { Container, Grid, Rating } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import ProductDetail from "components/ProductDetail";
import ProductsSlider from "components/ProductsSlider";
import "./Product.scss";
import Image from "constants/Image";
import CustomTabs from "components/CustomTabs";
import Breadcrumbs from "components/Breadcumbs";

const dataTab1 = [
    {
        name: "Esprit Ruffle Shirt",
        price: 16.64,
        image: Image.PRODUCT1,
    },
    {
        name: "Herschel Supply",
        price: 16.64,
        image: Image.PRODUCT2,
    },
    {
        name: "Only Check Trouser",
        price: 16.64,
        image: Image.PRODUCT3,
    },
    {
        name: "Classic Trench Coat",
        price: 16.64,
        image: Image.PRODUCT4,
    },
    {
        name: "Front Pocket Jumper",
        price: 16.64,
        image: Image.PRODUCT5,
    },
    {
        name: "Vintage Inspired Classic",
        price: 16.64,
        image: Image.PRODUCT6,
    },
    {
        name: "Shirt in Stretch Cotton",
        price: 16.64,
        image: Image.PRODUCT7,
    },
    {
        name: "Pieces Metallic Printed",
        price: 16.64,
        image: Image.PRODUCT8,
    },
];

const reviewData = [
    {
        name: "Ariana Grande",
        avatar: Image.AVATAR1,
        rating: 4.5,
        message: "Quod autem in homine praestantissimum atque optimum est, id deseruit. Apud ceteros autem philosophos",
    },
];

const Review = ({ reviews }) => (
    <Container maxWidth="sm">
        <div className="review-list">
            {reviews.map((review, index) => (
                <div className="review" key={index}>
                    <img src={review.avatar} alt={review.name} className="review__avatar" />
                    <div>
                        <div className="review__header">
                            <span className="review__name">{review.name}</span>
                            <Rating name="half-rating" defaultValue={review.rating} precision={0.5} />
                        </div>
                        <p className="review__message">{review.message}</p>
                    </div>
                </div>
            ))}
        </div>
        <form className="review-form">
            <h5>Add a review</h5>
            <p>Your email address will not be published. Required fields are marked *</p>
            <Grid container rowSpacing={2}>
                <Grid item lg={12}>
                    <div className="form-group">
                        <label>Your Rating</label>
                        <Rating name="half-rating" defaultValue={0} precision={0.5} />
                    </div>
                </Grid>
                <Grid item lg={12}>
                    <div className="form-group fxd-col">
                        <label>Your Review</label>
                        <textarea name="" id="" cols="30" rows="5"></textarea>
                    </div>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <div className="form-group fxd-col">
                            <label>Name</label>
                            <input type="text" />
                        </div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className="form-group fxd-col">
                            <label>Email</label>
                            <input type="text" />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <button className="submit-btn btn text-uppercase hover-black">Submit</button>
        </form>
    </Container>
);

const infoList = {
    weight: "0.79kg",
    dimensions: "110 x 33 x 100 cm",
    materials: "60% cotton",
    color: "Black, Blue, Grey, Green, Red, White",
    size: "XL, L, M, S",
};

const Information = ({ info }) => (
    <Container maxWidth="sm">
        <div className="product-tabs__info">
            <ul>
                <li>
                    <span className="info-name">Weight</span>
                    <span className="info-detail">{info.weight}</span>
                </li>
                <li>
                    <span className="info-name">Dimensions</span>
                    <span className="info-detail">{info.dimensions}</span>
                </li>
                <li>
                    <span className="info-name">Materials</span>
                    <span className="info-detail">{info.materials}</span>
                </li>
                <li>
                    <span className="info-name">Color</span>
                    <span className="info-detail">{info.color}</span>
                </li>
                <li>
                    <span className="info-name">Size</span>
                    <span className="info-detail">{info.size}</span>
                </li>
            </ul>
        </div>
    </Container>
);

const overviewData = [
    {
        label: "Description",
        content: (
            <p className="product-tabs__desc">
                Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc fringilla sit amet. Ut in
                blandit ipsum. Quisque luctus dui at ante aliquet, in hendrerit lectus interdum. Morbi elementum sapien
                rhoncus pretium maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros. Ut ex quam,
                porta consequat interdum in, faucibus eu velit. Quisque rhoncus ex ac libero varius molestie. Aenean
                tempor sit amet orci nec iaculis. Cras sit amet nulla libero. Curabitur dignissim, nunc nec laoreet
                consequat, purus nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed metus rutrum
                iaculis. Nulla non tempor erat. Duis in egestas nunc.
            </p>
        ),
    },
    {
        label: "Additional Information",
        content: <Information info={infoList} />,
    },
    {
        label: "Review (1)",
        content: <Review reviews={reviewData} />,
    },
];

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Men",
        path: "/category",
    },
];

function Product() {
    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Lightweight Jacket" />
                    <ProductDetail />
                    <div className="product-tabs">
                        <CustomTabs panels={overviewData} />
                    </div>
                </Container>
                <div className="product-tags">
                    <span>Categories: Jacket, Men</span>
                </div>
                <Container>
                    <div className="product-related">
                        <h3>Related Products</h3>
                        <ProductsSlider products={dataTab1} />
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Product;
