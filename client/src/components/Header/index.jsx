import React, { useState } from "react";
import Image from "../../constants/Image";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import "./Header.scss";
import { Button, FormControl, Input, InputAdornment, InputLabel, Modal, TextField } from "@mui/material";
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
                    <div className="header-icons__wrapper">
                        <Button className="header-btn" onClick={handleOpenSearch}>
                            <SearchIcon className="header__icon" />
                        </Button>
                        <Button className="header-btn border-left-right">
                            <ShoppingCartIcon className="header__icon" />
                        </Button>
                        <Button className="header-btn header">
                            <MenuIcon className="header__icon" />
                        </Button>
                    </div>
                </div>
            </nav>
            <Modal open={openSearch} onClose={handleCloseSearch} BackdropComponent={Backdrop}>
                <div className="search-modal">
                    <form>
                        <Button>
                            <SearchIcon sx={{ fontSize: 56, color: "#000" }} />
                        </Button>
                        <TextField
                            fullWidth
                            variant="standard"
                            placeholder="Search..."
                            inputProps={{ style: { fontSize: 50 } }}
                            InputLabelProps={{ style: { fontSize: 50 } }}
                        />
                    </form>
                </div>
            </Modal>
        </header>
    );
}

export default Header;
