import Image from "constants/Image";
import React from "react";
import "./Preloader.scss";

function Preloader({ isHidden }) {
    return (
        <div className={`preloader ${isHidden ? "hide" : ""}`}>
            <img src={Image.LOGO} alt="Preloader" className="preloader-image" />
        </div>
    );
}

export default Preloader;
