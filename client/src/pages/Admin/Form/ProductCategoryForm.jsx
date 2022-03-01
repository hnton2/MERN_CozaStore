import { Backdrop, CircularProgress, Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { CreatableSelectField, Form, InputField, RadioField, TextEditorField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { DEFAULT_CATEGORY_PRODUCT } from "constants/Form";
import { COLOR_OPTIONS, SIZE_OPTIONS, STATUS_RADIO, TAG_OPTIONS } from "constants/Option";
import { toastMessage } from "helpers/toastMessage";
import { productCategoryValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetALlCategoryProduct } from "redux/categorySlice";
import productCategoryServices from "services/productCategory";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Product Category ",
        path: "/product-category ",
    },
];

const TITLE_PAGE = "Product Category Form";

function ProductCategoryForm() {
    const dispatch = useDispatch();
    dispatch(GetALlCategoryProduct());

    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValue, setInitialValue] = useState(DEFAULT_CATEGORY_PRODUCT);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await productCategoryServices.getItem(currentId);
                    if (res.data.success) {
                        const categoryDetail = res.data.item;
                        setInitialValue({
                            name: categoryDetail.name,
                            status: categoryDetail.status,
                            color: categoryDetail.color,
                            tag: categoryDetail.tag,
                            size: categoryDetail.size,
                            description: categoryDetail.description,
                        });
                    } else toastMessage({ type: "error", message: res.data.message });
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, [currentId]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = currentId
                ? await productCategoryServices.updateItem(currentId, data)
                : await productCategoryServices.createItem(data);
            setIsLoading(false);
            if (response.data.success) {
                dispatch(GetALlCategoryProduct());
                navigate("/admin/product-category");
            } else toastMessage({ type: "error", message: response.data.message });
        } catch (error) {
            toastMessage({ type: "error", message: error.message });
        }
    };

    return (
        <>
            <Helmet>
                <title>{TITLE_PAGE}</title>
            </Helmet>
            {currentId && <Preloader isHidden={initialValue.name !== ""} />}
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current={TITLE_PAGE} />
                    <div className="card">
                        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <h3 className="card-header">{TITLE_PAGE}</h3>
                        <div className="card-body">
                            <Form
                                onSubmit={onSubmit}
                                defaultValues={initialValue}
                                validation={productCategoryValidation}
                            >
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <CreatableSelectField
                                    name="tag"
                                    options={TAG_OPTIONS}
                                    isMultiple
                                    placeholder="Tag..."
                                />
                                <CreatableSelectField
                                    name="size"
                                    options={SIZE_OPTIONS}
                                    isMultiple
                                    placeholder="Size..."
                                />
                                <CreatableSelectField
                                    name="color"
                                    options={COLOR_OPTIONS}
                                    isMultiple
                                    placeholder="Color..."
                                />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/product-category" className="btn btn-danger">
                                        Cancel
                                    </Link>
                                    <button className="btn btn-primary">{currentId ? "Update" : "Submit"}</button>
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
