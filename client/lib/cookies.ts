import { getCookie } from "cookies-next";

export const getAuthCookie = (name: string) => {
  const cookie = getCookie(name);
  return cookie ? cookie : null;
};
