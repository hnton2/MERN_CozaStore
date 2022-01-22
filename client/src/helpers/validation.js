import * as yup from "yup";

export const productValidation = yup.object().shape({
    name: yup
        .string()
        .min(5)
        .max(100)
        .matches(/^[aA-zZ\s]+$/, "name is not in correct format")
        .required(),
    status: yup.string().required(),
    category: yup.object().nullable().required(),
    images: yup
        .array()
        .min(1)
        .of(
            yup.object().shape({
                name: yup.mixed().required(),
            })
        )
        .required(),
    color: yup.array().min(1).required(),
    tag: yup.array().min(1).required(),
    size: yup.array().min(1).required(),
    quantity: yup
        .number()
        .min(1)
        .typeError("quantity must be a number")
        .positive("quantity must be greater than zero")
        .required(),
    price: yup
        .number()
        .min(1)
        .typeError("price must be a number")
        .positive("price must be greater than zero")
        .required(),
    discount: yup.number().typeError("discount must be a number").required(),
    description: yup.string().max(1000).required(),
});

export const productCategoryValidation = yup.object().shape({
    name: yup
        .string()
        .min(5)
        .max(100)
        .matches(/^[aA-zZ\s]+$/, "name is not in correct format")
        .required(),
    status: yup.string().required(),
    description: yup.string().max(1000).required(),
});
