import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import navigationReducer from "./navigationSlice";
import modalReducer from "./modalSlice";
import usersReducer from "./usersSlice";
import postsReducer from "./postsSlice";
import popupReducer from "./popupSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	nav: navigationReducer,
	modal: modalReducer,
	users: usersReducer,
	posts: postsReducer,
	popup: popupReducer,
});

export default rootReducer;
