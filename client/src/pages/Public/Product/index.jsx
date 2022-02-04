import React, { useEffect, useState } from "react";
import { Container, Rating } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import ProductDetail from "components/ProductDetail";
import ProductsSlider from "components/ProductsSlider";
import "./Product.scss";
import Breadcrumbs from "components/Breadcrumbs";
import { useParams } from "react-router-dom";
import productServices from "services/product";
import { Form, InputField } from "components/CustomForm";
import { reviewValidation } from "helpers/validation";
import Preloader from "components/Preloader";

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
    const { slug: currentSlug } = useParams();
    const [productDetail, setProductDetail] = useState();
    const [productRelated, setProductRelated] = useState([]);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productServices.getProductDetailBySlug(currentSlug);
                if (response.data.success) setProductDetail(response.data.product);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductDetail();
    }, [currentSlug]);

    useEffect(() => {
        const fetchProductRelated = async () => {
            try {
                const response = await productServices.getProductByCategory(productDetail.category.slug);
                if (response.data.success) setProductRelated(response.data.product);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProductRelated();
    }, [productDetail]);

    const onSubmit = (data) => {
        console.log("review submit: ", data);
    };

    return (
        <>
            <Header />
            <Preloader isHidden={productDetail} />
            {productDetail && (
                <div className="main">
                    <Container>
                        <Breadcrumbs links={linkData} current={productDetail.name} />
                        <ProductDetail product={productDetail} />
                        <div className="product-review">
                            <Container maxWidth="sm">
                                {productDetail.reviews && (
                                    <div className="review-list">
                                        {productDetail.reviews.map((review, index) => (
                                            <div className="review" key={index}>
                                                <img src={review.avatar} alt={review.name} className="review__avatar" />
                                                <div>
                                                    <div className="review__header">
                                                        <span className="review__name">{review.name}</span>
                                                        <Rating
                                                            name="half-rating"
                                                            defaultValue={review.rating}
                                                            precision={0.5}
                                                        />
                                                    </div>
                                                    <p className="review__message">{review.message}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="review-form">
                                    <h5>Add a review</h5>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                    <div className="form-group">
                                        <label>Your Rating</label>
                                        <Rating name="half-rating" defaultValue={5} precision={0.5} />
                                    </div>
                                    <Form onSubmit={onSubmit} validation={reviewValidation}>
                                        <InputField name="name" placeholder="Name" />
                                        <InputField name="email" placeholder="Email" />
                                        <InputField name="content" placeholder="Review" />
                                        <button className="submit-btn btn btn-dark text-uppercase">Submit</button>
                                    </Form>
                                </div>
                            </Container>
                        </div>
                    </Container>
                    <div className="product-tags">
                        <span>Categories: {productDetail.category.name}</span>
                    </div>
                    <Container>
                        <div className="product-related">
                            <h3>Related Products</h3>
                            <ProductsSlider products={productRelated} />
                        </div>
                    </Container>
                </div>
            )}
            <Footer />
        </>
    );
}

export default Product;
