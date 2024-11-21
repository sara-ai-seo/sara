import { RootState } from "@/app/store";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleUnauthorized } from "./handleUnauthorized";

const ApiCall = axios.create({
  baseURL: "https://staging-api.webmaxi.net/api",
  // baseURL: process.env.NEXT_BASE_URL,
  // timeout: 10000
});

// Function to get token from Redux store
const getToken = (store: any) => {
  const token = store.getState().user.token;
  // console.log("interceptor", token);
  return token;
};

// Function to set authorization header based on token
export const configureApiCall = (store: any) => {

  ApiCall.interceptors.request.use(
    (config) => {
      const token = getToken(store);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  ApiCall.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        handleUnauthorized();
      }
      return Promise.reject(error);
    }
  );
};

export default ApiCall;
