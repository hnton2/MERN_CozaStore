import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import "./ProductCard.scss";

function ProductCard({ name, price, image }) {
    return (
        <div className="product-card">
            <div className="product-card__image">
                <img src={image} alt={name} />
                <button className="btn bg-white">Quick View</button>
            </div>
            <div className="product-card__desc">
                <div>
                    <Link to="#" className="product__title">
                        {name}
                    </Link>
                    <div className="product__price">{price}</div>
                </div>
                <button className="product__favorite">
                    <FavoriteBorderIcon className="product__icon" />
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
