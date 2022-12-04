import { configureStore } from "@reduxjs/toolkit";

// reducers
import AuthReducer from "./reducers/auth";

const store = configureStore({
	reducer: {
		auth: AuthReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

const { dispatch } = store;

export { dispatch };
