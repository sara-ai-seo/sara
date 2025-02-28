import { RootState } from "@/app/store";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleUnauthorized } from "./handleUnauthorized";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const ApiCall = axios.create({
  baseURL: base_url,
  // baseURL: process.env.NEXT_BASE_URL,
  // timeout: 10000
});

const FormDataApiCall = axios.create({
  baseURL: base_url,
  // timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data", 
  }
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

  FormDataApiCall.interceptors.request.use(
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

  FormDataApiCall.interceptors.response.use(
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
export { FormDataApiCall };
