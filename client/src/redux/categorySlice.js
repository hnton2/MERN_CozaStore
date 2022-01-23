import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCategoryService from "../services/productCategory";

export const GetALlCategoryProduct = createAsyncThunk("category/GetALlCategoryProduct", async (thunkAPI) => {
    try {
        const response = await productCategoryService.getAllProductCategory();
        return response.data.category;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoryProduct: [],
    },
    extraReducers: {
        [GetALlCategoryProduct.fulfilled]: (state, action) => {
            state.categoryProduct = action.payload;
        },
    },
});

export default categorySlice.reducer;
