import Cookies from 'universal-cookie';

const cookies = new Cookies();

const defaultCookieOption = {
  path: '/',
  secure: process.env.NODE_ENV !== 'development', // not secure only in development env
  maxAge: 30 * 86400, // 30 days
};

const cookieOption = {
  ...defaultCookieOption,
};

export const getCookie = (key) => {
  return cookies.get(key);
};

export const setCookie = (key, value, option = {}) => {
  return cookies.set(key, value, { ...cookieOption, ...option });
};

export const removeCookie = (key) => {
  cookies.remove(key, cookieOption);
};

export const removeAllCookies = () => {
  const allCookies = cookies.getAll();

  for (const [cookieName] of Object.entries(allCookies)) {
    removeCookie(cookieName);
  }
};
