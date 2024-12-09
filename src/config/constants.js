export const GENRES = ['Love', 'Life', 'Nature', 'Friendship', 'Motivation', 'Other']
export const API_ENDPOINTS = {
  BASE: '/api/shayari',
  RANDOM: '/api/shayari/random',
  LIKE: (id) => `/api/shayari/${id}/like`,
  COMMENT: (id) => `/api/shayari/${id}/comment`
}

export const TOAST_MESSAGES = {
  UPLOAD_SUCCESS: 'Shayari uploaded successfully!',
  UPLOAD_ERROR: 'Failed to upload shayari',
  GENERAL_ERROR: 'An error occurred'
}