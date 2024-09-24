import { UserData } from "./types";

export const getToken = () => {
  const uid = localStorage.getItem("uid");
  return JSON.parse(uid || "") as UserData;
};

export const setToken = (uid: string) => {
  localStorage.setItem("uid", uid);
};

export const removeToken = () => {
  localStorage.removeItem("uid");
};
