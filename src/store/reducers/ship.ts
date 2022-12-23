import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;


interface IShipData {
     id: string;
     name: string;
     created_at: string;
}

interface IShiper {
     isLoading: boolean;
     data: IShipData[];
     error: any
}
const initialState: IShiper = {
     isLoading: false,
     data: [],
     error: ''
};

export const shipSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          startLoading(state) {
               state.isLoading = true;
          },
          setShip(state, action) {
               state.isLoading = false;
               state.data = action.payload;
          },
          getShipError(state, action) {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export function getShip(token: string) {
     return async () => {
          dispatch(shipSlice.actions.startLoading());
          try {
               const resWithAxios = await axios({
                    url: `${URL}ship/fetch`,
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json; charset=UTF-8',
                         Accept: 'application/json',
                         Authorization: `Bearer ${token}`,
                    },
               })
                    .then((response) => response)
                    .catch((err) => err.response);
               if (resWithAxios.data.meta.success) {
                    let temp: IShipData[] = await resWithAxios.data.body.map((item: any) => ({
                         id: item.id,
                         name: item.name,
                         created_at: item.created_at,
                    }));
                    dispatch(shipSlice.actions.setShip(temp));
               } else {
                    dispatch(shipSlice.actions.getShipError('Shipnot found.'));
               }
          } catch (error) {
               dispatch(shipSlice.actions.getShipError(error));
          }
     };
}

export default shipSlice.reducer;



