import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "../features/navigation/navigationSlice";

const rootReducer = combineReducers({
	counter: counterReducer,
	nav: navigationReducer,
});
export const store = configureStore({
	reducer: rootReducer,
});
