import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "order";

const createItem = (item) => {
    return userRequest.post(LINK_PREFIX, item);
};

const getItem = (currentId) => {
    return userRequest.get(`${LINK_PREFIX}/find/${currentId}`);
};

const getItems = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`${LINK_PREFIX}?${queryString.stringify(query)}`);
};

const changeStatus = (id, status) => {
    return userRequest.put(`${LINK_PREFIX}/change-status/${id}`, { statusChange: status });
};

const orderServices = {
    createItem,
    getItem,
    getItems,
    changeStatus,
};

export default orderServices;
