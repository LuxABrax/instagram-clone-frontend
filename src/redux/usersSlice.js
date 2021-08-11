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

export const getNotFollowedUsers = createAsyncThunk(
	"users/getNotFollowed",
	async (userId, { rejectWithValue, dispatch }) => {
		console.log("getNotFollowed");
		const response = await axios.get("/follow/notfollowed", userId);
		console.log("axios sent");
		console.log("response: ", await response);
		if ((await response.data.success) === false) {
			dispatch(usersSlice.actions.setErrMessage(response.data.message));
			return rejectWithValue(response.data.message);
		} else {
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return await response.data.data;
	}
);

export const getFollowedUsers = createAsyncThunk(
	"users/getFollowed",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get("/follow/followed", userId);
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

export const getFollowingUsers = createAsyncThunk(
	"users/getFollowing",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get("/follow/following", userId);
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
		followedUsers: [],
		notFollowedUsers: [],
		followingUsers: [],
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

		[getNotFollowedUsers.pending]: state => {
			state.status = "getting users not followed";
		},
		[getNotFollowedUsers.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.notFollowedUsers = action.payload;
			state.status = "get users success";
		},
		[getNotFollowedUsers.rejected]: (state, action) => {
			console.log(action.payload);
			state.error.message = action.payload;
			state.status = "get users failed";
		},

		[getFollowedUsers.pending]: state => {
			state.status = "getting users not followed";
		},
		[getFollowedUsers.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.followedUsers = action.payload;
			state.status = "get users success";
		},
		[getFollowedUsers.rejected]: (state, action) => {
			console.log(action.payload);
			state.error.message = action.payload;
			state.status = "get users failed";
		},

		[getFollowingUsers.pending]: state => {
			state.status = "getting users not following";
		},
		[getFollowingUsers.fulfilled]: (state, action) => {
			console.log(action.payload);
			state.followingUsers = action.payload;
			state.status = "get users success";
		},
		[getFollowingUsers.rejected]: (state, action) => {
			console.log(action.payload);
			state.error.message = action.payload;
			state.status = "get users failed";
		},
	},
});

export const { setErrMessage } = usersSlice.actions;

export const selectUserProfile = state => state.users.userProfile;
export const selectErrMessage = state => state.users.errMessage;
export const selectFollowedUsers = state => state.users.followedUsers;
export const selectNotFollowedUsers = state => state.users.notFollowedUsers;
export const selectFollowingUsers = state => state.users.followingUsers;

export default usersSlice.reducer;
