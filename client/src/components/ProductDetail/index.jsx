import { Container, Grid } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import Image from "../../constants/Image";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import "./ProductDetail.scss";
import Select from "react-select";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function ProductDetail() {
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={Image[`PRODUCT_DETAIL${i + 1}`]} className="product__image-dots" />
                </a>
            );
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
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <div>
                        <Slider {...settings}>
                            <div>
                                <div className="product__image">
                                    <img src={Image.PRODUCT_DETAIL1} />
                                    <div className="product__image-expand">
                                        <button onClick={() => console.log("object1")}>
                                            <OpenInFullIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="product__image">
                                    <img src={Image.PRODUCT_DETAIL2} />
                                    <div className="product__image-expand">
                                        <button onClick={() => console.log("object2")}>
                                            <OpenInFullIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="product__image">
                                    <img src={Image.PRODUCT_DETAIL3} />
                                    <div className="product__image-expand">
                                        <button onClick={() => console.log("object3")}>
                                            <OpenInFullIcon />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5}>
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
                                <div className="form-button">
                                    <div className="product-quantity">
                                        <button>
                                            <RemoveIcon fontSize="small" />
                                        </button>
                                        <input type="text" value={1} />
                                        <button>
                                            <AddIcon fontSize="small" />
                                        </button>
                                    </div>
                                    <button className="form-submit">Add to cart</button>
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
        </div>
    );
}

export default ProductDetail;
