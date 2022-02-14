import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Pagination, Skeleton } from "@mui/material";
import moment from "moment";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import StatusFilter from "components/StatusFilter";
import { escapeRegExp } from "helpers/string";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Table.scss";
import userServices from "services/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

toast.configure();

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
                    <td className="text-center">{item.username}</td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-center">
                        <button
                            className={`btn btn-rounded ${
                                item.isAdmin ? "btn-success" : "btn-secondary btn-disabled"
                            } btn-sm`}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </td>
                    <td className="text-center">{moment(item.createdAt).format("MMM Do YY")}</td>
                    <td className="text-center">{moment(item.updatedAt).format("MMM Do YY")}</td>
                    <td className="text-center">
                        <button onClick={() => onDelete(item._id)} className="btn btn-rounded btn-danger btn-sm">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};

function UserTable() {
    let [searchParams, setSearchParams] = useSearchParams();
    let currentPage = searchParams.get("page") || 1;

    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState();
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = users.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    useEffect(() => {
        const fetchAllUser = async () => {
            const res = await userServices.getAllUser();
            setUsers(res.data.user);
            setRows(res.data.user);
        };
        fetchAllUser();
    }, []);

    const handleDelete = async (id) => {
        try {
            setIsLoading(true);
            const res = await userServices.deleteUser(id);
            setIsLoading(false);
            if (res.data.success) {
                const updateUsers = users.filter((user) => user._id !== id);
                setUsers(updateUsers);
                setRows(updateUsers);
                toast.success(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    progress: undefined,
                });
            } else
                toast.error(res.data.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    progress: undefined,
                });
        } catch (error) {
            toast.error(error.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                progress: undefined,
            });
        }
    };

    const handleChangePage = (event, value) => setSearchParams({ page: value });

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <Breadcrumbs links={linkData} current="User" />
                    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    <div className="card">
                        <h3 className="card-header">Filter & Search</h3>
                        <div className="card-body">
                            <div className="toolbar">
                                <StatusFilter data={rows} />
                                <div style={{ width: "240px" }}> </div>
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
                        <h3 className="card-header">User Table</h3>
                        <div className="card-body">
                            {rows.length > 0 ? (
                                <table className="table table-border">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>isAdmin</th>
                                            <th>Created</th>
                                            <th>Updated</th>
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

export default UserTable;
