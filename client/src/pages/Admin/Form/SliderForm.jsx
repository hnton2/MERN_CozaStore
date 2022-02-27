import { Backdrop, CircularProgress, Container } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import { Form, ImageField, InputField, RadioField, TextEditorField } from "components/CustomForm";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { DEFAULT_SLIDER } from "constants/Form";
import { STATUS_RADIO } from "constants/Option";
import { sliderValidation } from "helpers/validation";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import sliderServices from "services/slider";
import { toastMessage } from "helpers/toastMessage";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
    {
        name: "Slider ",
        path: "/slider ",
    },
];

const TITLE_PAGE = "Slider Form";

function SliderForm() {
    const navigate = useNavigate();
    const { id: currentId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [initialValue, setInitialValue] = useState(DEFAULT_SLIDER);
    const [oldImages, setOldImages] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentId) {
                    const res = await sliderServices.getOneSlider(currentId);
                    if (res.data.success) {
                        const sliderDetail = res.data.slider;
                        setOldImages(sliderDetail.images);
                        setInitialValue({
                            name: sliderDetail.name,
                            path: sliderDetail.path,
                            status: sliderDetail.status,
                            images: sliderDetail.images.map((item) => ({ name: item })),
                            description: sliderDetail.description,
                        });
                    } else toastMessage({ type: "error", message: res.data.message });
                }
            } catch (error) {
                toastMessage({ type: "error", message: error.data.message });
            }
        };
        fetchData();
    }, [currentId]);

    const onSubmit = async (data) => {
        if (oldImages) data.oldImages = oldImages;
        setIsLoading(true);
        try {
            const response = currentId
                ? await sliderServices.updateSlider(currentId, data)
                : await sliderServices.createNewSlider(data);
            setIsLoading(false);
            if (response.data.success) {
                navigate("/admin/slider");
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
                            <Form onSubmit={onSubmit} defaultValues={initialValue} validation={sliderValidation}>
                                <InputField name="name" placeholder="Name" />
                                <InputField name="path" placeholder="Path" />
                                <RadioField name="status" options={STATUS_RADIO} />
                                <ImageField name="images" />
                                <TextEditorField name="description" />
                                <div className="form-button">
                                    <Link to="/admin/slider" className="btn btn-danger">
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

export default SliderForm;
