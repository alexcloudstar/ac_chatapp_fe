import { API_METHODS } from '@/types'

export const fetchAPI = async (
  url = '',
  method: API_METHODS,
  data?: Record<string, unknown>,
  token?: string
) => {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  })

  return response.json()
}
