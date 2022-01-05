const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
    name: "message",
    initialState: { message: "" },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        clearMessage: (state) => {
            state.message = "";
        },
    },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
