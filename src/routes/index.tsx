import { useEffect } from "react";
import Cookies from "js-cookie";

import { validate } from "../apis/main/auth";

// redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAuth, unSetAuth } from "../store/reducers/auth";

// components
import Admin from "./Admin";
import Guest from "./Guest";
import Loading from "../pages/guest/Loading";

export default function Routes() {
	// instances
	const dispatch = useAppDispatch();
	const { checked, authSuccess } = useAppSelector((state) => state.auth);

	const cookieToken = Cookies.get("token") as string;

	const handleValidateToken = async (token: string) => {
		validate(token)
			.then((res) => {
				if (res.data.meta.success) {
					dispatch(
						setAuth({
							token: token,
							user: {
								id: res.data.body.id,
								username: res.data.body.username,
							},
						})
					);
				} else {
					dispatch(unSetAuth());
				}
			})
			.catch((err) => {
				dispatch(unSetAuth());
			});
	};

	useEffect(() => {
		if (!checked && cookieToken === "") {
			dispatch(unSetAuth());
		} else if (!checked && cookieToken !== "") {
			handleValidateToken(cookieToken);
		}
	}, [cookieToken]);

	if (checked && authSuccess) {
		return <Admin />;
	} else if (checked && !authSuccess) {
		return <Guest />;
	} else {
		return <Loading />;
	}
}
