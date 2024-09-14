import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export const api = axios.create({
  baseURL: apiUrl
});

