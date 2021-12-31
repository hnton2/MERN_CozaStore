import { Grid, Pagination } from "@mui/material";
import React from "react";
import { DATA_TAB } from "../../constants/Data";
import ProductCard from "../ProductCard";

function ProductList({ user, filters, search }) {
    console.log(filters);
    console.log(search);
    return (
        <>
            <Grid container spacing={1}>
                {DATA_TAB.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index + 1}>
                        <ProductCard name={item.name} price={item.price} image={item.image} />
                    </Grid>
                ))}
            </Grid>
            <div className="category__pagination">
                <Pagination count={10} variant="outlined" size="large" color="secondary" />
            </div>
        </>
    );
}

export default ProductList;
