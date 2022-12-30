import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;

interface IUnitData {
  id: string;
  name: string;
  created_at: string;
}

interface IUnit {
  isLoading: boolean;
  data: IUnitData[];
  error: any;
}
const initialState: IUnit = {
  isLoading: false,
  data: [],
  error: "",
};

export const UnitSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setUnit(state, action) {
      state.isLoading = false;
      state.data = action.payload;
    },
    getUnitError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export function getShip(token: string) {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    try {
      const resWithAxios = await axios({
        url: `${URL}unit/fetch`,
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response)
        .catch((err) => err.response);
      if (resWithAxios.data.meta.success) {
        let temp: IUnitData[] = await resWithAxios.data.body.map(
          (item: any) => ({
            id: item.id,
            name: item.name,
            created_at: item.created_at,
          })
        );
        dispatch(UnitSlice.actions.setUnit(temp));
      } else {
        dispatch(UnitSlice.actions.getUnitError("Unit found."));
      }
    } catch (error) {
      dispatch(UnitSlice.actions.getUnitError(error));
    }
  };
}

export default UnitSlice.reducer;
