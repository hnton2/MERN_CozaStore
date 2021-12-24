import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import "./ProductCard.scss";
import { Checkbox, Container, Modal } from "@mui/material";
import ProductDetail from "../../components/ProductDetail";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

const Backdrop = styled.div`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-tap-highlight-color: transparent;
`;

function ProductCard({ name, price, image }) {
    const [showDetail, setShowDetail] = useState(false);
    const handleShowDetail = () => {
        setShowDetail(true);
    };
    const handleCloseDetail = () => {
        setShowDetail(false);
    };

    return (
        <div className="product-card">
            <div className="product-card__image">
                <img src={image} alt={name} />
                <button className="btn bg-white" onClick={handleShowDetail}>
                    Quick View
                </button>
            </div>
            <div className="product-card__desc">
                <div>
                    <Link to="#" className="product__title">
                        {name}
                    </Link>
                    <div className="product__price">{price}</div>
                </div>
                <Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />
            </div>

            <Modal open={showDetail} onClose={handleCloseDetail} BackdropComponent={Backdrop}>
                <Container>
                    <div className="product-card__modal">
                        <ProductDetail />
                    </div>
                </Container>
            </Modal>
        </div>
    );
}

export default ProductCard;
