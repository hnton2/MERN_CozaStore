import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";

function BlogCard({ title, image, author, created, summary }) {
    return (
        <div className="blog-card">
            <div className="blog-card__image">
                <Link to="#" className="blog-card__image-link">
                    <img src={image} alt={title} />
                </Link>
            </div>
            <div className="desc">
                <p className="desc__created">
                    By <span>{author}</span> on <span>{created}</span>
                </p>
                <Link to="#" className="desc__title">
                    {title}
                </Link>
                <p className="desc__summary">{summary}</p>
            </div>
        </div>
    );
}

export default BlogCard;
