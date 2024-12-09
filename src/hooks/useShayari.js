import { useState, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/constants'

export function useShayari(genre = '') {
  const [shayaris, setShayaris] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchShayaris()
  }, [genre])

  const fetchShayaris = async () => {
    try {
      setLoading(true)
      const url = genre && genre !== 'All' 
        ? `${API_ENDPOINTS.BASE}?genre=${genre}`
        : API_ENDPOINTS.BASE
      const response = await fetch(url)
      const data = await response.json()
      setShayaris(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { shayaris, loading, error, refetch: fetchShayaris }
}