import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Dashboard from "pages/Admin/Dashboard";
import CouponForm from "pages/Admin/Form/CouponForm";
import ProductCategoryForm from "pages/Admin/Form/ProductCategoryForm";
import ProductForm from "pages/Admin/Form/ProductForm";
import CouponTable from "pages/Admin/Table/CouponTable";
import OrderTable from "pages/Admin/Table/OrderTable";
import InvoicePage from "pages/Admin/Invoice";
import ProductCategoryTable from "pages/Admin/Table/ProductCategoryTable";
import ProductTable from "pages/Admin/Table/ProductTable";
import UserTable from "pages/Admin/Table/UserTable";
import Confirmation from "pages/Public/Confirmation";
import NotFound from "pages/Public/NotFound";
import OrderTracking from "pages/Public/OrderTracking";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { updateCart } from "redux/cartSlice";
import { GetALlCategoryBlog, GetALlCategoryProduct } from "redux/categorySlice";
import About from "./pages/Public/About";
import Blog from "./pages/Public/Blog";
import BlogDetail from "./pages/Public/BlogDetail";
import Cart from "./pages/Public/Cart";
import Checkout from "./pages/Public/Checkout";
import Contact from "./pages/Public/Contact";
import Home from "./pages/Public/Home";
import Login from "./pages/Public/Login";
import Product from "./pages/Public/Product";
import Products from "./pages/Public/Products";
import Register from "./pages/Public/Register";
import "./style.scss";
import BlogForm from "pages/Admin/Form/BlogForm";
import BlogCategoryTable from "pages/Admin/Table/BlogCategoryTable";
import BlogCategoryForm from "pages/Admin/Form/BlogCategoryForm";
import BlogTable from "pages/Admin/Table/BlogTable";
import SliderTable from "pages/Admin/Table/SliderTable";
import SliderForm from "pages/Admin/Form/SliderForm";

const stripePromise = loadStripe(
    "pk_test_51KCL3uD7QIM7Pt3fDuSzusNuy4dl4oNXEkPM6KzS1rpHTE4S16mz1zNgFb96kPnFAA13uSofYqhnXGIJFLhxMQcA00HrG0u4LC"
);

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);
    if (user && user.cart.products.length > 0) dispatch(updateCart(user.cart));
    dispatch(GetALlCategoryProduct());
    dispatch(GetALlCategoryBlog());

    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route exact path="/" element={<Home />} />
                <Route path="/product-category/:category" element={<Products />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/checkout"
                    element={
                        <Elements stripe={stripePromise}>
                            <Checkout />
                        </Elements>
                    }
                />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/order-tracking" element={<OrderTracking />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog-category/:category" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/not-found" element={<NotFound />} />

                {/* Admin */}
                {user && user.isAdmin && (
                    <>
                        <Route path="/admin/">
                            <Route exact path="" element={<Dashboard />} />
                            <Route path="user" element={<UserTable />} />
                            <Route path="product/">
                                <Route exact path="" element={<ProductTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<ProductForm />} />
                                    <Route path="" element={<ProductForm />} />
                                </Route>
                            </Route>
                            <Route path="product-category/">
                                <Route exact path="" element={<ProductCategoryTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<ProductCategoryForm />} />
                                    <Route path="" element={<ProductCategoryForm />} />
                                </Route>
                            </Route>
                            <Route path="blog/">
                                <Route exact path="" element={<BlogTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<BlogForm />} />
                                    <Route path="" element={<BlogForm />} />
                                </Route>
                            </Route>
                            <Route path="blog-category/">
                                <Route exact path="" element={<BlogCategoryTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<BlogCategoryForm />} />
                                    <Route path="" element={<BlogCategoryForm />} />
                                </Route>
                            </Route>
                            <Route path="coupon/">
                                <Route exact path="" element={<CouponTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<CouponForm />} />
                                    <Route path="" element={<CouponForm />} />
                                </Route>
                            </Route>
                            <Route path="order/">
                                <Route exact path="" element={<OrderTable />} />
                                <Route path="invoice/:id" element={<InvoicePage />} />
                            </Route>
                            <Route path="slider/">
                                <Route exact path="" element={<SliderTable />} />
                                <Route path="form/">
                                    <Route path=":id" element={<SliderForm />} />
                                    <Route path="" element={<SliderForm />} />
                                </Route>
                            </Route>
                        </Route>
                    </>
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
