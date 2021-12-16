import { Tab, Tabs } from "@mui/material";
import React from "react";
import TabPanel from "../TabPanel";

function CustomTabs({ panels }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="tabs">
                <Tabs value={value} onChange={handleChange}>
                    {panels.map((panel, index) => (
                        <Tab label={panel.label} key={index} />
                    ))}
                </Tabs>
            </div>
            <div className="tab-content">
                {panels.map((panel, index) => (
                    <TabPanel value={value} index={index}>
                        {panel.content}
                    </TabPanel>
                ))}
            </div>
        </>
    );
}

export default CustomTabs;
