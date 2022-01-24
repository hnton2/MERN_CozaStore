import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleIcon from "@mui/icons-material/Google";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TwitterIcon from "@mui/icons-material/Twitter";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { Grid } from "@mui/material";
import { IMAGE_CLOUDINARY } from "constants/Data";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import Slider from "react-slick";
import QuantityButton from "../QuantityButton";
import "./ProductDetail.scss";
import parse from "html-react-parser";

function ProductDetail({ product }) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const settings = {
        customPaging: function (i) {
            return <img src={IMAGE_CLOUDINARY + product.images[i]} className="product__image-dots" />;
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <KeyboardArrowRightIcon />,
        prevArrow: <KeyboardArrowLeftIcon />,
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
                                            <img src={IMAGE_CLOUDINARY + item} />
                                        </div>
                                        <div className="btn-expand">
                                            <button className="btn bg-light" onClick={() => setIsOpenModal(true)}>
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
                        <form className="product__content-form">
                            <div className="form-group">
                                <label>Size</label>
                                <Select
                                    options={product.size}
                                    className="form-control"
                                    placeholder="Choose an option"
                                />
                            </div>
                            <div className="form-group">
                                <label>Color</label>
                                <Select
                                    options={product.color}
                                    className="form-control"
                                    placeholder="Choose an option"
                                />
                            </div>
                            <div className="form-group">
                                <label></label>
                                <div className="form-control">
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item lg={12} md={6} sm={6}>
                                            <QuantityButton />
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6}>
                                            <button className="btn btn-primary text-uppercase">Add to cart</button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </form>
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
