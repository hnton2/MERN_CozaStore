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

const orderServices = {
    createOrder,
    getAllOrder,
    deleteOrder,
    getOneOrder,
};

export default orderServices;
