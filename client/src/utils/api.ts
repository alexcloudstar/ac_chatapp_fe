import { API_METHODS } from '@/types'

export const fetchAPI = async (
  url = '',
  method: API_METHODS,
  data?: Record<string, unknown>,
  token?: string
) => {
  // console.log(token)
  const response = await fetch(url, {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token || ''}`,
    },

    body: JSON.stringify(data),
  })

  return response.json()
}
