import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import modalReducer from "../features/modalSlice";

const rootReducer = combineReducers({
	counter: counterReducer,
	nav: navigationReducer,
	modal: modalReducer,
});
export const store = configureStore({
	reducer: rootReducer,
});
