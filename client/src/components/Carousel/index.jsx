import React, { useRef } from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CustomSlide from "./CustomSlide";
import Image from "../../constants/Image";

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
        // autoplay: true,
        pauseOnHover: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ArrowRightIcon sx={{ fontSize: 80 }} />,
        prevArrow: <ArrowLeftIcon sx={{ fontSize: 80 }} />,
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
