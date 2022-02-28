import { Backdrop, CircularProgress, Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { DatePickerField, Form, InputField, RadioField, TextEditorField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { DEFAULT_COUPON } from "constants/Form";
import { STATUS_RADIO } from "constants/Option";
import { toastMessage } from "helpers/toastMessage";
import { couponValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import couponServices from "services/coupon";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Coupon",
        path: "/coupon",
    },
];

const TITLE_PAGE = "Coupon Form";

function CouponForm() {
    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValue, setInitialValue] = useState(DEFAULT_COUPON);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await couponServices.getItem(currentId);
                    if (res.data.success) {
                        const couponDetail = res.data.item;
                        setInitialValue({
                            name: couponDetail.name,
                            code: couponDetail.code,
                            status: couponDetail.status,
                            quantity: couponDetail.quantity,
                            discount: couponDetail.discount,
                            expiredTime: Date.parse(couponDetail.expiredTime),
                            description: couponDetail.description,
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
                ? await couponServices.updateItem(currentId, data)
                : await couponServices.createItem(data);
            setIsLoading(false);
            if (response.data.success) {
                navigate("/admin/coupon");
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
                            <Form onSubmit={onSubmit} defaultValues={initialValue} validation={couponValidation}>
                                <InputField name="name" placeholder="Name" />
                                <InputField name="code" placeholder="Coupon Code" />
                                <DatePickerField name="expiredTime" placeholder="Expired time" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <InputField name="quantity" placeholder="Quantity" />
                                <InputField name="discount" placeholder="Discount" />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/coupon" className="btn btn-danger">
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

export default CouponForm;
