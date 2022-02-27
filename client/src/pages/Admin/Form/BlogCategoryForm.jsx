import { Backdrop, CircularProgress, Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Form, InputField, RadioField, TextEditorField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { DEFAULT_CATEGORY_BLOG } from "constants/Form";
import { STATUS_RADIO } from "constants/Option";
import { toastMessage } from "helpers/toastMessage";
import { blogCategoryValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetALlCategoryBlog } from "redux/categorySlice";
import blogCategoryServices from "services/blogCategory";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Blog Category ",
        path: "/blog-category ",
    },
];

const TITLE_PAGE = "Blog Category Form";

function BlogCategoryForm() {
    const dispatch = useDispatch();
    dispatch(GetALlCategoryBlog());

    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValue, setInitialValue] = useState(DEFAULT_CATEGORY_BLOG);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await blogCategoryServices.getOneBlogCategory(currentId);
                    if (res.data.success) {
                        const categoryDetail = res.data.category;
                        setInitialValue({
                            name: categoryDetail.name,
                            status: categoryDetail.status,
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
        try {
            setIsLoading(true);
            const response = currentId
                ? await blogCategoryServices.updateBlogCategory(currentId, data)
                : await blogCategoryServices.createNewBlogCategory(data);
            setIsLoading(false);
            if (response.data.success) {
                navigate("/admin/blog-category");
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
                            <Form onSubmit={onSubmit} defaultValues={initialValue} validation={blogCategoryValidation}>
                                <InputField name="name" placeholder="Name" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/blog-category" className="btn btn-danger">
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

export default BlogCategoryForm;
