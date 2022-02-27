import { faCheck, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import Error404 from "components/404";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import { ORDER_STATUS } from "constants/Option";
import { toastMessage } from "helpers/toastMessage";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import orderServices from "services/order";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const TITLE_PAGE = "Order List";

function OrderTable() {
    let [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const res = await orderServices.getOrders(Object.fromEntries([...searchParams]));
                if (res.data.success) {
                    setOrders(res.data.orders);
                    setTotalPages(res.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchOrders();
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

    const handleSelect = (data) => {
        if (data.value !== "all") {
            searchParams.delete("page");
            setSearchParams({ ...Object.fromEntries([...searchParams]), status: data.value });
        } else {
            searchParams.delete("status");
            setSearchParams(searchParams);
        }
    };

    const handleChangeStatus = async (id, value) => {
        try {
            setIsLoading(true);
            const res = await orderServices.changeStatus(id, value);
            if (res.data.success) {
                const updateOrders = orders.map((order) => {
                    if (order._id === id) order.status = value;
                    return order;
                });
                setOrders(updateOrders);
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
            <Preloader isHidden={orders} />
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
                                        <div className="select" style={{ marginLeft: 0 }}>
                                            <Select
                                                value={ORDER_STATUS.filter(
                                                    (option) => option.value === searchParams.get("status")
                                                )}
                                                options={[{ value: "all", label: "All" }, ...ORDER_STATUS]}
                                                onChange={handleSelect}
                                            />
                                        </div>
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
                            </div>
                            {orders && orders.length > 0 ? (
                                <div className="table">
                                    <table className="table table-border">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Invoice Code</th>
                                                <th>User</th>
                                                <th>Address</th>
                                                <th>Status</th>
                                                <th>Products</th>
                                                <th>Total</th>
                                                <th>Payment</th>
                                                <th style={{ width: "100px" }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">#{item.code}</td>
                                                    <td>{item.user.name}</td>
                                                    <td className="text-center">
                                                        {item.user.address.province} - {item.user.address.country}
                                                    </td>
                                                    <td className="text-center">
                                                        <Select
                                                            options={ORDER_STATUS}
                                                            value={ORDER_STATUS.filter(
                                                                (option) => option.value === item.status
                                                            )}
                                                            onChange={(data) =>
                                                                handleChangeStatus(item._id, data.value)
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        {item.products.map((product) => (
                                                            <p key={product.slug}>
                                                                <Link to={`/product/${product.slug}`}>
                                                                    {product.name}
                                                                </Link>
                                                            </p>
                                                        ))}
                                                    </td>
                                                    <td className="text-center">${item.total}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className={`btn btn-rounded ${
                                                                item.checkPayment
                                                                    ? "btn-success"
                                                                    : "btn-secondary btn-disabled"
                                                            } btn-sm`}
                                                        >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link
                                                            to={`/admin/order/invoice/${item.code}`}
                                                            className="btn btn-rounded btn-primary btn-sm"
                                                        >
                                                            <FontAwesomeIcon icon={faFolderOpen} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
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

export default OrderTable;
