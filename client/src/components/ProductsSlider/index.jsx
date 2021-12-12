import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import Image from "../../constants/Image";
import ProductSlider from "./ProductSlider";
import "./ProductsSlider.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const dataTab1 = [
    {
        name: "Esprit Ruffle Shirt",
        price: 16.64,
        image: Image.PRODUCT1,
    },
    {
        name: "Herschel Supply",
        price: 16.64,
        image: Image.PRODUCT2,
    },
    {
        name: "Only Check Trouser",
        price: 16.64,
        image: Image.PRODUCT3,
    },
    {
        name: "Classic Trench Coat",
        price: 16.64,
        image: Image.PRODUCT4,
    },
    {
        name: "Front Pocket Jumper",
        price: 16.64,
        image: Image.PRODUCT5,
    },
    {
        name: "Vintage Inspired Classic",
        price: 16.64,
        image: Image.PRODUCT6,
    },
    {
        name: "Shirt in Stretch Cotton",
        price: 16.64,
        image: Image.PRODUCT7,
    },
    {
        name: "Pieces Metallic Printed",
        price: 16.64,
        image: Image.PRODUCT8,
    },
];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function ProductsSlider() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                settings: { slidesToShow: 1, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000 },
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2, autoplay: true, autoplaySpeed: 3000 },
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 3, slidesToScroll: 3 },
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 4, slidesToScroll: 4 },
            },
        ],
    };

    return (
        <div className="products-slider">
            <div className="tabs">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Best Seller" />
                    <Tab label="Featured" />
                    <Tab label="Sale" />
                    <Tab label="Top Rate" />
                </Tabs>
            </div>
            <div className="tab-content">
                <TabPanel value={value} index={0}>
                    <Slider {...settings}>
                        {dataTab1.map((item, index) => (
                            <div>
                                <ProductSlider key={index + 1} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </Slider>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Slider {...settings}>
                        {dataTab1.map((item, index) => (
                            <div>
                                <ProductSlider key={index + 1} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </Slider>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Slider {...settings}>
                        {dataTab1.map((item, index) => (
                            <div>
                                <ProductSlider key={index + 1} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </Slider>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Slider {...settings}>
                        {dataTab1.map((item, index) => (
                            <div>
                                <ProductSlider key={index + 1} name={item.name} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </Slider>
                </TabPanel>
            </div>
        </div>
    );
}

export default ProductsSlider;
