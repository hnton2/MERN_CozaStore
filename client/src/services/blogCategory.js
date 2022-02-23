import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewBlogCategory = (cate) => {
    return userRequest.post("blog-category", cate);
};

const getBlogCategories = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`blog-category?${queryString.stringify(query)}`);
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
    getBlogCategories,
    getOneBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    changeStatus,
};

export default blogCategoryServices;
