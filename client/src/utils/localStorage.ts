export const getToken = () => {
  const uid = localStorage.getItem("uid");
  return uid ? (JSON.parse(uid || "") as string) : "";
};

export const setToken = (uid: string) => {
  localStorage.setItem("uid", uid);
};

export const removeToken = () => {
  localStorage.removeItem("uid");
};

export const getUserData = (): string => {
  const UserData = localStorage.getItem("UserData");

  return UserData ? (JSON.parse(UserData || "") as string) : "";
};

export const setUserData = (UserData: string) => {
  localStorage.setItem("UserData", UserData);
};

export const removeUserData = () => {
  localStorage.removeItem("UserData");
};
