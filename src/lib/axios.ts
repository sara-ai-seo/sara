import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// export const BASE_URL = "https://api.webmaxi.net/api/";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
