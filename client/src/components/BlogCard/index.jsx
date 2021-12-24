import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// prop 'primary': blog card has big size
function BlogCard({ title, image, author, created, summary, primary }) {
    return (
        <div className="blog-card">
            <div className="blog-card__image">
                <Link to="#">
                    <img src={image} alt={title} />
                    <div className="time">
                        <span className="day">18</span>
                        <span className="month-year">Jan 2020</span>
                    </div>
                </Link>
            </div>
            <div className={`desc ${primary && "card-lg"}`}>
                <Link to="#" className="desc__title">
                    {title}
                </Link>
                <p className="desc__summary">{summary}</p>
                <div className="desc__footer">
                    <div className="created">
                        By <span className="content">{author}</span>
                        <span className="border">|</span>
                        <span className="content">StreetStyle, Fashion, Couple</span>
                        <span className="border">|</span>
                        <span className="content">8 comments</span>
                    </div>
                    <Link to="#" className="link-detail">
                        <span>Continue Reading</span>
                        <ArrowRightAltIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
