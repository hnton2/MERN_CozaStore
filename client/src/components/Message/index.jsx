import React from "react";
import styled from "styled-components";
import { Alert } from "@mui/material";

const MessageContainer = styled.div`
    margin-bottom: 12px;
`;

const MessageContent = styled.div`
    font-size: 15px;
`;

function Message({ type, children }) {
    return (
        <MessageContainer>
            <Alert severity={type}>
                <MessageContent>{children}</MessageContent>
            </Alert>
        </MessageContainer>
    );
}

export default Message;
