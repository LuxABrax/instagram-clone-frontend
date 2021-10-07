import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axios";

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (userId, { rejectWithValue }) => {
		const res = await axios.get(`/posts/following/${userId}`);
		const data = await res.data;
		if (!data.success) {
			console.log(data);
			return rejectWithValue(data.message);
		}
		// Parse Comments
		const posts = data.data.map(p => {
			if (p.comments.length === 0) return p;
			return {
				...p,
				comments: p.comments.map(c => {
					return JSON.parse(c);
				}),
			};
		});
		// console.log(data.data);
		return posts;
	}
);

export const getUserPosts = createAsyncThunk(
	"posts/getUserPosts",
	async (userId, { rejectWithValue }) => {
		const res = await axios.get(`/posts/profile/${userId}`);
		const data = await res.data;
		if (!data.success) {
			console.log(data);
			return rejectWithValue(data.message);
		}
		// Parse Comments
		const posts = data.data.map(p => {
			if (p.comments.length === 0) return p;
			return {
				...p,
				comments: p.comments.map(c => {
					return JSON.parse(c);
				}),
			};
		});
		// console.log(data.data, posts);
		return posts;
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
		addSave: (state, action) => {
			const { userId, pidx } = action.payload;
			state.posts[pidx].saved.push(userId);
		},
		removeSave: (state, action) => {
			const { userId, pidx } = action.payload;
			state.posts[pidx].saved = state.posts[pidx].saved.filter(
				l => l !== userId
			);
		},
		addSaveAct: (state, action) => {
			const { userId } = action.payload;
			state.activePost.saved.push(userId);
		},
		removeSaveAct: (state, action) => {
			const { userId } = action.payload;
			state.activePost.saved = state.activePost.saved.filter(l => l !== userId);
		},
		addComment: (state, { payload }) => {
			const { p, idx, com } = payload;
			if (p === "posts") {
				state.posts[idx].comments.push(com);
			} else {
				state.activePost.comments.push(com);
			}
		},
	},
	extraReducers: {
		[getPosts.pending]: state => {
			state.status = "Get Posts";
		},
		[getPosts.fulfilled]: (state, { payload }) => {
			state.posts = payload;
			state.status = "Get Posts Success";
		},
		[getPosts.rejected]: (state, { error }) => {
			console.log(error);
			state.error = error.message;
			state.status = "Get Posts Failed";
		},
		[getUserPosts.pending]: state => {
			state.status = "Get User Posts";
		},
		[getUserPosts.fulfilled]: (state, { payload }) => {
			state.posts = payload;
			state.status = "Get User Posts Success";
		},
		[getUserPosts.rejected]: (state, { error }) => {
			console.log(error);
			state.error = error.message;
			state.status = "Get User Posts Failed";
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
	addSave,
	removeSave,
	addSaveAct,
	removeSaveAct,
	addComment,
} = postsSlice.actions;

export const selectPosts = state => state.posts.posts;
export const selectActivePost = state => state.posts.activePost;

export default postsSlice.reducer;
