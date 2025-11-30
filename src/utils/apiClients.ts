import axios from 'axios';

export async function searchUnsplash(q: string) {
  const res = await axios.get(`/api/unsplash`, { params: { q } });
  return res.data;
}
