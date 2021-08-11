import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const getUserProfile = createAsyncThunk(
	"users/getUserProfile",
	async (userName, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/users/n/${userName}`);
		console.log("response: ", await response.data);
		if (response.data.success === false) {
			dispatch(usersSlice.actions.setErrMessage(response.data.message));
			return rejectWithValue(response.data.message);
		} else {
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return response.data.data;
	}
);

export const usersSlice = createSlice({
	name: "users",
	initialState: {
		status: "idle",
		userProfile: {},
		users: [],
		errMessage: "",
		error: {
			message: "",
		},
	},
	reducers: {
		setErrMessage: (state, action) => {
			console.log("err message: ", action.payload);
			state.errMessage = action.payload;
		},
	},
	extraReducers: {
		[getUserProfile.pending]: state => {
			state.status = "getting user";
		},
		[getUserProfile.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.userProfile = action.payload;
			state.status = "get user success";
		},
		[getUserProfile.rejected]: (state, action) => {
			console.log(action.payload);
			state.error.message = action.payload;
			state.status = "get user failed";
		},
	},
});

export const { setErrMessage } = usersSlice.actions;

export const selectUserProfile = state => state.users.userProfile;
export const selectErrMessage = state => state.users.errMessage;

export default usersSlice.reducer;
