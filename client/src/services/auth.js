import { publicRequest } from "helpers/requestMethod";
import axios from "axios";

const login = ({ email, password }) => {
    return publicRequest.post("auth/login", { email, password });
};

const register = ({ username, email, password }) => {
    return publicRequest.post("auth/register", { username, email, password });
};
const logout = () => {
    localStorage.removeItem("persist:root");
};

const authServices = {
    login,
    register,
    logout,
};

export default authServices;
