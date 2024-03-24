import { serialize } from "cookie";

export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if ("maxAge" in options) {
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

export const destroyCookie = (res, name, options) => {
  return setCookie(res, name, "", { ...(options || {}), maxAge: -1 });
};
