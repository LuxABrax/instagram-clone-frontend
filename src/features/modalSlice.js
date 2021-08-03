import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
	name: "modal",
	initialState: {
		modalActive: false,
	},
	reducers: {
		toggleModal: state => {
			console.log("state: ", state.modalActive);
			state.modalActive = !state.modalActive;
			console.log("state: ", state.modalActive);
		},
	},
});

export const { toggleModal } = modalSlice.actions;

export const selectModalActive = state => state.modal.modalActive;

export default modalSlice.reducer;
