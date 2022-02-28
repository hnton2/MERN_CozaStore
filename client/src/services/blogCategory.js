import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "blog-category";

const createItem = (item) => {
    return userRequest.post(LINK_PREFIX, item);
};

const updateItem = (currentId, item) => {
    return userRequest.put(`${LINK_PREFIX}/${currentId}`, item);
};

const deleteItem = (id) => {
    return userRequest.delete(`${LINK_PREFIX}/${id}`);
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

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`${LINK_PREFIX}/change-status/${id}`, { currentStatus: currentStatus });
};

const blogCategoryServices = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getItems,
    changeStatus,
};

export default blogCategoryServices;
