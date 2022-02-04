import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./QuantityButton.scss";

function QuantityButton() {
    const [quantity, setQuantity] = useState(1);
    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="quantity-button">
            <button type="button" className="btn btn-light" onClick={handleDecrement} disabled={quantity === 1}>
                <RemoveIcon fontSize="small" />
            </button>
            <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
            <button type="button" className="btn btn-light" onClick={handleIncrement}>
                <AddIcon fontSize="small" />
            </button>
        </div>
    );
}

export default QuantityButton;
