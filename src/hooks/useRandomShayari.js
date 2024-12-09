import { useState } from 'react'
import { API_ENDPOINTS } from '../config/constants'

export function useRandomShayari() {
  const [shayari, setShayari] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRandomShayari = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_ENDPOINTS.RANDOM)
      const data = await response.json()
      setShayari(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { shayari, loading, error, fetchRandomShayari }
}