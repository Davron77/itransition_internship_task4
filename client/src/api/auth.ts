import http from "./util/https";
import { API_ENDPOINTS } from "./util/api-endpoint";

export const login = async (idToken: string) => {
  const res = await http.post(API_ENDPOINTS.LOGIN, { idToken });

  return res?.data;
};

export const register = async (body: {
  email: string;
  password: string;
  username: string;
}) => {
  const res = await http.post(API_ENDPOINTS.REGISTER, body);

  return res?.data;
};
