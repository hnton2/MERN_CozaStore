import { faCheck, faGreaterThanEqual, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
import { toastMessage } from "helpers/toastMessage";
import parse from "html-react-parser";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import couponServices from "services/coupon";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const TITLE_PAGE = "Coupon List";

function CouponTable() {
    let [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [coupons, setCoupons] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [statistics, setStatistics] = useState();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                setIsLoading(true);
                const res = await couponServices.getItems(Object.fromEntries([...searchParams]));
                if (res.data.success) {
                    setCoupons(res.data.items);
                    setStatistics(res.data.statistics);
                    setTotalPages(res.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchCoupons();
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
            const res = await couponServices.deleteItem(id);
            if (res.data.success) {
                const updateCoupons = coupons.filter((coupon) => coupon._id !== id);
                setCoupons(updateCoupons);
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
            const res = await couponServices.changeStatus(id, value);
            if (res.data.success) {
                const updateCoupons = coupons.map((coupon) => {
                    if (coupon._id === id) coupon.status = value === "active" ? "inactive" : "active";
                    return coupon;
                });
                setCoupons(updateCoupons);
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
            <Preloader isHidden={coupons} />
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
                                    <Grid item xs={12} sm={4} md={8} lg={8}>
                                        {statistics && <StatusFilter keyword="status" data={statistics} />}
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
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
                                <Link to="/admin/coupon/form" className="btn btn-primary">
                                    <AddIcon />
                                    Add New
                                </Link>
                            </div>
                            {coupons && coupons.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Name</th>
                                            <th>Code</th>
                                            <th>Status</th>
                                            <th>Discount</th>
                                            <th>Quantity</th>
                                            <th>Condition</th>
                                            <th>Expired Time</th>
                                            <th>Desciption</th>
                                            <th style={{ width: "100px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((item, index) => (
                                            <tr key={item._id}>
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{item.name}</td>
                                                <td className="text-center">{item.code}</td>
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
                                                <td className="text-center">${item.discount}</td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-center">
                                                    <FontAwesomeIcon icon={faGreaterThanEqual} /> ${item.condition}
                                                </td>
                                                <td className="text-center">
                                                    {moment(item.expiredTime).format("MMM Do YY")}
                                                </td>
                                                <td className="text-center">{parse(item.description)}</td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/admin/coupon/form/${item._id}`}
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

export default CouponTable;
