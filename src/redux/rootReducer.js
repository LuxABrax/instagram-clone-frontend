import { combineReducers } from "@reduxjs/toolkit";

import navigationReducer from "./navigationSlice";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	nav: navigationReducer,
	users: usersReducer,
	modal: modalReducer,
});

export default rootReducer;
