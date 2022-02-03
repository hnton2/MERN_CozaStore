import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Backdrop, CircularProgress, Container, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Table.scss";
import CheckIcon from "@mui/icons-material/Check";
import { escapeRegExp } from "helpers/string";
import productServices from "services/product";
import { CATEGORY_OPTIONS, IMAGE_CLOUDINARY } from "constants/Data";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import Message from "components/Message";
import StatusFilter from "components/StatusFilter";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const RenderTable = ({ data, currentPage, totalItemPerPage = 5, onDelete }) => {
    const dataRender = data.slice((currentPage - 1) * totalItemPerPage, currentPage * totalItemPerPage);

    return (
        <>
            {dataRender.map((item) => (
                <tr key={item._id}>
                    <td className="text-center">
                        <div>
                            <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                        </div>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </td>
                    <td className="text-center">{item.category.name}</td>
                    <td className="text-center">
                        <button
                            className={`btn btn-rounded ${
                                item.status === "active" ? "btn-success" : "btn-secondary btn-disabled"
                            } btn-sm`}
                        >
                            <CheckIcon fontSize="small" />
                        </button>
                    </td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">{item.color[0].label}</td>
                    <td className="text-center">{item.size[0].label}</td>
                    <td className="text-center">{item.tag[0].label}</td>
                    <td className="text-center">
                        <Link to={`/admin/product/form/${item._id}`} className="btn btn-rounded btn-primary btn-sm">
                            <EditIcon fontSize="small" />
                        </Link>
                        <button onClick={() => onDelete(item._id)} className="btn btn-rounded btn-danger btn-sm">
                            <DeleteIcon fontSize="small" />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};

function ProductTable() {
    let [searchParams, setSearchParams] = useSearchParams();
    let currentPage = searchParams.get("page") || 1;

    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchAllProduct = async () => {
            const res = await productServices.getAllProduct();
            setProducts(res.data.product);
            setRows(res.data.product);
        };
        fetchAllProduct();
    }, []);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = products.filter((row) =>
            Object.keys(row).some((field) => searchRegex.test(row[field].toString()))
        );
        setRows(filteredRows);
        setSearchParams({ page: 1 });
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            setMessage("");
            const res = await productServices.deleteProduct(id);
            setIsLoading(false);
            if (res.data.success) {
                const updateProducts = products.filter((product) => product._id !== id);
                setProducts(updateProducts);
                setRows(updateProducts);
                setMessage({ type: "success", content: res.data.message });
            } else setMessage({ type: "error", content: res.data.message });
        } catch (error) {
            console.log(error);
            setMessage({ type: "error", content: error.data.message });
        }
    };

    const handleChangePage = (event, value) => setSearchParams({ page: value });

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product Table" />
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
                        <h3 className="card-header">Product Table</h3>
                        {message && <Message type={message.type}>{message.content}</Message>}
                        <div className="card-body">
                            <div className="actions">
                                <button className="btn btn-danger">
                                    <FileDownloadIcon />
                                    Export
                                </button>
                                <Link to="/admin/product/form" className="btn btn-primary">
                                    <AddIcon />
                                    Add New
                                </Link>
                            </div>
                            {rows.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                            <th>Price</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Tag</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderTable data={rows} currentPage={currentPage} onDelete={handleDelete} />
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

export default ProductTable;
