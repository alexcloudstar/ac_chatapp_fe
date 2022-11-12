export const getLocalStorage = (key: string) => localStorage.getItem(key)
export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value)
export const removeLocalStorage = (key: string) => localStorage.removeItem(key)
