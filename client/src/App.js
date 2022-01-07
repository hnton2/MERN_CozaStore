import Dashboard from "pages/Admin/Dashboard";
import ProductForm from "pages/Admin/Form/ProductForm";
import ProductTable from "pages/Admin/Table/ProductTable";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <BrowserRouter>
            <Routes>
                {/* Public */}
                <Route exact path="/" element={<Home />} />
                <Route path="/products/:category" element={<Products />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blogs/:category" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />

                {/* Admin */}
                {user && user.isAdmin ? (
                    <>
                        <Route exact path="/admin" element={<Dashboard />} />
                        <Route exact path="/admin/product/create" element={<ProductForm />} />
                        <Route exact path="/admin/product/table" element={<ProductTable />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
