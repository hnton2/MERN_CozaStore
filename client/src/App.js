import Dashboard from "pages/Admin/Dashboard";
import ProductCategoryForm from "pages/Admin/Form/ProductCategoryForm";
import ProductForm from "pages/Admin/Form/ProductForm";
import ProductCategoryTable from "pages/Admin/Table/ProductCategoryTable";
import ProductTable from "pages/Admin/Table/ProductTable";
import CouponForm from "pages/Admin/Form/CouponForm";
import CouponTable from "pages/Admin/Table/CouponTable";
import NotFound from "pages/Public/NotFound";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { GetALlCategoryProduct } from "redux/categorySlice";
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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    "pk_test_51KCL3uD7QIM7Pt3fDuSzusNuy4dl4oNXEkPM6KzS1rpHTE4S16mz1zNgFb96kPnFAA13uSofYqhnXGIJFLhxMQcA00HrG0u4LC"
);

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.currentUser);
    dispatch(GetALlCategoryProduct());

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
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blogs/:category" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/not-found" element={<NotFound />} />

                {/* Admin */}
                {user && user.isAdmin ? (
                    <>
                        <Route exact path="/admin" element={<Dashboard />} />
                        {/*==================================== Product ====================================*/}
                        <Route path="/admin/product/form">
                            <Route path=":id" element={<ProductForm />} />
                            <Route path="" element={<ProductForm />} />
                        </Route>
                        <Route exact path="/admin/product/table" element={<ProductTable />} />
                        {/*==================================== Product category ====================================*/}
                        <Route path="/admin/product-category/form">
                            <Route path=":id" element={<ProductCategoryForm />} />
                            <Route path="" element={<ProductCategoryForm />} />
                        </Route>
                        <Route exact path="/admin/product-category/table" element={<ProductCategoryTable />} />
                        {/* ==================================== Coupon ==================================== */}
                        <Route path="/admin/coupon/form">
                            <Route path=":id" element={<CouponForm />} />
                            <Route path="" element={<CouponForm />} />
                        </Route>
                        <Route exact path="/admin/coupon/table" element={<CouponTable />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
