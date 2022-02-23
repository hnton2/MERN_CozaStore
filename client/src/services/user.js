import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const getUsers = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.isAdmin = status;
    return userRequest.get(`user?${queryString.stringify(query)}`);
};

const deleteUser = (id) => {
    return userRequest.delete(`user/${id}`);
};

const saveCart = (id, cart) => {
    return userRequest.post(`user/save-cart/${id}`, cart);
};

const cleanCart = (id) => {
    return userRequest.post(`user/clean-cart/${id}`);
};

const changeRole = (id, currentRole) => {
    return userRequest.put(`user/change-role/${id}`, { currentRole: currentRole });
};

const userServices = {
    getUsers,
    deleteUser,
    saveCart,
    changeRole,
    cleanCart,
};

export default userServices;
