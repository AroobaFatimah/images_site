import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            id: 1,
            email: "test@gmail.com",
            password: "test"
        }
    ],
    activeUser: "",
}
export const registeredUsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        }
    },
})

export const { addUser, setActiveUser } = registeredUsersSlice.actions;
export default registeredUsersSlice.reducer;