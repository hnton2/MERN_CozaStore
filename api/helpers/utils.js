const countStatus = async (params, statusOptions, model, keyword) => {
    let statusCount = statusOptions.map((option) => Object.assign({}, option));

    for (let index = 0; index < statusCount.length; index++) {
        let condition = {};
        if (statusCount[index].value !== "all") condition[keyword] = statusCount[index].value;
        if (params.search !== "") condition.$text = { $search: params.search };
        if (params.category && params.category !== "all") condition["category.slug"] = params.category;

        await model.countDocuments(condition).then((data) => {
            statusCount[index].count = data;
        });
    }

    return statusCount;
};

const decreaseQuantity = async (model, id, quantity = -1) => {
    await model.findOneAndUpdate({ _id: id }, { $inc: { quantity: quantity } });
};

module.exports = {
    countStatus,
    decreaseQuantity,
};
