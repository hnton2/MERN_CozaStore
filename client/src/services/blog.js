import { createFormData } from "helpers/form";
import { publicRequest, userRequest } from "helpers/requestMethod";
import queryString from "query-string";

const createNewBlog = (blog) => {
    const formData = createFormData(blog);
    return userRequest.post("blog", formData, { headers: { "Content-Type": "multipart/form-data" } });
};

const getBlogs = ({ category = "all", page = 1, search = "", status = null }) => {
    let query = {};
    if (category !== "all") query.category = category;
    if (page !== 1) query.page = page;
    if (search !== "") query.search = search;
    if (status) query.status = status;
    return userRequest.get(`blog?${queryString.stringify(query)}`);
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
    getBlogs,
    getOneBlog,
    updateBlog,
    deleteBlog,
    getBlogList,
    getBlogDetailBySlug,
    addComment,
    changeStatus,
};

export default blogServices;
