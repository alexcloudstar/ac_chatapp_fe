export const API_URL =
  (import.meta.env.VITE_API_URL as string) ||
  (process.env.VITE_API_URL as string) ||
  (process.env.REACT_APP_API_URL as string) ||
  'http://localhost:8000';
