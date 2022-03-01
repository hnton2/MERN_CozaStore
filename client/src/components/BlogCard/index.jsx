import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { IMAGE_CLOUDINARY } from "constants/Config";
import { createSummary } from "helpers/string";
import parse from "html-react-parser";
import moment from "moment";

// prop 'primary': blog card has big size
function BlogCard({ blog, primary }) {
    return (
        <div className={`blog-card ${primary && "primary"}`}>
            <div className="blog-card__image">
                <Link to={`/blog/${blog.slug}`}>
                    <img src={IMAGE_CLOUDINARY + blog.images[0]} alt={blog.name} />
                    <div className="time">
                        <span className="day">{moment(blog.updateAt).get("date")}</span>
                        <span className="month-year">{moment(blog.updateAt).format("MMM YYYY")}</span>
                    </div>
                </Link>
            </div>
            <div className="blog-card__desc">
                <Link to={`/blog/${blog.slug}`} className="desc__title">
                    {blog.name}
                </Link>
                <p className="desc__summary">{parse(createSummary(blog.description, 240))}</p>
                <div className="desc__footer">
                    <div className="created">
                        By <span className="content">Admin</span>
                        <span className="border">|</span>
                        <span className="content">
                            <Link to={`/blog-category/${blog.category.slug}`}>{blog.category.name}</Link>
                        </span>
                        <span className="border">|</span>
                        <span className="content">{blog.comment.length} comments</span>
                    </div>
                    <Link to={`/blog/${blog.slug}`} className="link-detail">
                        <span>Continue Reading</span>
                        <ArrowRightAltIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogCard;
