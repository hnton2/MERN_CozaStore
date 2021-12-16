import React from "react";
import styled from "styled-components";

const Background = styled.div`
    background: url(${(props) => props.background}) center center / cover no-repeat;
    padding: 92px 15px;
`;

const Title = styled.h2`
    text-align: center;
    font-size: 50px;
    font-weight: bold;
    line-height: 1.1;
    color: #fff;
`;

function TitlePage({ background, title }) {
    return (
        <Background background={background}>
            <Title>{title}</Title>
        </Background>
    );
}

export default TitlePage;
