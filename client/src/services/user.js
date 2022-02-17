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

const cleanCart = (id) => {
    return userRequest.post(`user/clean-cart/${id}`);
};

const changeRole = (id, currentRole) => {
    return userRequest.put(`user/change-role/${id}`, { currentRole: currentRole });
};

const userServices = {
    getAllUser,
    deleteUser,
    saveCart,
    changeRole,
    cleanCart,
};

export default userServices;
