import { createFormData } from "helpers/form";
import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "slider";

const createItem = (items) => {
    const formData = createFormData(items);
    return userRequest.post(LINK_PREFIX, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const updateItem = (currentId, slider) => {
    const formData = createFormData(slider);
    return userRequest.put(`${LINK_PREFIX}/${currentId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

const deleteItem = (id) => {
    return userRequest.delete(`${LINK_PREFIX}/${id}`);
};

const getItem = (currentId) => {
    return userRequest.get(`${LINK_PREFIX}/find/${currentId}`);
};

const getItems = ({ category = "all", page = 1, search = "", status = null }) => {
    let query = {};
    if (category !== "all") query.category = category;
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`${LINK_PREFIX}?${queryString.stringify(query)}`);
};

const getPublicItems = () => {
    return publicRequest.get(`${LINK_PREFIX}/public`);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`${LINK_PREFIX}/change-status/${id}`, { currentStatus: currentStatus });
};

const sliderServices = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getItems,
    getPublicItems,
    changeStatus,
};

export default sliderServices;
