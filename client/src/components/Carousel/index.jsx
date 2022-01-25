import React, { useRef } from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CustomSlide from "./CustomSlide";
import Image from "constants/Image";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={"slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        <ArrowLeftIcon sx={{ fontSize: 80 }} />
    </button>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={"slick-next slick-arrow" + (currentSlide === slideCount - 1 ? " slick-disabled" : "")}
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        <ArrowRightIcon sx={{ fontSize: 80 }} />,
    </button>
);

const carouselData = [
    {
        event: "Men Collection 2020",
        title: "New Arrivals",
        img: Image.SLIDE3,
    },
    {
        event: "Men New - Season",
        title: "Jackets & Coats",
        img: Image.SLIDE2,
    },
    {
        event: "Women Collection 2020",
        title: "New Season",
        img: Image.SLIDE1,
    },
];

function Carousel() {
    const slider = useRef();

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

    return (
        <div>
            <Slider ref={slider} {...settings}>
                {carouselData.map((item, index) => (
                    <CustomSlide
                        key={index + 1}
                        event={item.event}
                        title={item.title}
                        img={item.img}
                        nAnimate={index + 1}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default Carousel;
