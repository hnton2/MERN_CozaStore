import React from "react";
import { useSearchParams } from "react-router-dom";
import "./StatusFilter.scss";

function StatusFilter({ keyword, data }) {
    let [searchParams, setSearchParams] = useSearchParams();
    const currentStatus = searchParams.get([keyword]) || "all";

    const handleFilter = (value) => {
        if (value !== "all") {
            searchParams.delete("page");
            setSearchParams({ ...Object.fromEntries([...searchParams]), [keyword]: value });
        } else {
            searchParams.delete([keyword]);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="filter">
            {data.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleFilter(option.value)}
                    className={`btn ${String(option.value) === currentStatus ? "btn-primary" : "btn-secondary"}`}
                >
                    {option.label}
                    <span>{option.count}</span>
                </button>
            ))}
        </div>
    );
}

export default React.memo(StatusFilter);
