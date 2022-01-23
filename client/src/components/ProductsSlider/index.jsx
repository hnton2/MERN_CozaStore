import React from "react";
import Slider from "react-slick";
import "./ProductsSlider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../ProductCard";

function ProductsSlider({ products }) {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <ArrowForwardIosIcon />,
        prevArrow: <ArrowBackIosIcon />,
        responsive: [
            {
                breakpoint: 576,
                settings: { slidesToShow: 1, slidesToScroll: 1 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 3, slidesToScroll: 3 },
            },
        ],
    };
    console.log("slider", products);

    return (
        <div className="products-slider">
            <Slider {...settings}>
                {products.map((item, index) => {
                    return (
                        <div key={index + 1}>
                            <ProductCard product={item} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default ProductsSlider;
