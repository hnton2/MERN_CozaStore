import React, { useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { STATUS_RADIO } from "constants/Data";
import { Form, InputField, RadioField } from "components/CustomForm";
import { productCategoryValidation } from "helpers/validation";
import productCategoryServices from "services/productCategory";
import Message from "components/Message";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductCategoryForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    const initialForm = {
        name: "",
        status: "active",
        description: "",
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage("");
        try {
            const response = await productCategoryServices.createNewProductCategory(data);
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
                    <Breadcrumbs links={linkData} current="Product Category Form" />
                    <div className="section-admin">
                        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <h3 className="section-admin__header">Product Category Form</h3>
                        <div className="section-admin__content">
                            {message && <Message type={message.type}>{message.content}</Message>}
                            <Form
                                onSubmit={onSubmit}
                                defaultValues={initialForm}
                                validation={productCategoryValidation}
                            >
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <InputField name="description" placeholder="Description" />
                                <div className="form-button">
                                    <button className="btn btn-light">Submit</button>
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

export default ProductCategoryForm;
