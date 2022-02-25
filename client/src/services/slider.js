import { createFormData } from "helpers/form";
import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewSlider = (items) => {
    console.log(items);
    const formData = createFormData(items);
    return userRequest.post("slider", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const getSliders = ({ category = "all", page = 1, search = "", status = null }) => {
    let query = {};
    if (category !== "all") query.category = category;
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`slider?${queryString.stringify(query)}`);
};

const getOneSlider = (currentId) => {
    return userRequest.get(`slider/find/${currentId}`);
};

const updateSlider = (currentId, slider) => {
    const formData = createFormData(slider);
    return userRequest.put(`slider/${currentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const deleteSlider = (id) => {
    return userRequest.delete(`slider/${id}`);
};

const getPublicSliders = () => {
    return publicRequest.get("slider/public-sliders");
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`slider/change-status/${id}`, { currentStatus: currentStatus });
};

const sliderServices = {
    createNewSlider,
    getSliders,
    getOneSlider,
    updateSlider,
    deleteSlider,
    getPublicSliders,
    changeStatus,
};

export default sliderServices;
