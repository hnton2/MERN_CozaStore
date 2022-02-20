import { createFormData } from "helpers/form";
import { publicRequest, userRequest } from "helpers/requestMethod";

const createNewBlog = (blog) => {
    const formData = createFormData(blog);
    return userRequest.post("blog", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const getAllBlog = () => {
    return publicRequest.get("blog");
};

const getOneBlog = (currentId) => {
    return userRequest.get(`blog/find/${currentId}`);
};

const updateBlog = (currentId, blog) => {
    const formData = createFormData(blog);
    return userRequest.put(`blog/${currentId}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const deleteBlog = (id) => {
    return userRequest.delete(`blog/${id}`);
};

const getBlogList = (slugCategory, page = 1) => {
    const query = page !== 1 ? `?page=${page}` : "";
    return publicRequest.get(`blog/${slugCategory}${query}`);
};

const getBlogDetailBySlug = (slug) => {
    return publicRequest.get(`blog/find-by-slug/${slug}`);
};

const addComment = (slug, data) => {
    return publicRequest.post(`blog/comment/${slug}`, data);
};

const changeStatus = (id, currentStatus) => {
    return userRequest.put(`blog/change-status/${id}`, { currentStatus: currentStatus });
};

const blogServices = {
    createNewBlog,
    getAllBlog,
    getOneBlog,
    updateBlog,
    deleteBlog,
    getBlogList,
    getBlogDetailBySlug,
    addComment,
    changeStatus,
};

export default blogServices;
