import axios from 'axios'

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.API_URL_INTERNAL || 'http://blog_api:5000/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
})

export default api