import axios from 'axios';
import { getToken, setToken } from './token';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${getToken()}`,
    },
  };
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
  return res.data;
};

export const createEvent = async (body) => {
  const res = await api.post('event', body);
  return res.data;
};

export const editEvent = async (id, body) => {
  const res = await api.post(`event/${id}`, body);
  return res.data;
}

export const deleteEvent = async (id) => {
  const res = await api.delete(`event/${id}`);
  return res.data;
}

export const getComments = async (eventId) => {
  const res = await api.get(`comment/${eventId}`);
  return res.data;
};

export const updateProfileData = async (body) => {
  const res = await api.put(`user/update`, body);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get(`user/me`);
  return res.data;
};

export const deleteProfile = async () => {
  const res = await api.delete(`user/delete`);
  return res.data;
};

export const createElement = async (body) => {
  const res = await api.post(`element/`, body);
  return res.data;
}

export const editElement = async (body) => {
  const res = await api.put(`element/`, body);
  return res.data;
}

export const assignElement = async (body) => {
  const res = await api.put(`element/charge/take`, body);
  return res.data;
}

export const unassignElement = async (body) => {
  const res = await api.put(`element/charge/delete`, body);
  return res.data;
}

export const deleteElement = async (id) => {
  const res = await api.delete(`element/${id}`);
  return res.data;
}

export const updateElement = async (body) => {
  const res = await api.put(`element/`, body);
  return res.data;
}

export const createComment = async (body) => {
  const res = await api.post(`comment/`, body);
  return res.data;
};

export const getPastEvents = async (userId) => {
  const res = await api.post(`event/past`, { date: new Date().toISOString() });
  return res.data;
};

export const getReviews = async (eventId) => {
  const res = await api.get(`review/${eventId}`);
  return res.data;
};

export const createReview = async (eventId, rating) => {
  const res = await api.post(`review`, {
    eventId,
    rating,
    date: new Date().toISOString(),
  });
  return res.data;
};

export const sendEmail = async (email) => {
    const res = await api.post(`auth/send-reset-password-email/${email}`);
    return res.data;
}

export const resetPassword = async (body) => {
    const res = await api.put(`auth/reset-password`, body);
    return res.data;
}

export const uploadImage = async () => {
  const res = await api.put(`user/picture`);
  return res.data;
};

export const getPicture = async () => {
  const res = await api.get(`user/picture`);
  return res.data;
};