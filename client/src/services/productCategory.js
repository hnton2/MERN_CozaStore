import { publicRequest, userRequest } from "helpers/requestMethod";

const createNewProductCategory = (cate) => {
    return userRequest.post("product-category", cate);
};

const getAllProductCategory = () => {
    return publicRequest.get("product-category");
};

const productCategoryServices = {
    createNewProductCategory,
    getAllProductCategory,
};

export default productCategoryServices;
