import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const getPopupContent = createAsyncThunk(
	"popup/getPopupContent",
	async ({ uId, fId }, { rejectWithValue }) => {
		console.log("get popup content");
		const res = await axios.get(`/follow/popup/${uId}/${fId}`);

		const popupContent = await res.data.popupInfo;
		console.log(popupContent);

		if (res.data.success === false) return rejectWithValue(res.data.message);

		return popupContent;
	}
);

export const popupSlice = createSlice({
	name: "popup",
	initialState: {
		overTrigger: false,
		overPopup: false,
		popupActive: false,
		popupParent: "",
		popupFetched: false,
		popupOffset: {
			x: 0,
			y: 0,
		},
		popupContent: {
			// id: "",
			// name: "",
			// fullName: "",
			// photo: "",
			// posts: undefined,
			// followers: undefined,
			// following: undefined,
			// isFollowing: undefined,
			// postGallery: [],
		},
		popKey: "",
		status: "idle",
		error: {
			message: "",
		},
	},
	reducers: {
		setKey: (state, { payload }) => {
			state.popKey = payload;
		},
		setPopupOffset: (state, { payload }) => {
			const { offY, offX } = payload;
			state.popupOffset = { x: offX, y: offY };
		},

		setOverTrigger: (state, action) => {
			// console.log("over trigger ", action.payload);
			state.overTrigger = action.payload;
		},
		setOverPopup: (state, action) => {
			// console.log("over popup ", action.payload);
			state.overPopup = action.payload;
		},
		setPopup: (state, action) => {
			if (action.payload === "close") {
				state.overTrigger = false;
				state.overPopup = false;
				state.popupActive = false;
				state.popupParent = "";
				state.popupFetched = false;
				return;
			}
			console.log("set popup ");
			const oT = state.overTrigger;
			const oP = state.overPopup;
			// console.log(`t ${oT}, p ${oP}`);
			if (oT || oP) state.popupActive = true;
			if (!oT && !oP) {
				state.popupActive = false;
				state.popupParent = "";
				state.popupFetched = false;
			}
		},
	},
	extraReducers: {
		[getPopupContent.pending]: state => {
			state.status = "getting popup";
		},
		[getPopupContent.fulfilled]: (state, action) => {
			state.popupContent = action.payload;
			state.popupFetched = true;
			state.status = "get popup success";
		},
		[getPopupContent.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get popup failed";
		},
	},
});

export const {
	setKey,
	setPopupOffset,
	setOverTrigger,
	setOverPopup,
	setPopup,
} = popupSlice.actions;

export const selectPopup = state => state.popup;

export default popupSlice.reducer;
