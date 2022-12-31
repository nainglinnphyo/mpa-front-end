import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;


interface IShipArrivalData {
     id: string;
     voyageNumber: string;
     blFinish: string;
     ship: string;
     port: string;
     countryOrigin: string;
     countryReturn: string;
     arrivalDate: string;
     returnDate: string;
     createdDate: string;
}

interface IShipArrival {
     isLoading: boolean;
     data: IShipArrivalData[];
     error: any
}
const initialState: IShipArrival = {
     isLoading: false,
     data: [],
     error: ''
};

export const shipArrivalSlice = createSlice({
     name: "shipArrival",
     initialState,
     reducers: {
          startLoading(state) {
               state.isLoading = true;
          },
          setShipArrival(state, action) {
               state.isLoading = false;
               state.data = action.payload;
          },
          getShipArrivalError(state, action) {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export function getShipArrival(token: string, value: any) {
     const fromDate = value.fromDate.format("YYYY-MM-DD")
     const toDate = value.toDate.format("YYYY-MM-DD")
     return async () => {
          dispatch(shipArrivalSlice.actions.startLoading());
          try {
               const resWithAxios = await axios({
                    url: `${URL}ship/fetch-ship-arrival?fromDate=${fromDate}&toDate=${toDate}`,
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
                    let temp: IShipArrivalData[] = await resWithAxios.data.body.map((item: any) => ({
                         id: item.id,
                         voyageNumber: item.voyageNumber,
                         blFinish: item.blFinish,
                         ship: item.Ship.name,
                         port: item.Port.name,
                         countryOrigin: item.countryOrigin.name,
                         countryReturn: item.countryReturn.name,
                         arrivalDate: item.arrivalDate,
                         returnDate: item.returnDate,
                         createdDate: item.created_at,
                    }));
                    dispatch(shipArrivalSlice.actions.setShipArrival(temp));
               } else {
                    dispatch(shipArrivalSlice.actions.getShipArrivalError('Ship Arrival not found.'));
               }
          } catch (error) {
               dispatch(shipArrivalSlice.actions.getShipArrivalError(error));
          }
     };
}

export default shipArrivalSlice.reducer;