import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import {
    CATEGORY_OPTIONS,
    COLOR_OPTIONS,
    DEFAULT_VALUE_PRODUCT,
    SIZE_OPTIONS,
    STATUS_RADIO,
    TAG_CLOTHING_OPTIONS,
    TAG_SHOES_OPTIONS,
} from "constants/Data";
import { Form, InputField, SelectField, RadioField, ImageField } from "components/CustomForm";
import { productValidation } from "helpers/validation";
import productServices from "services/product";
import Message from "components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextEditorField } from "components/CustomForm";
import { useSelector } from "react-redux";
import { useCallback } from "react";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductForm() {
    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const categoryProduct = useSelector((state) => state.category.categoryProduct);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();
    const [initialValue, setInitialValue] = useState(DEFAULT_VALUE_PRODUCT);
    const [oldImages, setOldImages] = useState();
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [options, setOptions] = useState({ tag: [], color: [], size: [] });
    const [watchCategory, setWatchCategory] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await productServices.getOneProduct(currentId);
                    const productDetail = res.data.product;
                    setOldImages(productDetail.images);
                    setInitialValue({
                        name: productDetail.name,
                        status: productDetail.status,
                        images: productDetail.images.map((item) => ({ name: item })),
                        category: { value: productDetail.category.slug, label: productDetail.category.name },
                        color: productDetail.color,
                        tag: productDetail.tag,
                        size: productDetail.size,
                        quantity: productDetail.quantity,
                        price: productDetail.price,
                        discount: productDetail.discount,
                        description: productDetail.description,
                    });
                }
            } catch (error) {
                console.log(error);
                setMessage({ type: "error", content: error.response.data.message });
            }
        };
        fetchData();
    }, [currentId]);

    useEffect(() => {
        if (categoryProduct) {
            const cateOptions = categoryProduct.map((item) => ({ value: item.slug, label: item.name }));
            setCategoryOptions(cateOptions);
        }
    }, []);

    const handleWatchFields = useCallback((data) => {
        const watchCat = data.category.value;
        if (watchCat) setWatchCategory(watchCat);
    });

    useEffect(() => {
        if (watchCategory || initialValue.category.value) {
            categoryProduct.map((item) => {
                if (item.slug === watchCategory || item.slug === initialValue.category.value)
                    setOptions({ tag: item.tag, color: item.color, size: item.size });
            });
        }
    }, [watchCategory, initialValue]);

    const onSubmit = async (data) => {
        if (oldImages) data.oldImages = oldImages;
        setIsLoading(true);
        setMessage();
        console.log(data);
        try {
            const response = currentId
                ? await productServices.updateProduct(currentId, data)
                : await productServices.createNewProduct(data);
            setMessage({ type: "success", content: response.data.message });
            setIsLoading(false);
            navigate("/admin/product/table");
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
                    <div className="card">
                        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                        <h3 className="card-header">Product Form</h3>
                        <div className="card-body">
                            {message && <Message type={message.type}>{message.content}</Message>}
                            <Form
                                onSubmit={onSubmit}
                                defaultValues={initialValue}
                                validation={productValidation}
                                onWatchFields={handleWatchFields}
                            >
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <ImageField name="images" />
                                <SelectField name="category" options={categoryOptions} placeholder="Category..." />
                                <SelectField name="tag" options={options.tag} isMultiple placeholder="Tags..." />
                                <SelectField name="size" options={options.size} isMultiple placeholder="Size..." />
                                <SelectField name="color" options={options.color} isMultiple placeholder="Color..." />
                                <InputField name="quantity" placeholder="Quantity" />
                                <InputField name="price" placeholder="Price" />
                                <InputField name="discount" placeholder="Discount" />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/product/table" className="btn btn-danger">
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

export default ProductForm;
