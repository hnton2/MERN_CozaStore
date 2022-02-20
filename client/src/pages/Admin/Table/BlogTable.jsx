import { faCheck, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Pagination } from "@mui/material";
import Error404 from "components/404";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Message from "components/Message";
import Preloader from "components/Preloader";
import StatusFilter from "components/StatusFilter";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { CATEGORY_OPTIONS } from "constants/Option";
import { createSummary, escapeRegExp } from "helpers/string";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import Select from "react-select";
import blogServices from "services/blog";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const TITLE_PAGE = "Blog List";

const RenderTable = ({ data, currentPage, totalItemPerPage = 5, onDelete, onChangeStatus }) => {
    const dataRender = data.slice((currentPage - 1) * totalItemPerPage, currentPage * totalItemPerPage);

    return (
        <>
            {dataRender.map((item) => (
                <tr key={item._id}>
                    <td className="text-center">
                        <div>
                            <img src={IMAGE_CLOUDINARY + item.images[0]} alt={item.name} />
                        </div>
                        <Link to={`/blog/${item.slug}`}>{item.name}</Link>
                    </td>
                    <td className="text-center">{item.category.name}</td>
                    <td className="text-center">
                        <button
                            className={`btn btn-rounded ${
                                item.status === "active" ? "btn-success" : "btn-secondary btn-disabled"
                            } btn-sm`}
                            onClick={() => onChangeStatus(item._id, item.status)}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </td>
                    <td>{parse(createSummary(item.description, 120))}</td>
                    <td className="text-center">
                        <Link to={`/admin/blog/form/${item._id}`} className="btn btn-rounded btn-primary btn-sm">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                        <button onClick={() => onDelete(item._id)} className="btn btn-rounded btn-danger btn-sm">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};

function BlogTable() {
    let [searchParams, setSearchParams] = useSearchParams();
    let currentPage = searchParams.get("page") || 1;

    const [searchText, setSearchText] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchAllBlog = async () => {
            const res = await blogServices.getAllBlog();
            setBlogs(res.data.blog);
            setRows(res.data.blog);
        };
        fetchAllBlog();
    }, [blogs]);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = blogs.filter((row) =>
            Object.keys(row).some((field) => searchRegex.test(row[field].toString()))
        );
        setRows(filteredRows);
        setSearchParams({ page: 1 });
    };

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            setMessage("");
            const res = await blogServices.deleteblog(id);
            setIsLoading(false);
            if (res.data.success) {
                const updateBlog = blogs.filter((blog) => blog._id !== id);
                setBlogs(updateBlog);
                setRows(updateBlog);
                setMessage({ type: "success", content: res.data.message });
            } else setMessage({ type: "error", content: res.data.message });
        } catch (error) {
            console.log(error);
            setMessage({ type: "error", content: error.data.message });
        }
    };

    const handleChangePage = (event, value) => setSearchParams({ page: value });

    const handleChangeStatus = async (id, value) => {
        try {
            setIsLoading(true);
            const res = await blogServices.changeStatus(id, value);
            if (res.data.success) {
                setBlogs(res.data);
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
            <Preloader isHidden={blogs} />
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
                        {message && <Message type={message.type}>{message.content}</Message>}
                        <div className="card-body">
                            <div className="actions">
                                <button className="btn btn-danger">
                                    <FileDownloadIcon />
                                    Export
                                </button>
                                <Link to="/admin/blog/form" className="btn btn-primary">
                                    <AddIcon />
                                    Add New
                                </Link>
                            </div>
                            {rows.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>Blog</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                            <th>Summary</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <RenderTable
                                            data={rows}
                                            currentPage={currentPage}
                                            onDelete={handleDelete}
                                            onChangeStatus={handleChangeStatus}
                                        />
                                    </tbody>
                                </table>
                            ) : (
                                <Error404 />
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

export default BlogTable;
