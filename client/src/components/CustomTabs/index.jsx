import { Tab, Tabs } from "@mui/material";
import ProductsSlider from "components/ProductsSlider";
import React from "react";
import TabPanel from "../TabPanel";

function CustomTabs({ data }) {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <>
            <div className="tabs">
                <Tabs value={value} onChange={handleChange}>
                    {data.map((item, index) => (
                        <Tab label={item.label} key={index + 1} />
                    ))}
                </Tabs>
            </div>
            <div className="tab-content">
                {data.map((item, index) => (
                    <TabPanel value={value} index={index} key={index}>
                        <ProductsSlider products={item.content} />
                    </TabPanel>
                ))}
            </div>
        </>
    );
}

export default CustomTabs;
