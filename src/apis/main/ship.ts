import axios from "axios";
import { authJsonHeader, plainJsonHeader } from "../headers";

const URL = import.meta.env.VITE_APP_SERVER_URL;

export const fetchShipper = async (token: string) => {
     return await axios({
          url: `${URL}shipper/fetch`,
          method: "GET",
          headers: authJsonHeader(token),
     });
};

