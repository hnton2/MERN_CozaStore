import { userRequest } from "helpers/requestMethod";

const createOrder = (data) => {
    return userRequest.post("order", data);
};

const getAllOrder = () => {
    return userRequest.get("order");
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
    getAllOrder,
    deleteOrder,
    getOneOrder,
    changeStatus,
};

export default orderServices;
