import api from '../utils/api';

export const fetchBlogPosts = async () => {
  const { data } = await api.get('https://nit-backend-a16m.vercel.app/api/content/blog');
  return data;
};

