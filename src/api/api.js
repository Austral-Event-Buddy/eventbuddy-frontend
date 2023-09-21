import axios from 'axios';
import { getToken, setToken } from './token';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const login = async (body, callback) => {
  const res = await api.post('auth/login', body);
  setToken(res.data.access_token);
  callback();
};

export const register = async (body, callback) => {
  const res = await api.post('auth/register', body);
  setToken(res.data.access_token);
  callback();
};

export const getEvents = async () => {
    const res = await api.get('event/getEvents');
    return res.data
};