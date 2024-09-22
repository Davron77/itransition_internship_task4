import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const blockUsers = async (userIds: String[]) => {
  const response = await axios.post(`${API_URL}/block-users`, { userIds });
  return response.data;
};

export const unBlockUsers = async (userIds: String[]) => {
  const response = await axios.post(`${API_URL}/unblock-users`, { userIds });
  return response.data;
};

export const deleteUser = async (uid: any) => {
  const response = await axios.delete(`${API_URL}/users/${uid}`);

  return response.data;
};
