import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		modalActive: false,
		modalName: "",
		profileSuggestions: false,
	},
	reducers: {
		toggleModal: (state, action) => {
			if (action.payload !== undefined) state.modalName = action.payload;
			if (state.modalActive) state.modalName = "";
			state.modalActive = !state.modalActive;
		},
		changeModalName: (state, action) => {
			state.modalName = action.payload;
		},
		changeProfileSuggestions: (state, action) => {
			state.profileSuggestions = action.payload;
		},
	},
});

export const { toggleModal, changeModalName, changeProfileSuggestions } =
	modalSlice.actions;

export const selectModalActive = state => state.modal.modalActive;
export const selectModalName = state => state.modal.modalName;
export const selectProfileSuggestions = state => state.modal.profileSuggestions;

export default modalSlice.reducer;
