import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Product from "./pages/Product";
import "./style.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/category" element={<Category />} />
                <Route exact path="/product" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
