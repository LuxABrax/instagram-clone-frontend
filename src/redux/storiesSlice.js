import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getStories = createAsyncThunk(
	"stories/getStories",
	async (userId, { rejectWithValue, dispatch }) => {
		const res = await axios.get(`/stories/${userId}`);
		const data = await res.data;
		console.log(data);
		if (!data.success) {
			return rejectWithValue(data.message);
		}

		const stories = await JSON.parse(data.data);

		return stories;
	}
);

export const storiesSlice = createSlice({
	name: "stories",
	initialState: {
		status: "idle",
		error: "",
		stories: [],
		filtered: [],
		seen: false,
		activeIdx: {
			userIdx: 0,
			storyIdx: 0,
		},
		activeStory: {},
	},
	reducers: {
		setSeen: (state, action) => {
			const { userIdx, storyIdx } = action.payload;
			state.stories[userIdx].stories[storyIdx].seen = true;
		},
		setActiveIdx: (state, action) => {
			console.log("setActiveIdx", action.payload);
			const { userIdx, storyIdx } = action.payload;
			state.activeIdx.userIdx = userIdx;
			state.activeIdx.storyIdx = storyIdx;
		},
		setActiveStory: (state, action) => {
			console.log(action.payload);
			const { story, userIdx, storyIdx, seen } = action.payload;
			state.seen = seen;
			// state.activeIdx = { userIdx, storyIdx };
			state.activeStory = story;
		},
		setUnseen: (state, action) => {
			const { userIdx } = action.payload;
			state.stories[userIdx].user.hasUnseen = false;
		},
		setFiltered: (state, { payload }) => {
			state.filtered = payload;
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

export const { setSeen, setUnseen, setFiltered, setActiveStory, setActiveIdx } =
	storiesSlice.actions;

export const selectStories = state => state.stories.stories;
export const selectFStories = state => state.stories.filtered;
export const selectActiveStory = state => state.stories.activeStory;

export default storiesSlice.reducer;
