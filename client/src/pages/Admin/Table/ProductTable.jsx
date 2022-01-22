import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Container, Grid, Pagination, Skeleton, Stack } from "@mui/material";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Table.scss";
import Image from "constants/Image";
import CheckIcon from "@mui/icons-material/Check";
import { escapeRegExp } from "helpers/string";
import productServices from "services/product";
import { CATEGORY_OPTIONS, IMAGE_CLOUDINARY } from "constants/Data";
import AddIcon from "@mui/icons-material/Add";
import Select from "react-select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

function ProductTable() {
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState();
    const [rows, setRows] = useState([]);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = products.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        const fetchAllProduct = async () => {
            const res = await productServices.getAllProduct();
            setProducts(res.data.product);
            setRows(res.data.product);
        };
        fetchAllProduct();
    }, []);
    console.log("rows:", rows);

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product Table" />
                    <div className="card">
                        <h3 className="card-header">Filter & Search</h3>
                        <div className="card-body">
                            <div className="toolbar">
                                <div className="filter">
                                    <button className="btn btn-success btn-sm">
                                        All <span>8</span>
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        Active<span>5</span>
                                    </button>
                                    <button className="btn btn-danger btn-sm">
                                        Inactive<span>3</span>
                                    </button>
                                </div>
                                <div style={{ width: "240px" }}>
                                    <Select options={CATEGORY_OPTIONS} />
                                </div>
                                <div className="search">
                                    <SearchIcon className="search-icon" />
                                    <input
                                        placeholder="Search"
                                        // value={props.value}
                                        // onChange={props.onChange}
                                        className="search-input"
                                    />
                                    <CloseIcon
                                        className="search-icon delete"
                                        // onClick={props.clearSearch}
                                        // style={{
                                        //     visibility: props.value ? "visible" : "hidden",
                                        // }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="card-header">Product Table</h3>
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
                                        {rows.map((item) => (
                                            <tr key={item._id}>
                                                <td className="text-center">
                                                    <div>
                                                        <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                                                    </div>
                                                    <Link to={`/product-detail/${item.slug}`}>{item.name}</Link>
                                                </td>
                                                <td className="text-center">{item.category.name}</td>
                                                <td className="text-center">{item.status}</td>
                                                <td className="text-center">${item.price}</td>
                                                <td className="text-center">{item.color[0].label}</td>
                                                <td className="text-center">{item.size[0].label}</td>
                                                <td className="text-center">{item.tag[0].label}</td>
                                                <td className="text-center">
                                                    <Link
                                                        to={`/admin/product/form/${item._id}`}
                                                        className="btn btn-rounded btn-primary btn-sm"
                                                    >
                                                        <EditIcon fontSize="small" />
                                                    </Link>
                                                    <button className="btn btn-rounded btn-danger btn-sm">
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

export default ProductTable;
