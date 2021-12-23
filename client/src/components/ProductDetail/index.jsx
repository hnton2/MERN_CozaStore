import { Container, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import Image from "../../constants/Image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import "./ProductDetail.scss";
import Select from "react-select";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import QuantityButton from "../QuantityButton";

const images = [Image.PRODUCT_DETAIL1, Image.PRODUCT_DETAIL2, Image.PRODUCT_DETAIL3];

function ProductDetail() {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const settings = {
        customPaging: function (i) {
            return <img src={Image[`PRODUCT_DETAIL${i + 1}`]} className="product__image-dots" />;
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
                            <div>
                                <div className="product__slide">
                                    <div className="product-image">
                                        <img src={Image.PRODUCT_DETAIL1} />
                                    </div>
                                    <div className="btn-expand">
                                        <button
                                            className="btn bg-white btn-circle"
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            <ZoomOutMapIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="product__slide">
                                    <div className="product-image">
                                        <img src={Image.PRODUCT_DETAIL2} />
                                    </div>
                                    <div className="btn-expand">
                                        <button
                                            className="btn bg-white btn-circle"
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            <ZoomOutMapIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="product__slide">
                                    <div className="product-image">
                                        <img src={Image.PRODUCT_DETAIL3} />
                                    </div>
                                    <div className="btn-expand">
                                        <button
                                            className="btn bg-white btn-circle"
                                            onClick={() => setIsOpenModal(true)}
                                        >
                                            <ZoomOutMapIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5} lg={5}>
                    <div className="product__content">
                        <h3 className="product__content-title">Lightweight Jacket</h3>
                        <span className="product__content-price">$58.79</span>
                        <p className="product__content-summary">
                            Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare
                            feugiat.
                        </p>
                        <form className="product__content-form">
                            <div className="form-group">
                                <label>Size</label>
                                <Select options={options} className="form-control" placeholder="Choose an option" />
                            </div>
                            <div className="form-group">
                                <label>Color</label>
                                <Select options={options} className="form-control" placeholder="Choose an option" />
                            </div>
                            <div className="form-group">
                                <div className="form-control">
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item lg={12} md={6} sm={6}>
                                            <QuantityButton />
                                        </Grid>
                                        <Grid item lg={12} md={6} sm={6}>
                                            <button className="btn btn-md text-uppercase hover-black">
                                                Add to cart
                                            </button>
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
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpenModal(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                />
            )}
        </div>
    );
}

export default ProductDetail;
