import http from "./util/https";
import { API_ENDPOINTS } from "./util/api-endpoint";

export const login = async (body: { email: string; password: string }) => {
  const res = await http.post(API_ENDPOINTS.LOGIN, body);

  return res?.data;
};

export const register = async (body: {
  email: string;
  password: string;
  username: string;
}) => {
  console.log("res", body);
  const res = await http.post(API_ENDPOINTS.REGISTER, body);

  return res?.data;
};

export const logout = async () => {
  const res = await http.post(API_ENDPOINTS.LOGOUT);

  return res?.data;
};
