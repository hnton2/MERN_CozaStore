import { publicRequest, userRequest } from "helpers/requestMethod";

const createNewBlogCategory = (cate) => {
    return userRequest.post("blog-category", cate);
};

const getAllBlogCategory = () => {
    return publicRequest.get("blog-category");
};

const getOneBlogCategory = (currentId) => {
    return userRequest.get(`blog-category/find/${currentId}`);
};

const updateBlogCategory = (currentId, product) => {
    return userRequest.put(`blog-category/${currentId}`, product);
};

const deleteBlogCategory = (id) => {
    return userRequest.delete(`blog-category/${id}`);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`blog-category/change-status/${id}`, { currentStatus: currentStatus });
};

const blogCategoryServices = {
    createNewBlogCategory,
    getAllBlogCategory,
    getOneBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    changeStatus,
};

export default blogCategoryServices;
