import { combineReducers } from "@reduxjs/toolkit";

import navigationReducer from "./navigationSlice";
import modalReducer from "./modalSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	nav: navigationReducer,
	modal: modalReducer,
});

export default rootReducer;
