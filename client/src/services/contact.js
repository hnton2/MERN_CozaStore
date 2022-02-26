import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewItem = (data) => {
    return publicRequest.post("contact", data);
};

const getItems = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`contact?${queryString.stringify(query)}`);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`contact/change-status/${id}`, { currentStatus: currentStatus });
};

const contactServices = {
    createNewItem,
    getItems,
    changeStatus,
};

export default contactServices;
