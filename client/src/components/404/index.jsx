import React from "react";
import styled from "styled-components";

const Container = styled.div`
    border: 1px solid #e9e9e9;
    padding: 80px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #222;
`;

const Title = styled.h1`
    font-size: 40px;
    font-weight: bold;
    line-height: 1.6;
`;

const Subtitle = styled.h3`
    font-size: 24px;
    font-weight: 500;
    line-height: 1.6;
`;

function Error404() {
    return (
        <Container>
            <Title>404</Title>
            <Subtitle>Page not found</Subtitle>
        </Container>
    );
}

export default Error404;
