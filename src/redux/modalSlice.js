import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		modalActive: false,
		modalName: "",
		profileSuggestions: false,
		photoUrl: "",
		photoFile: undefined,
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
		setPhotoUrl: (state, { payload }) => {
			const { url, file } = payload;
			state.photoUrl = url;
			state.photoFile = file;
		},
	},
});

export const {
	toggleModal,
	changeModalName,
	changeProfileSuggestions,
	setPhotoUrl,
} = modalSlice.actions;

export const selectModalActive = state => state.modal.modalActive;
export const selectModalName = state => state.modal.modalName;
export const selectProfileSuggestions = state => state.modal.profileSuggestions;
export const selectPhotoUrl = state => state.modal.photoUrl;
export const selectPhotoFile = state => state.modal.photoFile;

export default modalSlice.reducer;
