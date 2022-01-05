import React from "react";
import styled from "styled-components";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const MessageContainer = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => (props.type === "success" ? "rgb(211, 47, 47)" : "#dc3545")};
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.4;
    min-width: 200px;
    padding: 6px 16px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, , 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px,
        rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
`;

function Message({ type, children }) {
    return (
        <>
            {(children !== undefined || children !== "") && (
                <MessageContainer type={type}>
                    {type === "success" ? <CheckCircleOutlineIcon /> : <ReportGmailerrorredIcon />}
                    {children}
                </MessageContainer>
            )}
        </>
    );
}

export default Message;
