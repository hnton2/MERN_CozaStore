import React, { useRef } from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomSlide from "./CustomSlide";
import { SlickArrowRight } from "components/SlickArrow";
import { SlickArrowLeft } from "components/SlickArrow";
import { IMAGE_CLOUDINARY } from "constants/Config";

const settings = {
    infinite: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 2000,
    autoplaySpeed: 8000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
};

function Carousel({ data }) {
    const slider = useRef();

    return (
        <div>
            <Slider ref={slider} {...settings}>
                {data.map((item, index) => (
                    <CustomSlide
                        key={item._id}
                        event={item.name}
                        title={item.description}
                        redirect={item.path}
                        img={IMAGE_CLOUDINARY + item.images[0]}
                        nAnimate={index + 1}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
