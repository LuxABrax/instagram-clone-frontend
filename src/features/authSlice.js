import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./axios";

export const registerUser = createAsyncThunk(
	"auth/register",
	async (user, { rejectWithValue }) => {
		try {
			console.log("registering...", user);
			const response = await axios.post("/auth/register", user);
			console.log("response: ", await response);
			if (!response.ok) {
				console.log(response.data.message);
				return rejectWithValue(response.data.message);
			}

			const { data } = response.json();
			console.log("data", data);
			return data;
		} catch (error) {
			console.log(error.res);
			console.log(error);
			throw Error(error);
			// 	console.log(error.response);
			// 	return rejectWithValue(error.response.message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/login",
	async (user, { rejectWithValue, dispatch }) => {
		const response = await axios.post("/auth/login", user);
		console.log("response: ", await response.data);
		console.log("succes: ", await response.data.success);
		console.log("message: ", await response.data.message);
		if ((await response.data.success) === false) {
			dispatch(authSlice.actions.setErrMessage(response.data.message));
			return rejectWithValue(response.data.message);
		} else {
			dispatch(authSlice.actions.setErrMessage(""));
		}

		return response.data;
	}
);

export const authSlice = createSlice({
	name: "users",
	initialState: {
		isLoggedIn: false,
		status: "idle",
		error: {
			status: undefined,
			message: "",
		},
		errMessage: "",
		user: {},
	},
	reducers: {
		setLogin: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		logout: state => {
			state.user = {};
			state.status = "idle";
			state.isLoggedIn = false;
		},
		setErrMessage: (state, action) => {
			state.errMessage = action.payload;
		},
	},
	extraReducers: {
		[registerUser.pending]: state => {
			state.status = "registering";
			console.log("pending");
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.user = payload.user;
			state.status = "success register";
			state.isLoggedIn = true;
		},
		[registerUser.rejected]: (state, action) => {
			state.error.message = action.error.message;
			console.log(action.error);
			state.status = "failed register";
		},
		[loginUser.pending]: state => {
			state.status = "logging in";
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.user = payload.user;
			state.status = "success login";
			state.isLoggedIn = true;
		},
		[loginUser.rejected]: (state, action) => {
			state.error.message = action.error.message;
			state.status = "failed login";
		},
	},
});

export const { setLogin, logout } = authSlice.actions;

export const selectLoggedIn = state => state.users.isLoggedIn;
export const selectErrMsg = state => state.users.errMessage;

export default authSlice.reducer;
