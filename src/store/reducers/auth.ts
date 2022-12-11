import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// FIXME: change user from any to object type
interface IAuth {
	user: any;
	token: string;
	authSuccess: boolean;
	checked: boolean;
}

interface IAuthPayload {
	user: any;
	token: string;
}

const initialState: IAuth = {
	user: {},
	token: "",
	authSuccess: false,
	checked: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<IAuthPayload>) => {
			const { user, token } = action.payload;
			Cookies.set("token", token);
			state: {
				     (state.checked = true),
					(state.authSuccess = true),
					(state.user = user),
					(state.token = token);
			}
		},
		unSetAuth: (state) => {
			Cookies.remove("token");
			state: {
				(state.checked = true),
					(state.authSuccess = false),
					(state.user = ""),
					(state.token = "");
			}
		},
	},
});

export const { unSetAuth, setAuth } = authSlice.actions;

export default authSlice.reducer;
