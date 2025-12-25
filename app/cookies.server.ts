import { createCookie } from "react-router";

export const tabCookie = createCookie("tab", {
  path: "/",
  sameSite: "none",
  secure: true,
  httpOnly: false,
  maxAge: 60 * 60 * 24 * 30,
});

export const toastCookie = createCookie("toast", {
  path: "/",
  sameSite: "none",
  secure: true,
  httpOnly: false,
  maxAge: 60,
});
