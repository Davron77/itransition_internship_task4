export const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const getUserData = (): string => {
  const UserData = localStorage.getItem("UserData");

  if (!UserData) {
    return "";
  }

  return JSON.parse(UserData);
};

export const setUserData = (UserData: string) => {
  localStorage.setItem("UserData", UserData);
};

export const removeUserData = () => {
  localStorage.removeItem("UserData");
};
