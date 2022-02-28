import { createFormData } from "helpers/form";
import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const LINK_PREFIX = "blog";

const createItem = (item) => {
    const formData = createFormData(item);
    return userRequest.post(LINK_PREFIX, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const updateItem = (currentId, item) => {
    const formData = createFormData(item);
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

const getPublicItem = (slug) => {
    return publicRequest.get(`${LINK_PREFIX}/public/find/${slug}`);
};

const getItems = ({ category = "all", page = 1, search = "", status = null }) => {
    let query = {};
    if (category !== "all") query.category = category;
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`${LINK_PREFIX}?${queryString.stringify(query)}`);
};

const getPublicItems = ({ category = "all", page = 1, search = "" }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (category !== "all") query.category = category;
    return publicRequest.get(`${LINK_PREFIX}/public?${queryString.stringify(query)}`);
};

const getPublicNewItems = () => {
    return publicRequest.get(`${LINK_PREFIX}/public/newest`);
};

const addComment = (slug, data) => {
    return publicRequest.post(`${LINK_PREFIX}/comment/${slug}`, data);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`${LINK_PREFIX}/change-status/${id}`, { currentStatus: currentStatus });
};

const blogServices = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getPublicItem,
    getItems,
    getPublicItems,
    getPublicNewItems,
    addComment,
    changeStatus,
};

export default blogServices;
