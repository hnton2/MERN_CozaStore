import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container } from "@mui/material";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, SIZE_OPTIONS, STATUS_RADIO, TAG_OPTIONS } from "constants/Data";
import { Form, InputField, SelectField, RadioField, ImageField } from "components/CustomForm";
import * as yup from "yup";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductForm() {
    const initialForm = {
        name: "",
        status: "active",
        images: [],
        category: [],
        color: [],
        tag: [],
        size: [],
        quantity: 0,
        price: 0,
        discount: 0,
        description: "",
    };

    const schema = yup.object().shape({
        name: yup
            .string()
            .test("len", "can be empty or with string at least 2 characters and not more than 10", (val) => {
                if (val == undefined) {
                    return true;
                }
                return val.length == 0 || (val.length >= 2 && val.length <= 40);
            })
            .required(),
        status: yup.string().required(),
        category: yup.array().min(1).required(),
        images: yup.array().min(1).required(),
        color: yup.array().min(1).required(),
        tag: yup.array().min(1).required(),
        size: yup.array().min(1).required(),
        quantity: yup.number().min(1).required(),
        price: yup.number().min(1).required(),
        discount: yup.number().min(1).required(),
        description: yup
            .string()
            .test("len", "can be empty or with string at least 2 characters and not more than 10", (val) => {
                if (val == undefined) {
                    return true;
                }
                return val.length == 0 || (val.length >= 2 && val.length <= 1000);
            })
            .required(),
    });

    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product Form" />
                    <div className="section-admin">
                        <h3 className="section-admin__header">Product Form</h3>
                        <div className="section-admin__content">
                            <Form onSubmit={onSubmit} defaultValues={initialForm} validation={schema}>
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <ImageField name="images" />
                                <SelectField
                                    name="category"
                                    options={CATEGORY_OPTIONS}
                                    isMultiple
                                    placeholder="Category..."
                                />
                                <SelectField name="tag" options={TAG_OPTIONS} isMultiple placeholder="Tags..." />
                                <SelectField name="size" options={SIZE_OPTIONS} isMultiple placeholder="Size..." />
                                <SelectField name="color" options={COLOR_OPTIONS} isMultiple placeholder="Color..." />
                                <InputField name="quantity" placeholder="Quantity" />
                                <InputField name="price" placeholder="Discount" />
                                <InputField name="discount" placeholder="Name" />
                                <InputField name="description" placeholder="Description" />
                                <div className="form-button">
                                    <button className="btn bg-white hover-white btn-md">Reset</button>
                                    <button className="btn hover-black btn-md">Submit</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default ProductForm;
