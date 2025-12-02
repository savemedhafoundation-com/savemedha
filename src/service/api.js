import api from '../utils/api';

export const fetchBlogPosts = async () => {
  const { data } = await api.get('https://nit-backend-a16m.vercel.app/api/content/blog');
  console.log("data", data);
  return data;
};

