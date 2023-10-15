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
    const res = await api.get('event');  
    return res.data.map(event=>({...event, confirmationDeadline: new Date(event.confirmationDeadline), date: new Date(event.date)}))
};

export const getEventById = async (id) => {
  const res = await api.get(`event/${id}`);
  return res.data
};

export const searchEvents = async (search) => {
  const res = await api.get(`event/search`, { params: { search } });
  return res.data
}

export const answerInvite = async (body) => {
  const res = await api.put(`event/invite/answer`, body);
  return res.data
}

export const inviteGuest = async (body) => {
  const res = await api.post('event/invite/send', body);
  return res.data
}

export const searchUsers = async (username) => {
  const res = await api.get(`/user/by_username/${username}`);
  return res.data;
};
