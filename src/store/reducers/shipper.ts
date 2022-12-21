import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;


interface IShipperData {
     id: string;
     name: string;
     address: string;
     created_at: string;
}

interface IShipper {
     isLoading: boolean;
     data: IShipperData[];
     error: any
}
const initialState: IShipper = {
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
          setShipper(state, action) {
               state.isLoading = false;
               state.data = action.payload;
          },
          getShipperError(state, action) {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export function getShipper(token: string) {
     return async () => {
          dispatch(shipSlice.actions.startLoading());
          try {
               const resWithAxios = await axios({
                    url: `${URL}shipper/fetch`,
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
                    let temp: IShipperData[] = await resWithAxios.data.body.map((item: any) => ({
                         id: item.id,
                         name: item.name,
                         address: item.address,
                         created_at: item.created_at,
                    }));
                    dispatch(shipSlice.actions.setShipper(temp));
               } else {
                    dispatch(shipSlice.actions.getShipperError('Shipper not found.'));
               }
          } catch (error) {
               dispatch(shipSlice.actions.getShipperError(error));
          }
     };
}

export default shipSlice.reducer;



