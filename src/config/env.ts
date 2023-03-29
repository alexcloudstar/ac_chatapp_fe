export const API_URL =
  (import.meta.env.VITE_API_URL as string) || (process.env.API_URL as string)

export const IS_SERVER_DOWN =
  (import.meta.env.VITE_IS_SERVER_DOWN as string) ||
  (process.env.VITE_IS_SERVER_DOWN as string)
