import api from '../utils/api';

export const fetchBlogPosts = async () => {
  const { data } = await api.get('https://savemedhabackend.vercel.app/api/blogs');
  return data;
};

export const fetchEbooks = async () => {
  const { data } = await api.get('https://savemedhabackend.vercel.app/api/ebooks');
  return data;
};

