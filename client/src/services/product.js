import { userRequest } from "helpers/requestMethod";

const createNewProduct = (product) => {
    const formData = new FormData();
    product.images.forEach((file) => {
        formData.append("images", file);
    });
    Object.keys(product).map((key) => {
        if (key !== "images") {
            formData.append(key, JSON.stringify(product[key]));
        }
    });
    return userRequest.post("product", formData);
};

const productServices = {
    createNewProduct,
};

export default productServices;
