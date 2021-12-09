import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button, Modal, Slide } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "../../constants/Image";
import SidebarModal from "../SidebarModal";
import "./Header.scss";

const Backdrop = styled.div`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.8);
    -webkit-tap-highlight-color: transparent;
`;

function Header() {
    const [openSearch, setOpenSearch] = useState(false);
    const [openCart, setOpenCart] = useState(false);

    const handleOpenSearch = () => {
        setOpenSearch(true);
    };
    const handleCloseSearch = () => {
        setOpenSearch(false);
    };

    const handleOpenCart = () => {
        setOpenCart(true);
    };
    const handleCloseCart = () => {
        setOpenCart(false);
    };

    return (
        <header className="header">
            <nav className="header__wrapper">
                <Link to="/" className="header__logo-link">
                    <img src={Image.LOGO} alt="" className="header__logo-img" />
                </Link>
                <div className="nav">
                    <ul className="nav__items">
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link active">
                                Home
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                Shop
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                Feature
                            </Link>
                            <ul className="sub-nav">
                                <li>
                                    <Link className="sub-nav-link" to="#">
                                        Man
                                    </Link>
                                </li>
                                <li>
                                    <Link className="sub-nav-link" to="#">
                                        Women
                                    </Link>
                                </li>
                                <li>
                                    <Link className="sub-nav-link" to="#">
                                        Kid
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                Blog
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                About
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="header-icons">
                    <div className="header-icons__container">
                        <button className="header-btn" onClick={handleOpenSearch}>
                            <SearchIcon className="header-icon" />
                        </button>
                        <button className="header-btn border-left-right" onClick={handleOpenCart}>
                            <Badge badgeContent={4} color="primary">
                                <ShoppingCartIcon className="header-icon" />
                            </Badge>
                        </button>
                        <button className="header-btn">
                            <MenuIcon className="header-icon" />
                        </button>
                    </div>
                </div>
            </nav>
            <Modal open={openSearch} onClose={handleCloseSearch} BackdropComponent={Backdrop}>
                <Slide in={openSearch} direction="down">
                    <div className="search-modal">
                        <button variant="text" className="button-close" onClick={handleCloseSearch}>
                            <CloseIcon sx={{ fontSize: 36, color: "#333" }} />
                        </button>
                        <form className="search-modal__form">
                            <button className="search-modal__button">
                                <SearchIcon sx={{ fontSize: 52 }} />
                            </button>
                            <input type="text" className="search-modal__input" placeholder="Search..." />
                        </form>
                    </div>
                </Slide>
            </Modal>
            <SidebarModal isOpen={openCart} onClose={handleCloseCart}>
                <div className="sidebar-modal__title">
                    <h3>Your Cart</h3>
                    <button onClick={handleCloseCart}>
                        <CloseIcon sx={{ fontSize: 36 }} />
                    </button>
                </div>
                <div className="sidebar-modal__content">
                    <ul className="cart__list">
                        <li className="cart__item">
                            <img src={Image.CART1} alt="White Shirt Pleat" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    White Shirt Pleat
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART2} alt="Converse All Star" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Converse All Star
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART3} alt="Nixon Porter Leather" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Nixon Porter Leather
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART1} alt="White Shirt Pleat" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    White Shirt Pleat
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART2} alt="Converse All Star" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Converse All Star
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART3} alt="Nixon Porter Leather" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Nixon Porter Leather
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART1} alt="White Shirt Pleat" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    White Shirt Pleat
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART2} alt="Converse All Star" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Converse All Star
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                        <li className="cart__item">
                            <img src={Image.CART3} alt="Nixon Porter Leather" className="cart-img" />
                            <div className="cart__desc">
                                <Link to="#" className="cart__desc-title">
                                    Nixon Porter Leather
                                </Link>
                                <span className="cart__desc-subtitle">1 x $19.00</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-modal__footer">
                    <div className="cart__total">Total: $75.00</div>
                    <div className="cart__buttons">
                        <button className="cart__button">View Cart</button>
                        <button className="cart__button">Check Out</button>
                    </div>
                </div>
            </SidebarModal>
        </header>
    );
}

export default Header;
