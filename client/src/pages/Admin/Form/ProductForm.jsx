import React, { useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { CATEGORY_OPTIONS, COLOR_OPTIONS, SIZE_OPTIONS, STATUS_RADIO, TAG_OPTIONS } from "constants/Data";
import { Form, InputField, SelectField, RadioField, ImageField } from "components/CustomForm";
import * as yup from "yup";
import { productValidation } from "helpers/validation";
import productServices from "services/product";
import Message from "components/Message";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

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

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage();
        let imageList = [];
        data.images.map((item) => {
            imageList.push(item.name[0]);
        });
        try {
            const response = await productServices.createNewProduct({ ...data, images: imageList });
            console.log(response);
            setMessage({ type: "success", content: response.data.message });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setMessage({ type: "error", content: error.response.data.message });
        }
    };

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product Form" />
                    <div className="section-admin">
                        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <h3 className="section-admin__header">Product Form</h3>
                        <div className="section-admin__content">
                            {message && <Message type={message.type}>{message.content}</Message>}
                            <Form onSubmit={onSubmit} defaultValues={initialForm} validation={productValidation}>
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <ImageField name="images" />
                                <SelectField name="category" options={CATEGORY_OPTIONS} placeholder="Category..." />
                                <SelectField name="tag" options={TAG_OPTIONS} isMultiple placeholder="Tags..." />
                                <SelectField name="size" options={SIZE_OPTIONS} isMultiple placeholder="Size..." />
                                <SelectField name="color" options={COLOR_OPTIONS} isMultiple placeholder="Color..." />
                                <InputField name="quantity" placeholder="Quantity" />
                                <InputField name="price" placeholder="Discount" />
                                <InputField name="discount" placeholder="Name" />
                                <InputField name="description" placeholder="Description" />
                                <div className="form-button">
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
