import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;


interface IPortData {
     id: string;
     name: string;
     created_at: string;
}

interface IPort {
     isLoading: boolean;
     data: IPortData[];
     error: any
}
const initialState: IPort = {
     isLoading: false,
     data: [],
     error: ''
};

export const portSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          startLoading(state) {
               state.isLoading = true;
          },
          setPort(state, action) {
               state.isLoading = false;
               state.data = action.payload;
          },
          getPortError(state, action) {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export function getPort(token: string) {
     return async () => {
          dispatch(portSlice.actions.startLoading());
          try {
               const resWithAxios = await axios({
                    url: `${URL}ship/fetch-port`,
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
                    let temp: IPortData[] = await resWithAxios.data.body.map((item: any) => ({
                         id: item.id,
                         name: item.name,
                         created_at: item.created_at,
                    }));
                    dispatch(portSlice.actions.setPort(temp));
               } else {
                    dispatch(portSlice.actions.getPortError('Port not found.'));
               }
          } catch (error) {
               dispatch(portSlice.actions.getPortError(error));
          }
     };
}

export default portSlice.reducer;



