import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Register from "./pages/Register";
import "./style.scss";

function App() {
    const user = false;

    return (
        <BrowserRouter>
            <Routes>
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
