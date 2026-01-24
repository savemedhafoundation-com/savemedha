import api from '../utils/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://savemedhabackend.vercel.app';

export const fetchBlogPosts = async () => {
  const { data } = await api.get(`${API_BASE_URL}/api/blogs`);
  return data;
};

export const fetchEbooks = async () => {
  const { data } = await api.get(`${API_BASE_URL}/api/ebooks`);
  return data;
};

