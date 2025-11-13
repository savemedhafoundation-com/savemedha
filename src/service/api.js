import api from '../utils/api';

export const fetchBlogPosts = async () => {
  const { data } = await api.get('/content/blog');
  return data;
};

