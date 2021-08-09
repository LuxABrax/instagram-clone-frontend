import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	navActive: true,
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
		changeNavActive: (state, action) => {
			state.navActive = action.payload;
		},
	},
});

export const { goHome, changePage, changeNavActive } = navigationSlice.actions;

export const selectNavActive = state => state.nav.navActive;
export const selectPage = state => state.nav.currentPage;

export default navigationSlice.reducer;
