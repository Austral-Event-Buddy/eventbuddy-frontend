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
  return res.data;
};

export const getEventById = async (id) => {
  const res = await api.get(`event/${id}`);
  return res.data;
};

export const searchEvents = async (search) => {
  const res = await api.get(`event/search`, { params: { search } });
  return res.data;
};

export const answerInvite = async (body) => {
  const res = await api.put(`event/invite/answer`, body);
  return res.data;
};

export const inviteGuest = async (body) => {
  const res = await api.post('event/invite/send', body);
  return res.data;
};

export const searchUsers = async (username) => {
  const res = await api.get(`/user/by_username/${username}`);
  return res.data;
};

export const getElementsByEvent = async (eventId) => {
    const res = await api.get(`event/elements/${eventId}`);
}

export const createEvent = async (body) => {
  const res = await api.post('event', body);
  return res.data
}

export const updateProfileData = async (body) => {
    const res = await api.put(`user/update`, body);
    return res.data
}

export const getMe = async () => {
    const res = await api.get(`user/me`);
    return res.data
}

export const deleteProfile = async () => {
    const res = await api.delete(`user/delete`);
    return res.data
}
