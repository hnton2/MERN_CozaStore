import React from "react";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import "./SidebarModal.scss";
import { Slide } from "@mui/material";

const Backdrop = styled.div`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    -webkit-tap-highlight-color: transparent;
`;

function SidebarModal({ isOpen, onClose, children }) {
    return (
        <Modal open={isOpen} onClose={onClose} BackdropComponent={Backdrop}>
            <Slide in={isOpen} direction="left">
                <div className="sidebar-modal">
                    <div className="sidebar-modal__container">{children}</div>
                </div>
            </Slide>
        </Modal>
    );
}

export default SidebarModal;
