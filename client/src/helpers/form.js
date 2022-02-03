export const createFormData = (data) => {
    const formData = new FormData();
    let imageList = [];
    let remainImages = [];
    data.images.map((item) => {
        if (item.name[0] && item.name[0].type) imageList.push(item.name[0]);
        else remainImages.push(item.name);
    });
    formData.append("remainImages", JSON.stringify(remainImages));
    imageList.forEach((file) => {
        formData.append("images", file);
    });
    data.category = { slug: data.category.value, name: data.category.label };
    Object.keys(data).map((key) => {
        if (key !== "images") formData.append(key, JSON.stringify(data[key]));
    });
    return formData;
};
