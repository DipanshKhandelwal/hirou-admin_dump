import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants/cookie';

import { URL } from '../../constants/urls';
import { getCookie } from '../cookie';

export const getAxios = (baseURL?: string) => {
  const instance: any = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (response: any) => {
      const token = getCookie(ACCESS_TOKEN);
      if (token) {
        response.headers = {
          Authorization: `Token ${token}`,
        };
      }
      return response;
    },
    (error: any) => {
      return error;
    }
  );
  return instance;
};

export const hirouAxios = getAxios(URL);
