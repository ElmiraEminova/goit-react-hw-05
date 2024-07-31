import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { searchMovies } from '../movies-api';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('query') ?? '';
    if (!searchQuery) return;

    async function fetchSeachMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await searchMovies(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSeachMovies();
  }, [searchParams]);

  const changeQuery = (newQuery) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("query", newQuery);
    setSearchParams(newSearchParams);
    setQuery(newQuery);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    setSearchParams({ query });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => changeQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}