import { faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import Error404 from "components/404";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import StatusFilter from "components/StatusFilter";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { createSummary } from "helpers/string";
import { toastMessage } from "helpers/toastMessage";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import sliderServices from "services/slider";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const TITLE_PAGE = "Slider List";

function SliderTable() {
    let [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [sliders, setSliders] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [statistics, setStatistics] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await sliderServices.getItems(Object.fromEntries([...searchParams]));
                if (res.data.success) {
                    setSliders(res.data.items);
                    setStatistics(res.data.statistics);
                    setTotalPages(res.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchData();
    }, [searchParams]);

    const requestSearch = (value) => {
        setSearch(value);
        if (value !== "") {
            searchParams.delete("page");
            setSearchParams({ ...Object.fromEntries([...searchParams]), search: value });
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
        }
    };

    const handleChangePage = (event, value) => {
        if (value !== 1) setSearchParams({ ...Object.fromEntries([...searchParams]), page: value });
        else {
            searchParams.delete("page");
            setSearchParams(searchParams);
        }
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const res = await sliderServices.deleteItem(id);
            if (res.data.success) {
                const updateSliders = sliders.filter((slider) => slider._id !== id);
                setSliders(updateSliders);
                toastMessage({ type: "success", message: res.data.message });
            } else toastMessage({ type: "error", message: res.data.message });
            setIsLoading(false);
        } catch (error) {
            toastMessage({ type: "error", message: error.data.message });
        }
    };

    const handleChangeStatus = async (id, value) => {
        try {
            setIsLoading(true);
            const res = await sliderServices.changeStatus(id, value);
            if (res.data.success) {
                const updateSliders = sliders.map((slider) => {
                    if (slider._id === id) slider.status = value === "active" ? "inactive" : "active";
                    return slider;
                });
                setSliders(updateSliders);
                setIsLoading(false);
                toastMessage({ type: "success", message: res.data.message });
            } else toastMessage({ type: "error", message: res.data.message });
        } catch (error) {
            toastMessage({ type: "error", message: error.data.message });
        }
    };

    return (
        <>
            <Helmet>
                <title>{TITLE_PAGE}</title>
            </Helmet>
            <Preloader isHidden={sliders} />
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current={TITLE_PAGE} />
                    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className="card">
                        <h3 className="card-header">Filter & Search</h3>
                        <div className="card-body">
                            <div className="toolbar">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={8} lg={8}>
                                        {statistics && <StatusFilter keyword="status" data={statistics} />}
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4}>
                                        <div className="search">
                                            <SearchIcon className="search-icon" />
                                            <input
                                                placeholder="Search"
                                                value={search}
                                                onChange={(event) => requestSearch(event.target.value)}
                                                className="search-input"
                                            />
                                            <CloseIcon
                                                className="search-icon delete"
                                                onClick={() => requestSearch("")}
                                                style={{
                                                    visibility: search ? "visible" : "hidden",
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="card-header">{TITLE_PAGE}</h3>
                        <div className="card-body">
                            <div className="actions">
                                <button className="btn btn-danger">
                                    <FileDownloadIcon />
                                    Export
                                </button>
                                <Link to="/admin/slider/form" className="btn btn-primary">
                                    <AddIcon />
                                    Add New
                                </Link>
                            </div>
                            {sliders && sliders.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                            <th>Path</th>
                                            <th>Thumb</th>
                                            <th>Status</th>
                                            <th>Summary</th>
                                            <th style={{ width: "100px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sliders.map((item, index) => (
                                            <tr key={item._id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{item.name}</td>
                                                <td className="text-center">{item.path}</td>
                                                <td className="text-center">
                                                    <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className={`btn btn-rounded ${
                                                            item.status === "active"
                                                                ? "btn-success"
                                                                : "btn-secondary btn-disabled"
                                                        } btn-sm`}
                                                        onClick={() => handleChangeStatus(item._id, item.status)}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} />
                                                    </button>
                                                </td>
                                                <td>{parse(createSummary(item.description, 100))}</td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/admin/slider/form/${item._id}`}
                                                        className="btn btn-rounded btn-primary btn-sm"
                                                    >
                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-rounded btn-danger btn-sm"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <Error404 />
                            )}
                        </div>
                        {totalPages > 1 && (
                            <div className="card-footer">
                                <div className="pagination">
                                    <div className="left">
                                        <h4>Pagination</h4>
                                    </div>
                                    <div className="right">
                                        <Pagination
                                            page={Number(searchParams.get("page") || 1)}
                                            count={totalPages}
                                            onChange={handleChangePage}
                                            variant="outlined"
                                            shape="rounded"
                                            color="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default SliderTable;
