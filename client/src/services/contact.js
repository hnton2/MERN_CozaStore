import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "contact";

const createItem = (item) => {
    return publicRequest.post(LINK_PREFIX, item);
};

const getItems = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`${LINK_PREFIX}?${queryString.stringify(query)}`);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`${LINK_PREFIX}/change-status/${id}`, { currentStatus: currentStatus });
};

const contactServices = {
    createItem,
    getItems,
    changeStatus,
};

export default contactServices;
