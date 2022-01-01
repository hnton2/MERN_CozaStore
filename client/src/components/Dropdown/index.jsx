import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Sidebar = styled.li`
    width: 100%;
`;

const SidebarLink = styled(Link)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333;
    font-size: 14px;
    transition: 0.3s ease;

    &:hover {
        cursor: pointer;
        color: #6c7ae0;
    }
`;

const SidebarDescription = styled.div`
    display: flex;
    align-items: center;
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
`;

const DropdownLink = styled(Link)`
    padding-top: 1rem;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #222;
    transition: 0.3s ease;

    &:hover {
        color: #6c7ae0;
        cursor: pointer;
    }
`;

function Dropdown({ item }) {
    const [isDropdown, setIsDropdown] = useState(false);
    const showDropdown = () => setIsDropdown(!isDropdown);
    return (
        <Sidebar>
            <SidebarLink to={item.path} onClick={item.SubMenu && showDropdown}>
                <SidebarDescription>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </SidebarDescription>
                <div>{item.SubMenu && isDropdown ? item.iconOpened : item.SubMenu ? item.iconClosed : null}</div>
            </SidebarLink>
            {isDropdown &&
                item.SubMenu.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </Sidebar>
    );
}

export default Dropdown;
