import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Category from "./pages/Category";
import Home from "./pages/Home";
import "./style.scss";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/category" element={<Category />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
