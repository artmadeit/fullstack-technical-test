import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export const api = axios.create({
  baseURL: apiUrl,
});

export const fetcher = (url: string) => api.get(url).then((res) => res.data);
