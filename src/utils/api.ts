/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_METHODS } from 'types'

export const fetchAPI = async (
  url = '',
  method: API_METHODS,
  token?: string,
  data?: Record<string, unknown>
): Promise<any> => {
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
