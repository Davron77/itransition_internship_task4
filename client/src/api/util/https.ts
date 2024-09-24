import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
  timeout: 30000,
});

http.interceptors.response.use(
  (response) =>
    new Promise((resolve, _reject) => {
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
