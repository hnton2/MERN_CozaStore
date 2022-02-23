import React from "react";
import { useSearchParams } from "react-router-dom";
import "./StatusFilter.scss";

function StatusFilter({ keyword, options, data }) {
    let [searchParams, setSearchParams] = useSearchParams();

    let statusCount = options.map((option) => Object.assign({}, option));

    data.forEach((item) => {
        statusCount.forEach((option) => {
            if (item[keyword] === option.value) option.count++;
        });
    });

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
            <button onClick={() => handleFilter("all")} className="btn btn-success">
                All <span>{data.length}</span>
            </button>
            {statusCount.map((option) => (
                <button key={option.value} onClick={() => handleFilter(option.value)} className="btn btn-primary">
                    {option.label}
                    <span>{option.count}</span>
                </button>
            ))}
        </div>
    );
}

export default React.memo(StatusFilter);
