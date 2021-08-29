import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (userId, { rejectWithValue, dispatch }) => {
		const res = await axios.get(`/posts/following/${userId}`);
		const data = await res.data;
		if (!data.success) {
			console.log(data);
			return rejectWithValue(data.message);
		}
		console.log(data.data);
		return data.data;
	}
);

export const postsSlice = createSlice({
	name: "posts",
	initialState: {
		status: "idle",
		error: "",
		posts: [],
		activePost: {},
	},
	reducers: {
		setPosts: (state, action) => {
			state.posts = action.payload;
		},
		setActivePost: (state, action) => {
			state.activePost = action.payload;
		},
		addLike: (state, action) => {
			const { userId, pidx } = action.payload;
			state.posts[pidx].likes.push(userId);
		},
		removeLike: (state, action) => {
			const { userId, pidx } = action.payload;
			state.posts[pidx].likes = state.posts[pidx].likes.filter(
				l => l !== userId
			);
		},
		addLikeAct: (state, action) => {
			const { userId } = action.payload;
			state.activePost.likes.push(userId);
		},
		removeLikeAct: (state, action) => {
			const { userId } = action.payload;
			state.activePost.likes = state.activePost.likes.filter(l => l !== userId);
		},
	},
	extraReducers: {
		[getPosts.pending]: state => {
			state.status = "Get Posts";
		},
		[getPosts.fulfilled]: (state, { payload }) => {
			console.log(payload);
			state.posts = payload;
			state.status = "Get Posts Success";
		},
		[getPosts.rejected]: (state, { error }) => {
			console.log(error);
			state.error = error.message;
			state.status = "Get Posts Failed";
		},
	},
});

export const {
	setPosts,
	setActivePost,
	addLike,
	removeLike,
	addLikeAct,
	removeLikeAct,
} = postsSlice.actions;

export const selectPosts = state => state.posts.posts;
export const selectActivePost = state => state.posts.activePost;

export default postsSlice.reducer;
