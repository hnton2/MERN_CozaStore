import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "helpers/requestMethod";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("auth/login", user);
        console.log(res);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        console.log(error.response.data);
        dispatch(loginFailure());
    }
};
