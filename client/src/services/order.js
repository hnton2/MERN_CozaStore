import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createOrder = (data) => {
    return userRequest.post("order", data);
};

const getOrders = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`order?${queryString.stringify(query)}`);
};

const deleteOrder = (id) => {
    return userRequest.delete(`order/${id}`);
};

const getOneOrder = (currentId) => {
    return userRequest.get(`order/find/${currentId}`);
};

const changeStatus = (id, status) => {
    return userRequest.put(`order/change-status/${id}`, { statusChange: status });
};

const orderServices = {
    createOrder,
    getOrders,
    deleteOrder,
    getOneOrder,
    changeStatus,
};

export default orderServices;
