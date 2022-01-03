import React from "react";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Breadcrumbs.scss";

function Breadcrumbs({ links, current }) {
    return (
        <div className="breadcrumbs">
            {links.map((link, index) => (
                <Link to={link.path} key={index} className="breadcrumbs__link">
                    {link.name}
                    <NavigateNextIcon fontSize="small" className="breadcrumbs__link-icon" />
                </Link>
            ))}
            <span>{current}</span>
        </div>
    );
}

export default Breadcrumbs;
