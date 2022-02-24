import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Grid } from "@mui/material";
import { Form, QuantityField, SelectField } from "components/CustomForm";
import { SlickArrowLeft } from "components/SlickArrow";
import { SlickArrowRight } from "components/SlickArrow";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { addProductValidation } from "helpers/validation";
import parse from "html-react-parser";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { addProduct } from "redux/cartSlice";
import "./ProductDetail.scss";

function ProductDetail({ product }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);

    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const settings = {
        customPaging: function (i) {
            return (
                <img src={IMAGE_CLOUDINARY + product.images[i]} className="product__image-dots" alt={product.name} />
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SlickArrowRight />,
        prevArrow: <SlickArrowLeft />,
    };
    const onSubmit = (data) => {
        if (user) {
            dispatch(addProduct({ ...product, ...data, color: data.color.label, size: data.size.label }));
            toast.success("Add product to cart successfully!", {
                position: "top-center",
            });
        } else navigate("/login");
    };

    return (
        <div className="product">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={7} lg={7}>
                    <div>
                        <Slider {...settings}>
                            {product.images.map((item, index) => (
                                <div key={index}>
                                    <div className="product__slide">
                                        <div className="product-image">
                                            <img src={IMAGE_CLOUDINARY + item} alt={product.name} />
                                        </div>
                                        <div className="btn-expand">
                                            <button className="btn btn-light" onClick={() => setIsOpenModal(true)}>
                                                <ZoomOutMapIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <div className="product__content">
                        <h3 className="product__content-title">{product.name}</h3>
                        <span className="product__content-price">${product.price}</span>
                        <p className="product__content-summary">{parse(product.description)}</p>
                        <div className="product__content-form">
                            <Form onSubmit={onSubmit} validation={addProductValidation}>
                                <SelectField name="size" options={product.size} placeholder="Size..." />
                                <SelectField name="color" options={product.color} placeholder="Color..." />
                                <QuantityField name="quantity" />
                                <button className="btn btn-add btn-primary text-uppercase">Add to cart</button>
                            </Form>
                        </div>
                        <div className="product__content-share">
                            <button className="border-right">
                                <FavoriteIcon fontSize="small" className="icon-share" />
                            </button>
                            <button>
                                <FacebookIcon fontSize="small" className="icon-share" />
                            </button>
                            <button>
                                <TwitterIcon fontSize="small" className="icon-share" />
                            </button>
                            <button>
                                <GoogleIcon fontSize="small" className="icon-share" />
                            </button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            {isOpenModal && (
                <Lightbox
                    mainSrc={IMAGE_CLOUDINARY + product.images[photoIndex]}
                    nextSrc={product.images[(photoIndex + 1) % product.images.length]}
                    prevSrc={product.images[(photoIndex + product.images.length - 1) % product.images.length]}
                    onCloseRequest={() => setIsOpenModal(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + product.images.length - 1) % product.images.length)
                    }
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % product.images.length)}
                />
            )}
        </div>
    );
}

export default ProductDetail;
