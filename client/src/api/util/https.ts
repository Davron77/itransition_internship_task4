import { getToken } from "@/utils/localStorage";
import axios, { AxiosRequestHeaders } from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
});

http.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as AxiosRequestHeaders;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) =>
    new Promise((resolve) => {
      resolve(response);
    }),

  (error) => {
    if (!error.response) {
      return new Promise((_resolve, reject) => {
        reject(error.response);
      });
    }
    if (error.response.status === 403 || error.response.status === 401) {
      if (window.location.pathname !== "/login") {
        window.location = "/login" as Location | (string & Location);
      }
      return new Promise((_resolve, reject) => {
        reject(error.response);
      });
    } else {
      return new Promise((_resolve, reject) => {
        reject(error.response);
      });
    }
  }
);

export default http;
