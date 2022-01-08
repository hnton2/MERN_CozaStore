const { createSlice } = require("@reduxjs/toolkit");

const messageSlice = createSlice({
    name: "message",
    initialState: { type: "", content: "" },
    reducers: {
        setMessage: (state, action) => {
            state.content = action.payload.content;
            state.type = action.payload.type;
        },
        clearMessage: (state) => {
            state.content = "";
            state.type = "";
        },
    },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;
export default reducer;
