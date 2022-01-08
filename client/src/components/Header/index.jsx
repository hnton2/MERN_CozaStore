import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Modal, Slide } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Image from "constants/Image";
import Sidebar from "../Sidebar";
import "./Header.scss";
import { ADMIN_SIDEBAR } from "constants/Data";
import Dropdown from "components/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HelpIcon from "@mui/icons-material/Help";
import { LogOut } from "redux/authSlice";
import { clearMessage } from "redux/messageSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    const user = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const [openSearch, setOpenSearch] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const handleOpenSearch = () => setOpenSearch(true);
    const handleCloseSearch = () => setOpenSearch(false);
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);
    const handleOpenMenu = () => setOpenMenu(true);
    const handleCloseMenu = () => setOpenMenu(false);

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        await dispatch(LogOut());
        navigate("/");
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
                            <Link to="/" className="nav__item-link active">
                                Home
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/products/all" className="nav__item-link">
                                Category
                            </Link>
                            <ul className="sub-nav">
                                <li>
                                    <Link className="sub-nav-link" to="/products/men">
                                        Men
                                    </Link>
                                </li>
                                <li>
                                    <Link className="sub-nav-link" to="/products/women">
                                        Women
                                    </Link>
                                </li>
                                <li>
                                    <Link className="sub-nav-link" to="/products/kid">
                                        Kid
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav__item">
                            <Link to="#" className="nav__item-link">
                                Sale
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/blog" className="nav__item-link">
                                Blog
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/about" className="nav__item-link">
                                About
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/contact" className="nav__item-link">
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
                        {user ? (
                            <button className="header-btn border-left-right" onClick={handleOpenMenu}>
                                <img src={Image.AVATAR1} alt="avatar" className="header-avatar" />
                            </button>
                        ) : (
                            <button className="header-btn border-left-right" onClick={handleLogin}>
                                <AccountCircleIcon className="header-icon" />
                            </button>
                        )}
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
            <Sidebar isOpen={openCart} onClose={handleCloseCart}>
                <div className="sidebar__container">
                    <div className="sidebar__title">
                        <h3>Your Cart</h3>
                        <button onClick={handleCloseCart}>
                            <CloseIcon sx={{ fontSize: 36 }} />
                        </button>
                    </div>
                    <div className="sidebar__content">
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
                    <div className="sidebar__footer">
                        <div className="cart__total">Total: $75.00</div>
                        <div className="cart__buttons">
                            <button className="btn bg-dark text-uppercase">View Cart</button>
                            <button className="btn bg-dark text-uppercase">Check Out</button>
                        </div>
                    </div>
                </div>
            </Sidebar>
            {user && (
                <Sidebar isOpen={openMenu} onClose={handleCloseMenu}>
                    <div className="sidebar__container p-0">
                        <div className="sidebar__title">
                            <h3></h3>
                            <button onClick={handleCloseMenu}>
                                <CloseIcon sx={{ fontSize: 36 }} />
                            </button>
                        </div>
                        <div className="sidebar-avatar">
                            <img src={Image.BANNER5} alt="" />
                            <div className="description">
                                <h5>{user.username}</h5>
                                {user.isAdmin && <span>Admin</span>}
                            </div>
                        </div>
                        <div className="sidebar__content options">
                            {user && user.isAdmin && (
                                <>
                                    <h4 className="options-title">@Database</h4>
                                    <ul className="sidebar-links">
                                        {ADMIN_SIDEBAR.map((item, index) => (
                                            <Dropdown item={item} key={index} />
                                        ))}
                                    </ul>
                                </>
                            )}
                            <h4 className="options-title">@General</h4>
                            <ul className="sidebar-links">
                                <li>
                                    <Link to="#" className="sidebar-link">
                                        <HomeIcon /> &nbsp; Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sidebar-link">
                                        <ManageAccountsIcon /> &nbsp; My Account
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sidebar-link">
                                        <LocalShippingIcon /> &nbsp; Track Order
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className="sidebar-link">
                                        <HelpIcon /> &nbsp; Help & FAQs
                                    </Link>
                                </li>
                                <li>
                                    <button to="" className="sidebar-link" onClick={handleLogout}>
                                        <LogoutIcon /> &nbsp; Logout
                                    </button>
                                </li>
                            </ul>
                            <div className="sidebar-gallery">
                                <h4 className="options-title">@CozaStore</h4>
                                <div className="sidebar-gallery__list">
                                    <button>
                                        <img src={Image.GALLERY1} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY2} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY3} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY4} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY5} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY6} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY7} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY8} alt="gallery" />
                                    </button>
                                    <button>
                                        <img src={Image.GALLERY9} alt="gallery" />
                                    </button>
                                </div>
                            </div>
                            <div className="sidebar-about">
                                <h4 className="options-title">About Us</h4>
                                <p>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum expedita animi
                                    dolorum cum repudiandae similique nostrum dolorem facere commodi voluptatem!
                                    Doloremque atque nobis veniam debitis corporis suscipit rem minima labore.
                                </p>
                            </div>
                        </div>
                    </div>
                </Sidebar>
            )}
        </header>
    );
}

export default Header;
