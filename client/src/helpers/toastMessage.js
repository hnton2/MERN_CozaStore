import { toast } from "react-toastify";

export const toastMessage = ({ type, message, position = "top-center" }) => {
    return toast[type](message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};
