import Clear from "@mui/icons-material/Clear";
import { Modal } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import "./CouponsModal.scss";
import { useForm } from "react-hook-form";
import Message from "components/Message";

function CouponsModal({ prices, coupons, isOpen, onClose, onChangeCoupon }) {
    const [message, setMessage] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        const detailCoupon = coupons.filter((item) => item.code === data.code);
        if (detailCoupon.length > 0) {
            setMessage();
            onChangeCoupon(detailCoupon[0]);
            onClose();
        } else setMessage("Coupon is invalid");
    };

    const handleApplyCoupon = (coupon) => {
        onChangeCoupon(coupon);
        onClose();
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className="coupons-modal">
                <div className="coupons__container">
                    <div className="coupons__header">
                        <h2>Coza Coupons</h2>
                        <button onClick={onClose}>
                            <Clear />
                        </button>
                    </div>
                    {message && <Message type="error">{message}</Message>}
                    <form className="coupons__input" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("code")} placeholder="Enter your coupon code" />
                        {errors.code && <p className="error-message">*This field is required</p>}
                        <button>Apply</button>
                    </form>
                    <div className="coupons">
                        <div className="coupons__title">
                            <h4>Coupons Code</h4>
                            <span>Only 1 coupon can be used</span>
                        </div>
                        <div className="coupons__list">
                            {coupons &&
                                coupons.map((item) => (
                                    <div className="coupon" key={item._id}>
                                        <div className="coupon-title">
                                            <h3>{item.name}</h3>
                                        </div>
                                        <div className="coupon-description">
                                            <div className="condition-tag">
                                                <span>New customer</span>
                                                <span>Only for website</span>
                                            </div>
                                            <h4 className="coupon-discount">Discount ${item.discount}</h4>
                                            <span className="coupon-condition">
                                                Applicable for orders from ${item.condition} or more
                                            </span>
                                            <div className="coupon-footer">
                                                <span>Expiring: {moment(item.expiredTime).format("MMM Do YY")}</span>
                                                <button
                                                    disabled={prices < item.condition}
                                                    onClick={() => handleApplyCoupon(item)}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default CouponsModal;
