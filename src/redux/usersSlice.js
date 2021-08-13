import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const getUserProfile = createAsyncThunk(
	"users/getUserProfile",
	async (userName, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/users/n/${userName}`);

		// console.log("response: ", await response.data);
		if (response.data.success === false) {
			dispatch(usersSlice.actions.setErrMessage(response.data.message));
			return rejectWithValue(response.data.message);
		} else {
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return response.data.data;
	}
);

export const followUserWithID = createAsyncThunk(
	"users/followUser",
	async ({ userId, followId }, { rejectWithValue, dispatch }) => {
		const response = await axios.put(`/follow/${userId}/${followId}`);

		console.log("response: ", await response.data);
		if ((await response.data.success) === false) {
			dispatch(usersSlice.actions.setErrMessage(response.data.message));
			return rejectWithValue(response.data.message);
		} else {
			dispatch(usersSlice.actions.removeFromNoFollow(followId));
			// dispatch(getNotFollowedUsers(userId));
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return response.data.data;
	}
);

export const getNotFollowedUsers = createAsyncThunk(
	"users/getNotFollowed",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/follow/${userId}/notfollowed`);

		const data = response.data;
		console.log("response: ", await response);
		const users = data.users.sort(() => Math.random() - 0.5);

		if (data.success === false) {
			dispatch(usersSlice.actions.setErrMessage(data.message));
			return rejectWithValue(data.message);
		} else {
			dispatch(usersSlice.actions.setLoaded(true));
			dispatch(usersSlice.actions.setErrMessage(""));
			if (data.users.length === 0) {
				dispatch(usersSlice.actions.setErrMessage("No users for following"));
				dispatch(usersSlice.actions.setNoUsers(true));
			}
		}
		return users;
	}
);

export const getFollowedUsers = createAsyncThunk(
	"users/getFollowed",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/follow/${userId}/followed`);

		const data = response.data;
		// console.log("response: ", response);
		if (data.success === false) {
			dispatch(usersSlice.actions.setErrMessage(data.message));
			return rejectWithValue(data.message);
		} else {
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return data.users;
	}
);

export const getFollowingUsers = createAsyncThunk(
	"users/getFollowing",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/follow/${userId}/following`);

		const data = response.data;
		// console.log("response: ", await response.data);
		if (data.success === false) {
			dispatch(usersSlice.actions.setErrMessage(data.message));
			return rejectWithValue(data.message);
		} else {
			dispatch(usersSlice.actions.setErrMessage(""));
		}
		return data.users;
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
		suggestions: [],
		loadedUsers: false,
		noUsersToFollow: false,
		isCreated: false,
		errMessage: "",
		error: {
			message: "",
		},
	},
	reducers: {
		setErrMessage: (state, action) => {
			state.errMessage = action.payload;
		},
		removeFromNoFollow: (state, action) => {
			const arr = state.users.notFollowedUsers;
			console.log(arr);
			const newArr = arr.filter(el => el._id !== action.payload);
			console.log(newArr);
			state.users.notFollowedUsers = [...newArr];
		},
		setSuggestions: (state, action) => {
			state.suggestions = action.payload;
		},
		setLoaded: (state, action) => {
			state.loadedUsers = action.payload;
		},
		setNoUsers: (state, action) => {
			state.noUsersToFollow = action.payload;
		},
		setIsCreated: (state, action) => {
			state.isCreated = action.payload;
		},
	},
	extraReducers: {
		[getUserProfile.pending]: state => {
			state.status = "getting user";
		},
		[getUserProfile.fulfilled]: (state, action) => {
			state.userProfile = action.payload;
			state.status = "get user success";
		},
		[getUserProfile.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get user failed";
		},

		[followUserWithID.pending]: state => {
			state.status = "following user";
		},
		[followUserWithID.fulfilled]: (state, action) => {
			// state.userProfile = action.payload;
			state.status = "follow user success";
		},
		[followUserWithID.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "follow user failed";
		},

		[getNotFollowedUsers.pending]: state => {
			state.status = "getting users not followed";
		},
		[getNotFollowedUsers.fulfilled]: (state, action) => {
			const arr = action.payload;
			state.notFollowedUsers = arr.sort(() => Math.random() - 0.5);
			state.status = "get users success";
		},
		[getNotFollowedUsers.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get users failed";
		},

		[getFollowedUsers.pending]: state => {
			state.status = "getting users not followed";
		},
		[getFollowedUsers.fulfilled]: (state, action) => {
			state.followedUsers = action.payload;
			state.status = "get users success";
		},
		[getFollowedUsers.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get users failed";
		},

		[getFollowingUsers.pending]: state => {
			state.status = "getting users not following";
		},
		[getFollowingUsers.fulfilled]: (state, action) => {
			state.followingUsers = action.payload;
			state.status = "get users success";
		},
		[getFollowingUsers.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get users failed";
		},
	},
});

export const { setErrMessage, setSuggestions, setIsCreated, setNoUsers } =
	usersSlice.actions;

export const selectUserProfile = state => state.users.userProfile;
export const selectErrMessage = state => state.users.errMessage;
export const selectFollowedUsers = state => state.users.followedUsers;
export const selectNotFollowedUsers = state => state.users.notFollowedUsers;
export const selectFollowingUsers = state => state.users.followingUsers;

export default usersSlice.reducer;
