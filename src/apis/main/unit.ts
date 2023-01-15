import { authJsonHeader } from "./../headers";
import axios from "axios";

const URL = import.meta.env.VITE_APP_SERVER_URL;

interface ICreateNewUnit {
  data: {
    name: string;
  };
  token: string;
}

export const createNewUnit = async ({ data, token }: ICreateNewUnit) => {
  return await axios({
    url: `${URL}unit/create`,
    method: "POST",
    headers: authJsonHeader(token),
    data: data,
  });
};
