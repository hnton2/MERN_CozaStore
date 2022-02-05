import React from "react";
import { Container, Grid, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import "./Cart.scss";
import InfoIcon from "@mui/icons-material/Info";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_CLOUDINARY } from "constants/Data";
import { changeQuantityProduct, removeProduct } from "redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const linkData = [
    {
        name: "Home",
        path: "/home",
    },
];
function Cart() {
    const dispatch = useDispatch();

    const { products, total } = useSelector((state) => state.cart);
    const handleRemoveFromCart = (product) => {
        dispatch(removeProduct(product));
    };
    const handleChangeQuantity = (product, value) => {
        dispatch(changeQuantityProduct({ ...product, value: Number(value) }));
    };

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Shopping Cart" />
                    <div className="cart">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={8}>
                                <div className="horizontal-scroll">
                                    <table className="table">
                                        <thead className="table__head">
                                            <tr>
                                                <th>Product</th>
                                                <th></th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => (
                                                <tr className="table__row" key={item._id + item.color + item.size}>
                                                    <td>
                                                        <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                                                    </td>
                                                    <td className="product-name">{item.name}</td>
                                                    <td className="text-center">${item.price}</td>
                                                    <td>
                                                        <div className="quantity-button">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light"
                                                                onClick={() => handleChangeQuantity(item, -1)}
                                                                disabled={item.quantity === 1}
                                                            >
                                                                <RemoveIcon fontSize="small" />
                                                            </button>
                                                            <input
                                                                type="text"
                                                                value={item.quantity}
                                                                onChange={(event) =>
                                                                    handleChangeQuantity(item, event.target.value)
                                                                }
                                                            />
                                                            <button
                                                                type="button"
                                                                className="btn btn-light"
                                                                onClick={() => handleChangeQuantity(item, 1)}
                                                            >
                                                                <AddIcon fontSize="small" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">${item.quantity * item.price}</td>
                                                    <td>
                                                        <button
                                                            className="table-btn btn btn-danger btn-rounded"
                                                            onClick={() => handleRemoveFromCart(item)}
                                                        >
                                                            <CloseIcon />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={4}>
                                <div className="cart__actions">
                                    <h3>Cart Total</h3>
                                    <div className="cart-prices border-bot">
                                        <h5 className="title">Subtotal</h5>
                                        <span className="price">${total}</span>
                                    </div>
                                    <div className="coupon border-bot">
                                        <div className="coupon__content">
                                            <span className="coupon-title">Coupon</span>
                                            <div className="coupon-desc">
                                                <span>2 coupons available</span>
                                                <Tooltip title="Only 1 coupon can be used">
                                                    <IconButton>
                                                        <InfoIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        <button className="coupon__button">
                                            <LocalActivityIcon fontSize="small" />
                                            <span>Select coupons</span>
                                        </button>
                                        {/* <div className="cart-prices">
                                            <h5 className="title">Discount</h5>
                                            <span className="price">$7.05</span>
                                        </div> */}
                                    </div>
                                    <div className="totals">
                                        <div className="cart-prices">
                                            <h5 className="title">Totals</h5>
                                            <span className="price">${total}</span>
                                        </div>
                                    </div>
                                    <Link to="/checkout" className="btn btn-lg btn-dark text-uppercase">
                                        Proceed to checkout
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default Cart;
