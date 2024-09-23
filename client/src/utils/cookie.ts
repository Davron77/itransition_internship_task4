"use server";

import { cookies } from "next/headers";

export const createToken = async (token: string) => {
  cookies().set("accessToken", token, { maxAge: 24 * 60 * 60, secure: true });
};

export const deleteToken = async () => {
  cookies().delete("accessToken");
};

export const getToken = async () => {
  const token = cookies().get("accessToken");

  return token;
};

export const hasToken = async () => {
  return cookies().has("accessToken");
};
