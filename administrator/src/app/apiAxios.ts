import baseAxios, { AxiosInstance } from "axios";

export const baseURL = `${process.env.REACT_APP_API}/api`;
const ACCESS_TOKEN = "access-token";
const REFRESH_TOKEN = "refresh-token";

const apiAxios: AxiosInstance = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAxios;
