import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryServices from "services/blogCategory";
import productCategoryService from "../services/productCategory";

export const GetALlCategoryProduct = createAsyncThunk("category/GetALlCategoryProduct", async (thunkAPI) => {
    try {
        const response = await productCategoryService.getPublicItems();
        return response.data.items;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});
export const GetALlCategoryBlog = createAsyncThunk("category/GetALlCategoryBlog", async (thunkAPI) => {
    try {
        const response = await blogCategoryServices.getPublicItems();
        return response.data.items;
    } catch (error) {
        return thunkAPI.rejectWithValue();
    }
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoryProduct: [],
        categoryBlog: [],
    },
    extraReducers: {
        [GetALlCategoryProduct.fulfilled]: (state, action) => {
            state.categoryProduct = action.payload;
        },
        [GetALlCategoryBlog.fulfilled]: (state, action) => {
            state.categoryBlog = action.payload;
        },
    },
});

export default categorySlice.reducer;
