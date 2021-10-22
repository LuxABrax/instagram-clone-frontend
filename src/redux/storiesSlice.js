import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getStories = createAsyncThunk(
	"stories/getStories",
	async (userId, { rejectWithValue, dispatch }) => {
		const res = await axios.get(`/stories/${userId}`);
		const data = await res.data;
		if (!data.success) {
			return rejectWithValue(data.message);
		}
		dispatch(storiesSlice.actions.setLastUpdate(Date.now()));
		const stories = await JSON.parse(data.data);
		console.log(stories);
		return stories;
	}
);

export const storiesSlice = createSlice({
	name: "stories",
	initialState: {
		status: "idle",
		error: "",
		stories: [],
		activeStory: {},
		lastUpdate: "",
	},
	reducers: {
		setLastUpdate: (state, { payload }) => {
			state.lastUpdate = payload;
		},
	},
	extraReducers: {
		[getStories.pending]: state => {
			state.status = "Get Stories";
		},
		[getStories.fulfilled]: (state, { payload }) => {
			state.stories = payload;
			state.status = "Get Stories Success";
		},
		[getStories.rejected]: (state, { error }) => {
			console.log(error);
			state.error = error.message;
			state.status = "Get Stories Failed";
		},
	},
});

export const { setLastUpdate } = storiesSlice.actions;

export const selectStories = state => state.stories.stories;
export const selectActiveStory = state => state.stories.activeStory;

export default storiesSlice.reducer;
