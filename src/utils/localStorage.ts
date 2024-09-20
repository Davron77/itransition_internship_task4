import { UserData } from "./types";

export const getUserData = () => {
  const token = localStorage.getItem("userData");
  return JSON.parse(token || "{}") as UserData;
};

export const setTUserData = (token: string) => {
  localStorage.setItem("userData", token);
};

export const removeTUserData = () => {
  localStorage.removeItem("userData");
};
