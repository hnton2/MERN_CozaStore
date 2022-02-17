import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Backdrop, CircularProgress, Container } from "@mui/material";
import { DEFAULT_VALUE_COUPON, STATUS_RADIO } from "constants/Data";
import { Form, InputField, RadioField } from "components/CustomForm";
import { couponValidation } from "helpers/validation";
import Message from "components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TextEditorField } from "components/CustomForm";
import couponServices from "services/coupon";
import { DatePickerField } from "components/CustomForm";
import { Helmet } from "react-helmet";
import Preloader from "components/Preloader";

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
    const [message, setMessage] = useState();
    const [initialValue, setInitialValue] = useState(DEFAULT_VALUE_COUPON);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await couponServices.getOneCoupon(currentId);
                    const couponDetail = res.data.coupon;
                    setInitialValue({
                        name: couponDetail.name,
                        code: couponDetail.code,
                        status: couponDetail.status,
                        quantity: couponDetail.quantity,
                        discount: couponDetail.discount,
                        expiredTime: Date.parse(couponDetail.expiredTime),
                        description: couponDetail.description,
                    });
                }
            } catch (error) {
                console.log(error);
                setMessage({ type: "error", content: error.response.data.message });
            }
        };
        fetchData();
    }, [currentId]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage();
        try {
            const response = currentId
                ? await couponServices.updateCoupon(currentId, data)
                : await couponServices.createNewCoupon(data);
            setMessage({ type: "success", content: response.data.message });
            setIsLoading(false);
            navigate("/admin/coupon");
        } catch (error) {
            setIsLoading(false);
            setMessage({ type: "error", content: error.response.data.message });
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
                            {message && <Message type={message.type}>{message.content}</Message>}
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