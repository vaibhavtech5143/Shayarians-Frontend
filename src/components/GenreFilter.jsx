import { Button } from './ui/Button';

export function GenreFilter({ genres, selectedGenre, onGenreSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {genres.map((genre) => (
        <Button
          key={genre}
          variant={selectedGenre === genre ? 'primary' : 'secondary'}
          onClick={() => onGenreSelect(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
}
