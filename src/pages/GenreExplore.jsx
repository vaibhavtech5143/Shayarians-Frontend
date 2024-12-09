import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useShayari } from '../hooks/useShayari'
import { ShayariGrid } from '../components/ShayariGrid'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'
import { GENRES } from '../config/constants'

function GenreExplore() {
  const { genre } = useParams()
  const { shayaris, loading, error } = useShayari(genre)

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error loading shayaris: {error}</p>
        <Button as={Link} to="/" variant="primary">
          Return Home
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{genre} Shayaris</h1>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {GENRES.map((g) => (
            <Link key={g} to={`/explore/${g}`}>
              <Button variant={g === genre ? 'primary' : 'secondary'}>
                {g}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading shayaris...</p>
        </div>
      ) : (
        <ShayariGrid shayaris={shayaris} />
      )}
    </div>
  )
}

export default GenreExplore