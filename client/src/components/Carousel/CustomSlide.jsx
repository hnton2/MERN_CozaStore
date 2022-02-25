import React from "react";
import styled from "styled-components";
import "animate.css";
import { Link } from "react-router-dom";
import parser from "html-react-parser";

const Slide = styled.div`
    width: 100%;
    height: 100%;
    background: url(${(props) => props.backgroundImage}) center center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-contents: flex-start;
`;

function CustomSlide({ event, title, img, redirect, nAnimate }) {
    return (
        <div className="carousel">
            <Slide backgroundImage={img}>
                <div className={`carousel__content animation${nAnimate}`}>
                    <h3 className="carousel__content-event">{event}</h3>
                    <span className="carousel__content-title">{parser(title)}</span>
                    <Link to={redirect} className="btn btn-light text-uppercase">
                        shop now
                    </Link>
                </div>
            </Slide>
        </div>
    );
}

export default CustomSlide;
