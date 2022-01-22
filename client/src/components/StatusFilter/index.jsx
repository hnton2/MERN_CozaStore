import React from "react";
import "./StatusFilter.scss";

function StatusFilter({ data }) {
    let statusCount = { active: 0, inactive: 0 };
    data.map((item) => {
        if (item.status === "active") statusCount["active"]++;
        if (item.status === "inactive") statusCount["inactive"]++;
    });
    return (
        <div className="filter">
            <button className="btn btn-success btn-sm">
                All <span>{data.length}</span>
            </button>
            <button className="btn btn-primary btn-sm">
                Active<span>{statusCount.active}</span>
            </button>
            <button className="btn btn-danger btn-sm">
                Inactive<span>{statusCount.inactive}</span>
            </button>
        </div>
    );
}

export default StatusFilter;
