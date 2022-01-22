import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./QuantityButton.scss";

function QuantityButton() {
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleDecrement = () => {
        setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <div className="quantity-button">
            <button className="btn btn-light" onClick={handleDecrement}>
                <RemoveIcon fontSize="small" />
            </button>
            <input type="text" value={quantity} />
            <button className="btn btn-light" onClick={handleIncrement}>
                <AddIcon fontSize="small" />
            </button>
        </div>
    );
}

export default QuantityButton;
