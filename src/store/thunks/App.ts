import { ACCESS_TOKEN } from '../../constants/cookie';
import { LOGIN_URL } from '../../constants/urls';
import { ILoginForm } from '../../models/user';
import { removeAllCookies, setCookie } from '../../services/cookie';
import { hirouAxios } from '../../services/httpInstance';
import { dispatchLogin } from '../dispatcher';

export const handleLogin = async (data: ILoginForm) => {
  removeAllCookies();
  try {
    const { username, password } = data;
    const response = await hirouAxios.post(LOGIN_URL, {
      username,
      password,
    });

    const userData = response.data;

    if (userData.key) {
      setCookie(ACCESS_TOKEN, userData.key);

      dispatchLogin({
        token: userData.key,
        email: userData.user.email,
        firstName: userData.user.first_name,
        lastName: userData.user.last_name,
        id: userData.user.id,
        profile: userData.user.profile,
        username: userData.user.username,
      });
    }
  } catch (e) {
    throw e;
  }
};
