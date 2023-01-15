import { authJsonHeader } from "./../headers";
import axios from "axios";

const URL = import.meta.env.VITE_APP_SERVER_URL;

interface ICreateNewUnit {
  name: string;
  token: string;
}

export const createNewUnit = async ({ name, token }: ICreateNewUnit) => {
  return await axios({
    url: `${URL}unit/create`,
    method: "POST",
    headers: authJsonHeader(token),
    data: name,
  });
};
