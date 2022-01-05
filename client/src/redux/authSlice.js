import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth";
import { clearMessage, setMessage } from "./messageSlice";

export const SignIn = createAsyncThunk("auth/SignIn", async ({ email, password }, thunkAPI) => {
    try {
        const response = await authService.login({ email, password });
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const SignUp = createAsyncThunk("auth/SignUp", async ({ username, email, password }, thunkAPI) => {
    try {
        const response = await authService.register({ username, email, password });
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

export const LogOut = createAsyncThunk("auth/LogOut", async () => {
    await authService.logout();
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    extraReducers: {
        [SignIn.pending]: (state, action) => {
            state.isFetching = true;
        },
        [SignIn.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        [SignIn.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        [SignUp.pending]: (state, action) => {
            state.isFetching = true;
        },
        [SignUp.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.error = false;
        },
        [SignUp.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
        [LogOut.pending]: (state, action) => {
            state.isFetching = true;
        },
        [LogOut.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.currentUser = null;
            state.error = false;
        },
        [LogOut.rejected]: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export default authSlice.reducer;
