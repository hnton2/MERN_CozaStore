import Dashboard from "pages/Admin/Dashboard";
import React from "react";
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
    const user = false;

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
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/blogs/:category" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />

                {/* Admin */}
                <Route exact path="/admin" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
