import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import modalReducer from "../features/modalSlice";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
	users: authReducer,
	counter: counterReducer,
	nav: navigationReducer,
	modal: modalReducer,
});
export const store = configureStore({
	reducer: rootReducer,
});
