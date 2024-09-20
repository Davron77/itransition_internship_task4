export const getUserData = () => {
  const token = localStorage.getItem("userData");
  return token;
};

export const setTUserData = (token: string) => {
  localStorage.setItem("userData", token);
};

export const removeTUserData = () => {
  localStorage.removeItem("userData");
};
