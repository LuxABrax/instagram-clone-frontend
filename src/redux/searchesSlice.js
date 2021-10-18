import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getSearches = createAsyncThunk(
	"searches/getSearches",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.get(`/searches/${userId}`);

		const data = response.data;
		if (data.success === false) {
			dispatch(searchesSlice.actions.setErrMessage(data.message));
			return rejectWithValue(data.message);
		} else {
			dispatch(searchesSlice.actions.setErrMessage(""));
		}
		const searches = data.data;
		if (searches[0] === "[]") searches.shift();
		return searches;
	}
);

export const addSearch = createAsyncThunk(
	"searches/addSearch",
	async ({ userId, sId }, { rejectWithValue, dispatch }) => {
		const response = await axios.put(`/searches/${userId}/${sId}`);

		const data = response.data;

		if (data.success === false) {
			dispatch(searchesSlice.actions.setErrMessage(data.message));
			return rejectWithValue(data.message);
		} else {
			dispatch(searchesSlice.actions.setErrMessage(""));
		}
		return data.data;
	}
);

export const removeSearch = createAsyncThunk(
	"searches/removeSearch",
	async ({ userId, sId }, { rejectWithValue, dispatch }) => {
		const response = await axios.delete(`/searches/${userId}/${sId}`);

		const data = response.data;
		if (data.success === false) {
			dispatch(searchesSlice.actions.setErrMessage(data.message));
		} else {
			dispatch(searchesSlice.actions.setErrMessage(""));
		}
		return data.data;
	}
);

export const removeSearches = createAsyncThunk(
	"searches/removeSearches",
	async (userId, { rejectWithValue, dispatch }) => {
		const response = await axios.delete(`/searches/${userId}`);

		const data = response.data;
		if (data.success === false) {
			dispatch(searchesSlice.actions.setErrMessage(data.message));
		} else {
			dispatch(searchesSlice.actions.setErrMessage(""));
		}
		return data.data;
	}
);

export const searchesSlice = createSlice({
	name: "searches",
	initialState: {
		status: "idle",
		searches: [],
		error: {
			message: "",
		},
		errMessage: "",
	},
	reducers: {
		setErrMessage: (state, action) => {
			state.errMessage = action.payload;
		},
	},
	extraReducers: {
		[getSearches.pending]: state => {
			state.status = "getting searches";
		},
		[getSearches.fulfilled]: (state, { payload }) => {
			state.searches = payload;
			state.status = "get searches success";
		},
		[getSearches.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "get searches failed";
		},

		[addSearch.pending]: state => {
			state.status = "adding search";
		},
		[addSearch.fulfilled]: (state, { payload }) => {
			state.searches = payload;
			state.status = "add search success";
		},
		[addSearch.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "add search failed";
		},

		[removeSearch.pending]: state => {
			state.status = "removing search";
		},
		[removeSearch.fulfilled]: (state, { payload }) => {
			state.searches = payload;
			state.status = "remove search success";
		},
		[removeSearch.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "remove search failed";
		},

		[removeSearches.pending]: state => {
			state.status = "removing searches";
		},
		[removeSearches.fulfilled]: (state, { payload }) => {
			state.searches = payload;
			state.status = "remove searches success";
		},
		[removeSearches.rejected]: (state, { error }) => {
			state.error.message = error.message;
			state.status = "remove searches failed";
		},
	},
});

export const { setErrMessage } = searchesSlice.actions;

export const { selSearches } = state => state.searches.searches;

export default searchesSlice.reducer;
