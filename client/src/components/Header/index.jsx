import React, { useState } from "react";
import Image from "../../constants/Image";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.scss";
import { Badge, Button, FormControl, Input, InputAdornment, InputLabel, Modal, Slide, TextField } from "@mui/material";
import styled from "styled-components";

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
    const handleOpenSearch = () => {
        setOpenSearch(true);
    };
    const handleCloseSearch = () => {
        setOpenSearch(false);
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
                        <button className="header-btn border-left-right">
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
        </header>
    );
}

export default Header;
