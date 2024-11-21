import axios from "axios";

export const BASE_URL = "https://staging-api.webmaxi.net/api";
// export const BASE_URL = "https://api.webmaxi.net/api/";

export const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
