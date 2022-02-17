import { faCheck, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Pagination, Skeleton } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import StatusFilter from "components/StatusFilter";
import { CATEGORY_OPTIONS, ORDER_STATUS } from "constants/Data";
import { escapeRegExp } from "helpers/string";
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

const RenderTable = ({ data, currentPage, totalItemPerPage = 5, onChangeStatus }) => {
    const dataRender = data.slice((currentPage - 1) * totalItemPerPage, currentPage * totalItemPerPage);

    return (
        <>
            {dataRender.map((item) => (
                <tr key={item._id}>
                    <td className="text-center">#{item.code}</td>
                    <td>{item.user.name}</td>
                    <td className="text-center">
                        {item.user.address.province} - {item.user.address.country}
                    </td>
                    <td className="text-center">
                        <Select
                            options={ORDER_STATUS}
                            value={ORDER_STATUS.filter((option) => option.value === item.status)}
                            onChange={(data) => onChangeStatus(item._id, data.value)}
                        />
                    </td>
                    <td>
                        {item.products.map((product) => (
                            <p key={product.slug}>
                                <Link to={`/product/${product.slug}`}>{product.name}</Link>
                            </p>
                        ))}
                    </td>
                    <td className="text-center">${item.total}</td>
                    <td className="text-center">
                        <button
                            className={`btn btn-rounded ${
                                item.checkPayment ? "btn-success" : "btn-secondary btn-disabled"
                            } btn-sm`}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </td>
                    <td className="text-center">
                        <Link to={`/admin/order/invoice/${item.code}`} className="btn btn-rounded btn-primary btn-sm">
                            <FontAwesomeIcon icon={faFolderOpen} />
                        </Link>
                    </td>
                </tr>
            ))}
        </>
    );
};

function OrderTable() {
    let [searchParams, setSearchParams] = useSearchParams();
    let currentPage = searchParams.get("page") || 1;

    const [searchText, setSearchText] = useState("");
    const [orders, setOrders] = useState();
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllProduct = async () => {
            const res = await orderServices.getAllOrder();
            setOrders(res.data.orders);
            setRows(res.data.orders);
        };
        fetchAllProduct();
    }, [orders]);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = orders.filter((row) =>
            Object.keys(row).some((field) => searchRegex.test(row[field].toString()))
        );
        setRows(filteredRows);
        setSearchParams({ page: 1 });
    };

    const handleChangePage = (event, value) => setSearchParams({ page: value });

    const handleChangeStatus = async (id, value) => {
        try {
            setIsLoading(true);
            const res = await orderServices.changeStatus(id, value);
            if (res.data.success) {
                setOrders(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
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
                                <StatusFilter data={rows} />
                                <div style={{ width: "240px" }}>
                                    <Select options={CATEGORY_OPTIONS} />
                                </div>
                                <div className="search">
                                    <SearchIcon className="search-icon" />
                                    <input
                                        placeholder="Search"
                                        value={searchText}
                                        onChange={(event) => requestSearch(event.target.value)}
                                        className="search-input"
                                    />
                                    <CloseIcon
                                        className="search-icon delete"
                                        onClick={() => requestSearch("")}
                                        style={{
                                            visibility: searchText ? "visible" : "hidden",
                                        }}
                                    />
                                </div>
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
                            {rows.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>Invoice Code</th>
                                            <th>User</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Products</th>
                                            <th>Total</th>
                                            <th>Payment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderTable
                                            data={rows}
                                            currentPage={currentPage}
                                            onChangeStatus={handleChangeStatus}
                                        />
                                    </tbody>
                                </table>
                            ) : (
                                <Skeleton animation="wave" variant="rectangular" width={1072} height={200} />
                            )}
                        </div>
                        <div className="card-footer">
                            <div className="pagination">
                                <div className="left">
                                    <h4>Pagination</h4>
                                </div>
                                <div className="right">
                                    <Pagination
                                        page={Number(currentPage)}
                                        count={Math.ceil(rows.length / 5)}
                                        onChange={handleChangePage}
                                        variant="outlined"
                                        shape="rounded"
                                        color="primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
}

export default OrderTable;
