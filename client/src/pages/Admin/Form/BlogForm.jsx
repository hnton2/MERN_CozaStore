import { Backdrop, CircularProgress, Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Form, ImageField, InputField, RadioField, SelectField, TextEditorField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { DEFAULT_BLOG } from "constants/Form";
import { STATUS_RADIO } from "constants/Option";
import { toastMessage } from "helpers/toastMessage";
import { blogValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import blogServices from "services/blog";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Blog ",
        path: "/blog ",
    },
];

const TITLE_PAGE = "Blog Form";

function BlogForm() {
    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const categoryBlog = useSelector((state) => state.category.categoryBlog);
    const [isLoading, setIsLoading] = useState(false);
    const [initialValue, setInitialValue] = useState(DEFAULT_BLOG);
    const [oldImages, setOldImages] = useState();
    const [categoryOptions, setCategoryOptions] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await blogServices.getItem(currentId);
                    if (res.data.success) {
                        const blogDetail = res.data.item;
                        setOldImages(blogDetail.images);
                        setInitialValue({
                            name: blogDetail.name,
                            status: blogDetail.status,
                            images: blogDetail.images.map((item) => ({ name: item })),
                            category: { value: blogDetail.category.slug, label: blogDetail.category.name },
                            description: blogDetail.description,
                        });
                    } else toastMessage({ type: "error", message: res.data.message });
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, [currentId]);

    useEffect(() => {
        if (categoryBlog) {
            const cateOptions = categoryBlog.map((item) => ({ value: item.slug, label: item.name }));
            setCategoryOptions(cateOptions);
        }
    }, [categoryBlog]);

    const onSubmit = async (data) => {
        if (oldImages) data.oldImages = oldImages;
        setIsLoading(true);
        try {
            const response = currentId
                ? await blogServices.updateItem(currentId, data)
                : await blogServices.createItem(data);
            setIsLoading(false);
            if (response.data.success) {
                navigate("/admin/blog");
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
                            <Form onSubmit={onSubmit} defaultValues={initialValue} validation={blogValidation}>
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <ImageField name="images" />
                                <SelectField name="category" options={categoryOptions} placeholder="Category..." />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/blog" className="btn btn-danger">
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

export default BlogForm;
