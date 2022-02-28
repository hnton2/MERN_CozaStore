import { Avatar, Container, Rating } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Form, InputField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import ProductDetail from "components/ProductDetail";
import ProductsSlider from "components/ProductsSlider";
import { stringAvatar } from "helpers/string";
import { toastMessage } from "helpers/toastMessage";
import { reviewValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import productServices from "services/product";
import "./Product.scss";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
    {
        name: "Category",
        path: "/product-category/all",
    },
];

function Product() {
    const { slug: currentSlug } = useParams();
    const [productDetail, setProductDetail] = useState();
    const [rating, setRating] = useState(5);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await productServices.getPublicItem(currentSlug);
                if (response.data.success) setProductDetail(response.data.item);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchProductDetail();
        window.scrollTo(0, 0);
    }, [currentSlug]);

    const onSubmit = async (data) => {
        try {
            const res = await productServices.addReview(productDetail.slug, { ...data, rating });
            if (res.data.success) setProductDetail(res.data.product);
        } catch (error) {
            toastMessage({ type: "error", message: error.message });
        }
    };

    return (
        <>
            <Header />
            <Preloader isHidden={productDetail} />
            {productDetail && (
                <div className="main">
                    <Helmet>
                        <title>{productDetail.name}</title>
                    </Helmet>
                    <Container>
                        <Breadcrumbs links={linkData} current={productDetail.name} />
                        <ProductDetail product={productDetail} />
                        <div className="product-review">
                            <Container maxWidth="sm">
                                {productDetail.reviews && (
                                    <div className="review-list">
                                        {productDetail.reviews.map((review, index) => (
                                            <div className="review" key={index}>
                                                <Avatar {...stringAvatar(review.name, { width: 60, height: 60 })} />
                                                <div className="review__container">
                                                    <div className="title">
                                                        <span className="review__name">{review.name}</span>
                                                        <Rating
                                                            name="half-rating"
                                                            defaultValue={review.rating}
                                                            precision={0.5}
                                                        />
                                                    </div>
                                                    <p className="message">{review.content}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="review-form">
                                    <h5>Add a review</h5>
                                    <p>Your email address will not be published. Required fields are marked *</p>
                                    <div className="review-rating">
                                        <label>Your Rating</label>
                                        <Rating
                                            name="half-rating"
                                            value={rating}
                                            precision={0.5}
                                            onChange={(event, newValue) => setRating(newValue)}
                                        />
                                    </div>
                                    <Form onSubmit={onSubmit} validation={reviewValidation}>
                                        <InputField name="name" placeholder="Name" />
                                        <InputField name="email" placeholder="Email" />
                                        <InputField name="content" placeholder="Review" />
                                        <button type="submit" className="submit-btn btn btn-dark text-uppercase">
                                            Submit
                                        </button>
                                    </Form>
                                </div>
                            </Container>
                        </div>
                    </Container>
                    <div className="product-tags">
                        <span>Categories: {productDetail.category.name}</span>
                    </div>
                    {productDetail && (
                        <Container>
                            <div className="product-related">
                                <h3>Related Products</h3>
                                <ProductsSlider
                                    task="related"
                                    params={{ category: productDetail.category.slug, id: productDetail._id }}
                                />
                            </div>
                        </Container>
                    )}
                </div>
            )}
            <Footer />
        </>
    );
}

export default Product;
