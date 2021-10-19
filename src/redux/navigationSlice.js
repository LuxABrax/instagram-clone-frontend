import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	navActive: true,
	currentPage: "home",
	lastPage: "home",
};

export const navigationSlice = createSlice({
	name: "nav",
	initialState,
	reducers: {
		goHome: state => {
			state.currentPage = "home";
		},
		changePage: (state, action) => {
			state.currentPage = action.payload;
		},
		setLastPage: (state, action) => {
			state.lastPage = action.payload;
		},
		changeNavActive: (state, action) => {
			state.navActive = action.payload;
		},
	},
});

export const { goHome, changePage, setLastPage, changeNavActive } =
	navigationSlice.actions;

export const selectNavActive = state => state.nav.navActive;
export const selectPage = state => state.nav.currentPage;
export const selectLastPage = state => state.nav.lastPage;

export default navigationSlice.reducer;
