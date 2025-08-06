import api from './Api';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from '../Utils/helpers';
import { setItem } from '../Utils/helpers';

const LoginURL = '//auth/login';

export const setLogin = async (payload, setLoading) => {
  setLoading(true);
  try {
    const response = await api.post(LoginURL, payload, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.success) {
      const { user, access_token, refresh_token } = response.data.data;
      setItem(ACCESS_TOKEN, access_token);
      setItem(REFRESH_TOKEN, refresh_token);
      setItem(USER_DATA, user);
      return response.data.data;
    } else {
      toast.error(response.data.message || 'Login failed');
      return null;
    }
  } catch (error) {
    toast.error(error.message || 'Something went wrong');
    return null;
  } finally {
    setLoading(false);
  }
};
