import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: "home",
};

export const navigationSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		goHome: state => {
			state.currentPage = "home";
		},
		changePage: (state, action) => {
			console.log(action.payload);
			state.currentPage = action.payload;
		},
	},
});

export const { goHome, changePage } = navigationSlice.actions;

export const selectPage = state => state.nav.currentPage;

export default navigationSlice.reducer;
