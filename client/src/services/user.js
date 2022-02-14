import { userRequest } from "helpers/requestMethod";

const getAllUser = () => {
    return userRequest.get("user");
};

const deleteUser = (id) => {
    return userRequest.delete(`user/${id}`);
};

const saveCart = (id, cart) => {
    return userRequest.post(`user/save-cart/${id}`, cart);
};

const userServices = {
    getAllUser,
    deleteUser,
    saveCart,
};

export default userServices;
