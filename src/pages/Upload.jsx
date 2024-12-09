import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const genres = ['Love', 'Life', 'Nature', 'Friendship', 'Motivation', 'Other']

export function Upload() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Love',
    image: null
  })
  const [loading, setLoading] = useState(false) // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', formData.title)
    data.append('author', formData.author)
    data.append('genre', formData.genre)
    data.append('image', formData.image)

    setLoading(true) // Set loading to true when the request starts

    try {
      const response = await fetch('https://shayarians-backend.onrender.com/api/shayari/', {
        method: 'POST',
        body: data
      })

      if (response.ok) {
        toast.success('Shayari uploaded successfully!')
        navigate('/')
      } else {
        toast.error('Failed to upload shayari')
      }
    } catch (error) {
      toast.error('Error uploading shayari')
      console.error('Error:', error)
    } finally {
      setLoading(false) // Set loading to false after the request completes (success or failure)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Share Your Shayari</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Author (Optional)</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            value={formData.genre}
            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shayari Image <p>supported format jpeg,jpg,png</p></label>
          <input
            type="file"
            accept="image/*"
            required
            className="mt-1 block w-full"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4V2m0 20v-2M4 12H2m20 0h-2M7.707 7.707l-1.414-1.414M16.707 16.707l-1.414-1.414M7.707 16.707l-1.414-1.414M16.707 7.707l-1.414-1.414" />
              </svg>
              Uploading...
            </span>
          ) : (
            'Upload Shayari'
          )}
        </button>
      </form>
    </div>
  )
}
