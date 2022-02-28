import { faCheck, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, CircularProgress, Container, Grid, Pagination } from "@mui/material";
import Error404 from "components/404";
import Breadcrumbs from "components/Breadcrumbs";
import Footer from "components/Footer";
import Header from "components/Header";
import Preloader from "components/Preloader";
import StatusFilter from "components/StatusFilter";
import { toastMessage } from "helpers/toastMessage";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import userServices from "services/user";
import "./Table.scss";

const linkData = [
    {
        name: "Admin",
        path: "/admin",
    },
];

const TITLE_PAGE = "User List";

function UserTable() {
    let [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [statistics, setStatistics] = useState();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const res = await userServices.getItems(Object.fromEntries([...searchParams]));
                if (res.data.success) {
                    setUsers(res.data.items);
                    setStatistics(res.data.statistics);
                    setTotalPages(res.data.pages);
                }
                setIsLoading(false);
            } catch (error) {
                toastMessage({ type: "error", message: error.message });
            }
        };
        fetchUsers();
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
            const res = await userServices.deleteItem(id);
            if (res.data.success) {
                const updateUsers = users.filter((user) => user._id !== id);
                setUsers(updateUsers);
                toastMessage({ type: "success", message: res.data.message });
            } else toastMessage({ type: "error", message: res.data.message });
            setIsLoading(false);
        } catch (error) {
            toastMessage({ type: "error", message: error.data.message });
        }
    };

    const handleChangeRole = async (id, value) => {
        try {
            setIsLoading(true);
            const res = await userServices.changeRole(id, value);
            if (res.data.success) {
                const updateUsers = users.map((user) => {
                    if (user._id === id) user.isAdmin = !value;
                    return user;
                });
                setUsers(updateUsers);
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
            <Preloader isHidden={users} />
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
                                        {statistics && <StatusFilter keyword="isAdmin" data={statistics} />}
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
                            {users && users.length > 0 ? (
                                <div className="table">
                                    <table className="table-border">
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Admin</th>
                                                <th>Created</th>
                                                <th>Updated</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td className="text-center">{item.username}</td>
                                                    <td className="text-center">{item.email}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className={`btn btn-rounded ${
                                                                item.isAdmin
                                                                    ? "btn-success"
                                                                    : "btn-secondary btn-disabled"
                                                            } btn-sm`}
                                                            onClick={() => handleChangeRole(item._id, item.isAdmin)}
                                                        >
                                                            <FontAwesomeIcon icon={faCheck} />
                                                        </button>
                                                    </td>
                                                    <td className="text-center">
                                                        {moment(item.createdAt).format("MMM Do YY")}
                                                    </td>
                                                    <td className="text-center">
                                                        {moment(item.updatedAt).format("MMM Do YY")}
                                                    </td>
                                                    <td className="text-center">
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

export default UserTable;
