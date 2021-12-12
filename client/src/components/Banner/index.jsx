import React from "react";
import { Link } from "react-router-dom";
import "./Banner.scss";

function Banner({ title, subtitle, image }) {
    return (
        <div className="banner">
            <img src={image} alt={title} className="banner__img" />
            <Link to="#" className="banner__link">
                <div className="banner__desc">
                    <h3>{title}</h3>
                    <span>{subtitle}</span>
                </div>
                <button className="banner__btn">Shop Now</button>
            </Link>
        </div>
    );
}

export default Banner;
