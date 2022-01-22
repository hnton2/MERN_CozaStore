import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Pagination, Skeleton } from "@mui/material";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Message from "components/Message";
import StatusFilter from "components/StatusFilter";
import { CATEGORY_OPTIONS, IMAGE_CLOUDINARY } from "constants/Data";
import { escapeRegExp } from "helpers/string";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import productCategoryServices from "services/productCategory";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductCategoryTable() {
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState();
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = categories.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        const fetchAllProduct = async () => {
            const res = await productCategoryServices.getAllProductCategory();
            setCategories(res.data.category);
            setRows(res.data.category);
        };
        fetchAllProduct();
    }, [categories]);

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            setMessage("");
            const res = await productCategoryServices.deleteProductCategory(id);
            setIsLoading(false);
            if (res.data.success) {
                setCategories("");
                setMessage({ type: "error", content: res.data.message });
            } else setMessage({ type: "success", content: res.data.message });
        } catch (error) {
            console.log(error);
            setMessage({ type: "error", content: error.data.message });
        }
    };

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product Category Table" />
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
                        <h3 className="card-header">Product Category Table</h3>
                        {message && <Message type={message.type}>{message.content}</Message>}
                        <div className="card-body">
                            <div className="actions">
                                <button className="btn btn-danger">
                                    <FileDownloadIcon />
                                    Export
                                </button>
                                <Link to="/admin/product-category/form" className="btn btn-primary">
                                    <AddIcon />
                                    Add New
                                </Link>
                            </div>
                            {rows.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Slug</th>
                                            <th>Desciption</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((item) => (
                                            <tr key={item._id}>
                                                <td className="text-center">{item.name}</td>
                                                <td className="text-center">
                                                    <button
                                                        className={`btn btn-rounded ${
                                                            item.status === "active"
                                                                ? "btn-success"
                                                                : "btn-secondary btn-disabled"
                                                        } btn-sm`}
                                                    >
                                                        <CheckIcon fontSize="small" />
                                                    </button>
                                                </td>
                                                <td className="text-center">{item.slug}</td>
                                                <td className="text-center">{item.description}</td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/admin/product-category/form/${item._id}`}
                                                        className="btn btn-rounded btn-primary btn-sm"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-rounded btn-danger btn-sm"
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
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
                                    <Pagination count={10} color="primary" />
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

export default ProductCategoryTable;
