import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./ProductsSlider.scss";
import ProductCard from "../ProductCard";
import { SlickArrowRight } from "components/SlickArrow";
import { SlickArrowLeft } from "components/SlickArrow";
import productServices from "services/product";
import { toastMessage } from "helpers/toastMessage";

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
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

function ProductsSlider({ task, params }) {
    const [items, setItems] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await productServices.getProductsByTask(task, params);
                if (res.data.success) {
                    setItems(res.data.products);
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, [task, params]);

    return (
        <div className="products-slider">
            {items && items.length > 0 && (
                <Slider {...settings}>
                    {items.map((item) => {
                        return (
                            <div key={item._id}>
                                <ProductCard product={item} />
                            </div>
                        );
                    })}
                </Slider>
            )}
        </div>
    );
}

export default ProductsSlider;
