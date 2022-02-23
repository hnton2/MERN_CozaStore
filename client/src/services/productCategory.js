import { userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewProductCategory = (cate) => {
    return userRequest.post("product-category", cate);
};

const getProductCategories = ({ page = 1, search = "", status = null }) => {
    let query = {};
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`product-category?${queryString.stringify(query)}`);
};

const getOneProductCategory = (currentId) => {
    return userRequest.get(`product-category/find/${currentId}`);
};

const updateProductCategory = (currentId, product) => {
    return userRequest.put(`product-category/${currentId}`, product);
};

const deleteProductCategory = (id) => {
    return userRequest.delete(`product-category/${id}`);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`product-category/change-status/${id}`, { currentStatus: currentStatus });
};

const productCategoryServices = {
    createNewProductCategory,
    getProductCategories,
    getOneProductCategory,
    updateProductCategory,
    deleteProductCategory,
    changeStatus,
};

export default productCategoryServices;
