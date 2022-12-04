import { useEffect } from "react";
import Cookies from "js-cookie";

// redux
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setAuth, unSetAuth } from "../store/reducers/auth";

// api
import { validate } from "../apis/main/auth";

// components
import Admin from "./Admin";
import Guest from "./Guest";
import Loading from "../pages/guest/Loading";

export default function Routes() {
	// instances
	const dispatch = useAppDispatch();
	const { authSuccess, checked } = useAppSelector((state) => state.auth);

	const cookieToken = Cookies.get("token") as string;

	// handlers
	const handleValidateToken = async (token: string) => {
		validate(token)
			.then((res) => {
				if (res.data.meta.success) {
					dispatch(unSetAuth());
				} else {
					dispatch(unSetAuth());
				}
			})
			.catch((err) => {
				// console.log(err);
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

	if (!checked) {
		return <Loading />;
	}
	if (checked && authSuccess) {
		return <Admin />;
	} else if (checked && !authSuccess) {
		return <Guest />;
	}
}
