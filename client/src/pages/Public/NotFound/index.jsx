import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Image from "constants/Image";

const BackgroundError = styled.div`
    width: 100vw;
    height: 100vh;
    background: #717fe0 url(${Image.CLOUDS}) no-repeat bottom center;
`;

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading1 = styled.h1`
    font-size: 200px;
    font-weight: 600;
    color: #fff;
    transform: skewY(-15deg);
    text-shadow: 1px 1px 1px #675e8e, 2px 2px 1px #675e8e, 3px 3px 1px #675e8e, 4px 4px 1px #675e8e, 5px 5px 1px #675e8e,
        6px 6px 1px #675e8e, 7px 7px 1px #675e8e, 8px 8px 1px #675e8e, 9px 9px 1px #675e8e, 10px 10px 1px #483d77,
        11px 11px 1px #483d77, 12px 12px 1px #483d77, 13px 13px 1px #483d77, 14px 14px 1px #483d77,
        15px 15px 1px #483d77, 16px 16px 1px #483d77, 17px 17px 1px #483d77, 18px 18px 1px #483d77,
        19px 19px 1px #483d77, 20px 20px 1px #483d77, 21px 21px 1px #483d77, 22px 22px 1px #483d77,
        23px 23px 1px #483d77, 24px 24px 1px #483d77, 25px 25px 1px #483d77, 26px 26px 1px #483d77,
        27px 27px 1px #483d77, 28px 28px 1px #483d77, 29px 29px 1px #483d77, 30px 30px 1px #483d77;
`;

const Heading2 = styled.h2`
    font-size: 40px;
    font-weight: 500;
    color: #fff;
    margin: 8px 0;
`;

const Paragraph = styled.p`
    font-size: 20px;
    color: #d9d9d9;
    margin-bottom: 16px;
`;

function NotFound() {
    return (
        <BackgroundError>
            <Container>
                <Heading1>404</Heading1>
                <Heading2>This page cannot be found!</Heading2>
                <Paragraph>But we have lots of other pages for you see.</Paragraph>
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            </Container>
        </BackgroundError>
    );
}

export default NotFound;
