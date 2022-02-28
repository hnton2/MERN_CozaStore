import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "user";

const deleteItem = (id) => {
    return userRequest.delete(`${LINK_PREFIX}/${id}`);
};

const getItems = ({ page = 1, search = "", isAdmin = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (isAdmin) query.isAdmin = isAdmin;

    return userRequest.get(`${LINK_PREFIX}?${queryString.stringify(query)}`);
};

const saveCart = (id, cart) => {
    return userRequest.post(`${LINK_PREFIX}/save-cart/${id}`, cart);
};

const cleanCart = (id) => {
    return userRequest.post(`${LINK_PREFIX}/clean-cart/${id}`);
};

const changeRole = (id, currentRole) => {
    return userRequest.put(`${LINK_PREFIX}/change-role/${id}`, { currentRole: currentRole });
};

const userServices = {
    deleteItem,
    getItems,
    saveCart,
    changeRole,
    cleanCart,
};

export default userServices;
