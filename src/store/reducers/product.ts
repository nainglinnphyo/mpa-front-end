import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "..";
const URL = import.meta.env.VITE_APP_SERVER_URL;


interface IPorductData {
     id: string;
     name: string;
     createdDate: string;
}

interface IPorductList {
     isLoading: boolean;
     data: IPorductData[];
     error: any
}
const initialState: IPorductList = {
     isLoading: false,
     data: [],
     error: ''
};

export const porductSlice = createSlice({
     name: "productList",
     initialState,
     reducers: {
          startLoading(state) {
               state.isLoading = true;
          },
          setProductList(state, action) {
               state.isLoading = false;
               state.data = action.payload;
          },
          getProductListError(state, action) {
               state.isLoading = false;
               state.error = action.payload;
          },
     },
});

export function getProductList(token: string) {
     return async () => {
          dispatch(porductSlice.actions.startLoading());
          try {
               const resWithAxios = await axios({
                    url: `${URL}ship/fetch-product`,
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
                    let temp: IPorductData[] = await resWithAxios.data.body.map((item: any) => ({
                         id: item.id,
                         name: item.name,
                         createdDate: item.created_at,
                    }));
                    dispatch(porductSlice.actions.setProductList(temp));
               } else {
                    dispatch(porductSlice.actions.getProductListError('Ship Arrival not found.'));
               }
          } catch (error) {
               dispatch(porductSlice.actions.getProductListError(error));
          }
     };
}

export default porductSlice.reducer;