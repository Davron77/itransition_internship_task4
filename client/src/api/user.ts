import http from "./util/https";
import { API_ENDPOINTS } from "./util/api-endpoint";

export const fetchUsers = async () => {
  const res = await http.get(API_ENDPOINTS.USERS);

  return res.data;
};

export const blockUsers = async (userIds: String[]) => {
  const res = await http.post(API_ENDPOINTS.USERS_BLOCK, { userIds });
  return res.data;
};

export const unBlockUsers = async (userIds: String[]) => {
  const res = await http.post(API_ENDPOINTS.USERS_UNBLOCK, { userIds });
  return res.data;
};

export const deleteUser = async (uid: string) => {
  const res = await http.delete(`${API_ENDPOINTS.USERS}/${uid}`);

  return res.data;
};
