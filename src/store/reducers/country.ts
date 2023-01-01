import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;

export interface ICountryData {
  id: string;
  name: string;
  created_at: string;
}

interface ICountry {
  isLoading: boolean;
  data: ICountryData[];
  error: any;
}
const initialState: ICountry = {
  isLoading: false,
  data: [],
  error: "",
};

export const countrySlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setCountry(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    getCountryError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export function getCountry(token: string) {
  return async () => {
    dispatch(countrySlice.actions.startLoading());
    try {
      const resWithAxios = await axios({
        url: `${URL}ship/fetch-country`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response)
        .catch((err) => err.response);
      console.log("resWithAxios");
      if (resWithAxios.data.meta.success) {
        let temp: ICountryData[] = await resWithAxios.data.body.map(
          (item: any) => ({
            id: item.id,
            name: item.name,
            created_at: item.created_at,
          })
        );
        dispatch(countrySlice.actions.setCountry(temp));
      } else {
        dispatch(countrySlice.actions.getCountryError("Country not found."));
      }
    } catch (error) {
      dispatch(countrySlice.actions.getCountryError(error));
    }
  };
}

export default countrySlice.reducer;
