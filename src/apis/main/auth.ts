import axios from "axios";
import { authJsonHeader, plainJsonHeader } from "../headers";
import { LoginPayload } from "./types";

const URL = import.meta.env.VITE_APP_SERVER_URL;

export const validate = async (token: string) => {
	return await axios({
		url: `${URL}auth/me`,
		method: "GET",
		headers: authJsonHeader(token),
	});
};

export const login = async ({ username, password }: LoginPayload) => {
	return await axios({
		url: `${URL}auth/login`,
		method: "POST",
		headers: plainJsonHeader(),
		data: {
			username: username,
			password: password,
		},
	});
};
