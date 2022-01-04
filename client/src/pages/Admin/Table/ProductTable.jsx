import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import { Badge, Container, Grid } from "@mui/material";
import { DataGrid, GridToolbarFilterButton } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./Table.scss";
import Image from "constants/Image";
import CheckIcon from "@mui/icons-material/Check";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const dataRows = [
    {
        id: 1,
        name: "054-01-FR",
        image: Image.PRODUCT1,
        status: "active",
        category: "Active",
        tag: "$139.45",
        color: "$139.45",
        size: "$139.45",
        quantity: "$139.45",
        price: "$139.45",
    },
    {
        id: 2,
        name: "054-01-FR",
        image: Image.PRODUCT2,
        status: "inactive",
        category: "Active",
        tag: "$139.45",
        color: "$139.45",
        size: "$139.45",
        quantity: "$139.45",
        price: "$139.45",
    },
];

const dataColumns = [
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 150,
    },
    {
        field: "image",
        headerName: "Image",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 140,
        renderCell: (params) => <img className="table-thumb" src={params.value} />,
    },
    {
        field: "status",
        headerName: "Status",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
        renderCell: (params) => (
            <button className={`table-status ${params.value !== "active" && "disable"}`}>
                {params.value !== "active" ? <ClearIcon /> : <CheckIcon />}
            </button>
        ),
    },
    {
        field: "category",
        headerName: "Category",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
    },
    {
        field: "tag",
        headerName: "Tags",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
        renderCell: (params) => <span>{params.value}</span>,
    },
    {
        field: "color",
        headerName: "Color",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
        renderCell: (params) => <span>{params.value}</span>,
    },
    {
        field: "size",
        headerName: "Size",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
        renderCell: (params) => <span>{params.value}</span>,
    },
    {
        field: "quantity",
        headerName: "Quantity",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
    },
    {
        field: "price",
        headerName: "Price",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 100,
    },
    {
        field: "action",
        headerName: "Action",
        headerClassName: "table-header",
        cellClassName: "table-cell",
        width: 80,
        renderCell: (params) => (
            <div className="table-action">
                <Link to="#">
                    <EditIcon />
                </Link>
                <Link to="#">
                    <ClearIcon />
                </Link>
            </div>
        ),
    },
];

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function QuickSearchToolbar(props) {
    return (
        <div className="table__toolbar">
            <Grid container justifyContent="space-between">
                <Grid item md={9} lg={9}>
                    <GridToolbarFilterButton />
                </Grid>
                <Grid item md={3} lg={3}>
                    <div className="table-search">
                        <SearchIcon className="search-icon" />
                        <input
                            placeholder="Search"
                            value={props.value}
                            onChange={props.onChange}
                            className="search-input"
                        />
                        <CloseIcon
                            className="search-icon delete"
                            onClick={props.clearSearch}
                            style={{
                                visibility: props.value ? "visible" : "hidden",
                            }}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

function ProductTable() {
    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState(dataRows);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = dataRows.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        setRows(dataRows);
    }, [dataRows]);

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="Product List" />
                    <div className="section-admin">
                        <h3 className="section-admin__header">Product Table</h3>
                        <div className="section-admin__content">
                            <div className="table">
                                <DataGrid
                                    rows={rows}
                                    columns={dataColumns}
                                    pageSize={5}
                                    components={{ Toolbar: QuickSearchToolbar }}
                                    componentsProps={{
                                        toolbar: {
                                            value: searchText,
                                            onChange: (event) => requestSearch(event.target.value),
                                            clearSearch: () => requestSearch(""),
                                        },
                                    }}
                                />
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
