import { API_ENDPOINTS } from '../config/constants'

export async function likeShayari(id) {
  const response = await fetch(API_ENDPOINTS.LIKE(id), {
    method: 'POST'
  })
  return response.json()
}

export async function commentOnShayari(id, text) {
  const response = await fetch(API_ENDPOINTS.COMMENT(id), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  })
  return response.json()
}

export async function uploadShayari(formData) {
  const response = await fetch(API_ENDPOINTS.BASE, {
    method: 'POST',
    body: formData
  })
  return response.json()
}