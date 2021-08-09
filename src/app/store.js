import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "../features/counter/counterSlice";
import navigationReducer from "../features/navigation/navigationSlice";
import modalReducer from "../features/modalSlice";
import authReducer from "../features/authSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	counter: counterReducer,
	nav: navigationReducer,
	modal: modalReducer,
});

const persistConfig = {
	key: "root",
	version: 1,
	whitelist: ["auth"],
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
