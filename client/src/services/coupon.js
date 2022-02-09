import { publicRequest, userRequest } from "helpers/requestMethod";

const createNewCoupon = (data) => {
    return userRequest.post("coupon", data);
};

const getAllCoupon = () => {
    return publicRequest.get("coupon");
};

const getOneCoupon = (currentId) => {
    return userRequest.get(`coupon/find/${currentId}`);
};

const updateCoupon = (currentId, product) => {
    return userRequest.put(`coupon/${currentId}`, product);
};

const deleteCoupon = (id) => {
    return userRequest.delete(`coupon/${id}`);
};

const couponServices = {
    createNewCoupon,
    getAllCoupon,
    getOneCoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponServices;
