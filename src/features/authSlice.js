import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		loggedIn: false,
	},
	reducers: {
		setLogin: (state, action) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setLogin } = authSlice.actions;

export const selectLoggedIn = state => state.auth.loggedIn;

export default authSlice.reducer;
