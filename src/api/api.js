import axios from 'axios';
import { getToken, setToken } from './token';

export const apiToken = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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
  const res = await apiToken.get('event');
  return res.data;
};

export const getEventById = async (id) => {
  const res = await apiToken.get(`event/${id}`);
  return res.data;
};

export const searchEvents = async (search) => {
  const res = await apiToken.get(`event/search`, { params: { search } });
  return res.data;
};

export const answerInvite = async (body) => {
  const res = await apiToken.put(`event/invite/answer`, body);
  return res.data;
};

export const inviteGuest = async (body) => {
  const res = await apiToken.post('event/invite/send', body);
  return res.data;
};

export const searchUsers = async (username) => {
  const res = await apiToken.get(`/user/by_username/${username}`);
  return res.data;
};

export const getElementsByEvent = async (eventId) => {
  const res = await apiToken.get(`event/elements/${eventId}`);
  return res.data;
}

export const createEvent = async (body) => {
  const res = await apiToken.post('event', body);
  return res.data;
};

export const getComments = async (eventId) => {
  const res = await apiToken.get(`comment/${eventId}`);
  return res.data;
}

export const updateProfileData = async (body) => {
    const res = await apiToken.put(`user/update`, body);
    return res.data
}

export const getMe = async () => {
    const res = await apiToken.get(`user/me`);
    return res.data
}


export const getUserById = async (id) => {
  const res = await apiToken.get(`user/by_id/${id}`);
  return res.data
}

export const deleteProfile = async () => {
    const res = await apiToken.delete(`user/delete`);
    return res.data
}

export const createElement = async (body) => {
  const res = await apiToken.post(`element`, body);
  return res.data

}
export const createComment = async (body) =>
{
  const res = await apiToken.post(`comment`, body);
  return res.data

}

  export const updateElement = async (body) => {


}


export const deleteElement = async (body) => {


}
