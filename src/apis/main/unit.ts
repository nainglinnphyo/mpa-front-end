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

export const editUnit = async ({ data, token }: ICreateNewUnit) => {
  return await axios({
    url: `${URL}unit/edit`,
    method: "PUT",
    headers: authJsonHeader(token),
    data: data,
  });
};
