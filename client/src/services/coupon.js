import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewCoupon = (data) => {
    return userRequest.post("coupon", data);
};

const getCoupons = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`coupon?${queryString.stringify(query)}`);
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

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`coupon/change-status/${id}`, { currentStatus: currentStatus });
};

const getPublicCoupons = () => {
    return publicRequest.get("coupon/public/");
};

const couponServices = {
    createNewCoupon,
    getCoupons,
    getOneCoupon,
    updateCoupon,
    deleteCoupon,
    changeStatus,
    getPublicCoupons,
};

export default couponServices;
