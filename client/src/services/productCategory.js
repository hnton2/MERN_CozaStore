import { publicRequest, userRequest } from "helpers/requestMethod";

const createNewProductCategory = (cate) => {
    return userRequest.post("product-category", cate);
};

const getAllProductCategory = () => {
    return publicRequest.get("product-category");
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

const productCategoryServices = {
    createNewProductCategory,
    getAllProductCategory,
    getOneProductCategory,
    updateProductCategory,
    deleteProductCategory,
};

export default productCategoryServices;
